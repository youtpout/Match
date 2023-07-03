// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IWETH.sol";
import "./interfaces/IMatch.sol";
import "./libraries/MatchLibrary.sol";

// make match from uniswapv2 dex
contract Matcher is IUniswapV2Callee, Ownable {
  struct MatchInfo {
    address tokenToSell;
    address tokenToBuy;
    uint256 indexOrder;
    uint128 amountToSell;
    uint128 amountToBuy;
    address pair1;
    address pair2;
    uint256[] amounts;
    address[] paths;
  }

  address immutable weth;
  address immutable router;
  address immutable factory;
  address immutable matchh;
  mapping(address => bool) approvedUser;

  address constant NATIVE_TOKEN = address(1);
  uint88 constant reward = 10 ether;

  constructor(address _router, address _match) {
    router = _router;
    matchh = _match;
    factory = IUniswapV2Router02(_router).factory();
    weth = IUniswapV2Router02(_router).WETH();
    approvedUser[_msgSender()] = true;
  }

  function setApprovedUser(address user, bool approved) external onlyOwner {
    approvedUser[user] = approved;
  }

  fallback() external {
    (address sender, uint256 firstAmount, uint256 secondAmount, bytes memory data) = abi.decode(
      msg.data[4:],
      (address, uint256, uint256, bytes)
    );
    uniswapV2Call(sender, firstAmount, secondAmount, data);
  }

  function pancakeCall(address sender, uint256 amount0, uint256 amount1, bytes calldata data) external {
    uniswapV2Call(sender, amount0, amount1, data);
  }

  receive() external payable {}

  function flashSwap(
    address tokenToSell,
    address tokenToBuy,
    uint256 indexOrder,
    address[] calldata paths
  ) external payable {
    MatchLibrary.Order memory order = IMatch(matchh).getOrder(tokenToSell, tokenToBuy, indexOrder);
    uint256 buyAmount = order.amountToBuyRest;
    uint256 amountInMax = (order.amountToBuyRest * order.amountToSell) / order.amountToBuy;

    uint256[] memory amounts = IUniswapV2Router02(router).getAmountsOut(amountInMax, paths);

    require(amounts[amounts.length - 1] >= buyAmount, "EXCESSIVE_OUTPUT_AMOUNT");

    address pair1 = IUniswapV2Factory(factory).getPair(paths[0], paths[1]);
    address pair2;
    if (paths.length > 2) {
      pair2 = IUniswapV2Factory(factory).getPair(paths[1], paths[2]);
    }
    MatchInfo memory datas = MatchInfo(
      tokenToSell,
      tokenToBuy,
      indexOrder,
      order.amountToSellRest,
      order.amountToBuyRest,
      pair1,
      pair2,
      amounts,
      paths
    );
    // Need to pass some data to trigger uniswapV2Call
    bytes memory data = abi.encode(datas);

    (uint256 firstAmount, uint256 secondAmount) = paths[0] < paths[1]
      ? (uint256(0), amounts[1])
      : (amounts[1], uint256(0));

    IUniswapV2Pair(pair1).swap(firstAmount, secondAmount, address(this), data);
  }

  function uniswapV2Call(address, uint256, uint256, bytes memory data) public {
    MatchInfo memory result = abi.decode(data, (MatchInfo));

    if (result.pair2 != address(0) && result.pair1 == msg.sender) {
      (uint256 firstAmount, uint256 secondAmount) = result.paths[1] < result.paths[2]
        ? (uint256(0), result.amounts[2])
        : (result.amounts[2], uint256(0));
      IERC20(result.paths[1]).transfer(result.pair2, result.amounts[1]);
      IUniswapV2Pair(result.pair2).swap(firstAmount, secondAmount, address(this), data);
    } else {
      uint256 amountDeposit = result.amounts[result.amounts.length - 1];
      uint256 amountOut = result.amounts[0];
      address lastPath = result.paths[result.paths.length - 1];
      address firstPath = result.paths[0];

      uint256 price = reward;
      if (lastPath == weth) {
        IWETH(lastPath).withdraw(amountDeposit);
        price += amountDeposit;
      } else {
        IERC20(result.tokenToBuy).approve(matchh, type(uint256).max);
      }
      uint256 indexOrderB = IMatch(matchh).countOrders(address(result.tokenToBuy), address(result.tokenToSell));
      MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](4);
      actions[0] = IMatch(matchh).getActionDeposit(result.tokenToBuy, amountDeposit);
      actions[1] = IMatch(matchh).getActionAddOrder(
        address(result.tokenToBuy),
        address(result.tokenToSell),
        reward,
        uint128(result.amountToBuy),
        uint128(result.amountToSell)
      );
      actions[2] = IMatch(matchh).getActionMatch(
        address(result.tokenToSell),
        address(result.tokenToBuy),
        result.indexOrder,
        indexOrderB
      );
      actions[3] = IMatch(matchh).getActionWithdraw(address(result.tokenToSell), amountOut);

      IMatch(matchh).execute{value: price}(actions);

      if (firstPath == weth) {
        IWETH(firstPath).deposit{value: amountOut}();
      }
      // reimbourse first pair
      IERC20(firstPath).transfer(result.pair1, amountOut);
    }

    require(approvedUser[tx.origin], "NA");
  }

  function withdrawFromMatch(address _token) external onlyOwner {
    uint256 amt = IMatch(matchh).usersBalances(address(this), _token);
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = IMatch(matchh).getActionWithdrawTo(_token, msg.sender, amt);
    IMatch(matchh).execute(actions);
  }

  function withdrawFromMatchAmount(address _token, uint256 _amt) external onlyOwner {
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = IMatch(matchh).getActionWithdrawTo(_token, msg.sender, _amt);
    IMatch(matchh).execute(actions);
  }

  function withdraw(address _token) external onlyOwner {
    uint256 amt = IERC20(_token).balanceOf(address(this));
    IERC20(_token).transfer(owner(), amt);
  }

  function withdrawEth() public onlyOwner {
    (bool sent, ) = payable(owner()).call{value: address(this).balance}("");
    require(sent, "Failed to send Ether");
  }
}
