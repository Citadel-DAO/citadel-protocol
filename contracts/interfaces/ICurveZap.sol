// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

interface ICurveZap {
    function add_liquidity(
        address _pool,
        uint256[4] calldata _deposit_amounts, // @notice 4 because we have ibbtc, renBTC, wBTC, sBTC
        uint256 _min_mint_amount
    ) external returns (uint256);

    function remove_liquidity_one_coin(
        address _pool,
        uint256 _burnAmount,
        int128 i,
        uint256 _min_amount
    ) external returns (uint256);

    function calc_token_amount(
        address _pool,
        uint256[4] calldata _amounts,
        bool _is_deposit
    ) external view returns (uint256);
}