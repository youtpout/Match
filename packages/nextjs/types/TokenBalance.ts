import { BigNumber } from "ethers";

export interface TokenBalance {
  address: string;
  name: string;
  amount: BigNumber;
  amountFormat: string;
}
