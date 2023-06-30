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
    // test deposit of 100 usdc
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = matchContract.getActionDeposit(address(usdcToken), hundred_usdc);
    vm.startPrank(bob);
    usdcToken.approve(address(matchContract), hundred_usdc);

    // test event
    vm.expectEmit(address(usdcToken));
    emit Transfer(bob, address(matchContract), hundred_usdc);

    vm.expectEmit(address(matchContract));
    emit Deposit(bob, address(usdcToken), hundred_usdc, hundred_usdc);

    matchContract.execute(actions);
    vm.stopPrank();

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

    // test deposit of 100 usdc
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = matchContract.getActionDeposit(address(usdcToken), hundred_usdc);
    vm.startPrank(bob);
    usdcToken.approve(address(matchContract), hundred_usdc);
    matchContract.execute(actions);

    assertEq(usdcToken.balanceOf(bob), balanceBob - hundred_usdc);

    // test withdraw
    actions[0] = matchContract.getActionWithdraw(address(usdcToken), ten_usdc);
    // test event
    vm.expectEmit(address(usdcToken));
    emit Transfer(address(matchContract), bob, ten_usdc);

    vm.expectEmit(address(matchContract));
    emit Withdraw(bob, bob, ten_usdc);
    matchContract.execute(actions);

    assertEq(usdcToken.balanceOf(bob), balanceBob - ninety);
    // verify amount is correct
    uint256 amount = matchContract.usersBalances(bob, address(usdcToken));
    assertEq(amount, ninety);

    vm.stopPrank();
  }

  function test_WithdrawTo() public {
    uint256 balanceBob = usdcToken.balanceOf(bob);
    uint256 balanceAlice = usdcToken.balanceOf(alice);
    uint256 hundred_usdc = 100 * 10 ** usdcToken.decimals();
    uint256 ten_usdc = 10 * 10 ** usdcToken.decimals();
    uint256 ninety = hundred_usdc - ten_usdc;

    // test deposit of 100 usdc
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = matchContract.getActionDeposit(address(usdcToken), hundred_usdc);
    vm.startPrank(bob);
    usdcToken.approve(address(matchContract), hundred_usdc);
    matchContract.execute(actions);

    assertEq(usdcToken.balanceOf(bob), balanceBob - hundred_usdc);

    // test withdraw
    actions[0] = matchContract.getActionWithdrawTo(address(usdcToken), alice, ten_usdc);
    // test event
    vm.expectEmit(address(usdcToken));
    emit Transfer(address(matchContract), alice, ten_usdc);

    vm.expectEmit(address(matchContract));
    emit Withdraw(bob, alice, ten_usdc);
    matchContract.execute(actions);

    // verify amount is correct
    assertEq(usdcToken.balanceOf(alice), balanceAlice + ten_usdc);
    uint256 amount = matchContract.usersBalances(bob, address(usdcToken));
    assertEq(amount, ninety);

    vm.stopPrank();
  }

  function test_AddOrder() public {
    uint256 hundred_usdc = 100 * 10 ** usdcToken.decimals();
    deal(bob, 1 ether);
    vm.startPrank(bob);
    // test add order
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = matchContract.getActionAddOrder(
      address(usdcToken),
      address(1),
      0.1 ether,
      uint128(hundred_usdc),
      0.5 ether
    );

    // test event
    MatchLibrary.Order memory newOrder = MatchLibrary.Order(
      MatchLibrary.OrderStatus.Active,
      address(bob),
      // 10 % tax on reward go directly on platform
      0.09 ether,
      uint128(hundred_usdc),
      0.5 ether,
      uint128(hundred_usdc),
      0.5 ether
    );
    vm.expectEmit(true, true, true, true, address(matchContract));
    emit AddOrder(bob, address(usdcToken), address(1), 0, newOrder);
    matchContract.execute{value: 0.1 ether}(actions);

    MatchLibrary.Order memory orderStorage = matchContract.getOrder(address(usdcToken), address(1), 0);
    assertEq(uint8(orderStorage.status), uint8(MatchLibrary.OrderStatus.Active));

    assertEq(matchContract.countOrders(address(usdcToken), address(1)), 1);
    vm.stopPrank();
  }

  function test_Cancel() public {
    uint256 hundred_usdc = 100 * 10 ** usdcToken.decimals();
    deal(bob, 1 ether);
    vm.startPrank(bob);
    // test add order
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](1);
    actions[0] = matchContract.getActionAddOrder(
      address(usdcToken),
      address(1),
      0.1 ether,
      uint128(hundred_usdc),
      0.5 ether
    );
    matchContract.execute{value: 0.1 ether}(actions);

    actions[0] = matchContract.getActionCancel(address(usdcToken), address(1), 0);

    // test event
    MatchLibrary.Order memory newOrder = MatchLibrary.Order(
      MatchLibrary.OrderStatus.Canceled,
      address(bob),
      0 ether,
      uint128(hundred_usdc),
      0.5 ether,
      uint128(hundred_usdc),
      0.5 ether
    );
    vm.expectEmit(true, true, true, true, address(matchContract));
    emit CancelOrder(bob, address(usdcToken), address(1), 0, newOrder);
    matchContract.execute(actions);

    MatchLibrary.Order memory orderStorage = matchContract.getOrder(address(usdcToken), address(1), 0);
    assertEq(uint8(orderStorage.status), uint8(MatchLibrary.OrderStatus.Canceled));

    assertEq(matchContract.countOrders(address(usdcToken), address(1)), 1);
    vm.stopPrank();
  }

  function test_Match() public {
    uint256 hundred_usdc = 100 * 10 ** usdcToken.decimals();
    deal(bob, 1 ether);
    deal(alice, 1 ether);
    vm.startPrank(bob);
    //  deposit of 100 usdc
    usdcToken.approve(address(matchContract), hundred_usdc);
    MatchLibrary.Action[] memory actions = new MatchLibrary.Action[](2);
    actions[0] = matchContract.getActionDeposit(address(usdcToken), hundred_usdc);
    actions[1] = matchContract.getActionAddOrder(
      address(usdcToken),
      address(1),
      0.1 ether,
      uint128(hundred_usdc),
      0.5 ether
    );
    matchContract.execute{value: 0.1 ether}(actions);
    vm.stopPrank();

    vm.startPrank(alice);
    actions[0] = matchContract.getActionDeposit(address(1), 0.5 ether);
    actions[1] = matchContract.getActionAddOrder(
      address(1),
      address(usdcToken),
      0.1 ether,
      0.5 ether,
      uint128(hundred_usdc)
    );
    matchContract.execute{value: 0.6 ether}(actions);
    vm.stopPrank();

    vm.startPrank(deployer);
    //actions = new MatchLibrary.Action[](1);
    actions[0] = matchContract.getActionMatch(address(usdcToken), address(1), 0, 0);
    actions[1] = matchContract.getActionWithdraw(address(1), 0.18 ether);
    matchContract.execute(actions);

    uint256 balance = matchContract.usersBalances(deployer, address(1));
    console.log("balance deployer %s", balance);
    vm.stopPrank();
  }
}
