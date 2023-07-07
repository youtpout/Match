import { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import { useNetwork, useSigner } from "wagmi";
import { hardhat } from "wagmi/chains";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { Faucet } from "~~/components/scaffold-eth";
import addresses from "~~/constants/addresses";
import { useGlobalState } from "~~/services/store/store";
import { IUniswapV2Router02__factory } from "~~/typechain-types";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Site footer
 */
export const Price = ({ tokenToSell, tokenToBuy, amountToSell, amountToBuy }) => {
  const [currentPrice, setCurrentPrice] = useState<number>();
  const [userPrice, setUserPrice] = useState<number>();
  const [priceColor, setPriceColor] = useState<string>("black");

  const tokensAddresses = addresses.filter(x => x.contract == "erc20");
  const routersAddress = addresses.find(x => x.contract == "router")?.addresses;
  const nativeAddress = "0x0000000000000000000000000000000000000001";
  const wftm = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";

  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  useEffect(() => {
    const chainId = chain?.id || 250;

    const router = routersAddress?.find(z => z.chainId === chainId);

    if (router && signer && tokenToSell && tokenToBuy) {
      const token1 = tokensAddresses.find(x => x.addresses.some(z => z.address == tokenToSell));
      const token2 = tokensAddresses.find(x => x.addresses.some(z => z.address == tokenToBuy));

      if (token1 === token2) {
        setCurrentPrice(1);
        setUserPrice(1);
      } else {
        getPrice(router.address, token1, token2);
      }
    }
  }, [signer, tokenToBuy, tokenToSell, amountToBuy, amountToSell]);

  const getPrice = async (router, token1, token2) => {
    const routerContract = IUniswapV2Router02__factory.connect(router, signer);

    const amountCalc = utils.parseUnits("10000", token1.decimals);
    const amount1 = parseFloat(amountToSell);
    const amount2 = parseFloat(amountToBuy);
    console.log("data", { amount1, token1, token2, router });
    const paths = [];
    if (tokenToSell === nativeAddress) {
      paths.push(wftm);
    } else {
      paths.push(tokenToSell);
    }
    if (tokenToSell !== nativeAddress && tokenToBuy !== nativeAddress) {
      // intermediaire path for uncommon swap
      paths.push(wftm);
    }
    if (tokenToBuy === nativeAddress) {
      paths.push(wftm);
    } else {
      paths.push(tokenToBuy);
    }
    const amountOut = await routerContract.getAmountsOut(amountCalc, paths);
    const amount = parseFloat(ethers.utils.formatUnits(amountOut[amountOut.length - 1].div(10000), token2.decimals));
    setCurrentPrice(amount);
    let priceUser = 0;
    if (amount1 && amount2) {
      priceUser = amount1 / amount2;
    }
    setUserPrice(priceUser);
    if (amount < priceUser) {
      setPriceColor("red");
    } else if (amount > priceUser) {
      setPriceColor("green");
    } else {
      setPriceColor("black");
    }
    console.log("price", amount);
  };

  return (
    <div className="flex flex-col text-xl">
      <span>Market Price {currentPrice}</span>
      <span style={{ color: priceColor }}>Your Price {userPrice}</span>
    </div>
  );
};
