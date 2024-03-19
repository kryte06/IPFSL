/** @format */

const hre = require("hardhat");

async function main() {
  try {
    const IPFSL = await hre.ethers.getContractFactory("IPFSL");
    const ipfsl = await IPFSL.deploy();
    await ipfsl.waitForDeployment();

    console.log("deployed to : ", await ipfsl.getAddress());
  } catch (error) {
    console.error("Error deploying contract:", error);
    process.exit(1);
  }
}

main();
