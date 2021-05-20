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
    // ganache-cli -f https://bsc-dataseed1.binance.org/
    // ganache-cli -f https://data-seed-prebsc-1-s1.binance.org:8545/
    development: {
      port: 8545,
      host: "127.0.0.1",
      network_id: "*"
    },
    // testnet: {
    //   provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://data-seed-prebsc-1-s1.binance.org:8545", AccountIndex),
    //   network_id: 97,
    //   confirmations: 10,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // },
    // mainnet: {
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
