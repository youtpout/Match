import { useEffect, useState } from "react";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useNetwork, useSigner } from "wagmi";
import { ScaleIcon } from "@heroicons/react/24/outline";
import ArrowSmallRightIcon from "@heroicons/react/24/outline/ArrowSmallRightIcon";
import { MetaHeader } from "~~/components/MetaHeader";
import addresses from "~~/constants/addresses";
import nativeName from "~~/constants/nativeName";
import { Match, Match__factory } from "~~/typechain-types";
import { TokenBalance } from "~~/types/TokenBalance";
import { GenericContractsDeclaration, contracts } from "~~/utils/scaffold-eth/contract";

const Balance: NextPage = () => {
  const [matchContract, setMatchContract] = useState<Match | undefined>();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [errorSending, setErrorSending] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [coin, setCoin] = useState("FTM");

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

    if (signer && !isSending) {
      const deployedContracts = contracts as GenericContractsDeclaration | null;
      const chainMetaData = deployedContracts?.[chainId]?.[0];
      const mAddress = chainMetaData?.contracts["Match"]?.address;
      if (mAddress) {
        const matchCont = Match__factory.connect(mAddress, signer);
        setMatchContract(matchCont);
        getDatas(matchCont);
      }
    }
  }, [chain, signer, isSending, refresh]);

  const getDatas = async (matchCont: Match) => {
    if (matchCont && signer && tokensAddresses) {
      const chainId = chain?.id || 250;
      const user = await signer.getAddress();
      const allBalances: TokenBalance[] = await Promise.all(
        tokensAddresses?.map(async t => {
          const elem = t.addresses?.find(x => x.chainId == chainId);
          const amount = await matchCont.usersBalances(user, elem?.address);
          const name = elem?.address == nativeAddress ? coin : t.name;
          const formatAmount = ethers.utils.formatUnits(amount, t.decimals);
          const bal: TokenBalance = { amount: amount, name: name, address: elem?.address, amountFormat: formatAmount };
          return bal;
        }),
      );
      setBalances(allBalances);
      console.log("balances", balances);
    }
  };

  const withdraw = async (tokenBalance: TokenBalance) => {
    try {
      setIsSending(true);
      setErrorSending("");
      if (matchContract && tokenBalance) {
        const withdrawFunction = await matchContract.getActionWithdraw(tokenBalance.address, tokenBalance.amount);
        const execute = await matchContract.execute([withdrawFunction]);
        await execute.wait();
      } else {
        setErrorSending("Connect your wallet.");
      }
    } catch (error: any) {
      catchError(error);
    } finally {
      setIsSending(false);
      getDatas(matchContract!);
    }
  };
  const withdrawAll = async () => {
    try {
      setIsSending(true);
      setErrorSending("");
      if (matchContract && balances) {
        const actions = [];
        for (let index = 0; index < balances.length; index++) {
          const element = balances[index];
          if (element.amount.gt(0)) {
            const withdrawFunction = await matchContract.getActionWithdraw(element.address, element.amount);
            actions.push(withdrawFunction);
          }
        }
        if (actions?.length == 0) {
          throw new Error("Nothing to withdraw");
        }
        const execute = await matchContract.execute(actions);
        await execute.wait();
      } else {
        setErrorSending("Connect your wallet.");
      }
    } catch (error: any) {
      catchError(error);
    } finally {
      setIsSending(false);
      getDatas(matchContract!);
    }
  };

  const catchError = (error: any) => {
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
  };
  return (
    <>
      <MetaHeader />
      <div className="flex bg-base-300 relative pb-10">
        <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
          <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
            <div className="flex items-center">
              <span className="text-5xl">My balances</span>
              <button
                className={`btn btn-primary w-96 rounded-full ml-5 capitalize font-normal font-white w-42 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                  isSending ? "loading" : ""
                }`}
                disabled={isSending}
                onClick={() => withdrawAll()}
              >
                {!isSending && (
                  <>
                    Withdraw All
                    <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                )}
              </button>
            </div>
            {errorSending && <div className="text-m p-1 text-red-600">Error : {errorSending}</div>}
            <ul className="mt-10">
              {balances.map((balance: TokenBalance, index: number) => (
                <li key={index} className="flex justify-between h-16 w-96 items-center p-3 text-m">
                  <div className="flex items-center">
                    <ScaleIcon className="h-4 w-4" />
                    <span className="ml-5">
                      {balance.amountFormat} {balance.name}
                    </span>
                  </div>
                  {balance.amount.gt(0) && (
                    <button
                      className={`btn btn-primary rounded-full ml-5 capitalize font-normal font-white w-42 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                        isSending ? "loading" : ""
                      }`}
                      disabled={isSending}
                      onClick={() => withdraw(balance)}
                    >
                      {!isSending && (
                        <>
                          Withdraw <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                        </>
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Balance;
