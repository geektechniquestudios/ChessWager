require("@nomiclabs/hardhat-waffle")
require("dotenv").config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const accountKey = process.env.METAMASK_ACCOUNT_KEY

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    bscTestnet: {
      url: "https://speedy-nodes-nyc.moralis.io/f8b3d0bbbe6f4ababc2d263a/bsc/testnet",
      accounts: [accountKey],
    },
    avalancheMainnet: {
      url: "https://speedy-nodes-nyc.moralis.io/f8b3d0bbbe6f4ababc2d263a/avalanche/mainnet",
      accounts: [accountKey],
    },
  },
}
