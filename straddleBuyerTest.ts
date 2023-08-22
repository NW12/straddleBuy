// test/straddleBuyerTest.ts
import { ethers } from 'hardhat';
import { TestSystem } from '@lyrafinance/protocol';
import { StraddleBuyer } from '../typechain/StraddleBuyer';

describe('Straddle Buyer Test', function () {
  it('Should buy a straddle', async function () {
    const [signer] = await ethers.getSigners();

    // Deploy and seed Lyra market
    const testSystem = await TestSystem.deploy(signer);
    await TestSystem.seed(signer, testSystem);

    // Deploy StraddleBuyer contract
    const StraddleBuyerFactory = await ethers.getContractFactory('StraddleBuyer');
    const straddleBuyer = (await StraddleBuyerFactory.deploy(testSystem.sUSD.address)) as StraddleBuyer;

    // Buy a straddle
    const strikeId = 1; // replace with actual strike id
    const size = ethers.utils.parseEther('1');
    await straddleBuyer.buyStraddle(strikeId, size);
  });
});