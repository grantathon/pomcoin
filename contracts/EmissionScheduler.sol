// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "./Pomcoin.sol";

contract EmissionScheduler {
  uint start;

  uint[7] initialYearlyEmissions = [
    3500000000,
    1750000000,
    875000000,
    437500000,
    218750000,
    109375000,
    54687500
  ];

  uint finalAnnualEmissionRate = 50; /* 50 basis points or 0.5% */

  constructor() public {
    start = block.timestamp;
  }
}
