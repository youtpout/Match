//SPDX-License-Identifier: BUSL 1.1
pragma solidity ^0.8.17;

library MatchLibrary {
  address constant native = address(1);

  enum ActionType {
    None,
    Deposit,
    AddOrder,
    Match,
    Withdraw,
    WithdrawTo,
    Cancel
  }

  enum OrderStatus {
    None,
    Active,
    Canceled,
    Sold
  }

  struct Order {
    OrderStatus status;
    address trader;
    uint88 reward;
    uint128 amountToSell;
    uint128 amountToBuy;
    uint128 amountToSellRest;
    uint128 amountToBuyRest;
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
