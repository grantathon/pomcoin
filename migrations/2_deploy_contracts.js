var Pomcoin = artifacts.require("Pomcoin.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Pomcoin);

  let instancePomcoin = await Pomcoin.deployed();

  // TODO: Mint initial supply
  await instancePomcoin.mint(7000000000e6);

  // TODO: Permanently stake initial liquidity to DEX


};
