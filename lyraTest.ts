// test/lyraTest.ts
import { ethers } from 'hardhat';
import { TestSystem } from '@lyrafinance/protocol';

describe('Lyra Test', function () {
  it('Should buy a call option', async function () {
    const [signer] = await ethers.getSigners();

    // Deploy and seed Lyra market
    const testSystem = await TestSystem.deploy(signer);
    await TestSystem.seed(signer, testSystem);

    // Buy a call option
    const strikeId = 1; // replace with actual strike id
    await testSystem.optionMarket.openPosition({
      strikeId,
      positionId: 0,
      optionType: TestSystem.OptionType.LONG_CALL,
      amount: ethers.utils.parseEther('1'),
      setCollateralTo: ethers.utils.parseEther('0'),
      iterations: 1,
      minTotalCost: ethers.utils.parseEther('0'),
      maxTotalCost: ethers.constants.MaxUint256,
    });
  });
});