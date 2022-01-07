// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;


import { Address } from "@openzeppelin/contracts/utils/Address.sol";
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "../libraries/Ownable.sol";
import { ILendingPool } from "../interfaces/ILendingPool.sol";
import { ITreasury } from "../interfaces/ITreasury.sol";
import { IStakedTokenIncentivesController } from "../interfaces/IStakedTokenIncentivesController.sol";
import { ISett } from "../interfaces/ISett.sol";
import { console } from "hardhat/console.sol";
import { ICurveZap } from "../interfaces/ICurveZap.sol";


/**
 *  Contract deploys reserves from treasury inibBTC vault
 *  earning interest and $stkIBBTC
 */

contract ibBTCSettAllocator is Ownable {

    /* ======== DEPENDENCIES ======== */

    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    /* ======== STATE VARIABLES ======== */

    ITreasury public immutable treasury; // Citadel Treasury

    IERC20 public immutable wBTC; // wBTC token

    ICurveZap public constant CURVE_IBBTC_DEPOSIT_ZAP =
        ICurveZap(0xbba4b444FD10302251d9F5797E763b0d912286A1); // Ibbtc crv deposit zap

    ISett public constant IBBTC_VAULT =
        ISett(0xaE96fF08771a109dc6650a1BdCa62F2d558E40af); // Ibbtc crv lp badger vault

    address public constant CURVE_IBBTC_METAPOOL =
        0xFbdCA68601f835b27790D98bbb8eC7f05FDEaA9B; // Ibbtc crv metapool

    address public constant CURVE_POOL =
        0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714; // curve pool

    uint256 public constant MAXIMUM_UINT256 = 2 ** 256 - 1;
    

    /* ======== CONSTRUCTOR ======== */

    constructor ( address _treasury, IERC20 _wBTC ) {
        require( _treasury != address(0) );
        treasury = ITreasury( _treasury );

        //DEV this is for testing
        wBTC = _wBTC;

        _wBTC.approve(CURVE_POOL, MAXIMUM_UINT256);
        _wBTC.approve( address(CURVE_IBBTC_DEPOSIT_ZAP), MAXIMUM_UINT256);
    }

    /* ======== POLICY FUNCTIONS ======== */

    /**
     *  @notice withdraws want from treasury, purchases curve lp tokens then deposits in sett
     *  @param _amount uint256
     */
    function deposit( uint256 _amount ) public onlyPolicy() {

        // retrieve amount of asset from treasury
        console.log('calling manage on treasury');
        treasury.manage( address( wBTC ), _amount );

        // initialize deposit amounts for curve
        uint256[4] memory _depositAmounts;
        _depositAmounts[2] = _amount;

        uint256 _vaultDepositAmount = CURVE_IBBTC_DEPOSIT_ZAP.add_liquidity(
            CURVE_IBBTC_METAPOOL,
            _depositAmounts,
            uint256(0)
        );
        console.log("success");


        IBBTC_VAULT.deposit(_vaultDepositAmount);

    }

    /**
     *  @notice withdraws vaultToken from treasury, withdraws from lending pool, and deposits asset into treasury
     *  @param _amount uint
     */
    function withdraw( uint256 _amount ) public onlyPolicy() {

        uint256 _burnAmount = IBBTC_VAULT.balanceOf( address(this) );

        IBBTC_VAULT.withdraw( _amount );


        uint256 _amountOut = CURVE_IBBTC_DEPOSIT_ZAP.remove_liquidity_one_coin(
            CURVE_IBBTC_METAPOOL,
            _burnAmount,
            int128( 2 ),
            0
        );
        
        treasury.deposit( _amountOut, address( wBTC ), treasury.tokenValue( address(wBTC), _amountOut ) ); // return funds to treasury
    }

}
