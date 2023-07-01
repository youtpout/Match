const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        Match: {
          address: "0xE2b5bDE7e80f89975f7229d78aD9259b2723d11F",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_bank",
                  type: "address",
                },
                {
                  internalType: "uint88",
                  name: "_minReward",
                  type: "uint88",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "AddressZero",
              type: "error",
            },
            {
              inputs: [],
              name: "ETHTransferFailed",
              type: "error",
            },
            {
              inputs: [],
              name: "InsufficientAmount",
              type: "error",
            },
            {
              inputs: [],
              name: "Locked",
              type: "error",
            },
            {
              inputs: [],
              name: "NoAction",
              type: "error",
            },
            {
              inputs: [],
              name: "NoAmount",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "NotTheOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "OrderAIncorrectlyFulfilled",
              type: "error",
            },
            {
              inputs: [],
              name: "OrderBIncorrectlyFulfilled",
              type: "error",
            },
            {
              inputs: [],
              name: "OrderInactive",
              type: "error",
            },
            {
              inputs: [],
              name: "OverflowPrice",
              type: "error",
            },
            {
              inputs: [],
              name: "PriceTooHigh",
              type: "error",
            },
            {
              inputs: [],
              name: "RewardTooLow",
              type: "error",
            },
            {
              inputs: [],
              name: "SameUser",
              type: "error",
            },
            {
              inputs: [],
              name: "TraderANotEnoughToken",
              type: "error",
            },
            {
              inputs: [],
              name: "TraderBNotEnoughToken",
              type: "error",
            },
            {
              inputs: [],
              name: "TransferFailed",
              type: "error",
            },
            {
              inputs: [],
              name: "TransferFromFailed",
              type: "error",
            },
            {
              inputs: [],
              name: "UnknownAction",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "indexOrder",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.OrderStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "trader",
                      type: "address",
                    },
                    {
                      internalType: "uint88",
                      name: "reward",
                      type: "uint88",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSell",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuy",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSellRest",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuyRest",
                      type: "uint128",
                    },
                  ],
                  indexed: false,
                  internalType: "struct MatchLibrary.Order",
                  name: "order",
                  type: "tuple",
                },
              ],
              name: "AddOrder",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "indexOrder",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.OrderStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "trader",
                      type: "address",
                    },
                    {
                      internalType: "uint88",
                      name: "reward",
                      type: "uint88",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSell",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuy",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSellRest",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuyRest",
                      type: "uint128",
                    },
                  ],
                  indexed: false,
                  internalType: "struct MatchLibrary.Order",
                  name: "order",
                  type: "tuple",
                },
              ],
              name: "CancelOrder",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "desiredAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "depositedAmount",
                  type: "uint256",
                },
              ],
              name: "Deposit",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "userA",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "userB",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "indexOrderA",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "indexOrderB",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.OrderStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "trader",
                      type: "address",
                    },
                    {
                      internalType: "uint88",
                      name: "reward",
                      type: "uint88",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSell",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuy",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSellRest",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuyRest",
                      type: "uint128",
                    },
                  ],
                  indexed: false,
                  internalType: "struct MatchLibrary.Order",
                  name: "orderA",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.OrderStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "trader",
                      type: "address",
                    },
                    {
                      internalType: "uint88",
                      name: "reward",
                      type: "uint88",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSell",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuy",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSellRest",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuyRest",
                      type: "uint128",
                    },
                  ],
                  indexed: false,
                  internalType: "struct MatchLibrary.Order",
                  name: "orderB",
                  type: "tuple",
                },
              ],
              name: "MatchOrder",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "Withdraw",
              type: "event",
            },
            {
              inputs: [],
              name: "PRICE_DECIMALS",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "PRICE_PRECISION",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bank",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newBank",
                  type: "address",
                },
              ],
              name: "changeBank",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
              ],
              name: "countOrders",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.ActionType",
                      name: "actionType",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MatchLibrary.Action[]",
                  name: "actions",
                  type: "tuple[]",
                },
              ],
              name: "execute",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reward",
                  type: "uint256",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "cursor",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "howMany",
                  type: "uint256",
                },
              ],
              name: "fetchPageOrders",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.OrderStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "trader",
                      type: "address",
                    },
                    {
                      internalType: "uint88",
                      name: "reward",
                      type: "uint88",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSell",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuy",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSellRest",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuyRest",
                      type: "uint128",
                    },
                  ],
                  internalType: "struct MatchLibrary.Order[]",
                  name: "values",
                  type: "tuple[]",
                },
                {
                  internalType: "uint256",
                  name: "newCursor",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
                {
                  internalType: "uint88",
                  name: "reward",
                  type: "uint88",
                },
                {
                  internalType: "uint128",
                  name: "amountToSell",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "amountToBuy",
                  type: "uint128",
                },
              ],
              name: "getActionAddOrder",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.ActionType",
                      name: "actionType",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MatchLibrary.Action",
                  name: "action",
                  type: "tuple",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "indexOrder",
                  type: "uint256",
                },
              ],
              name: "getActionCancel",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.ActionType",
                      name: "actionType",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MatchLibrary.Action",
                  name: "action",
                  type: "tuple",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "getActionDeposit",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.ActionType",
                      name: "actionType",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MatchLibrary.Action",
                  name: "action",
                  type: "tuple",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "indexOrderA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "indexOrderB",
                  type: "uint256",
                },
              ],
              name: "getActionMatch",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.ActionType",
                      name: "actionType",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MatchLibrary.Action",
                  name: "action",
                  type: "tuple",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "getActionWithdraw",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.ActionType",
                      name: "actionType",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MatchLibrary.Action",
                  name: "action",
                  type: "tuple",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "getActionWithdrawTo",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.ActionType",
                      name: "actionType",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MatchLibrary.Action",
                  name: "action",
                  type: "tuple",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenToSell",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenToBuy",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "getOrder",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum MatchLibrary.OrderStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "trader",
                      type: "address",
                    },
                    {
                      internalType: "uint88",
                      name: "reward",
                      type: "uint88",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSell",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuy",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToSellRest",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountToBuyRest",
                      type: "uint128",
                    },
                  ],
                  internalType: "struct MatchLibrary.Order",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "minReward",
              outputs: [
                {
                  internalType: "uint88",
                  name: "",
                  type: "uint88",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "orders",
              outputs: [
                {
                  internalType: "enum MatchLibrary.OrderStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "trader",
                  type: "address",
                },
                {
                  internalType: "uint88",
                  name: "reward",
                  type: "uint88",
                },
                {
                  internalType: "uint128",
                  name: "amountToSell",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "amountToBuy",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "amountToSellRest",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "amountToBuyRest",
                  type: "uint128",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "usersBalances",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
