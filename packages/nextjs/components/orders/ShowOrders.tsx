import { useContext, useEffect, useState } from "react";
import addresses from "../../constants/addresses";
import nativeName from "../../constants/nativeName";
import contracts from "../../generated/deployedContracts";
import { OrderStatus } from "./OrderStatus";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import { BigNumber, ethers } from "ethers";
import { useNetwork, useSigner } from "wagmi";
import { ERC20, ERC20__factory } from "~~/typechain-types";
import { AddOrderEvent, Match, MatchLibrary } from "~~/typechain-types/contracts/Match";
import { Match__factory } from "~~/typechain-types/factories/contracts/Match__factory";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

export const ShowOrders = () => {
  const [matchContract, setMatchContract] = useState<Match | undefined>();
  const [coin, setCoin] = useState("FTM");
  const [orders, setOrders] = useState<AddOrderEvent[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [errorSending, setErrorSending] = useState("");
  const [refresh, setRefresh] = useState(0);

  const tokensAddresses = addresses.filter(x => x.contract == "erc20");
  const nativeAddress = "0x0000000000000000000000000000000000000001";

  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  useEffect(() => {
    // update data every 10 seconds
    const interval = setInterval(() => {
      setRefresh(refresh + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const chainId = chain?.id || 250;
    const coinInfo = nativeName.find(x => x.chainId == chainId);
    if (coinInfo) {
      setCoin(coinInfo.symbol);
    } else {
      setCoin("FTM");
    }

    const deployedContracts = contracts as GenericContractsDeclaration | null;
    console.log("chainId", chainId);
    const chainMetaData = deployedContracts?.[chainId]?.[0];
    const mAddress = chainMetaData?.contracts["Match"]?.address;

    if (signer && mAddress && !isSending) {
      const matchCont = Match__factory.connect(mAddress, signer);
      setMatchContract(matchCont);
      getDatas(matchCont);
    }
  }, [chain, signer, isSending, refresh]);

  const getDatas = async (matchCont: Match) => {
    if (matchCont && signer) {
      const user = await signer.getAddress();
      const filter1 = matchCont.filters.AddOrder(user);

      let query = await matchCont.queryFilter(filter1);

      if (query?.length) {
        query = await Promise.all(
          query.map(async x => {
            const data = { ...x };
            const result = await matchCont.getOrder(x.args.tokenToSell, x.args.tokenToBuy, x.args.indexOrder);
            data.args = { ...x.args };
            data.args.order = result;
            return data;
          }),
        );

        console.log("query result", query);
      }
      setOrders(query);
    }
  };

  const getCompleted = (amountTotal: BigNumber, amountRest: BigNumber): string => {
    const rest = amountTotal.sub(amountRest);
    return `${rest.mul(rest).div(amountTotal).mul(100)} %`;
  };

  const getTokenInfo = (amount: BigNumber, tokenAddress: string): string => {
    let decimals = 18;
    let name = "FTM";
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

  const cancelOrder = async (order: AddOrderEvent) => {
    try {
      setIsSending(true);
      setErrorSending("");
      if (matchContract && order) {
        const cancelFunction = await matchContract.getActionCancel(
          order.args.tokenToSell,
          order.args.tokenToBuy,
          order.args.indexOrder,
        );

        const execute = await matchContract.execute([cancelFunction]);
        await execute.wait();
      } else {
        setErrorSending("Connect your wallet.");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.error?.data?.data && matchContract) {
        try {
          const decodedError = matchContract.interface.parseError(error.error.data.data);
          setErrorSending(`Transaction will failed: ${decodedError?.name}`);
        } catch (e2) {
          setErrorSending(error?.error?.data?.message || error?.message || "Unknow error");
        }
      } else {
        setErrorSending(error?.error?.data?.message || error?.message || "Unknow error");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex bg-base-300 relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-5xl">My orders</span>
          {errorSending && <div className="text-m p-1 text-red-600">Error : {errorSending}</div>}
          <table className="mt-10">
            <thead>
              <tr>
                <th>Actions</th>
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
                  <th>
                    {order.args.order.status === 1 && (
                      <IconButton
                        disabled={isSending}
                        aria-label="delete"
                        className="tooltip"
                        data-tip="cancel"
                        color="secondary"
                        onClick={() => cancelOrder(order)}
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                  </th>
                  <td className="text-m">
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
