var Pomcoin = artifacts.require("Pomcoin.sol");
var EmissionScheduler = artifacts.require("EmissionScheduler.sol");

// const pancakeswapFactoryAbi = require("../contracts/abi/PancakeFactoryV2.json");
// const pancakeswapRouterAbi = require("../contracts/abi/PancakeRouterV2.json");

require("dotenv").config({path: "../.env"});

// PANCAKESWAP_FACTORY_ADDR = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";  // Mainnet
// PANCAKESWAP_ROUTER_ADDR = "0x10ED43C718714eb63d5aA57B78B54704E256024E";  // Mainnet
// PANCAKESWAP_FACTORY_ADDR = "0x6725F303b657a9451d8BA641348b6761A6CC7a17";  // Testnet
// PANCAKESWAP_ROUTER_ADDR = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";  // Testnet

module.exports = async function(deployer) {
  await deployer.deploy(Pomcoin, process.env.INITIAL_TOKENS)
  await deployer.deploy(EmissionScheduler);

  // const instancePomcoin = await Pomcoin.deployed();
  // const creator = await instancePomcoin.getOwner();
  //
  // // Create liquidity pool pair
  // var factory = await new web3.eth.Contract(pancakeswapFactoryAbi, PANCAKESWAP_FACTORY_ADDR);
  // var router = await new web3.eth.Contract(pancakeswapRouterAbi, PANCAKESWAP_ROUTER_ADDR);
  // const weth = await router.methods.WETH().call();
  // const pair = await factory.methods.createPair(Pomcoin.address, weth).send({
  //   from: creator,
  //   gas: 5000000
  // });
  //
  // // Permanently stake initial liquidity
  // var creatorPomBalance = await instancePomcoin.balanceOf(creator);
  // await instancePomcoin.approve(PANCAKESWAP_ROUTER_ADDR, creatorPomBalance);
  // const ethForLiquidityPool = await web3.utils.toWei("1", "ether");
  // await router.methods.addLiquidityETH(
  //   Pomcoin.address,
  //   creatorPomBalance,
  //   creatorPomBalance,
  //   ethForLiquidityPool,
  //   Pomcoin.address,  // Pomcoin owns the LP token, not creator
  //   Math.floor(Date.now() / 1000) + 60 * 10
  // ).send({
  //   from: creator,
  //   gas: 5000000,
  //   value: ethForLiquidityPool
  // });

  // TODO: Burn the LP token (0x000000000000000000000000000000000000dEaD)

};
