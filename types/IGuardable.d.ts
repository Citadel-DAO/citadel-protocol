/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IGuardableInterface extends ethers.utils.Interface {
  functions: {
    "guardian()": FunctionFragment;
    "pullGuardian()": FunctionFragment;
    "pushGuardian(address)": FunctionFragment;
    "renounceGuardian()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "guardian", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pullGuardian",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pushGuardian",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceGuardian",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "guardian", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pullGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pushGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceGuardian",
    data: BytesLike
  ): Result;

  events: {};
}

export class IGuardable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IGuardableInterface;

  functions: {
    guardian(overrides?: CallOverrides): Promise<[string]>;

    pullGuardian(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pushGuardian(
      newGuardian_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceGuardian(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  guardian(overrides?: CallOverrides): Promise<string>;

  pullGuardian(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pushGuardian(
    newGuardian_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceGuardian(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    guardian(overrides?: CallOverrides): Promise<string>;

    pullGuardian(overrides?: CallOverrides): Promise<void>;

    pushGuardian(
      newGuardian_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceGuardian(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    guardian(overrides?: CallOverrides): Promise<BigNumber>;

    pullGuardian(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pushGuardian(
      newGuardian_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceGuardian(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    guardian(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pullGuardian(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pushGuardian(
      newGuardian_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceGuardian(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
