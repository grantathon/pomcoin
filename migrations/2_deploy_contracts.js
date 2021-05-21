var Pomcoin = artifacts.require("Pomcoin.sol");
var EmissionScheduler = artifacts.require("EmissionScheduler.sol");

// PancakeSwap mainnet
// Router v1: 0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F
// Factory v1: 0xBCfCcbde45cE874adCB698cC183deBcF17952812
//
// Router v2: 0x10ED43C718714eb63d5aA57B78B54704E256024E
// Factory v2: 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73

// PancakeSwap testnet
// Factory: 0x6725F303b657a9451d8BA641348b6761A6CC7a17
// Router: 0xD99D1c33F9fC3444f8101754aBC46c52416550D1

module.exports = async function(deployer) {
  await deployer.deploy(Pomcoin, 350000000);
  await deployer.deploy(EmissionScheduler);

  const instancePomcoin = await Pomcoin.deployed();

  // Send Pomcoin contract BNB for initial liquidity
  const creator = await instancePomcoin.getOwner();
  await web3.eth.sendTransaction({
    from: creator,
    to: Pomcoin.address,
    value: web3.utils.toWei("1", "ether")
  });

  // TODO: Permanently stake initial liquidity to DEX
  const factory = await Factory.at('0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73');
  const router = await Router.at('0x10ED43C718714eb63d5aA57B78B54704E256024E');
  const token1 = await Token1.new();
  const token2 = await Token2.new();
  const pairAddress = await factory.createPair.call(token1.address, token2.address);
  const tx = await factory.createPair(token1.address, token2.address);
  await token1.approve(router.address, 10000);
  await token2.approve(router.address, 10000);
  await router.addLiquidity(  
    token1.address,
    token2.address,
    10000,
    10000,
    10000,
    10000,
    creator,
    Math.floor(Date.now() / 1000) + 60 * 10
  );
  const pair = await Pair.at(pairAddress);
  const balance = await pair.balanceOf(creator);

};
