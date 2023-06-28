//SPDX-License-Identifier: BUSL 1.1
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./libraries/MatchLibrary.sol";

contract Match {
  // State Variables
  address public owner;
  mapping(address => mapping(address => uint256)) usersBalances;
  mapping(address => mapping(address => MatchLibrary.Order[])) orders;

  error NotTheOwner();

  // Constructor: Called once on contract deployment
  // Check packages/hardhat/deploy/00_deploy_your_contract.ts
  constructor(address _owner) {
    owner = _owner;
  }

  // Modifier: used to define a set of rules that must be met before or after a function is executed
  // Check the withdraw() function
  modifier isOwner() {
    // msg.sender: predefined variable that represents address of the account that called the current function
    if (msg.sender != owner) {
      revert NotTheOwner();
    }
    _;
  }
}
