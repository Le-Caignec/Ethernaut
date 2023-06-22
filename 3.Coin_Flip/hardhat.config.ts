import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers"; // Needed to use ethers.js

const privateKey =
  "32a952d982ceb716fa5f2db927e29b4fb457aff645c78503148cd950977d8309";

const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://ethereum-goerli.publicnode.com",
      accounts: [privateKey],
    },
  },
  solidity: "0.8.9",
};

export default config;
