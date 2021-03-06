/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  SCTDLInterface,
  SCTDLInterfaceInterface,
} from "../SCTDLInterface";

const _abi = [
  {
    constant: true,
    inputs: [],
    name: "circulatingSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export class SCTDLInterface__factory {
  static readonly abi = _abi;
  static createInterface(): SCTDLInterfaceInterface {
    return new utils.Interface(_abi) as SCTDLInterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SCTDLInterface {
    return new Contract(address, _abi, signerOrProvider) as SCTDLInterface;
  }
}
