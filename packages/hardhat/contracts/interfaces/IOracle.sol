//SPDX-License-Identifier: BSL 1.1
pragma solidity ^0.8.17;

import "../libraries/MatchLibrary.sol";

interface IOracle {
  struct Data {
    address tokenToSell;
    address tokenToBuy;
    uint32 lastAth;
    uint112 lastAthPrice;
    uint112 currentPrice;
  }

  function canTrigger(MatchLibrary.Order calldata order) external returns (bool);

  function getPrice(address tokenToSell, address tokenToBuy) external returns (Data memory);
}
