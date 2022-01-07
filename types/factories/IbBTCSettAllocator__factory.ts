/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  IbBTCSettAllocator,
  IbBTCSettAllocatorInterface,
} from "../IbBTCSettAllocator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_wBTC",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPulled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPushed",
    type: "event",
  },
  {
    inputs: [],
    name: "CURVE_IBBTC_DEPOSIT_ZAP",
    outputs: [
      {
        internalType: "contract ICurveZap",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CURVE_IBBTC_METAPOOL",
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
    inputs: [],
    name: "CURVE_POOL",
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
    inputs: [],
    name: "IBBTC_VAULT",
    outputs: [
      {
        internalType: "contract ISett",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAXIMUM_UINT256",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "policy",
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
    inputs: [],
    name: "pullManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner_",
        type: "address",
      },
    ],
    name: "pushManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [
      {
        internalType: "contract ITreasury",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wBTC",
    outputs: [
      {
        internalType: "contract IERC20",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b50604051610e99380380610e998339818101604052604081101561003357600080fd5b508051602090910151600080546001600160a01b03191633178082556040516001600160a01b039190911691907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a36001600160a01b03821661009857600080fd5b6001600160601b0319606083811b821660805282901b1660a0526040805163095ea7b360e01b8152737fc77b5c7614e1533320ea6ddc2eb61fa00a97146004820152600019602482015290516001600160a01b0383169163095ea7b39160448083019260209291908290030181600087803b15801561011657600080fd5b505af115801561012a573d6000803e3d6000fd5b505050506040513d602081101561014057600080fd5b50506040805163095ea7b360e01b815273bba4b444fd10302251d9f5797e763b0d912286a16004820152600019602482015290516001600160a01b0383169163095ea7b39160448083019260209291908290030181600087803b1580156101a657600080fd5b505af11580156101ba573d6000803e3d6000fd5b505050506040513d60208110156101d057600080fd5b5050505060805160601c60a05160601c610c886102116000398061049b528061080a52806109125250806104d052806107c852806108e35250610c886000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c806361d027b31161008c5780639b452931116100665780639b4529311461018f5780639b5a407614610197578063b6b55f251461019f578063c90f06d5146101bc576100df565b806361d027b3146101655780638366839e1461016d57806386a8b4b514610187576100df565b806346f68ee9116100bd57806346f68ee91461012f578063547102d5146101555780635a96ac0a1461015d576100df565b80630505c8c9146100e4578063089208d8146101085780632e1a7d4d14610112575b600080fd5b6100ec6101c4565b604080516001600160a01b039092168252519081900360200190f35b6101106101d3565b005b6101106004803603602081101561012857600080fd5b5035610289565b6101106004803603602081101561014557600080fd5b50356001600160a01b03166105eb565b6100ec6106f7565b61011061070f565b6100ec6107c6565b6101756107ea565b60408051918252519081900360200190f35b6100ec6107f0565b6100ec610808565b6100ec61082c565b610110600480360360208110156101b557600080fd5b5035610844565b6100ec610b1e565b6000546001600160a01b031690565b6000546001600160a01b03163314610232576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a36000805473ffffffffffffffffffffffffffffffffffffffff19169055565b6000546001600160a01b031633146102e8576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b604080516370a0823160e01b8152306004820152905160009173ae96ff08771a109dc6650a1bdca62f2d558e40af916370a0823191602480820192602092909190829003018186803b15801561033d57600080fd5b505afa158015610351573d6000803e3d6000fd5b505050506040513d602081101561036757600080fd5b505160408051632e1a7d4d60e01b815260048101859052905191925073ae96ff08771a109dc6650a1bdca62f2d558e40af91632e1a7d4d9160248082019260009290919082900301818387803b1580156103c057600080fd5b505af11580156103d4573d6000803e3d6000fd5b5050604080516314f6943160e11b815273fbdca68601f835b27790d98bbb8ec7f05fdeaa9b60048201526024810185905260026044820152600060648201819052915191935073bba4b444fd10302251d9f5797e763b0d912286a192506329ed286291608480830192602092919082900301818787803b15801561045757600080fd5b505af115801561046b573d6000803e3d6000fd5b505050506040513d602081101561048157600080fd5b50516040805163f182178360e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081811660048401526024830185905292519394507f0000000000000000000000000000000000000000000000000000000000000000169263bc157ac19285929091859163f1821783916044808301926020929190829003018186803b15801561052257600080fd5b505afa158015610536573d6000803e3d6000fd5b505050506040513d602081101561054c57600080fd5b5051604080517fffffffff0000000000000000000000000000000000000000000000000000000060e087901b16815260048101949094526001600160a01b03909216602484015260448301525160648083019260209291908290030181600087803b1580156105ba57600080fd5b505af11580156105ce573d6000803e3d6000fd5b505050506040513d60208110156105e457600080fd5b5050505050565b6000546001600160a01b0316331461064a576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03811661068f5760405162461bcd60e51b8152600401808060200182810382526026815260200180610c346026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba91a36001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b73ae96ff08771a109dc6650a1bdca62f2d558e40af81565b6001546001600160a01b031633146107585760405162461bcd60e51b8152600401808060200182810382526022815260200180610c5a6022913960400191505060405180910390fd5b600154600080546040516001600160a01b0393841693909116917faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d91a36001546000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03909216919091179055565b7f000000000000000000000000000000000000000000000000000000000000000081565b60001981565b737fc77b5c7614e1533320ea6ddc2eb61fa00a971481565b7f000000000000000000000000000000000000000000000000000000000000000081565b73bba4b444fd10302251d9f5797e763b0d912286a181565b6000546001600160a01b031633146108a3576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6108e16040518060400160405280601a81526020017f63616c6c696e67206d616e616765206f6e207472656173757279000000000000815250610b36565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630b0eee307f0000000000000000000000000000000000000000000000000000000000000000836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050600060405180830381600087803b15801561097857600080fd5b505af115801561098c573d6000803e3d6000fd5b50505050610998610c15565b60408082018390525163384e03db60e01b815273fbdca68601f835b27790d98bbb8ec7f05fdeaa9b6004820181815260009273bba4b444fd10302251d9f5797e763b0d912286a19263384e03db92909186918691602401836080808383875b83811015610a0f5781810151838201526020016109f7565b505050509050018281526020019350505050602060405180830381600087803b158015610a3b57600080fd5b505af1158015610a4f573d6000803e3d6000fd5b505050506040513d6020811015610a6557600080fd5b505160408051808201909152600781527f73756363657373000000000000000000000000000000000000000000000000006020820152909150610aa790610b36565b73ae96ff08771a109dc6650a1bdca62f2d558e40af6001600160a01b031663b6b55f25826040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b158015610b0157600080fd5b505af1158015610b15573d6000803e3d6000fd5b50505050505050565b73fbdca68601f835b27790d98bbb8ec7f05fdeaa9b81565b610bf1816040516024018080602001828103825283818151815260200191508051906020019080838360005b83811015610b7a578181015183820152602001610b62565b50505050905090810190601f168015610ba75780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1663104c13eb60e21b1790529250610bf4915050565b50565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b6040518060800160405280600490602082028036833750919291505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6ca164736f6c6343000705000a";

export class IbBTCSettAllocator__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _treasury: string,
    _wBTC: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<IbBTCSettAllocator> {
    return super.deploy(
      _treasury,
      _wBTC,
      overrides || {}
    ) as Promise<IbBTCSettAllocator>;
  }
  getDeployTransaction(
    _treasury: string,
    _wBTC: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_treasury, _wBTC, overrides || {});
  }
  attach(address: string): IbBTCSettAllocator {
    return super.attach(address) as IbBTCSettAllocator;
  }
  connect(signer: Signer): IbBTCSettAllocator__factory {
    return super.connect(signer) as IbBTCSettAllocator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IbBTCSettAllocatorInterface {
    return new utils.Interface(_abi) as IbBTCSettAllocatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IbBTCSettAllocator {
    return new Contract(address, _abi, signerOrProvider) as IbBTCSettAllocator;
  }
}