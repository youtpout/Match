// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Fixture} from "test/foundry/Fixture.t.sol";
import {MatchLibrary} from "contracts/libraries/MatchLibrary.sol";
import {Test, Vm} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";

contract MatchTest is Fixture {
  function setUp() public override {
    super.setUp();
  }

  function test_Deposit() public {
    uint256 balanceBob = usdcToken.balanceOf(bob);
    uint256 hundred_usdc = 100 * 10 ** usdcToken.decimals();
    bytes memory depositData = abi.encode(usdcToken, hundred_usdc);
    MatchLibrary.Action memory depositAction = MatchLibrary.Action(MatchLibrary.ActionType.Deposit, depositData);

    // test depositi of 100 usdc
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = depositAction;
    vm.startPrank(bob);
    usdcToken.approve(address(matchContract), hundred_usdc);
    vm.recordLogs();
    matchContract.execute(actions);
    Vm.Log[] memory entries = vm.getRecordedLogs();
    vm.stopPrank();

    // verify event, entries 0 is transfer event from token, so entries 1 is the deposit event
    assertEq(entries[1].topics.length, 3);
    assertEq(entries[1].topics[0], keccak256("Deposit(address,address,uint256,uint256)"));
    assertEq(addressFromBytes32(entries[1].topics[1]), address(bob));
    assertEq(addressFromBytes32(entries[1].topics[2]), address(usdcToken));
    // assertEq won't compare bytes variables. Try with strings instead.
    (uint256 desiredAmount, uint256 depositedAmount) = abi.decode(entries[1].data, (uint256, uint256));
    assertEq(desiredAmount, hundred_usdc);
    assertEq(depositedAmount, hundred_usdc);

    // verify amount is correct
    uint256 amount = matchContract.usersBalances(bob, address(usdcToken));
    assertEq(amount, hundred_usdc);
    assertEq(usdcToken.balanceOf(bob), balanceBob - hundred_usdc);
  }

  function test_Withdraw() public {
    uint256 balanceBob = usdcToken.balanceOf(bob);
    uint256 hundred_usdc = 100 * 10 ** usdcToken.decimals();
    uint256 ten_usdc = 10 * 10 ** usdcToken.decimals();
    uint256 ninety = hundred_usdc - ten_usdc;

    bytes memory depositData = abi.encode(usdcToken, hundred_usdc);
    MatchLibrary.Action memory depositAction = MatchLibrary.Action(MatchLibrary.ActionType.Deposit, depositData);

    // test deposit of 100 usdc
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = depositAction;
    vm.startPrank(bob);
    usdcToken.approve(address(matchContract), hundred_usdc);
    matchContract.execute(actions);

    assertEq(usdcToken.balanceOf(bob), balanceBob - hundred_usdc);

    // withdraw of 10 usdc
    bytes memory withdrawData = abi.encode(usdcToken, ten_usdc);
    MatchLibrary.Action memory withdrawAction = MatchLibrary.Action(MatchLibrary.ActionType.Withdraw, withdrawData);

    // test withdraw
    actions[0] = withdrawAction;
    matchContract.execute(actions);

    assertEq(usdcToken.balanceOf(bob), balanceBob - ninety);
    // verify amount is correct
    uint256 amount = matchContract.usersBalances(bob, address(usdcToken));
    assertEq(amount, ninety);

    vm.stopPrank();
  }

  function addressFromBytes32(bytes32 data) private pure returns (address) {
    return address(uint160(uint256(data)));
  }
}
