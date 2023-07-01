/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  MatchContract,
  MatchContractInterface,
} from "../../Match.sol/MatchContract";

const _abi = [
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
    name: "IncorrectPrice",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientAmount",
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
    name: "NotTheOwner",
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
    name: "RewardTooLow",
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
    name: "Match",
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
    outputs: [],
    stateMutability: "payable",
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
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001ce438038062001ce48339810160408190526200003491620000b9565b600080546001600160a01b039485166001600160a01b0319909116179055600180546001600160581b03909216600160a01b027fff00000000000000000000000000000000000000000000000000000000000000909216929093169190911717905562000113565b80516001600160a01b0381168114620000b457600080fd5b919050565b600080600060608486031215620000cf57600080fd5b620000da846200009c565b9250620000ea602085016200009c565b60408501519092506001600160581b03811681146200010857600080fd5b809150509250925092565b611bc180620001236000396000f3fe6080604052600436106100865760003560e01c80638da5cb5b116100595780638da5cb5b1461011257806395082d2514610132578063ba16d60014610155578063f1a640f814610194578063f2fde38b146101b057600080fd5b8063361d004f1461008b5780633ccfd60b146100ad57806349650044146100c257806376cdb03b146100d5575b600080fd5b34801561009757600080fd5b506100ab6100a6366004611566565b6101d0565b005b3480156100b957600080fd5b506100ab610230565b6100ab6100d036600461158a565b6102b0565b3480156100e157600080fd5b506001546100f5906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561011e57600080fd5b506000546100f5906001600160a01b031681565b34801561013e57600080fd5b50610147606481565b604051908152602001610109565b34801561016157600080fd5b5060015461017c90600160a01b90046001600160581b031681565b6040516001600160581b039091168152602001610109565b3480156101a057600080fd5b50610147670de0b6b3a764000081565b3480156101bc57600080fd5b506100ab6101cb366004611566565b610410565b6000546001600160a01b031633146101fb576040516336b6b89560e01b815260040160405180910390fd5b6001600160a01b03811661020e57600080fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b0316331461025b576040516336b6b89560e01b815260040160405180910390fd5b600180546001600160a01b031660009081526002602090815260408083209383529290529081208054918291906102928380611615565b90915550506001546102ad906001600160a01b031682610470565b50565b60008190036102d2576040516397587a3360e01b815260040160405180910390fd5b3460005b60008484838181106102ea576102ea61162e565b90506020028101906102fc9190611644565b610305906116d4565b905060018151600581111561031c5761031c611786565b0361033b5761032a816104a9565b6103349084611615565b92506103e5565b60028151600581111561035057610350611786565b0361035e5761032a816106b4565b60038151600581111561037357610373611786565b036103865761038181610998565b6103e5565b60048151600581111561039b5761039b611786565b036103a95761038181611218565b6005815160058111156103be576103be611786565b036103cc57610381816112fc565b60405163211bf9ef60e21b815260040160405180910390fd5b816103ef8161179c565b925050508281106102d657811561040a5761040a3383610470565b50505050565b6000546001600160a01b0316331461043b576040516336b6b89560e01b815260040160405180910390fd5b6001600160a01b03811661044e57600080fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b7fb12d13ebe76e15b5fdb7bf52f0daba617b83ebcc560b0666c44fcdcd71f4362b600080808085875af18061040a578160005260206000fd5b600080600083602001518060200190518101906104c691906117b5565b909250905060006000196001600160a01b03841601610525573360009081526002602090815260408083206001600160a01b03871684529091528120805493955085938492906105179084906117e3565b909155508291506106669050565b6040516370a0823160e01b81523060048201526000906001600160a01b038516906370a0823190602401602060405180830381865afa15801561056c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061059091906117f6565b905061059e843330866113ef565b6040516370a0823160e01b815230600482015260009082906001600160a01b038716906370a0823190602401602060405180830381865afa1580156105e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060b91906117f6565b6106159190611615565b90508381116106245780610626565b835b3360009081526002602090815260408083206001600160a01b038a16845290915281208054929550859290919061065e9084906117e3565b909155505050505b60408051838152602081018390526001600160a01b0385169133917fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7910160405180910390a3505050919050565b60008060008060008086602001518060200190518101906106d5919061182b565b9398509196509450925090506001600160a01b03851615806106fe57506001600160a01b038416155b1561071c57604051639fabe1c160e01b815260040160405180910390fd5b6001600160801b038116158061073957506001600160801b038216155b1561075757604051637bc90c0560e11b815260040160405180910390fd5b6001546001600160581b03600160a01b9091048116908416101561078e5760405163256eeaad60e01b815260040160405180910390fd5b6001600160581b0383169550600060646107a985600a6118a4565b6107b391906118e5565b905060006107c1828661190b565b600180546001600160a01b0316600090815260026020908152604080832093835292905290812080549293506001600160581b038516929091906108069084906117e3565b90915550506001600160a01b038781166000908152600360208181526040808420948b1684528482528084208054825160e081018452600180825233828701526001600160581b038a16948201949094526001600160801b038c811660608301819052908c166080830181905260a083019190915260c0820152968452828101825590855291909320845192820201805491949384939192839160ff19909116908360048111156108b9576108b9611786565b02179055506020820151815460408085015160ff9092166101006001600160a01b03948516026001600160a81b031617600160a81b6001600160581b0390931692909202919091178355606084015160808501516001600160801b03918216600160801b918316820217600186015560a086015160c0909601519582169590911602939093176002909201919091559051898216918b169033907fff3bc2a56b72ea77cd35a9f8742e4233570604968fd25198111418b594f6a57a906109829087908790611954565b60405180910390a4505050505050505050919050565b60008060008084602001518060200190518101906109b691906119d5565b929650909450925090506001600160a01b03841615806109dd57506001600160a01b038316155b156109fb57604051639fabe1c160e01b815260040160405180910390fd5b6001600160a01b0380851660009081526003602090815260408083209387168352929052908120805484908110610a3457610a3461162e565b600091825260208083206001600160a01b03808916855260038084526040808720928c16875291909352842080549290930201935084908110610a7957610a7961162e565b6000918252602090912060039091020190506001825460ff166004811115610aa357610aa3611786565b141580610ac657506001815460ff166004811115610ac357610ac3611786565b14155b15610ae45760405163f08c50a160e01b815260040160405180910390fd5b60018201546000906001600160801b0380821691610b1391670de0b6b3a764000091600160801b900416611a1d565b610b1d9190611a34565b60018301549091506000906001600160801b03600160801b8204811691610b4e91670de0b6b3a76400009116611a1d565b610b589190611a34565b905080821015610b7b576040516399b5cb1d60e01b815260040160405180910390fd5b600280850154908401546001600160801b03600160801b90920482169116811115610bb0575060028301546001600160801b03165b6000670de0b6b3a7640000610bce856001600160801b038516611a1d565b610bd89190611a34565b90506001600160801b03811115610c02576040516374dea6bf60e01b815260040160405180910390fd5b600081905060008660000160019054906101000a90046001600160a01b0316905060008860000160019054906101000a90046001600160a01b03169050846001600160801b031660026000846001600160a01b03166001600160a01b0316815260200190815260200160002060008e6001600160a01b03166001600160a01b031681526020019081526020016000206000828254610ca09190611615565b92505081905550846001600160801b031660026000836001600160a01b03166001600160a01b0316815260200190815260200160002060008e6001600160a01b03166001600160a01b031681526020019081526020016000206000828254610d0891906117e3565b92505081905550826001600160801b031660026000846001600160a01b03166001600160a01b0316815260200190815260200160002060008f6001600160a01b03166001600160a01b031681526020019081526020016000206000828254610d7091906117e3565b92505081905550826001600160801b031660026000836001600160a01b03166001600160a01b0316815260200190815260200160002060008f6001600160a01b03166001600160a01b031681526020019081526020016000206000828254610dd89190611615565b9091555050600289018054869190601090610e04908490600160801b90046001600160801b0316611a48565b92506101000a8154816001600160801b0302191690836001600160801b03160217905550848860020160008282829054906101000a90046001600160801b0316610e4e9190611a48565b92506101000a8154816001600160801b0302191690836001600160801b03160217905550828960020160008282829054906101000a90046001600160801b0316610e989190611a48565b92506101000a8154816001600160801b0302191690836001600160801b03160217905550828860020160108282829054906101000a90046001600160801b0316610ee29190611a48565b92506101000a8154816001600160801b0302191690836001600160801b031602179055508860020160109054906101000a90046001600160801b03166001600160801b031660001480610f40575060028901546001600160801b0316155b15610fa7578854600360ff1990911617808a553360009081526002602090815260408083206001845290915281208054600160a81b9093046001600160581b031692909190610f909084906117e3565b909155505088546001600160a81b03168955611063565b60018901548954600091600160801b90046001600160801b031690610fdd908890600160a81b90046001600160581b0316611a68565b610fe79190611a8b565b8a5490915081908b9060159061100e908490600160a81b90046001600160581b031661190b565b82546101009290920a6001600160581b03818102199093169183160217909155336000908152600260209081526040808320600184529091528120805492851693509161105c9084906117e3565b9091555050505b60028801546001600160801b0316158061108f57506002880154600160801b90046001600160801b0316155b156110f6578754600360ff19909116178089553360009081526002602090815260408083206001845290915281208054600160a81b9093046001600160581b0316929091906110df9084906117e3565b909155505087546001600160a81b031688556111ab565b600188015488546000916001600160801b031690611125908890600160a81b90046001600160581b0316611a68565b61112f9190611a8b565b895490915081908a90601590611156908490600160a81b90046001600160581b031661190b565b82546101009290920a6001600160581b0381810219909316918316021790915533600090815260026020908152604080832060018452909152812080549285169350916111a49084906117e3565b9091555050505b8b6001600160a01b03168d6001600160a01b0316826001600160a01b03167f0b809fbc45b0453186de2abbb9d10aa657cf8a3640bed98891aa75ca431f9eff858f8f8f8f604051611200959493929190611b04565b60405180910390a45050505050505050505050505050565b600080826020015180602001905181019061123391906117b5565b3360009081526002602090815260408083206001600160a01b0386168452909152902054919350915081111561127c57604051632ca2f52b60e11b815260040160405180910390fd5b3360009081526002602090815260408083206001600160a01b0386168452909152812080548392906112af908490611615565b909155506112c0905082338361141c565b604051818152339081907f9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb9060200160405180910390a3505050565b600080600083602001518060200190518101906113199190611b48565b3360009081526002602090815260408083206001600160a01b0387168452909152902054929550909350915081111561136557604051632ca2f52b60e11b815260040160405180910390fd5b3360009081526002602090815260408083206001600160a01b038716845290915281208054839290611398908490611615565b909155506113a9905083838361141c565b6040518181526001600160a01b0383169033907f9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb9060200160405180910390a350505050565b6000196001600160a01b038516016114105761140b8282610470565b61040a565b61040a84848484611448565b6000196001600160a01b0384160161143d576114388282610470565b505050565b6114388383836114d4565b60007f7939f424dcbfa2fa1d156b76cc697c9670f0bbaf8cf205037134e844b4916e7490506040516323b872dd60e01b815284600482015283602482015282604482015260008060648360008a5af19050806114a8573d6000803e3d6000fd5b503d156114cd576020600060803e608051600181146114cb578160005260206000fd5b505b5050505050565b60007f90b8ec1877afffd816d05d9b13947f3ff18ec5851c38bad15ec2b710f92391b1905060405163a9059cbb60e01b81528360048201528260248201526000806044836000895af190508061152e573d6000803e3d6000fd5b503d1561040a576020600060803e608051600181146114cd578160005260206000fd5b6001600160a01b03811681146102ad57600080fd5b60006020828403121561157857600080fd5b813561158381611551565b9392505050565b6000806020838503121561159d57600080fd5b823567ffffffffffffffff808211156115b557600080fd5b818501915085601f8301126115c957600080fd5b8135818111156115d857600080fd5b8660208260051b85010111156115ed57600080fd5b60209290920196919550909350505050565b634e487b7160e01b600052601160045260246000fd5b81810381811115611628576116286115ff565b92915050565b634e487b7160e01b600052603260045260246000fd5b60008235603e1983360301811261165a57600080fd5b9190910192915050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561169d5761169d611664565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156116cc576116cc611664565b604052919050565b6000604082360312156116e657600080fd5b6116ee61167a565b8235600681106116fd57600080fd5b815260208381013567ffffffffffffffff8082111561171b57600080fd5b9085019036601f83011261172e57600080fd5b81358181111561174057611740611664565b611752601f8201601f191685016116a3565b9150808252368482850101111561176857600080fd5b80848401858401376000908201840152918301919091525092915050565b634e487b7160e01b600052602160045260246000fd5b6000600182016117ae576117ae6115ff565b5060010190565b600080604083850312156117c857600080fd5b82516117d381611551565b6020939093015192949293505050565b80820180821115611628576116286115ff565b60006020828403121561180857600080fd5b5051919050565b80516001600160801b038116811461182657600080fd5b919050565b600080600080600060a0868803121561184357600080fd5b855161184e81611551565b602087015190955061185f81611551565b60408701519094506001600160581b038116811461187c57600080fd5b925061188a6060870161180f565b91506118986080870161180f565b90509295509295909350565b6001600160581b038181168382160280821691908281146118c7576118c76115ff565b505092915050565b634e487b7160e01b600052601260045260246000fd5b60006001600160581b03808416806118ff576118ff6118cf565b92169190910492915050565b6001600160581b0382811682821603908082111561192b5761192b6115ff565b5092915050565b6005811061195057634e487b7160e01b600052602160045260246000fd5b9052565b60006101008201905083825261196e602083018451611932565b60018060a01b0360208401511660408301526001600160581b03604084015116606083015260608301516001600160801b0380821660808501528060808601511660a08501528060a08601511660c08501528060c08601511660e085015250509392505050565b600080600080608085870312156119eb57600080fd5b84516119f681611551565b6020860151909450611a0781611551565b6040860151606090960151949790965092505050565b8082028115828204841417611628576116286115ff565b600082611a4357611a436118cf565b500490565b6001600160801b0382811682821603908082111561192b5761192b6115ff565b6001600160801b038181168382160280821691908281146118c7576118c76115ff565b60006001600160801b03808416806118ff576118ff6118cf565b8054611ab48360ff8316611932565b600881901c6001600160a01b0316602084015260a81c604083015260018101546001600160801b038082166060850152608091821c8285015260029092015491821660a08401521c60c090910152565b6001600160a01b038616815260208101859052604081018490526102208101611b306060830185611aa5565b611b3e610140830184611aa5565b9695505050505050565b600080600060608486031215611b5d57600080fd5b8351611b6881611551565b6020850151909350611b7981611551565b8092505060408401519050925092509256fea2646970667358221220db10e90ea766720f9131a56568e3abb04ffc68a3a97e740835b419de2260b14e64736f6c63430008110033";

type MatchContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MatchContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MatchContract__factory extends ContractFactory {
  constructor(...args: MatchContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _owner: PromiseOrValue<string>,
    _bank: PromiseOrValue<string>,
    _minReward: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MatchContract> {
    return super.deploy(
      _owner,
      _bank,
      _minReward,
      overrides || {}
    ) as Promise<MatchContract>;
  }
  override getDeployTransaction(
    _owner: PromiseOrValue<string>,
    _bank: PromiseOrValue<string>,
    _minReward: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _owner,
      _bank,
      _minReward,
      overrides || {}
    );
  }
  override attach(address: string): MatchContract {
    return super.attach(address) as MatchContract;
  }
  override connect(signer: Signer): MatchContract__factory {
    return super.connect(signer) as MatchContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MatchContractInterface {
    return new utils.Interface(_abi) as MatchContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MatchContract {
    return new Contract(address, _abi, signerOrProvider) as MatchContract;
  }
}
