const hre = require('hardhat');

async function main() {

    const DonationTracking = await hre.ethers.getContractFactory("DonationTracking")
    const donationTracking = await DonationTracking.deploy();

    await donationTracking.deployed();

    console.log("Factory deployed to:", donationTracking.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });