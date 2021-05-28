// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/BEP20.sol";
import "@pancakeswap-libs/pancake-swap-core/contracts/interfaces/IPancakeFactory.sol";
import "pancakeswap-peripheral/contracts/interfaces/IPancakeRouter02.sol";
import "pancakeswap-peripheral/contracts/interfaces/IWETH.sol";

contract Pomcoin is BEP20 {
  IPancakeFactory public pancakeFactoryV2;
  IPancakeRouter02 public pancakeRouterV2;

  address pancakeFactoryV2Addr = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;
  address pancakeRouterV2Addr = 0x10ED43C718714eb63d5aA57B78B54704E256024E;

  event SwapAndLiquify(uint tokensIntoLiqudity, uint ethIntoLiquidity);

  constructor(uint initialSupply) BEP20("Pomcoin", "POM") public {
    pancakeFactoryV2 = IPancakeFactory(pancakeFactoryV2Addr);
    pancakeRouterV2 = IPancakeRouter02(pancakeRouterV2Addr);

    // Mint initial supply to the contract
    _mint(address(this), initialSupply.mul(10 ** uint(decimals())));

    // Fund the contract with ETH from the creator
    address weth = pancakeRouterV2.WETH();
    uint ethForLiquidityPool = 1 ether;
    IWETH(weth).deposit{value: ethForLiquidityPool}();
    IWETH(weth).transfer(address(this), ethForLiquidityPool);

    // Create liquidity pool pair and permanently stake initial liquidity
    pancakeFactoryV2.createPair(address(this), weth);
    uint pomForLiquidityPool = balanceOf(address(this));
    approve(pancakeRouterV2Addr, pomForLiquidityPool);
    pancakeRouterV2.addLiquidityETH{value: ethForLiquidityPool}(
      address(this),
      pomForLiquidityPool,
      pomForLiquidityPool,
      ethForLiquidityPool,
      address(this),  // Pomcoin owns the LP token, not the creator
      block.timestamp
    );

    /* TODO: Burn the LP token (0x000000000000000000000000000000000000dEaD) */

  }

  receive() external payable {
    // Transfer excess balance to permanent liquidity pool
    if(address(this).balance > 0) {
      swapAndLiquifyBalance();
    }
  }

  function swapAndLiquifyBalance() private {
    // capture the contract's current balance.
    uint initialEthBalance = address(this).balance;
    uint half = initialEthBalance.div(2);

    // swap ETH for tokens
    swapEthForTokens(half);

    // new balances
    uint newEthBalance = address(this).balance;
    uint newTokenBalance = this.balanceOf(address(this));

    /* addLiquidity(newTokenBalance, newEthBalance); */

    emit SwapAndLiquify(newTokenBalance, newEthBalance);
  }

  function swapEthForTokens(uint ethAmount) private {
    address[] memory path = new address[](2);
    path[0] = pancakeRouterV2.WETH();
    path[1] = address(this);

    _approve(address(this), address(pancakeRouterV2), ethAmount);

    // make the swap
    pancakeRouterV2.swapExactETHForTokens{value: ethAmount}(
      0,   // accept any amount of tokens
      path,
      address(this),
      block.timestamp + 15 // NOTE: For testing purposes
      // block.timestamp
    );
  }

  function swapTokensForEth(uint tokenAmount) private {
    // generate the uniswap pair path of token -> weth
    address[] memory path = new address[](2);
    path[0] = address(this);
    path[1] = pancakeRouterV2.WETH();

    _approve(address(this), address(pancakeRouterV2), tokenAmount);

    // make the swap
    pancakeRouterV2.swapExactTokensForETH(
      tokenAmount,
      0, // accept any amount of ETH
      path,
      address(this),
      block.timestamp
    );
  }

  function addLiquidity(uint tokenAmount, uint ethAmount) private {
    // approve token transfer to cover all possible scenarios
    _approve(address(this), address(pancakeRouterV2), tokenAmount);

    // add the liquidity
    pancakeRouterV2.addLiquidityETH{value: ethAmount}(
      address(this),
      tokenAmount,
      0, // slippage is unavoidable
      0, // slippage is unavoidable
      address(this),
      block.timestamp
    );

    // TODO: Burn the LP token (0x000000000000000000000000000000000000dEaD)
  }

}
