// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.7.5;

import "../interfaces/IERC20.sol";
import "../interfaces/IOwnable.sol";
import "../types/Ownable.sol";
import "../libraries/SafeERC20.sol";

contract CrossChainMigrator is Ownable {
    using SafeERC20 for IERC20;

    IERC20 internal immutable wsCTDL; // v1 token
    IERC20 internal immutable gCTDL; // v2 token

    constructor(address _wsCTDL, address _gCTDL) {
        require(_wsCTDL != address(0), "Zero address: wsCTDL");
        wsCTDL = IERC20(_wsCTDL);
        require(_gCTDL != address(0), "Zero address: gCTDL");
        gCTDL = IERC20(_gCTDL);
    }

    // migrate wsCTDL to gCTDL - 1:1 like kind
    function migrate(uint256 amount) external {
        wsCTDL.safeTransferFrom(msg.sender, address(this), amount);
        gCTDL.safeTransfer(msg.sender, amount);
    }

    // withdraw wsCTDL so it can be bridged on ETH and returned as more gCTDL
    function replenish() external onlyOwner {
        wsCTDL.safeTransfer(msg.sender, wsCTDL.balanceOf(address(this)));
    }

    // withdraw migrated wsCTDL and unmigrated gCTDL
    function clear() external onlyOwner {
        wsCTDL.safeTransfer(msg.sender, wsCTDL.balanceOf(address(this)));
        gCTDL.safeTransfer(msg.sender, gCTDL.balanceOf(address(this)));
    }
}