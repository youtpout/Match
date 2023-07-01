/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace MatchLibrary {
  export type OrderStruct = {
    status: PromiseOrValue<BigNumberish>;
    trader: PromiseOrValue<string>;
    reward: PromiseOrValue<BigNumberish>;
    amountToSell: PromiseOrValue<BigNumberish>;
    amountToBuy: PromiseOrValue<BigNumberish>;
    amountToSellRest: PromiseOrValue<BigNumberish>;
    amountToBuyRest: PromiseOrValue<BigNumberish>;
  };

  export type OrderStructOutput = [
    number,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    status: number;
    trader: string;
    reward: BigNumber;
    amountToSell: BigNumber;
    amountToBuy: BigNumber;
    amountToSellRest: BigNumber;
    amountToBuyRest: BigNumber;
  };

  export type ActionStruct = {
    actionType: PromiseOrValue<BigNumberish>;
    data: PromiseOrValue<BytesLike>;
  };

  export type ActionStructOutput = [number, string] & {
    actionType: number;
    data: string;
  };
}

export interface MatchInterface extends utils.Interface {
  functions: {
    "PRICE_DECIMALS()": FunctionFragment;
    "PRICE_PRECISION()": FunctionFragment;
    "bank()": FunctionFragment;
    "changeBank(address)": FunctionFragment;
    "countOrders(address,address)": FunctionFragment;
    "execute((uint8,bytes)[])": FunctionFragment;
    "fetchPageOrders(address,address,uint256,uint256)": FunctionFragment;
    "getActionAddOrder(address,address,uint88,uint128,uint128)": FunctionFragment;
    "getActionCancel(address,address,uint256)": FunctionFragment;
    "getActionDeposit(address,uint256)": FunctionFragment;
    "getActionMatch(address,address,uint256,uint256)": FunctionFragment;
    "getActionWithdraw(address,uint256)": FunctionFragment;
    "getActionWithdrawTo(address,address,uint256)": FunctionFragment;
    "getOrder(address,address,uint256)": FunctionFragment;
    "minReward()": FunctionFragment;
    "orders(address,address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "usersBalances(address,address)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "PRICE_DECIMALS"
      | "PRICE_PRECISION"
      | "bank"
      | "changeBank"
      | "countOrders"
      | "execute"
      | "fetchPageOrders"
      | "getActionAddOrder"
      | "getActionCancel"
      | "getActionDeposit"
      | "getActionMatch"
      | "getActionWithdraw"
      | "getActionWithdrawTo"
      | "getOrder"
      | "minReward"
      | "orders"
      | "owner"
      | "transferOwnership"
      | "usersBalances"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "PRICE_DECIMALS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PRICE_PRECISION",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "bank", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "changeBank",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "countOrders",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [MatchLibrary.ActionStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "fetchPageOrders",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getActionAddOrder",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getActionCancel",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getActionDeposit",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getActionMatch",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getActionWithdraw",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getActionWithdrawTo",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getOrder",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "minReward", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "orders",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "usersBalances",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "PRICE_DECIMALS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PRICE_PRECISION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bank", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "changeBank", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "countOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fetchPageOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActionAddOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActionCancel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActionDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActionMatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActionWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActionWithdrawTo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOrder", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "minReward", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "orders", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "usersBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "AddOrder(address,address,address,uint256,tuple)": EventFragment;
    "CancelOrder(address,address,address,uint256,tuple)": EventFragment;
    "Deposit(address,address,uint256,uint256)": EventFragment;
    "MatchOrder(address,address,address,address,uint256,uint256,tuple,tuple)": EventFragment;
    "Withdraw(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddOrder"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CancelOrder"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MatchOrder"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface AddOrderEventObject {
  user: string;
  tokenToSell: string;
  tokenToBuy: string;
  indexOrder: BigNumber;
  order: MatchLibrary.OrderStructOutput;
}
export type AddOrderEvent = TypedEvent<
  [string, string, string, BigNumber, MatchLibrary.OrderStructOutput],
  AddOrderEventObject
>;

export type AddOrderEventFilter = TypedEventFilter<AddOrderEvent>;

export interface CancelOrderEventObject {
  user: string;
  tokenToSell: string;
  tokenToBuy: string;
  indexOrder: BigNumber;
  order: MatchLibrary.OrderStructOutput;
}
export type CancelOrderEvent = TypedEvent<
  [string, string, string, BigNumber, MatchLibrary.OrderStructOutput],
  CancelOrderEventObject
>;

export type CancelOrderEventFilter = TypedEventFilter<CancelOrderEvent>;

export interface DepositEventObject {
  user: string;
  token: string;
  desiredAmount: BigNumber;
  depositedAmount: BigNumber;
}
export type DepositEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface MatchOrderEventObject {
  userA: string;
  tokenToSell: string;
  tokenToBuy: string;
  userB: string;
  indexOrderA: BigNumber;
  indexOrderB: BigNumber;
  orderA: MatchLibrary.OrderStructOutput;
  orderB: MatchLibrary.OrderStructOutput;
}
export type MatchOrderEvent = TypedEvent<
  [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    MatchLibrary.OrderStructOutput,
    MatchLibrary.OrderStructOutput
  ],
  MatchOrderEventObject
>;

export type MatchOrderEventFilter = TypedEventFilter<MatchOrderEvent>;

export interface WithdrawEventObject {
  user: string;
  to: string;
  amount: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface Match extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MatchInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    PRICE_DECIMALS(overrides?: CallOverrides): Promise<[BigNumber]>;

    PRICE_PRECISION(overrides?: CallOverrides): Promise<[BigNumber]>;

    bank(overrides?: CallOverrides): Promise<[string]>;

    changeBank(
      newBank: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    countOrders(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    execute(
      actions: MatchLibrary.ActionStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fetchPageOrders(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      cursor: PromiseOrValue<BigNumberish>,
      howMany: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [MatchLibrary.OrderStructOutput[], BigNumber] & {
        values: MatchLibrary.OrderStructOutput[];
        newCursor: BigNumber;
      }
    >;

    getActionAddOrder(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      reward: PromiseOrValue<BigNumberish>,
      amountToSell: PromiseOrValue<BigNumberish>,
      amountToBuy: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [MatchLibrary.ActionStructOutput] & {
        action: MatchLibrary.ActionStructOutput;
      }
    >;

    getActionCancel(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      indexOrder: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [MatchLibrary.ActionStructOutput] & {
        action: MatchLibrary.ActionStructOutput;
      }
    >;

    getActionDeposit(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [MatchLibrary.ActionStructOutput] & {
        action: MatchLibrary.ActionStructOutput;
      }
    >;

    getActionMatch(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      indexOrderA: PromiseOrValue<BigNumberish>,
      indexOrderB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [MatchLibrary.ActionStructOutput] & {
        action: MatchLibrary.ActionStructOutput;
      }
    >;

    getActionWithdraw(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [MatchLibrary.ActionStructOutput] & {
        action: MatchLibrary.ActionStructOutput;
      }
    >;

    getActionWithdrawTo(
      token: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [MatchLibrary.ActionStructOutput] & {
        action: MatchLibrary.ActionStructOutput;
      }
    >;

    getOrder(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[MatchLibrary.OrderStructOutput]>;

    minReward(overrides?: CallOverrides): Promise<[BigNumber]>;

    orders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        status: number;
        trader: string;
        reward: BigNumber;
        amountToSell: BigNumber;
        amountToBuy: BigNumber;
        amountToSellRest: BigNumber;
        amountToBuyRest: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    usersBalances(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  PRICE_DECIMALS(overrides?: CallOverrides): Promise<BigNumber>;

  PRICE_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

  bank(overrides?: CallOverrides): Promise<string>;

  changeBank(
    newBank: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  countOrders(
    tokenToSell: PromiseOrValue<string>,
    tokenToBuy: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  execute(
    actions: MatchLibrary.ActionStruct[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fetchPageOrders(
    tokenToSell: PromiseOrValue<string>,
    tokenToBuy: PromiseOrValue<string>,
    cursor: PromiseOrValue<BigNumberish>,
    howMany: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [MatchLibrary.OrderStructOutput[], BigNumber] & {
      values: MatchLibrary.OrderStructOutput[];
      newCursor: BigNumber;
    }
  >;

  getActionAddOrder(
    tokenToSell: PromiseOrValue<string>,
    tokenToBuy: PromiseOrValue<string>,
    reward: PromiseOrValue<BigNumberish>,
    amountToSell: PromiseOrValue<BigNumberish>,
    amountToBuy: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MatchLibrary.ActionStructOutput>;

  getActionCancel(
    tokenToSell: PromiseOrValue<string>,
    tokenToBuy: PromiseOrValue<string>,
    indexOrder: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MatchLibrary.ActionStructOutput>;

  getActionDeposit(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MatchLibrary.ActionStructOutput>;

  getActionMatch(
    tokenToSell: PromiseOrValue<string>,
    tokenToBuy: PromiseOrValue<string>,
    indexOrderA: PromiseOrValue<BigNumberish>,
    indexOrderB: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MatchLibrary.ActionStructOutput>;

  getActionWithdraw(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MatchLibrary.ActionStructOutput>;

  getActionWithdrawTo(
    token: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MatchLibrary.ActionStructOutput>;

  getOrder(
    tokenToSell: PromiseOrValue<string>,
    tokenToBuy: PromiseOrValue<string>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MatchLibrary.OrderStructOutput>;

  minReward(overrides?: CallOverrides): Promise<BigNumber>;

  orders(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      status: number;
      trader: string;
      reward: BigNumber;
      amountToSell: BigNumber;
      amountToBuy: BigNumber;
      amountToSellRest: BigNumber;
      amountToBuyRest: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  usersBalances(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    PRICE_DECIMALS(overrides?: CallOverrides): Promise<BigNumber>;

    PRICE_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    bank(overrides?: CallOverrides): Promise<string>;

    changeBank(
      newBank: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    countOrders(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    execute(
      actions: MatchLibrary.ActionStruct[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; reward: BigNumber }
    >;

    fetchPageOrders(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      cursor: PromiseOrValue<BigNumberish>,
      howMany: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [MatchLibrary.OrderStructOutput[], BigNumber] & {
        values: MatchLibrary.OrderStructOutput[];
        newCursor: BigNumber;
      }
    >;

    getActionAddOrder(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      reward: PromiseOrValue<BigNumberish>,
      amountToSell: PromiseOrValue<BigNumberish>,
      amountToBuy: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MatchLibrary.ActionStructOutput>;

    getActionCancel(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      indexOrder: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MatchLibrary.ActionStructOutput>;

    getActionDeposit(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MatchLibrary.ActionStructOutput>;

    getActionMatch(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      indexOrderA: PromiseOrValue<BigNumberish>,
      indexOrderB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MatchLibrary.ActionStructOutput>;

    getActionWithdraw(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MatchLibrary.ActionStructOutput>;

    getActionWithdrawTo(
      token: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MatchLibrary.ActionStructOutput>;

    getOrder(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MatchLibrary.OrderStructOutput>;

    minReward(overrides?: CallOverrides): Promise<BigNumber>;

    orders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        status: number;
        trader: string;
        reward: BigNumber;
        amountToSell: BigNumber;
        amountToBuy: BigNumber;
        amountToSellRest: BigNumber;
        amountToBuyRest: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    usersBalances(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "AddOrder(address,address,address,uint256,tuple)"(
      user?: PromiseOrValue<string> | null,
      tokenToSell?: PromiseOrValue<string> | null,
      tokenToBuy?: PromiseOrValue<string> | null,
      indexOrder?: null,
      order?: null
    ): AddOrderEventFilter;
    AddOrder(
      user?: PromiseOrValue<string> | null,
      tokenToSell?: PromiseOrValue<string> | null,
      tokenToBuy?: PromiseOrValue<string> | null,
      indexOrder?: null,
      order?: null
    ): AddOrderEventFilter;

    "CancelOrder(address,address,address,uint256,tuple)"(
      user?: PromiseOrValue<string> | null,
      tokenToSell?: PromiseOrValue<string> | null,
      tokenToBuy?: PromiseOrValue<string> | null,
      indexOrder?: null,
      order?: null
    ): CancelOrderEventFilter;
    CancelOrder(
      user?: PromiseOrValue<string> | null,
      tokenToSell?: PromiseOrValue<string> | null,
      tokenToBuy?: PromiseOrValue<string> | null,
      indexOrder?: null,
      order?: null
    ): CancelOrderEventFilter;

    "Deposit(address,address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      desiredAmount?: null,
      depositedAmount?: null
    ): DepositEventFilter;
    Deposit(
      user?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      desiredAmount?: null,
      depositedAmount?: null
    ): DepositEventFilter;

    "MatchOrder(address,address,address,address,uint256,uint256,tuple,tuple)"(
      userA?: PromiseOrValue<string> | null,
      tokenToSell?: PromiseOrValue<string> | null,
      tokenToBuy?: PromiseOrValue<string> | null,
      userB?: null,
      indexOrderA?: null,
      indexOrderB?: null,
      orderA?: null,
      orderB?: null
    ): MatchOrderEventFilter;
    MatchOrder(
      userA?: PromiseOrValue<string> | null,
      tokenToSell?: PromiseOrValue<string> | null,
      tokenToBuy?: PromiseOrValue<string> | null,
      userB?: null,
      indexOrderA?: null,
      indexOrderB?: null,
      orderA?: null,
      orderB?: null
    ): MatchOrderEventFilter;

    "Withdraw(address,address,uint256)"(
      user?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
    Withdraw(
      user?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    PRICE_DECIMALS(overrides?: CallOverrides): Promise<BigNumber>;

    PRICE_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    bank(overrides?: CallOverrides): Promise<BigNumber>;

    changeBank(
      newBank: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    countOrders(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    execute(
      actions: MatchLibrary.ActionStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fetchPageOrders(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      cursor: PromiseOrValue<BigNumberish>,
      howMany: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getActionAddOrder(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      reward: PromiseOrValue<BigNumberish>,
      amountToSell: PromiseOrValue<BigNumberish>,
      amountToBuy: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getActionCancel(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      indexOrder: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getActionDeposit(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getActionMatch(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      indexOrderA: PromiseOrValue<BigNumberish>,
      indexOrderB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getActionWithdraw(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getActionWithdrawTo(
      token: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOrder(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minReward(overrides?: CallOverrides): Promise<BigNumber>;

    orders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    usersBalances(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    PRICE_DECIMALS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PRICE_PRECISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bank(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    changeBank(
      newBank: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    countOrders(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    execute(
      actions: MatchLibrary.ActionStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fetchPageOrders(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      cursor: PromiseOrValue<BigNumberish>,
      howMany: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActionAddOrder(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      reward: PromiseOrValue<BigNumberish>,
      amountToSell: PromiseOrValue<BigNumberish>,
      amountToBuy: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActionCancel(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      indexOrder: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActionDeposit(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActionMatch(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      indexOrderA: PromiseOrValue<BigNumberish>,
      indexOrderB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActionWithdraw(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActionWithdrawTo(
      token: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOrder(
      tokenToSell: PromiseOrValue<string>,
      tokenToBuy: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minReward(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    orders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    usersBalances(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
