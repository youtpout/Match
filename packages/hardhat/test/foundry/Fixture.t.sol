// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {MatchContract} from "contracts/MatchContract.sol";

contract Fixture is Test {
  address public constant uniswapV2Router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  ERC20 public constant usdtToken = ERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
  ERC20 public constant usdcToken = ERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
  ERC20 public constant bnbToken = ERC20(0xB8c77482e45F1F44dE1745F52C74426C631bDD52);
  ERC20 public constant wEth = ERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

  MatchContract public matchContract;

  address deployer = makeAddr("Deployer");
  address alice = makeAddr("Alice");
  address bob = makeAddr("Bob");
  address charlie = makeAddr("Charlie");
  address daniel = makeAddr("Daniel");

  uint256 public constant INITIAL_DEPLOYER_USDC_BALANCE = 100000;
  uint256 public constant INITIAL_DEPLOYER_WETH_BALANCE = 7500;
  uint256 public constant INITIAL_ACTOR_WETH_BALANCE = 1000;
  uint256 public constant INITIAL_DEPLOYER_ETH_BALANCE = 7500;
  uint256 public constant INITIAL_ACTOR_USDC_BALANCE = 1000;

  function setUp() public virtual {
    vm.createSelectFork(vm.envString("MAINNET"));
    assertEq(block.chainid, 1);

    vm.label(address(usdcToken), "USDC");
    vm.label(address(wEth), "WETH");

    vm.startPrank(deployer);
    // 1e16 0.01 ether
    matchContract = new MatchContract(alice, daniel, 1e16);

    vm.label(address(matchContract), "match");

    vm.stopPrank();

    deal(address(wEth), deployer, INITIAL_DEPLOYER_WETH_BALANCE * 10 ** wEth.decimals());
    deal(address(usdcToken), deployer, INITIAL_DEPLOYER_USDC_BALANCE * 10 ** usdcToken.decimals());
    deal(address(usdcToken), alice, INITIAL_ACTOR_USDC_BALANCE * 10 ** usdcToken.decimals());
    deal(address(usdcToken), bob, INITIAL_ACTOR_USDC_BALANCE * 10 ** usdcToken.decimals());
    deal(address(usdcToken), charlie, INITIAL_ACTOR_USDC_BALANCE * 10 ** usdcToken.decimals());
  }
}
