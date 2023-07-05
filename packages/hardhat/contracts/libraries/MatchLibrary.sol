//SPDX-License-Identifier: BSL 1.1
pragma solidity ^0.8.17;

library MatchLibrary {
  address constant NATIVE_TOKEN = address(1);

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

  enum OrderType {
    None,
    LimitOrder,
    StopLoose,
    TakeProfit,
    TraillingComma,
    AllOrNone
  }

  struct Order {
    OrderStatus status;
    address trader;
    uint88 reward;    
    OrderType orderType;
    bool dependantOrder;
    uint16 trailing;
    uint112 amountToSell;
    uint112 amountToBuy;
    uint32 blockTimestamp;
    uint112 amountToSellRest;
    uint112 amountToBuyRest;
  }

  struct DependantOrder {
    address tokenToSell;
    address tokenToBuy;
    uint256 index;
  }

  struct Action {
    ActionType actionType;
    bytes data;
  }

  struct DepositData {
    address token;
    uint256 amount;
  }
}
