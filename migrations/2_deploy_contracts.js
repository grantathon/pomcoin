var Pomcoin = artifacts.require("Pomcoin.sol");
var EmissionScheduler = artifacts.require("EmissionScheduler.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Pomcoin, 350000000);
  await deployer.deploy(EmissionScheduler);

  let instancePomcoin = await Pomcoin.deployed();
  // let instanceEmissionScheduler = await EmissionScheduler.deployed();

  // TODO: Send Pomcoin contract some BNB for initial liquidity


  // TODO: Permanently stake initial liquidity to DEX


};
