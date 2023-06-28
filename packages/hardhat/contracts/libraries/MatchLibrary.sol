//SPDX-License-Identifier: BUSL 1.1
pragma solidity ^0.8.17;

library MatchLibrary {
  address constant native = address(1);

  enum ActionType {
    None,
    Deposit,
    Sell,
    Match,
    Withdraw
  }

  enum OrderStatus {
    None,
    Active,
    Canceled,
    Sold,
    SoldAndCanceled
  }

  struct Order {
    OrderStatus status;
    address trader;
    uint88 reward;
    uint128 amountToSell;
    uint128 amountToBuy;
    uint128 amountToSellCompleted;
    uint128 amountToBuyCompleted;
  }

  struct Action{
    ActionType actionType;
    bytes data;
  }

  struct DepositData{
    address token;
    uint256 amount;
  }
}
