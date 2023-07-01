import { useEffect, useState } from "react";
import addresses from "../../constants/addresses";
import abiErc20 from "../../constants/erc20.json";
import nativeName from "../../constants/nativeName";
import contracts from "../../generated/deployedContracts";
import { ChooseToken } from "./ChooseToken";
import { BigNumber, utils } from "ethers";
import { useContractWrite, useNetwork, usePrepareContractWrite, useSigner } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ERC20, ERC20__factory } from "~~/typechain-types";
import { MatchContract } from "~~/typechain-types/Match.sol";
import { MatchContract__factory } from "~~/typechain-types/factories/Match.sol";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

export const CreateOrder = () => {
  const [actions, setActions] = useState([]);
  const [allowance, setAllowance] = useState(BigNumber.from("0"));
  const [needApprove, setNeedApprove] = useState(false);
  const [matchContract, setMatchContract] = useState<MatchContract | undefined>();
  const [erc20Contract, setErc20Contract] = useState<ERC20 | undefined>();
  const [minReward, setMinReward] = useState(BigNumber.from("0"));
  const [reward, setReward] = useState(BigNumber.from("0"));
  const [coin, setCoin] = useState("Ethereum");
  const [matchAddress, setMatchAddress] = useState("");
  const [selectedToken1, setSelectedToken1] = useState();
  const [selectedToken2, setSelectedToken2] = useState();
  const [amountToken1, setAmountToken1] = useState(0);
  const [amountToken2, setAmountToken2] = useState(0);

  const tokensAddresses = addresses.filter(x => x.contract == "erc20");
  const nativeAddress = "0x0000000000000000000000000000000000000001";

  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  useEffect(() => {
    const chainId = chain?.id || 1;
    const coinInfo = nativeName.find(x => x.chainId == chainId);
    if (coinInfo) {
      setCoin(coinInfo.name);
    } else {
      setCoin("Ethereum");
    }

    const deployedContracts = contracts as GenericContractsDeclaration | null;
    console.log("chainId", chainId);
    const chainMetaData = deployedContracts?.[chainId]?.[0];
    const mAddress = chainMetaData?.contracts["Match"]?.address;
    setMatchAddress(mAddress || "");

    if (signer) {
      const matchCont = MatchContract__factory.connect(matchAddress, signer);
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

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Match",
    functionName: "execute",
    args: [actions],
    value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const getDatas = async () => {
    if (matchContract) {
      const rewardMin = await matchContract.minReward();
      setMinReward(rewardMin);
    }
  };

  const getAllowance = async () => {
    if (signer && erc20Contract) {
      const user = await signer.getAddress();
      const amount = await erc20Contract.allowance(user, matchAddress);
      setAllowance(amount);
      const amount1 = utils.parseEther(amountToken1.toString());
      if (amountToken1 && amount.lt(amount1)) {
        setNeedApprove(selectedToken1 !== nativeAddress);
      } else {
        setNeedApprove(false);
      }
    }
  };

  const textReward = () => {
    return `Rewards for the matcher (min ${utils.formatEther(minReward)} ${coin})`;
  };

  return (
    <div className="flex bg-base-300 relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Set a Greeting_</span>

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
            <input
              type="text"
              placeholder={textReward()}
              className="input font-bai-jamjuree w-80 px-5 border border-primary text-lg sm:text-s"
              onChange={e => setReward(e.target.value)}
            />
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

          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
