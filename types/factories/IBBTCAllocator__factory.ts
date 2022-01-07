/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  IBBTCAllocator,
  IBBTCAllocatorInterface,
} from "../IBBTCAllocator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lendingPool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_incentives",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_timelockInBlocks",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "_referralCode",
        type: "uint16",
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
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "vaultToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "max",
        type: "uint256",
      },
    ],
    name: "addToken",
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
    ],
    name: "deployLimitFor",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "deployedFor",
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
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositToTreasury",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enableDepositToTreasury",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "exceedsLimit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "harvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_vaultTokens",
        type: "address[]",
      },
    ],
    name: "harvestFor",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "newMax",
        type: "uint256",
      },
    ],
    name: "lowerLimit",
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
    ],
    name: "newLimit",
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
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newMax",
        type: "uint256",
      },
    ],
    name: "queueRaiseLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "raiseLimit",
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
    ],
    name: "raiseLimitTimelockEnd",
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
    name: "referralCode",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
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
    name: "revertDepositToTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "rewardsPending",
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
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "rewardsPendingFor",
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
        internalType: "uint16",
        name: "code",
        type: "uint16",
      },
    ],
    name: "setReferralCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "timelockInBlocks",
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
    name: "totalValueDeployed",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "vaultTokenRegistry",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vaultTokens",
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
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
  "0x61010060405234801561001157600080fd5b50604051612500380380612500833981810160405260a081101561003457600080fd5b50805160208201516040808401516060850151608090950151600080546001600160a01b031916331780825593519596949592949391926001600160a01b0392909216917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a36001600160a01b0385166100b057600080fd5b6001600160601b0319606086901b1660c0526001600160a01b0384166100d557600080fd5b6001600160601b0319606085901b1660a0526001600160a01b0383166100fa57600080fd5b6001600160601b031960609390931b9290921660805260e0526009805461ffff90921661ffff19909216919091179055505060805160601c60a05160601c60c05160601c60e0516123236101dd600039806108eb52806117635250806109125280610c7a5280610e4d5280610fa75280611061528061132e528061150852806115bf5280611679528061196b5280611c0a5280611e865280611f1b5280611fdd525080610d185280610de75280611ca95280611d6a5250806106f452806107ce52806109425280610a4052806112ff528061199b5280611a7f52506123236000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c8063718b2058116100f9578063d710951a11610097578063efe060d311610071578063efe060d314610547578063f3fef3a314610564578063f8ff9a4914610590578063fa43b69c146105bc576101c4565b8063d710951a14610492578063d8b6d25214610502578063e8bb5d3414610521576101c4565b806398c60612116100d357806398c6061214610412578063a1fadad01461043e578063c087cdf414610464578063c901761d1461048a576101c4565b8063718b2058146103c257806388136d5e146103de578063895a0293146103e6576101c4565b806324cf76001161016657806346f68ee91161014057806346f68ee91461033257806347e7ef24146103585780635a96ac0a146103845780636daa98501461038c576101c4565b806324cf7600146102fc5780632f15f45e146103225780634641257d1461032a576101c4565b806312b16726116101a257806312b16726146101ff5780631b0b820a146102375780631c3859f9146102b05780632245e0bb146102d6576101c4565b80630253dad0146101c95780630505c8c9146101d3578063089208d8146101f7575b600080fd5b6101d16105dd565b005b6101db610638565b604080516001600160a01b039092168252519081900360200190f35b6101d1610647565b6102256004803603602081101561021557600080fd5b50356001600160a01b03166106de565b60408051918252519081900360200190f35b6102256004803603604081101561024d57600080fd5b81019060208101813564010000000081111561026857600080fd5b82018360208201111561027a57600080fd5b8035906020019184602083028401116401000000008311171561029c57600080fd5b9193509150356001600160a01b03166106f0565b610225600480360360208110156102c657600080fd5b50356001600160a01b03166107ca565b6101db600480360360208110156102ec57600080fd5b50356001600160a01b03166108bc565b6102256004803603602081101561031257600080fd5b50356001600160a01b03166108d7565b6102256108e9565b6101d161090d565b6101d16004803603602081101561034857600080fd5b50356001600160a01b0316610b2a565b6101d16004803603604081101561036e57600080fd5b506001600160a01b038135169060200135610c17565b6101d16110e0565b6101d1600480360360608110156103a257600080fd5b506001600160a01b0381358116916020810135909116906040013561118a565b6103ca611297565b604080519115158252519081900360200190f35b6101d16112a6565b6101d1600480360360408110156103fc57600080fd5b506001600160a01b038135169060200135611710565b6101d16004803603604081101561042857600080fd5b506001600160a01b0381351690602001356117b2565b6102256004803603602081101561045457600080fd5b50356001600160a01b0316611863565b6101d16004803603602081101561047a57600080fd5b50356001600160a01b0316611875565b610225611960565b6101d1600480360360208110156104a857600080fd5b8101906020810181356401000000008111156104c357600080fd5b8201836020820111156104d557600080fd5b803590602001918460208302840111640100000000831117156104f757600080fd5b509092509050611966565b61050a611b47565b6040805161ffff9092168252519081900360200190f35b6102256004803603602081101561053757600080fd5b50356001600160a01b0316611b51565b6101db6004803603602081101561055d57600080fd5b5035611b63565b6101d16004803603604081101561057a57600080fd5b506001600160a01b038135169060200135611b8d565b6103ca600480360360408110156105a657600080fd5b506001600160a01b038135169060200135612028565b6101d1600480360360208110156105d257600080fd5b503561ffff16612070565b6000546001600160a01b0316331461062a576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b6009805462ff000019169055565b6000546001600160a01b031690565b6000546001600160a01b03163314610694576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a3600080546001600160a01b0319169055565b60076020526000908152604090205481565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316638b599f268585856040518463ffffffff1660e01b81526004018080602001836001600160a01b031681526020018281038252858582818152602001925060200280828437600083820152604051601f909101601f1916909201965060209550909350505081840390508186803b15801561079657600080fd5b505afa1580156107aa573d6000803e3d6000fd5b505050506040513d60208110156107c057600080fd5b5051949350505050565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316638b599f266002846040518363ffffffff1660e01b81526004018080602001836001600160a01b03168152602001828103825284818154815260200191508054801561086b57602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161084d575b5050935050505060206040518083038186803b15801561088a57600080fd5b505afa15801561089e573d6000803e3d6000fd5b505050506040513d60208110156108b457600080fd5b505192915050565b6003602052600090815260409020546001600160a01b031681565b60056020526000908152604090205481565b7f000000000000000000000000000000000000000000000000000000000000000081565b6009547f00000000000000000000000000000000000000000000000000000000000000009062010000900460ff1615610a3e577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636d34b96e600261097a846107ca565b84856040518563ffffffff1660e01b81526004018080602001858152602001846001600160a01b03168152602001836001600160a01b0316815260200182810382528681815481526020019150805480156109fe57602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116109e0575b505095505050505050600060405180830381600087803b158015610a2157600080fd5b505af1158015610a35573d6000803e3d6000fd5b50505050610b27565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316633111e7b36002610a78306107ca565b846040518463ffffffff1660e01b81526004018080602001848152602001836001600160a01b031681526020018281038252858181548152602001915080548015610aec57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610ace575b5050945050505050600060405180830381600087803b158015610b0e57600080fd5b505af1158015610b22573d6000803e3d6000fd5b505050505b50565b6000546001600160a01b03163314610b77576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b6001600160a01b038116610bbc5760405162461bcd60e51b81526004018080602001828103825260268152602001806122896026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba91a3600180546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b03163314610c64576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b610c6e8282612028565b15610c7857600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630b0eee3083836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050600060405180830381600087803b158015610cef57600080fd5b505af1158015610d03573d6000803e3d6000fd5b50505050816001600160a01b031663095ea7b37f0000000000000000000000000000000000000000000000000000000000000000836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015610d7e57600080fd5b505af1158015610d92573d6000803e3d6000fd5b505050506040513d6020811015610da857600080fd5b50506009546040805163e8eda9df60e01b81526001600160a01b0385811660048301526024820185905230604483015261ffff909316606482015290517f00000000000000000000000000000000000000000000000000000000000000009092169163e8eda9df9160848082019260009290919082900301818387803b158015610e3157600080fd5b505af1158015610e45573d6000803e3d6000fd5b5050505060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663f182178384846040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b158015610ec057600080fd5b505afa158015610ed4573d6000803e3d6000fd5b505050506040513d6020811015610eea57600080fd5b50519050610efb83838360016120d5565b60095462010000900460ff16156110db576001600160a01b0380841660009081526003602090815260408083205481516370a0823160e01b8152306004820152915194169384926370a082319260248082019391829003018186803b158015610f6357600080fd5b505afa158015610f77573d6000803e3d6000fd5b505050506040513d6020811015610f8d57600080fd5b50516040805163095ea7b360e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811660048301526024820184905291519293509084169163095ea7b3916044808201926020929091908290030181600087803b15801561100557600080fd5b505af1158015611019573d6000803e3d6000fd5b505050506040513d602081101561102f57600080fd5b50506040805163bc157ac160e01b8152600481018390526001600160a01b0384811660248301526044820186905291517f00000000000000000000000000000000000000000000000000000000000000009092169163bc157ac1916064808201926020929091908290030181600087803b1580156110ac57600080fd5b505af11580156110c0573d6000803e3d6000fd5b505050506040513d60208110156110d657600080fd5b505050505b505050565b6001546001600160a01b031633146111295760405162461bcd60e51b81526004018080602001828103825260228152602001806122af6022913960400191505060405180910390fd5b600154600080546040516001600160a01b0393841693909116917faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d91a3600154600080546001600160a01b0319166001600160a01b03909216919091179055565b6000546001600160a01b031633146111d7576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b6001600160a01b0383166111ea57600080fd5b6001600160a01b0382166111fd57600080fd5b6001600160a01b03838116600090815260036020526040902054161561122257600080fd5b6001600160a01b03928316600090815260036020908152604080832080546001600160a01b031990811696909716958617905560028054600181019091557f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0180549096169094179094556006909352912055565b60095462010000900460ff1681565b6000546001600160a01b031633146112f3576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b306001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166374d945ec7f00000000000000000000000000000000000000000000000000000000000000006040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561138a57600080fd5b505afa15801561139e573d6000803e3d6000fd5b505050506040513d60208110156113b457600080fd5b50516001600160a01b0316146113fb5760405162461bcd60e51b81526004018080602001828103825260268152602001806122d16026913960400191505060405180910390fd5b60095462010000900460ff1615611459576040805162461bcd60e51b815260206004820152600f60248201527f416c726561647920656e61626c65640000000000000000000000000000000000604482015290519081900360640190fd5b61146161090d565b60005b6002548110156116fc5760006002828154811061147d57fe5b6000918252602080832090910154604080516370a0823160e01b815230600482015290516001600160a01b03909216945084926370a0823192602480840193829003018186803b1580156114d057600080fd5b505afa1580156114e4573d6000803e3d6000fd5b505050506040513d60208110156114fa57600080fd5b5051905080156116f25760007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663f182178384846040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b15801561157b57600080fd5b505afa15801561158f573d6000803e3d6000fd5b505050506040513d60208110156115a557600080fd5b50516040805163095ea7b360e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811660048301526024820186905291519293509085169163095ea7b3916044808201926020929091908290030181600087803b15801561161d57600080fd5b505af1158015611631573d6000803e3d6000fd5b505050506040513d602081101561164757600080fd5b50506040805163bc157ac160e01b8152600481018490526001600160a01b0385811660248301526044820184905291517f00000000000000000000000000000000000000000000000000000000000000009092169163bc157ac1916064808201926020929091908290030181600087803b1580156116c457600080fd5b505af11580156116d8573d6000803e3d6000fd5b505050506040513d60208110156116ee57600080fd5b5050505b5050600101611464565b506009805462ff0000191662010000179055565b6000546001600160a01b0316331461175d576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b611787437f00000000000000000000000000000000000000000000000000000000000000006121ca565b6001600160a01b03909216600090815260076020908152604080832094909455600890529190912055565b6000546001600160a01b031633146117ff576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b6001600160a01b038216600090815260066020526040902054811061182357600080fd5b6001600160a01b038216600090815260056020526040902054811161184757600080fd5b6001600160a01b03909116600090815260066020526040902055565b60066020526000908152604090205481565b6000546001600160a01b031633146118c2576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b6001600160a01b03811660009081526007602052604090205443101561192f576040805162461bcd60e51b815260206004820152601460248201527f54696d656c6f636b206e6f742065787069726564000000000000000000000000604482015290519081900360640190fd5b6001600160a01b03166000908152600860209081526040808320805460068452828520558390556007909152812055565b60045481565b6009547f00000000000000000000000000000000000000000000000000000000000000009062010000900460ff1615611a7d577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636d34b96e84846119d3856107ca565b85866040518663ffffffff1660e01b81526004018080602001858152602001846001600160a01b03168152602001836001600160a01b031681526020018281038252878782818152602001925060200280828437600081840152601f19601f8201169050808301925050509650505050505050600060405180830381600087803b158015611a6057600080fd5b505af1158015611a74573d6000803e3d6000fd5b505050506110db565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316633111e7b38484611ab7306107ca565b856040518563ffffffff1660e01b81526004018080602001848152602001836001600160a01b031681526020018281038252868682818152602001925060200280828437600081840152601f19601f82011690508083019250505095505050505050600060405180830381600087803b158015611b3357600080fd5b505af11580156110d6573d6000803e3d6000fd5b60095461ffff1681565b60086020526000908152604090205481565b60028181548110611b7357600080fd5b6000918252602090912001546001600160a01b0316905081565b6000546001600160a01b03163314611bda576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b6001600160a01b0382811660009081526003602052604090205460095491169062010000900460ff1615611c98577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630b0eee3082846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050600060405180830381600087803b158015611c7f57600080fd5b505af1158015611c93573d6000803e3d6000fd5b505050505b806001600160a01b031663095ea7b37f0000000000000000000000000000000000000000000000000000000000000000846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015611d0f57600080fd5b505af1158015611d23573d6000803e3d6000fd5b505050506040513d6020811015611d3957600080fd5b505060408051631a4ca37b60e21b81526001600160a01b0385811660048301526024820185905230604483015291517f0000000000000000000000000000000000000000000000000000000000000000909216916369328dec916064808201926020929091908290030181600087803b158015611db557600080fd5b505af1158015611dc9573d6000803e3d6000fd5b505050506040513d6020811015611ddf57600080fd5b5050604080516370a0823160e01b815230600482015290516000916001600160a01b038616916370a0823191602480820192602092909190829003018186803b158015611e2b57600080fd5b505afa158015611e3f573d6000803e3d6000fd5b505050506040513d6020811015611e5557600080fd5b50516040805163f182178360e01b81526001600160a01b0387811660048301526024820184905291519293506000927f00000000000000000000000000000000000000000000000000000000000000009092169163f182178391604480820192602092909190829003018186803b158015611ecf57600080fd5b505afa158015611ee3573d6000803e3d6000fd5b505050506040513d6020811015611ef957600080fd5b50519050611f0a85838360006120d5565b846001600160a01b031663095ea7b37f0000000000000000000000000000000000000000000000000000000000000000846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015611f8157600080fd5b505af1158015611f95573d6000803e3d6000fd5b505050506040513d6020811015611fab57600080fd5b50506040805163bc157ac160e01b8152600481018490526001600160a01b0387811660248301526044820184905291517f00000000000000000000000000000000000000000000000000000000000000009092169163bc157ac1916064808201926020929091908290030181600087803b1580156110ac57600080fd5b6001600160a01b0382166000908152600560205260408120548161204c82856121ca565b6001600160a01b038616600090815260066020526040902054109250505092915050565b6000546001600160a01b031633146120bd576040805162461bcd60e51b815260206004820181905260248201526000805160206122f7833981519152604482015290519081900360640190fd5b6009805461ffff191661ffff92909216919091179055565b801561212c576001600160a01b0384166000908152600560205260409020546120fe90846121ca565b6001600160a01b03851660009081526005602052604090205560045461212490836121ca565b6004556121c4565b6001600160a01b03841660009081526005602052604090205483101561218d576001600160a01b03841660009081526005602052604090205461216f908461222b565b6001600160a01b0385166000908152600560205260409020556121a7565b6001600160a01b0384166000908152600560205260408120555b6004548210156121be57600454612124908361222b565b60006004555b50505050565b600082820183811015612224576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b600082821115612282576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b5090039056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c436f6e7472616374206e6f7420617070726f76656420746f20636c61696d20726577617264734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a164736f6c6343000705000a";

export class IBBTCAllocator__factory extends ContractFactory {
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
    _lendingPool: string,
    _incentives: string,
    _timelockInBlocks: BigNumberish,
    _referralCode: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<IBBTCAllocator> {
    return super.deploy(
      _treasury,
      _lendingPool,
      _incentives,
      _timelockInBlocks,
      _referralCode,
      overrides || {}
    ) as Promise<IBBTCAllocator>;
  }
  getDeployTransaction(
    _treasury: string,
    _lendingPool: string,
    _incentives: string,
    _timelockInBlocks: BigNumberish,
    _referralCode: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _treasury,
      _lendingPool,
      _incentives,
      _timelockInBlocks,
      _referralCode,
      overrides || {}
    );
  }
  attach(address: string): IBBTCAllocator {
    return super.attach(address) as IBBTCAllocator;
  }
  connect(signer: Signer): IBBTCAllocator__factory {
    return super.connect(signer) as IBBTCAllocator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IBBTCAllocatorInterface {
    return new utils.Interface(_abi) as IBBTCAllocatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBBTCAllocator {
    return new Contract(address, _abi, signerOrProvider) as IBBTCAllocator;
  }
}