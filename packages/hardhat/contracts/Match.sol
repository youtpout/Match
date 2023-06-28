//SPDX-License-Identifier: BUSL 1.1
pragma solidity ^0.8.17;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./libraries/MatchLibrary.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/IERC20.sol";

contract Match {
  // State Variables
  address public owner;
  address public bank;

  uint88 public minReward;

  /// @dev first address is the user, second address is the token, uint256 is the user balance
  mapping(address => mapping(address => uint256)) usersBalances;
  /// @dev first address is the token to sell, second address is the token to buy, order is the order information for thes tokens
  mapping(address => mapping(address => MatchLibrary.Order[])) orders;

  event Deposit(address indexed user, address indexed token, uint256 desiredAmount, uint256 depositedAmount);
  event AddOrder(
    address indexed user,
    address indexed tokenToSell,
    address indexed tokenToBuy,
    MatchLibrary.Order order
  );

  error NotTheOwner();
  error NoAction();
  error UnknownAction();
  error AddressZero();
  error NoAmount();
  error RewardTooLow();

  // Constructor: Called once on contract deployment
  // Check packages/hardhat/deploy/00_deploy_your_contract.ts
  constructor(address _owner, address _bank, uint88 _minReward) {
    owner = _owner;
    bank = _bank;
    minReward = _minReward;
  }

  // Modifier: used to define a set of rules that must be met before or after a function is executed
  // Check the withdraw() function
  modifier isOwner() {
    // msg.sender: predefined variable that represents address of the account that called the current function
    if (msg.sender != owner) {
      revert NotTheOwner();
    }
    _;
  }

  function changeBank(address newBank) external isOwner {
    require(newBank != address(0));
    bank = newBank;
  }

  function transferOwnership(address newOwner) external isOwner {
    require(newOwner != address(0));
    owner = newOwner;
  }

  function withdraw() external isOwner {
    uint256 amount = usersBalances[MatchLibrary.native][bank];
    usersBalances[MatchLibrary.native][bank] -= amount;
    TransferHelper.safeTransferETH(bank, amount);
  }

  function execute(MatchLibrary.Action[] calldata actions) external payable {
    if (actions.length == 0) {
      revert NoAction();
    }
    uint256 nativeAmount = msg.value;
    uint256 i;
    do {
      MatchLibrary.Action memory action = actions[i];
      if (action.actionType == MatchLibrary.ActionType.Deposit) {
        nativeAmount -= _deposit(action);
      } else if (action.actionType == MatchLibrary.ActionType.Sell) {
        nativeAmount -= _addOrder(action);
      } else if (action.actionType == MatchLibrary.ActionType.Match) {} else if (
        action.actionType == MatchLibrary.ActionType.Withdraw
      ) {} else {
        revert UnknownAction();
      }
      i++;
    } while (i < actions.length);

    if (nativeAmount > 0) {
      TransferHelper.safeTransferETH(msg.sender, nativeAmount);
    }
  }

  function _deposit(MatchLibrary.Action memory action) private returns (uint256 removeAmount) {
    (uint256 amount, address token) = abi.decode(action.data, (uint256, address));
    uint256 depositedAmount;
    if (token == MatchLibrary.native) {
      removeAmount = amount;
      usersBalances[token][msg.sender] += amount;
      depositedAmount = amount;
    } else {
      uint256 balanceBefore = IERC20(token).balanceOf(address(this));
      TransferHelper.safeTransferFrom(token, msg.sender, address(this), amount);
      uint256 balance = balanceBefore - IERC20(token).balanceOf(address(this));
      // get the smaller for tax or reflection token
      depositedAmount = balance > amount ? amount : balance;
      usersBalances[token][msg.sender] += depositedAmount;
    }
    emit Deposit(msg.sender, token, amount, depositedAmount);
  }

  function _addOrder(MatchLibrary.Action memory action) private returns (uint256 removeAmount) {
    (address tokenToSell, address tokenToBuy, uint88 reward, uint128 amountToSell, uint128 amountToBuy) = abi.decode(
      action.data,
      (address, address, uint88, uint128, uint128)
    );
    if (tokenToSell == address(0) || tokenToBuy == address(0)) {
      revert AddressZero();
    }
    if (amountToBuy == 0 || amountToSell == 0) {
      revert NoAmount();
    }
    if (reward < minReward) {
      revert RewardTooLow();
    }

    removeAmount = reward;
    // 10% commission
    uint88 rewardToBank = (reward * 10) / 100;
    uint88 rewardToBot = reward - rewardToBank;
    usersBalances[MatchLibrary.native][bank] += rewardToBank;

    MatchLibrary.Order memory order = MatchLibrary.Order(
      MatchLibrary.OrderStatus.Active,
      msg.sender,
      rewardToBot,
      amountToSell,
      amountToBuy,
      amountToSell,
      amountToBuy
    );
    // store the orders
    orders[tokenToSell][tokenToBuy].push(order);

    emit AddOrder(msg.sender, tokenToSell, tokenToBuy, order);
  }

  function _match(MatchLibrary.Action memory action) private {
    (address tokenToSell, address tokenToBuy, uint88 reward, uint128 amountToSell, uint128 amountToBuy) = abi.decode(
      action.data,
      (address, address, uint88, uint128, uint128)
    );
    if (tokenToSell == address(0) || tokenToBuy == address(0)) {
      revert AddressZero();
    }
    if (amountToBuy == 0 || amountToSell == 0) {
      revert NoAmount();
    }
    if (reward < minReward) {
      revert RewardTooLow();
    }
  }
}
