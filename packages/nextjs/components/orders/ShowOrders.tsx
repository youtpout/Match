import { useEffect, useState } from "react";
import addresses from "../../constants/addresses";
import nativeName from "../../constants/nativeName";
import contracts from "../../generated/deployedContracts";
import { OrderStatus } from "./OrderStatus";
import { BigNumber, ethers } from "ethers";
import { useNetwork, useSigner } from "wagmi";
import { ERC20, ERC20__factory } from "~~/typechain-types";
import { AddOrderEvent, Match, MatchLibrary } from "~~/typechain-types/contracts/Match";
import { Match__factory } from "~~/typechain-types/factories/contracts/Match__factory";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

export const ShowOrders = () => {
  const [actions, setActions] = useState([]);
  const [allowance, setAllowance] = useState(BigNumber.from("0"));
  const [needApprove, setNeedApprove] = useState(false);
  const [matchContract, setMatchContract] = useState<Match | undefined>();
  const [erc20Contract, setErc20Contract] = useState<ERC20 | undefined>();
  const [reward, setReward] = useState(10);
  const [coin, setCoin] = useState("Fantom");
  const [matchAddress, setMatchAddress] = useState("");
  const [orders, setOrders] = useState<AddOrderEvent[]>([]);

  const tokensAddresses = addresses.filter(x => x.contract == "erc20");
  const nativeAddress = "0x0000000000000000000000000000000000000001";

  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  useEffect(() => {
    const chainId = chain?.id || 250;
    const coinInfo = nativeName.find(x => x.chainId == chainId);
    if (coinInfo) {
      setCoin(coinInfo.name);
    } else {
      setCoin("Fantom");
    }

    const deployedContracts = contracts as GenericContractsDeclaration | null;
    console.log("chainId", chainId);
    const chainMetaData = deployedContracts?.[chainId]?.[0];
    const mAddress = chainMetaData?.contracts["Match"]?.address;
    setMatchAddress(mAddress || "");

    if (signer) {
      const matchCont = Match__factory.connect(matchAddress, signer);
      setMatchContract(matchCont);
      getDatas(matchCont);
    }
  }, [chain, signer]);

  const getDecimal = async (token: string) => {
    if (token === nativeAddress) {
      return 18;
    }
    if (signer) {
      const contract = ERC20__factory.connect(token, signer);
      return await contract.decimals();
    }
    throw "Unknow decimal";
  };

  const getDatas = async (matchCont: Match) => {
    console.log("getDatas");
    if (matchCont && signer) {
      const user = await signer.getAddress();
      const filter1 = matchCont.filters.AddOrder(user);
      const query = await matchCont.queryFilter(filter1);
      setOrders(query);
      console.log("query result", query);
    }
  };

  const getCompleted = (amountTotal: BigNumber, amountRest: BigNumber): string => {
    const rest = amountTotal.sub(amountRest);
    return `${rest.mul(rest).div(amountTotal).mul(100)} %`;
  };

  const getTokenInfo = (amount: BigNumber, tokenAddress: string): string => {
    let decimals = 18;
    let name = "Fantom";
    if (tokenAddress !== nativeAddress) {
      const find = tokensAddresses.find(x =>
        x.addresses.some(z => z.address.toLowerCase() === tokenAddress.toLowerCase()),
      );
      if (find) {
        decimals = find.decimals;
        name = find.name;
      } else {
        name = "Not listed";
      }
    }

    return `${ethers.utils.formatUnits(amount, decimals)} ${name}`;
  };

  return (
    <div className="flex bg-base-300 relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-5xl text-black">My orders</span>
          <table className="mt-10">
            <thead>
              <tr>
                <th>Status</th>
                <th>Sell</th>
                <th>Buy</th>
                <th>Rest Reward</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: AddOrderEvent, index: number) => (
                <tr key={index}>
                  <td className="text-m text-black">
                    <OrderStatus status={order.args.order.status}></OrderStatus>
                  </td>
                  <td>{getTokenInfo(order.args.order.amountToSell, order.args.tokenToSell)}</td>
                  <td>{getTokenInfo(order.args.order.amountToBuy, order.args.tokenToBuy)}</td>
                  <td>{ethers.utils.formatEther(order.args.order.reward)}</td>
                  <td>{getCompleted(order.args.order.amountToBuy, order.args.order.amountToBuyRest)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
