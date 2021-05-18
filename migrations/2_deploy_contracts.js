var Pomcoin = artifacts.require("Pomcoin.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Pomcoin);

  // TODO: Mint initial supply


  // TODO: Permanently stake initial liquidity to DEX

  
};
