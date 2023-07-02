import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { CreateOrder } from "~~/components/orders/CreateOrder";
import { ShowOrders } from "~~/components/orders/ShowOrders";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Match !</span>
          </h1>
          <p className="text-center text-lg">An order book fully decentralised created for the fantom hacakthon</p>
          <a
            href="https://ftmscan.com/address/0x3c8A0615AE12682fEB3C25835988Bee07eB4f1B1#code"
            target="_blank"
            rel="noreferrer"
            className="link link-accent"
          >
            💎 Verified contract
          </a>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <CreateOrder></CreateOrder>
          <ShowOrders></ShowOrders>
        </div>
      </div>
    </>
  );
};

export default Home;
