const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();
const {
  MNEMONIC,
  ENDPOINT_SEPOLIA, ENDPOINT_ETHEREUM,
  API_ETHERSCAN, API_BSCSCAN,
} = process.env;



module.exports = {
  contracts_directory: "./contracts",
  contracts_build_directory: "./build",
  migrations_directory: "./migrations",

  compilers: {
    solc: {
      version: "0.8.24",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
      skipDryRun: true,
      production: false,
    },

    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, ENDPOINT_SEPOLIA),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      production: true,
      networkCheckTimeout: 30000,
      deploymentPollingInterval: 8000,
    },

    ethereum: {
      provider: () => new HDWalletProvider(MNEMONIC, ENDPOINT_ETHEREUM),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      production: true,
      networkCheckTimeout: 30000,
      deploymentPollingInterval: 8000,
    },

    bsc: {
      provider: () => new HDWalletProvider(MNEMONIC, "https://bsc-dataseed1.binance.org/"),
      network_id: 56,        // BSC chainId
      confirmations: 2,      // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
      production: true,      // Treats this network as if it was a public net. (default: false)
      networkCheckTimeout: 30000,
      deploymentPollingInterval: 8000,
    },

    bsctestnet: {
      provider: () => new HDWalletProvider(MNEMONIC, "https://bsc-prebsc-dataseed.bnbchain.org"),
      //provider: () => new HDWalletProvider(MNEMONIC, "https://data-seed-prebsc-1-s1.bnbchain.org:8545"),
      network_id: 97,        // BSC chainId
      confirmations: 2,      // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
      production: true,      // Treats this network as if it was a public net. (default: false)
      networkCheckTimeout: 30000,
      deploymentPollingInterval: 8000,
    },
  },

  plugins: [
    "truffle-plugin-verify",
    "truffle-contract-size",
  ],

  api_keys: {
    etherscan: API_ETHERSCAN,
    bscscan: API_BSCSCAN,
  },
};
