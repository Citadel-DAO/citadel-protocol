const hre = require('hardhat');
const { ethers } = hre;


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

    // Deploy wBTC
    const WBTC = await ethers.getContractFactory('wBTC');
    const wBTC = await WBTC.deploy( 0 );
    console.log("Deployed wBTC to", wBTC.address);

    // Mint 10,000,000 mock wBTC
    await wBTC.mint( deployer.address, initialMint );
    console.log("Minted 10,000,000 mock wBTC");

    const Authority = await ethers.getContractFactory("CitadelAuthority");
    const authority = await Authority.deploy(
        deployer.address,
        deployer.address,
        deployer.address,
        deployer.address
    );

    // Deploy CTDL
    const CTDL = await ethers.getContractFactory('CitadelERC20Token');
    const ctdl = await CTDL.deploy( authority.address );
    console.log("Deployed CTDL to", ctdl.address);

    // Deploy sCTDL
    const SCTDL = await ethers.getContractFactory('sCitadel');
    const sCTDL = await SCTDL.deploy();
    console.log("Deployed sCTDL to", sCTDL.address);

    // DEV TODO see contract details, needs to be changed
    const GCTDL = await ethers.getContractFactory("gCTDL");
    const gCTDL = await GCTDL.deploy(sCTDL.address);
    console.log("Deployed gCTDL to", gCTDL.address);

    // Deploy staking
    const Staking = await ethers.getContractFactory('CitadelStaking');
    const staking = await Staking.deploy( ctdl.address, sCTDL.address, gCTDL.address, epochLengthInBlocks, firstEpochNumber, firstEpochBlock, authority.address );
    console.log("Deployed Staking to", staking.address);

    // Set the mint authority for gCTDL as staking
    await gCTDL.setAuthority(staking.address);
    console.log("Give Staking contract mint permissions for gCTDL");

    // Deploy bonding calculator
    const CitadelBondingCalculator = await ethers.getContractFactory('CitadelBondingCalculator');
    const citadelBondingCalculator = await CitadelBondingCalculator.deploy( ctdl.address );
    console.log("Deployed CitadelBondingCalculator to", citadelBondingCalculator.address);



    // Deploy treasury
    const Treasury = await ethers.getContractFactory('CitadelTreasury'); 
    const treasury = await Treasury.deploy( ctdl.address, wBTC.address, authority.address );
    console.log("Deployed Treasury to", treasury.address);

    //TODO enable timelock for treasury


    //TODO replaced migrator with authority.address in below 2 lines
    await treasury.queueTimelock("0", authority.address, authority.address);
    await treasury.queueTimelock("8", authority.address, authority.address);
    await treasury.queueTimelock("2", wBTC.address, wBTC.address);

    await authority.pushVault(treasury.address, true);

    // Deploy staking distributor
    const Distributor = await ethers.getContractFactory('Distributor');
    const distributor = await Distributor.deploy(treasury.address, ctdl.address, sCTDL.address, authority.address);
    console.log("Deployed Distributor to", distributor.address);

    // Initialize sohm
    await sCTDL.setIndex("7675210820");
    await sCTDL.setgCTDL(gCTDL.address);
    await sCTDL.initialize(staking.address, treasury.address);

    console.log("setting distributor")

    await staking.setDistributor(distributor.address);

    console.log("executing treasury");

    await treasury.execute("0");
    await treasury.execute("1");
    await treasury.execute("2");
    await treasury.execute("3");
    await treasury.execute("4");

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