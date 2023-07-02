import { useEffect, useState } from "react";
import nativeName from "../../constants/nativeName";
import { useNetwork, usePrepareContractWrite, useSigner } from "wagmi";

export const ChooseToken = ({ sell, selectedToken, setSelectedToken, list, amountToken, setAmountToken }) => {
  const [coin, setCoin] = useState("Fantom");
  const [chainId, setChainId] = useState(1);
  const { chain } = useNetwork();

  useEffect(() => {
    setChainId(chain?.id || 250);
    const coinInfo = nativeName.find(x => x.chainId == chainId);
    if (coinInfo) {
      setCoin(coinInfo.name);
    } else {
      setCoin("Fantom");
    }
  }, [chain]);

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
      <label className="font-bai-jamjuree text-lg sm:text-2xl">Token to {sell ? "Sell" : "Buy"}</label>
      <input
        type="text"
        placeholder="Amount"
        value={amountToken}
        className="input font-bai-jamjuree w-24 px-5 border border-primary text-lg sm:text-s"
        onChange={e => setAmountToken(e.target.value)}
      />
      <select
        className="input font-bai-jamjuree w-96 px-5 border border-primary text-lg sm:text-2xl"
        value={selectedToken?.name}
        onChange={e => setSelectedToken(e.target.value)}
      >
        {list.map(el => (
          <option value={el?.addresses?.find(x => x.chainId == chainId).address} key={el.name}>
            {el.name === "Native" ? coin : el.name}
          </option>
        ))}
      </select>
    </div>
  );
};
