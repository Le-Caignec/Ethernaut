import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const privateKey = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://ethereum-goerli.publicnode.com",
      accounts: [privateKey || ""],
    },
  },
  solidity: "0.8.9",
};

export default config;
