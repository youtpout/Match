// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Fixture} from "test/foundry/Fixture.t.sol";
import {MatchLibrary} from "contracts/libraries/MatchLibrary.sol";

contract MatchTest is Fixture {
  function setUp() public override {
    super.setUp();
  }

  function test_Deposit() public {
    uint256 hundred_usdc = 100 * 10 ** usdcToken.decimals();
    bytes memory depositData = abi.encode(usdcToken, hundred_usdc);
    MatchLibrary.Action memory depositAction = MatchLibrary.Action(MatchLibrary.ActionType.Deposit, depositData);

    // test depositi of 100 usdc
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = depositAction;
    vm.startPrank(bob);
    usdcToken.approve(address(matchContract), hundred_usdc);
    matchContract.execute(actions);
    vm.stopPrank();

    // verify amount is correct
    uint256 amount = matchContract.usersBalances(bob, address(usdcToken));
    assertEq(amount, hundred_usdc);
  }
}
