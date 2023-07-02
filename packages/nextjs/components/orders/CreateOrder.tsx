import { useEffect, useState } from "react";
import addresses from "../../constants/addresses";
import abiErc20 from "../../constants/erc20.json";
import nativeName from "../../constants/nativeName";
import contracts from "../../generated/deployedContracts";
import { ChooseToken } from "./ChooseToken";
import Info from "@mui/icons-material/Info";
import { IconButton, Tooltip } from "@mui/material";
import { BigNumber, ethers, utils } from "ethers";
import { useContractWrite, useNetwork, usePrepareContractWrite, useSigner } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { ERC20, ERC20__factory } from "~~/typechain-types";
import { Match } from "~~/typechain-types/contracts/Match";
import { Match__factory } from "~~/typechain-types/factories/contracts/Match__factory";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

export const CreateOrder = () => {
  const [allowance, setAllowance] = useState(BigNumber.from("0"));
  const [needApprove, setNeedApprove] = useState(false);
  const [matchContract, setMatchContract] = useState<Match | undefined>();
  const [erc20Contract, setErc20Contract] = useState<ERC20 | undefined>();
  const [minReward, setMinReward] = useState(ethers.utils.parseEther("10"));
  const [reward, setReward] = useState(10);
  const [coin, setCoin] = useState("Fantom");
  const [matchAddress, setMatchAddress] = useState("");
  const [selectedToken1, setSelectedToken1] = useState("0x0000000000000000000000000000000000000001");
  const [selectedToken2, setSelectedToken2] = useState("0x0000000000000000000000000000000000000001");
  const [amountToken1, setAmountToken1] = useState(0);
  const [amountToken2, setAmountToken2] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [errorSending, setErrorSending] = useState("");

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
      getDatas();
    }
  }, [chain, signer]);

  useEffect(() => {
    if (selectedToken1 && signer) {
      const matchCont = ERC20__factory.connect(selectedToken1, signer);
      setErc20Contract(matchCont);
      getAllowance();
    }
  }, [selectedToken1, signer, matchContract, amountToken1]);

  const {
    config,
    error,
    isLoading: isApproving,
  } = usePrepareContractWrite({
    address: selectedToken1,
    functionName: "approve",
    abi: abiErc20,
    args: [matchAddress, utils.parseEther("500000000")],
  });

  const { write } = useContractWrite(config);

  const createOrder = async () => {
    try {
      setIsSending(true);
      setErrorSending("");
      if (matchContract && selectedToken1 && selectedToken2 && amountToken1 && amountToken2 && reward) {
        const token1Dec = await getDecimal(selectedToken1);
        const token2Dec = await getDecimal(selectedToken2);
        const amount1 = BigNumber.from(amountToken1.toString()).mul(BigNumber.from(10).pow(BigNumber.from(token1Dec)));
        const amount2 = BigNumber.from(amountToken2.toString()).mul(BigNumber.from(10).pow(BigNumber.from(token2Dec)));
        const reward1 = ethers.utils.parseEther(reward.toString());
        const deposit = await matchContract.getActionDeposit(selectedToken1, amount1);
        const addOrder = await matchContract.getActionAddOrder(
          selectedToken1,
          selectedToken2,
          reward1,
          amount1,
          amount2,
        );
        let totalAmount = reward1;
        if (selectedToken1 === nativeAddress) {
          totalAmount = totalAmount.add(amount1);
        }
        const execute = await matchContract.execute([deposit, addOrder], { value: totalAmount });
        await execute.wait();
      } else {
        setErrorSending("Connect your wallet, complete token to sell/to buy and reward and try another time please.");
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

  const getDatas = async () => {
    if (matchContract) {
      const rewardMin = await matchContract.minReward();
      setMinReward(rewardMin);
    }
  };

  const getAllowance = async () => {
    if (selectedToken1 == nativeAddress) {
      setNeedApprove(false);
      return;
    }
    if (signer && erc20Contract && selectedToken1) {
      const user = await signer.getAddress();
      const amount = await erc20Contract.allowance(user, matchAddress);
      setAllowance(amount);
      const token1Dec = await getDecimal(selectedToken1);
      const amount1 = BigNumber.from(amountToken1.toString()).mul(BigNumber.from(10).pow(BigNumber.from(token1Dec)));
      if (amountToken1 && amount.lt(amount1)) {
        setNeedApprove(true);
      } else {
        setNeedApprove(false);
      }
    }
  };

  const textReward = () => {
    return `Rewards (min ${utils.formatEther(minReward)} ${coin})`;
  };

  return (
    <div className="flex bg-base-300 relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-5xl text-black">Create order</span>

          <ChooseToken
            sell={true}
            selectedToken={selectedToken1}
            setSelectedToken={setSelectedToken1}
            list={tokensAddresses}
            amountToken={amountToken1}
            setAmountToken={setAmountToken1}
          ></ChooseToken>
          <ChooseToken
            sell={false}
            selectedToken={selectedToken2}
            setSelectedToken={setSelectedToken2}
            list={tokensAddresses}
            amountToken={amountToken2}
            setAmountToken={setAmountToken2}
          ></ChooseToken>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <label className="font-bai-jamjuree text-lg sm:text-2xl">Reward</label>
            <input
              type="text"
              placeholder={textReward()}
              className="input font-bai-jamjuree w-80 px-5 border border-primary text-lg sm:text-s"
              onChange={e => setReward(e.target.value)}
            />

            <Tooltip title="Reward for the bot that matches your order, minimun amount 10FTM (10% for the platform, 90% for the bot)">
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
            {needApprove && (
              <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-36 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isApproving ? "loading" : ""
                  }`}
                  onClick={() => write?.()}
                >
                  {!isApproving && (
                    <>
                      Approve <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
                {error && <div>An error occurred preparing the transaction: {error.message}</div>}
              </div>
            )}
          </div>
          <div className="flex flex-col rounded-full p-1 flex-shrink-0 items-start">
            <button
              className={`btn btn-primary rounded-full capitalize font-normal font-white w-42 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                isSending ? "loading" : ""
              }`}
              disabled={isSending}
              onClick={() => createOrder()}
            >
              {!isSending && (
                <>
                  Create order <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                </>
              )}
            </button>
            {errorSending && <div className="text-m p-1 text-red-600">Error : {errorSending}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
