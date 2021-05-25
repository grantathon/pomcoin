const Pomcoin = artifacts.require("Pomcoin");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("Pomcoin Tests", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.pomcoin = await Pomcoin.new(process.env.INITIAL_TOKENS);
  });

  it("should have minted 350000000 initial tokens", async () => {
    let instance = this.pomcoin;
    let totalSupply = await instance.totalSupply();
    let targetSupply = "350000000000000000000000000";  // 350000000*10**18

    return expect(totalSupply.toString()).to.equal(targetSupply);
  });

  it("should have minted initial tokens into the deployer's account", async () => {
    let instance = this.pomcoin;
    let totalSupply = await instance.totalSupply();

    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("should have deployed and funded the LP with the Pomcoin contract as the pair owner", async () => {
    const pancakeswapFactoryAbi = require("../contracts/abi/PancakeFactoryV2.json");
    const pancakeswapRouterAbi = require("../contracts/abi/PancakeRouterV2.json");
    const pancakeswapPairAbi = require("../contracts/abi/PancakePair.json");

    PANCAKESWAP_FACTORY_ADDR = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";  // Mainnet
    PANCAKESWAP_ROUTER_ADDR = "0x10ED43C718714eb63d5aA57B78B54704E256024E";  // Mainnet

    var factory = await new web3.eth.Contract(pancakeswapFactoryAbi, PANCAKESWAP_FACTORY_ADDR);
    var router = await new web3.eth.Contract(pancakeswapRouterAbi, PANCAKESWAP_ROUTER_ADDR);
    const weth = await router.methods.WETH().call();
    const pairAddress = await factory.methods.getPair(Pomcoin.address, weth).call();
    const pair = await new web3.eth.Contract(pancakeswapPairAbi, pairAddress);

    const liquidity = await pair.methods.balanceOf(Pomcoin.address).call();
    const pairTotalSupply = await pair.methods.totalSupply().call();

    expect(pairAddress).to.not.equal("0x0000000000000000000000000000000000000000");
    return expect(liquidity).to.be.a.bignumber.equal((new BN(pairTotalSupply)).sub(new BN(1000)));
  });

  it("should transfer balance to LP", async () => {
    
  });
});
