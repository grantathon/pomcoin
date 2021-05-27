const Pomcoin = artifacts.require("Pomcoin");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("Pomcoin Tests", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    // Create Pomcoin
    this.pomcoin = await Pomcoin.new(process.env.INITIAL_TOKENS);
  });

  // it("should have minted 350000000 initial tokens", async () => {
  //   const instance = this.pomcoin;
  //   const totalSupply = await instance.totalSupply();
  //   const targetSupply = "350000000000000000000000000";  // 350000000*10**18
  //
  //   return expect(totalSupply.toString()).to.equal(targetSupply);
  // });
  //
  // it("should have minted initial tokens into the deployer's account", async () => {
  //   const instance = this.pomcoin;
  //   const totalSupply = await instance.totalSupply();
  //
  //   return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  // });
  //
  // it("should have deployed and funded the LP with the Pomcoin contract as the pair owner", async () => {
  //   const pancakeswapFactoryAbi = require("../contracts/abi/PancakeFactoryV2.json");
  //   const pancakeswapRouterAbi = require("../contracts/abi/PancakeRouterV2.json");
  //   const pancakeswapPairAbi = require("../contracts/abi/PancakePair.json");
  //
  //   // PANCAKESWAP_FACTORY_ADDR = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";  // Mainnet
  //   // PANCAKESWAP_ROUTER_ADDR = "0x10ED43C718714eb63d5aA57B78B54704E256024E";  // Mainnet
  //   PANCAKESWAP_FACTORY_ADDR = "0x6725F303b657a9451d8BA641348b6761A6CC7a17";  // Testnet
  //   PANCAKESWAP_ROUTER_ADDR = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";  // Testnet
  //
  //   const factory = await new web3.eth.Contract(pancakeswapFactoryAbi, PANCAKESWAP_FACTORY_ADDR);
  //   const router = await new web3.eth.Contract(pancakeswapRouterAbi, PANCAKESWAP_ROUTER_ADDR);
  //   const weth = await router.methods.WETH().call();
  //   const pairAddress = await factory.methods.getPair(Pomcoin.address, weth).call();
  //   const pair = await new web3.eth.Contract(pancakeswapPairAbi, pairAddress);
  //
  //   const liquidity = await pair.methods.balanceOf(Pomcoin.address).call();
  //   const pairTotalSupply = await pair.methods.totalSupply().call();
  //
  //   // const reserves = await pair.methods.getReserves().call();
  //   // console.log(reserves);
  //
  //   // TODO: Check reserves are as expected
  //   expect(pairAddress).to.not.equal("0x0000000000000000000000000000000000000000");
  //   return expect(liquidity).to.be.a.bignumber.equal((new BN(pairTotalSupply)).sub(new BN(1000)));
  // });

  it("should transfer sufficient contract balance to LP", async () => {
      const instance = this.pomcoin;
      const initialContractBalance = await web3.eth.getBalance(Pomcoin.address);
      // var initialLPBalance = await instance.balance;
      // console.log(initialLPBalance);

      // Transfer some BNB to contract
      await web3.eth.sendTransaction({
        from: deployerAccount,
        to: Pomcoin.address,
        value: web3.utils.toWei("0.25", "ether")
      });
      const newContractBalance = await web3.eth.getBalance(Pomcoin.address);

      // console.log(tx);
      console.log(initialContractBalance.toString());
      console.log(newContractBalance.toString());

      // var newLPBalance = 0;
      // exept(newLPBalance).to.not.equal(initialLPBalance); // TODO: should be greater than
  });

  // it("shouldn't transfer insufficient contract balance to LP", async () => {
  //
  // });
});
