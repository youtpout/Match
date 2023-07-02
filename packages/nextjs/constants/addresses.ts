const addresses = [
  {
    contract: "erc20",
    name: "Native",
    decimals: 18,
    addresses: [
      {
        chainId: 1,
        address: "0x0000000000000000000000000000000000000001",
      },
      {
        chainId: 250,
        address: "0x0000000000000000000000000000000000000001",
      },
      {
        chainId: 31337,
        address: "0x0000000000000000000000000000000000000001",
      },
    ],
  },
  {
    contract: "erc20",
    name: "Usdt",
    decimals: 6,
    addresses: [
      {
        chainId: 1,
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      },
      {
        chainId: 250,
        address: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
      },
      {
        chainId: 31337,
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      },
    ],
  },
  {
    contract: "erc20",
    name: "Usdc",
    decimals: 6,
    addresses: [
      {
        chainId: 1,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      },
      {
        chainId: 250,
        address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      },
      {
        chainId: 31337,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      },
    ],
  },
  {
    contract: "erc20",
    name: "btc",
    decimals: 8,
    addresses: [
      {
        chainId: 1,
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      },
      {
        chainId: 250,
        address: "0x321162cd933e2be498cd2267a90534a804051b11",
      },
      {
        chainId: 31337,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      },
    ],
  },
  {
    contract: "router",
    name: "Router",
    addresses: [
      {
        chainId: 1,
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      },
      {
        chainId: 250,
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      },
      {
        chainId: 31337,
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      },
    ],
  },
] as const;

export default addresses;
