var Pomcoin = artifacts.require("Pomcoin.sol");
var EmissionScheduler = artifacts.require("EmissionScheduler.sol");

const pancakeswapFactoryAbi = require("../contracts/abi/PancakeFactoryV2.json");
const pancakeswapRouterAbi = require("../contracts/abi/PancakeRouterV2.json");

PANCAKESWAP_FACTORY_ADDR = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";  // Mainnet
PANCAKESWAP_ROUTER_ADDR = "0x10ED43C718714eb63d5aA57B78B54704E256024E";  // Mainnet
// PANCAKESWAP_FACTORY_ADDR = "0x6725F303b657a9451d8BA641348b6761A6CC7a17";  // Testnet
// PANCAKESWAP_ROUTER_ADDR = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";  // Testnet
WBNB_ADDR = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

module.exports = async function(deployer) {
  await deployer.deploy(Pomcoin, 350000000);
  await deployer.deploy(EmissionScheduler);

  const instancePomcoin = await Pomcoin.deployed();

  // Send Pomcoin contract BNB for initial liquidity
  const creator = await instancePomcoin.getOwner();
  await web3.eth.sendTransaction({
    from: creator,
    to: Pomcoin.address,
    value: web3.utils.toWei("2", "ether")
  });

  // TODO: Permanently stake initial liquidity to DEX
  var factory = await new web3.eth.Contract(pancakeswapFactoryAbi, PANCAKESWAP_FACTORY_ADDR);
  var router = await new web3.eth.Contract(pancakeswapRouterAbi, PANCAKESWAP_ROUTER_ADDR);
  const weth = await router.methods.WETH().call();
  const pair = await factory.methods.createPair(Pomcoin.address, weth).send({
    from: creator,
    gas: 5000000
  });
  await instancePomcoin.approve(PANCAKESWAP_ROUTER_ADDR, 350000000);
  await router.methods.addLiquidityETH(
    Pomcoin.address,
    350000000,
    350000000,
    web3.utils.toWei("1", "ether"),
    creator,  // TODO: Change to Pomcoin address
    Math.floor(Date.now() / 1000) + 60 * 10
  ).send({
    from: creator,
    gas: 5000000
  });
};
