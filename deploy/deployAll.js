const hre = require('hardhat');
const { ethers } = hre;

/* ======== ALLOCATOR (CurveBadger) ======== */

// The token the allocator wants
const allocatorWant = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';

// The curve pool to use
const allocatorCurve = '0xFbdCA68601f835b27790D98bbb8eC7f05FDEaA9B';

// The Badger sett to use
const allocatorSett = '0xaE96fF08771a109dc6650a1BdCa62F2d558E40af';


/* ======== PARAMS ======== */

// Initial mint for wBTC (10,000,000)
const initialMint = '10000000000000000000000000';

// How many blocks are in each epoch
const epochLengthInBlocks = '2200';
console.log(`There are ${epochLengthInBlocks} blocks in each epoch`);

// First block epoch occurs
const firstEpochBlock = '8961000';
console.log(`The first epoch occurs at block ${firstEpochBlock}`);

// Ethereum 0 address, used when toggling changes in treasury
const zeroAddress = '0x0000000000000000000000000000000000000000';

// Initial staking index
const initialIndex = '7675210820';
console.log(`The initial staking index is ${initialIndex}`);

// Initial reward rate per epoch
const initialRewardRate = '3000';
console.log(`The initial reward rate is ${initialRewardRate} per epoch`);

// What epoch will be first epoch
const firstEpochNumber = '338';
console.log(`The first epoch will be ${firstEpochNumber}`);

// wBTC bond BCV
const wBTCBondBCV = '369';
console.log(`The wBTC bond bond control variable is ${wBTCBondBCV}`);

// Bond vesting length in blocks. 33110 ~ 5 days
const bondVestingLength = '33110';
console.log(`The bond vesting length is ${bondVestingLength} blocks`);

// Minimum bond price
const minBondPrice = '50000';
console.log(`The minimum bond price is ${minBondPrice}`);

// Max bond payout
const maxBondPayout = '50';
console.log(`The maximum bond payout is ${maxBondPayout}`);

// DAO fee for bond
const bondFee = '10000';
console.log(`The DAO fee for each bond is ${bondFee}`);

// Max debt bond can take on
const maxBondDebt = '1000000000000000';
console.log(`The maximum debt bond can take on is ${maxBondDebt}`);

// Initial Bond debt
const intialBondDebt = '0';
console.log(`The initial bond debt is ${intialBondDebt}`);

// Large number for approval for wBTC
const largeApproval = '100000000000000000000000000000000';

/* ======== DEPLOYMENT ======== */

module.exports = async () => {

    const [deployer, MockDAO] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    // Deploy CTDL
    const CTDL = await ethers.getContractFactory('CitadelERC20Token');
    const ctdl = await CTDL.deploy();
    console.log("Deployed CTDL to", ctdl.address);

    // Deploy wBTC
    const WBTC = await ethers.getContractFactory('wBTC');
    const wBTC = await WBTC.deploy( 0 );
    console.log("Deployed wBTC to", wBTC.address);

    // Mint 10,000,000 mock wBTC
    await wBTC.mint( deployer.address, initialMint );
    console.log("Minted 10,000,000 mock wBTC");

    // Deploy mock treasury
    const Treasury = await ethers.getContractFactory('MockCitadelTreasury'); 
    const treasury = await Treasury.deploy( ctdl.address, wBTC.address, 0 );
    console.log("Deployed Treasury to", treasury.address);

    // Deploy bonding calculator
    const CitadelBondingCalculator = await ethers.getContractFactory('CitadelBondingCalculator');
    const citadelBondingCalculator = await CitadelBondingCalculator.deploy( ctdl.address );
    console.log("Deployed CitadelBondingCalculator to", citadelBondingCalculator.address);

    // Deploy staking distributor
    const Distributor = await ethers.getContractFactory('Distributor');
    const distributor = await Distributor.deploy(treasury.address, ctdl.address, epochLengthInBlocks, firstEpochBlock);
    console.log("Deployed Distributor to", distributor.address);

    // Deploy sCTDL
    const SCTDL = await ethers.getContractFactory('sCitadel');
    const sCTDL = await SCTDL.deploy();
    console.log("Deployed sCTDL to", sCTDL.address);

    // Deploy staking
    const Staking = await ethers.getContractFactory('CitadelStaking');
    const staking = await Staking.deploy( ctdl.address, sCTDL.address, epochLengthInBlocks, firstEpochNumber, firstEpochBlock );
    console.log("Deployed Staking to", staking.address);

    // Deploy staking warmpup
    const StakingWarmup = await ethers.getContractFactory('StakingWarmup');
    const stakingWarmup = await StakingWarmup.deploy(staking.address, sCTDL.address);
    console.log("Deployed StakingWarmup to", stakingWarmup.address);

    // Deploy staking helper
    const StakingHelper = await ethers.getContractFactory('StakingHelper');
    const stakingHelper = await StakingHelper.deploy(staking.address, ctdl.address);
    console.log("Deployed StakingHelper to", stakingHelper.address);

    // Deploy wBTC bond
    const WBTCBond = await ethers.getContractFactory('MockCitadelBondDepository');
    const wBTCBond = await WBTCBond.deploy(ctdl.address, wBTC.address, treasury.address, MockDAO.address, zeroAddress);
    console.log("Deployed wBTCBond to", wBTCBond.address);

    // Queue and toggle wBTC bond reserve depositor
    await treasury.queue('0', wBTCBond.address)
    await treasury.toggle('0', wBTCBond.address, zeroAddress);
    console.log("Assigned and toggled ReserveDepositor permissions for wBTCBond");

    // Set wBTC bond terms
    await wBTCBond.initializeBondTerms(wBTCBondBCV, bondVestingLength, minBondPrice, maxBondPayout, bondFee, maxBondDebt, intialBondDebt)
    console.log("Initialized wBTC bond terms");

    // Set staking for wBTC bond
    await wBTCBond.setStaking(staking.address, stakingHelper.address);
    console.log("Set staking address for wBTC bonds");

    // Initialize sCTDL and set the index
    await sCTDL.initialize(staking.address);
    await sCTDL.setIndex(initialIndex);
    console.log("Initialized and set index for sCTDL");

    // Set distributor and warmup contracts
    await staking.setContract('0', distributor.address);
    await staking.setContract('1', stakingWarmup.address);
    console.log("Set the distributor and warmup contracts for staking");

    // Set treasury for CTDL token
    await ctdl.setVault(treasury.address);
    console.log("Set treasury as vault for CTDL");

    // Add staking contract as distributor recipient
    await distributor.addRecipient(staking.address, initialRewardRate);
    console.log("Added staking contract as Distributor recipient");

    // queue and toggle reward manager
    await treasury.queue('8', distributor.address);
    await treasury.toggle('8', distributor.address, zeroAddress);
    console.log("Assigned and toggled RewardManager permissions for Distributor");

    // queue and toggle deployer reserve depositor
    await treasury.queue('0', deployer.address);
    await treasury.toggle('0', deployer.address, zeroAddress);
    console.log("Assigned and toggled ReserveDepositor permissions for Deployer");

    // queue and toggle liquidity depositor
    await treasury.queue('4', deployer.address, );
    await treasury.toggle('4', deployer.address, zeroAddress);
    console.log("Assigned and toggled LiquidityDepositor permissions for Deployer");

    // Approve the treasury to spend wBTC
    await wBTC.approve(treasury.address, largeApproval );
    console.log("Approved treasury spending of wBTC");

    // Approve dai and frax bonds to spend deployer's DAI and Frax
    await wBTC.approve(wBTCBond.address, largeApproval );
    console.log("Approved bond contract spending of wBTC");

    // Approve staking and staking helper contact to spend deployer's CTDL
    await ctdl.approve(staking.address, largeApproval);
    await ctdl.approve(stakingHelper.address, largeApproval);
    console.log("Approved staking contract spending of CTDL");

    // Deposit 9,000,000 wBTC to treasury, 600,000 CTDL gets minted to deployer and 8,400,000 are in treasury as excesss reserves
    await treasury.deposit('9000000000000000000000000', wBTC.address, '8400000000000000');
    console.log("Deposited 9,000,000 wBTC to treasury. 600,000 CTDL minted to deployer. 8,400,000 CTDL remain in treasury")

    // Stake CTDL through helper
    await stakingHelper.stake('100000000000');
    console.log("Staked CTDL")

    // Bond 1,000 CTDL wBTC in the bonds
    await wBTCBond.deposit('1000000000000000000000', '60000', deployer.address );
    console.log("Bonded 1,000 CTDL wBTC");

    /*
    Allocator Configuration
    */

    // Deploy Allocator
    //const Allocator = await ethers.getContractFactory('ibBTCSettAllocator');
    //const allocator = await Allocator.deploy(treasury.address, wBTC.address);
    //console.log("Deployed the Allocator to", allocator.address);

    // Assign reserveManager permissions to the allocator
    //await treasury.queue('3', allocator.address);
    //await treasury.toggle('3', allocator.address, zeroAddress)
    //console.log("Assigned and toggled ReserveManager permissions for Allocator");


    console.log("\n\n---------------------------- TESTS ----------------------------\n")

    // call deposit on allocator
    //await allocator.deposit(100000);



    console.log("\n========= Contract Addresses =========");
    console.log( "CTDL: " + ctdl.address );
    console.log( "wBTC: " + wBTC.address );
    console.log( "Treasury: " + treasury.address );
    console.log( "Calc: " + citadelBondingCalculator.address );
    console.log( "Staking: " + staking.address );
    console.log( "sCTDL: " + sCTDL.address );
    console.log( "Distributor " + distributor.address);
    console.log( "Staking Wawrmup " + stakingWarmup.address);
    console.log( "Staking Helper " + stakingHelper.address);
    console.log("wBTC Bond: " + wBTCBond.address);
    //console.log("Allocator: " + allocator.address);
}