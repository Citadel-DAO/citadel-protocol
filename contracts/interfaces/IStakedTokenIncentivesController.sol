// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

interface IStakedTokenIncentivesController {
    function claimRewards( address[] calldata assets, uint256 amount, address to ) external;
    function claimRewardsOnBehalf(address[] calldata assets, uint256 amount, address user, address to) external;
    function getRewardsBalance(address[] calldata assets, address user) external view returns (uint256);
    function getClaimer(address user) external view returns (address);
}

