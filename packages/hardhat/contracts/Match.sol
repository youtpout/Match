//SPDX-License-Identifier: BUSL 1.1
pragma solidity ^0.8.17;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./libraries/MatchLibrary.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/IERC20.sol";

contract Match {
  // State Variables
  address public owner;
  /// @dev first address is the user, second address is the token, uint256 is the user balance
  mapping(address => mapping(address => uint256)) usersBalances;
  /// @dev first address is the token to sell, second address is the token to buy, order is the order information for thes tokens
  mapping(address => mapping(address => MatchLibrary.Order[])) orders;

  event Deposit(address indexed user, address token, uint256 desiredAmount, uint256 depositedAmount);
  error NotTheOwner();
  error NoAction();
  error UnknowAction();

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

  function execute(MatchLibrary.Action[] calldata actions) external payable {
    if (actions.length == 0) {
      revert NoAction();
    }
    uint256 nativeAmount = msg.value;
    uint256 i;
    do {
      MatchLibrary.Action memory action = actions[i];
      if (action.actionType == MatchLibrary.ActionType.Deposit) {
        (uint256 amount, address token) = abi.decode(action.data, (uint256, address));
        uint256 depositedAmount;
        if (token == MatchLibrary.native) {
          nativeAmount -= amount;
          usersBalances[token][msg.sender] += amount;
          depositedAmount = amount;
        } else {
          uint256 balanceBefore = IERC20(token).balanceOf(address(this));
          TransferHelper.safeTransferFrom(token, msg.sender, address(this), amount);
          uint256 balance = balanceBefore - IERC20(token).balanceOf(address(this));
          // get the smaller for tax or reflection token
          depositedAmount = balance > amount ? amount : balance;
          usersBalances[token][msg.sender] += depositedAmount;
        }
        emit Deposit(msg.sender, token, amount, depositedAmount);
      }
      i++;
    } while (i < actions.length);
  }
}
