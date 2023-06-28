// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.17;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
library TransferHelper {
    bytes32 constant transferFromFailedSign = keccak256("TransferFromFailed()");
    bytes32 constant transferFailedSign = keccak256("TransferFailed()");
    bytes32 constant ethTransferFailedSign = keccak256("ETHTransferFailed()");

    address public constant ETH = address(1);

    bytes4 constant transferSign = 0xa9059cbb;
    bytes4 constant transferFromSign = 0x23b872dd;
    bytes4 constant balanceSign = 0x70a08231;

    error TransferFailed();
    error ETHTransferFailed();
    error TransferFromFailed();

    function safeTransfer(address token, address to, uint256 value) internal {
        if (token == ETH) {
            safeTransferETH(to, value);
        } else {
            _safeTransfer(token, to, value);
        }
    }

    function _safeTransfer(address token, address to, uint256 value) internal {
        bytes32 errorMsg = transferFailedSign;
        assembly {
            let ptr := mload(0x40)
            // store call parameters
            mstore(ptr, transferSign)
            mstore(add(ptr, 0x4), to)
            mstore(add(ptr, 0x24), value)

            // (bool success, bytes memory data) = token.call(
            //     abi.encodeWithSelector(IERC20.transfer.selector, to, value)
            // );
            let result := call(gas(), token, 0, ptr, 0x44, 0, 0)

            // check if call was succesfull, else revert
            if iszero(result) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }

            // if (!success || (data.length > 0 && !abi.decode(data, (bool)))) {
            //     revert TransferFailed();
            // }
            if gt(returndatasize(), 0) {
                returndatacopy(0x80, 0x0, 0x20)
                let data := mload(0x80)
                if iszero(eq(data, 1)) {
                    // signature TransferFailed()
                    mstore(0, errorMsg)
                    revert(0, 0x20)
                }
            }
        }
    }

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        if (token == ETH) {
            safeTransferETH(to, value);
        } else {
            _safeTransferFrom(token, from, to, value);
        }
    }

    function _safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) private {
        bytes32 errorMsg = transferFromFailedSign;
        assembly {
            let ptr := mload(0x40)
            // store call parameters
            mstore(ptr, transferFromSign)
            mstore(add(ptr, 0x4), from)
            mstore(add(ptr, 0x24), to)
            mstore(add(ptr, 0x44), value)

            // (bool success, bytes memory data) = token.call(
            //     abi.encodeWithSelector(IERC20.transferFrom.selector,from, to, value)
            // );
            let result := call(gas(), token, 0, ptr, 0x64, 0, 0)

            // check if call was succesfull, else revert

            if iszero(result) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }

            //  if (!success || (data.length > 0 && !abi.decode(data, (bool)))) {
            //      revert TransferFromFailed(); }
            if gt(returndatasize(), 0) {
                returndatacopy(0x80, 0x0, 0x20)
                let data := mload(0x80)
                if iszero(eq(data, 1)) {
                    // signature TransferFromFailed()
                    mstore(0, errorMsg)
                    revert(0, 0x20)
                }
            }
        }
    }

    function safeTransferETH(address to, uint256 value) internal {
        bytes32 errorMsg = ethTransferFailedSign;
        assembly {
            let result := call(gas(), to, value, 0, 0, 0, 0)

            // check if call was succesfull, else revert
            if iszero(result) {
                // signature ETHTransferFailed()
                mstore(0, errorMsg)
                revert(0, 0x20)
            }
        }
    }
}
