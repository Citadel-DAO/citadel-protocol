// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.7.5;

import "../interfaces/IERC20.sol";
import "../interfaces/IsCTDL.sol";
import "../interfaces/IwsCTDL.sol";
import "../interfaces/IgCTDL.sol";
import "../interfaces/ITreasury.sol";
import "../interfaces/IStaking.sol";
import "../interfaces/IOwnable.sol";
import "../interfaces/IUniswapV2Router.sol";
import "../interfaces/IStakingV1.sol";
import "../interfaces/ITreasuryV1.sol";

import "../types/CitadelAccessControlled.sol";

import "../libraries/SafeMath.sol";
import "../libraries/SafeERC20.sol";


contract CitadelTokenMigrator is CitadelAccessControlled {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using SafeERC20 for IgCTDL;
    using SafeERC20 for IsCTDL;
    using SafeERC20 for IwsCTDL;

    /* ========== MIGRATION ========== */

    event TimelockStarted(uint256 block, uint256 end);
    event Migrated(address staking, address treasury);
    event Funded(uint256 amount);
    event Defunded(uint256 amount);

    /* ========== STATE VARIABLES ========== */

    IERC20 public immutable oldCTDL;
    IsCTDL public immutable oldsCTDL;
    IwsCTDL public immutable oldwsCTDL;
    ITreasuryV1 public immutable oldTreasury;
    IStakingV1 public immutable oldStaking;

    IUniswapV2Router public immutable sushiRouter;
    IUniswapV2Router public immutable uniRouter;

    IgCTDL public gCTDL;
    ITreasury public newTreasury;
    IStaking public newStaking;
    IERC20 public newCTDL;

    bool public ohmMigrated;
    bool public shutdown;

    uint256 public immutable timelockLength;
    uint256 public timelockEnd;

    uint256 public oldSupply;

    constructor(
        address _oldCTDL,
        address _oldsCTDL,
        address _oldTreasury,
        address _oldStaking,
        address _oldwsCTDL,
        address _sushi,
        address _uni,
        uint256 _timelock,
        address _authority
    ) CitadelAccessControlled(ICitadelAuthority(_authority)) {
        require(_oldCTDL != address(0), "Zero address: CTDL");
        oldCTDL = IERC20(_oldCTDL);
        require(_oldsCTDL != address(0), "Zero address: sCTDL");
        oldsCTDL = IsCTDL(_oldsCTDL);
        require(_oldTreasury != address(0), "Zero address: Treasury");
        oldTreasury = ITreasuryV1(_oldTreasury);
        require(_oldStaking != address(0), "Zero address: Staking");
        oldStaking = IStakingV1(_oldStaking);
        require(_oldwsCTDL != address(0), "Zero address: wsCTDL");
        oldwsCTDL = IwsCTDL(_oldwsCTDL);
        require(_sushi != address(0), "Zero address: Sushi");
        sushiRouter = IUniswapV2Router(_sushi);
        require(_uni != address(0), "Zero address: Uni");
        uniRouter = IUniswapV2Router(_uni);
        timelockLength = _timelock;
    }

    /* ========== MIGRATION ========== */

    enum TYPE {
        UNSTAKED,
        STAKED,
        WRAPPED
    }

    // migrate CTDLv1, sCTDLv1, or wsCTDL for CTDLv2, sCTDLv2, or gCTDL
    function migrate(
        uint256 _amount,
        TYPE _from,
        TYPE _to
    ) external {
        require(!shutdown, "Shut down");

        uint256 wAmount = oldwsCTDL.sCTDLTowCTDL(_amount);

        if (_from == TYPE.UNSTAKED) {
            require(ohmMigrated, "Only staked until migration");
            oldCTDL.safeTransferFrom(msg.sender, address(this), _amount);
        } else if (_from == TYPE.STAKED) {
            oldsCTDL.safeTransferFrom(msg.sender, address(this), _amount);
        } else {
            oldwsCTDL.safeTransferFrom(msg.sender, address(this), _amount);
            wAmount = _amount;
        }

        if (ohmMigrated) {
            require(oldSupply >= oldCTDL.totalSupply(), "CTDLv1 minted");
            _send(wAmount, _to);
        } else {
            gCTDL.mint(msg.sender, wAmount);
        }
    }

    // migrate all olympus tokens held
    function migrateAll(TYPE _to) external {
        require(!shutdown, "Shut down");

        uint256 ohmBal = 0;
        uint256 sCTDLBal = oldsCTDL.balanceOf(msg.sender);
        uint256 wsCTDLBal = oldwsCTDL.balanceOf(msg.sender);

        if (oldCTDL.balanceOf(msg.sender) > 0 && ohmMigrated) {
            ohmBal = oldCTDL.balanceOf(msg.sender);
            oldCTDL.safeTransferFrom(msg.sender, address(this), ohmBal);
        }
        if (sCTDLBal > 0) {
            oldsCTDL.safeTransferFrom(msg.sender, address(this), sCTDLBal);
        }
        if (wsCTDLBal > 0) {
            oldwsCTDL.safeTransferFrom(msg.sender, address(this), wsCTDLBal);
        }

        uint256 wAmount = wsCTDLBal.add(oldwsCTDL.sCTDLTowCTDL(ohmBal.add(sCTDLBal)));
        if (ohmMigrated) {
            require(oldSupply >= oldCTDL.totalSupply(), "CTDLv1 minted");
            _send(wAmount, _to);
        } else {
            gCTDL.mint(msg.sender, wAmount);
        }
    }

    // send preferred token
    function _send(uint256 wAmount, TYPE _to) internal {
        if (_to == TYPE.WRAPPED) {
            gCTDL.safeTransfer(msg.sender, wAmount);
        } else if (_to == TYPE.STAKED) {
            newStaking.unwrap(msg.sender, wAmount);
        } else if (_to == TYPE.UNSTAKED) {
            newStaking.unstake(msg.sender, wAmount, false, false);
        }
    }

    // bridge back to CTDL, sCTDL, or wsCTDL
    function bridgeBack(uint256 _amount, TYPE _to) external {
        if (!ohmMigrated) {
            gCTDL.burn(msg.sender, _amount);
        } else {
            gCTDL.safeTransferFrom(msg.sender, address(this), _amount);
        }

        uint256 amount = oldwsCTDL.wCTDLTosCTDL(_amount);
        // error throws if contract does not have enough of type to send
        if (_to == TYPE.UNSTAKED) {
            oldCTDL.safeTransfer(msg.sender, amount);
        } else if (_to == TYPE.STAKED) {
            oldsCTDL.safeTransfer(msg.sender, amount);
        } else if (_to == TYPE.WRAPPED) {
            oldwsCTDL.safeTransfer(msg.sender, _amount);
        }
    }

    /* ========== OWNABLE ========== */

    // halt migrations (but not bridging back)
    function halt() external onlyPolicy {
        require(!ohmMigrated, "Migration has occurred");
        shutdown = !shutdown;
    }

    // withdraw backing of migrated CTDL
    function defund(address reserve) external onlyGovernor {
        require(ohmMigrated, "Migration has not begun");
        require(timelockEnd < block.number && timelockEnd != 0, "Timelock not complete");

        oldwsCTDL.unwrap(oldwsCTDL.balanceOf(address(this)));

        uint256 amountToUnstake = oldsCTDL.balanceOf(address(this));
        oldsCTDL.approve(address(oldStaking), amountToUnstake);
        oldStaking.unstake(amountToUnstake, false);

        uint256 balance = oldCTDL.balanceOf(address(this));

        if(balance > oldSupply) {
            oldSupply = 0;
        } else {
            oldSupply -= balance;
        }

        uint256 amountToWithdraw = balance.mul(1e9);
        oldCTDL.approve(address(oldTreasury), amountToWithdraw);
        oldTreasury.withdraw(amountToWithdraw, reserve);
        IERC20(reserve).safeTransfer(address(newTreasury), IERC20(reserve).balanceOf(address(this)));

        emit Defunded(balance);
    }

    // start timelock to send backing to new treasury
    function startTimelock() external onlyGovernor {
        require(timelockEnd == 0, "Timelock set");
        timelockEnd = block.number.add(timelockLength);

        emit TimelockStarted(block.number, timelockEnd);
    }

    // set gCTDL address
    function setgCTDL(address _gCTDL) external onlyGovernor {
        require(address(gCTDL) == address(0), "Already set");
        require(_gCTDL != address(0), "Zero address: gCTDL");

        gCTDL = IgCTDL(_gCTDL);
    }

    // call internal migrate token function
    function migrateToken(address token) external onlyGovernor {
        _migrateToken(token, false);
    }

    /**
     *   @notice Migrate LP and pair with new CTDL
     */
    function migrateLP(
        address pair,
        bool sushi,
        address token,
        uint256 _minA,
        uint256 _minB
    ) external onlyGovernor {
        uint256 oldLPAmount = IERC20(pair).balanceOf(address(oldTreasury));
        oldTreasury.manage(pair, oldLPAmount);

        IUniswapV2Router router = sushiRouter;
        if (!sushi) {
            router = uniRouter;
        }

        IERC20(pair).approve(address(router), oldLPAmount);
        (uint256 amountA, uint256 amountB) = router.removeLiquidity(
            token, 
            address(oldCTDL), 
            oldLPAmount,
            _minA, 
            _minB, 
            address(this), 
            block.timestamp
        );

        newTreasury.mint(address(this), amountB);

        IERC20(token).approve(address(router), amountA);
        newCTDL.approve(address(router), amountB);

        router.addLiquidity(
            token, 
            address(newCTDL), 
            amountA, 
            amountB, 
            amountA, 
            amountB, 
            address(newTreasury), 
            block.timestamp
        );
    }

    // Failsafe function to allow owner to withdraw funds sent directly to contract in case someone sends non-ohm tokens to the contract
    function withdrawToken(
        address tokenAddress,
        uint256 amount,
        address recipient
    ) external onlyGovernor {
        require(tokenAddress != address(0), "Token address cannot be 0x0");
        require(tokenAddress != address(gCTDL), "Cannot withdraw: gCTDL");
        require(tokenAddress != address(oldCTDL), "Cannot withdraw: old-CTDL");
        require(tokenAddress != address(oldsCTDL), "Cannot withdraw: old-sCTDL");
        require(tokenAddress != address(oldwsCTDL), "Cannot withdraw: old-wsCTDL");
        require(amount > 0, "Withdraw value must be greater than 0");
        if (recipient == address(0)) {
            recipient = msg.sender; // if no address is specified the value will will be withdrawn to Owner
        }

        IERC20 tokenContract = IERC20(tokenAddress);
        uint256 contractBalance = tokenContract.balanceOf(address(this));
        if (amount > contractBalance) {
            amount = contractBalance; // set the withdrawal amount equal to balance within the account.
        }
        // transfer the token from address of this contract
        tokenContract.safeTransfer(recipient, amount);
    }

    // migrate contracts
    function migrateContracts(
        address _newTreasury,
        address _newStaking,
        address _newCTDL,
        address _newsCTDL,
        address _reserve
    ) external onlyGovernor {
        require(!ohmMigrated, "Already migrated");
        ohmMigrated = true;
        shutdown = false;

        require(_newTreasury != address(0), "Zero address: Treasury");
        newTreasury = ITreasury(_newTreasury);
        require(_newStaking != address(0), "Zero address: Staking");
        newStaking = IStaking(_newStaking);
        require(_newCTDL != address(0), "Zero address: CTDL");
        newCTDL = IERC20(_newCTDL);

        oldSupply = oldCTDL.totalSupply(); // log total supply at time of migration

        gCTDL.migrate(_newStaking, _newsCTDL); // change gCTDL minter

        _migrateToken(_reserve, true); // will deposit tokens into new treasury so reserves can be accounted for

        _fund(oldsCTDL.circulatingSupply()); // fund with current staked supply for token migration

        emit Migrated(_newStaking, _newTreasury);
    }

    /* ========== INTERNAL FUNCTIONS ========== */

    // fund contract with gCTDL
    function _fund(uint256 _amount) internal {
        newTreasury.mint(address(this), _amount);
        newCTDL.approve(address(newStaking), _amount);
        newStaking.stake(address(this), _amount, false, true); // stake and claim gCTDL

        emit Funded(_amount);
    }

    /**
     *   @notice Migrate token from old treasury to new treasury
     */
    function _migrateToken(address token, bool deposit) internal {
        uint256 balance = IERC20(token).balanceOf(address(oldTreasury));

        uint256 excessReserves = oldTreasury.excessReserves();
        uint256 tokenValue = oldTreasury.valueOf(token, balance);

        if (tokenValue > excessReserves) {
            tokenValue = excessReserves;
            balance = excessReserves * 10**9;
        }

        oldTreasury.manage(token, balance);

        if (deposit) {
            IERC20(token).safeApprove(address(newTreasury), balance);
            newTreasury.deposit(balance, token, tokenValue);
        } else {
            IERC20(token).safeTransfer(address(newTreasury), balance);
        }
    }
}
