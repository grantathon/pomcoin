const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 3;

require("dotenv").config({path: "./.env"});

module.exports = {
  plugins: [
    "truffle-plugin-verify"
  ],
  api_keys: {
    bscscan: process.env.BSCSCANAPIKEY
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", AccountIndex),
      network_id: 5777
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://data-seed-prebsc-1-s1.binance.org:8545", AccountIndex),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    // bsc_mainnet: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
    //   network_id: 56,
    //   confirmations: 10,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // },
  },
  compilers: {
    solc: {
      version: "0.6.12",
    },
  },
};
