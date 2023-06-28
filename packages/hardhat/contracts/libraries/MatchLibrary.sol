//SPDX-License-Identifier: BUSL 1.1
pragma solidity >=0.8.0 <0.9.0;

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
}
