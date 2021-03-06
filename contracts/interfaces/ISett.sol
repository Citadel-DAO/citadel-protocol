// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

interface ISett {
    function token() external view returns (address);

    function keeper() external view returns (address);

    function deposit(uint256) external;

    function depositFor(address, uint256) external;

    function depositAll() external;

    function withdraw(uint256) external;

    function withdrawAll() external;

    function earn() external;

    function balance() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function totalSupply() external view returns (uint256);

    function claimInsurance() external; // NOTE: Only yDelegatedVault implements this

    function getPricePerFullShare() external view returns (uint256);
}