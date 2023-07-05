//SPDX-License-Identifier: BSL 1.1
pragma solidity ^0.8.17;

import "../libraries/MatchLibrary.sol";

interface IMatch {
  function minReward() external returns (uint88);

  function usersBalances(address user, address token) external returns (uint256);

  function execute(MatchLibrary.Action[] calldata actions) external payable returns (uint256 amount, uint256 reward);

  function fetchPageOrders(
    address tokenToSell,
    address tokenToBuy,
    uint256 cursor,
    uint256 howMany
  ) external view returns (MatchLibrary.Order[] memory values, uint256 newCursor);

  function getOrder(
    address tokenToSell,
    address tokenToBuy,
    uint256 index
  ) external view returns (MatchLibrary.Order memory);

  function countOrders(address tokenToSell, address tokenToBuy) external view returns (uint256);

  function getActionDeposit(address token, uint256 amount) external pure returns (MatchLibrary.Action memory action);

  function getActionAddOrder(
    address tokenToSell,
    address tokenToBuy,
    uint88 reward,
    uint112 amountToSell,
    uint112 amountToBuy
  ) external pure returns (MatchLibrary.Action memory action);

  function getActionMatch(
    address tokenToSell,
    address tokenToBuy,
    uint256 indexOrderA,
    uint256 indexOrderB
  ) external pure returns (MatchLibrary.Action memory action);

  function getActionWithdraw(address token, uint256 amount) external pure returns (MatchLibrary.Action memory action);

  function getActionWithdrawTo(
    address token,
    address to,
    uint256 amount
  ) external pure returns (MatchLibrary.Action memory action);

  function getActionCancel(
    address tokenToSell,
    address tokenToBuy,
    uint256 indexOrder
  ) external pure returns (MatchLibrary.Action memory action);
}
