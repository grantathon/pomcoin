var Pomcoin = artifacts.require("Pomcoin.sol");
var EmissionScheduler = artifacts.require("EmissionScheduler.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Pomcoin);

  let instancePomcoin = await Pomcoin.deployed();
  let instanceEmissionScheduler = await EmissionScheduler.deployed();

  // TODO: Send Pomcoin contract some BNB for initial liquidity


  // TODO: Mint initial supply
  await instancePomcoin.mint(instanceEmissionScheduler.initialSupply * 10 ** 18);


  // TODO: Permanently stake initial liquidity to DEX


};
