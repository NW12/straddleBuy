// contracts/StraddleBuyer.sol
pragma solidity ^0.8.0;

import { LyraAdapter } from '@lyrafinance/protocol/contracts/periphery/LyraAdapter.sol';
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract StraddleBuyer is LyraAdapter {
  IERC20 public stablecoin;

  constructor(address _stablecoin) {
    stablecoin = IERC20(_stablecoin);
  }

  function buyStraddle(uint256 strikeId, uint256 size) external {
    // Transfer stablecoin from sender
    stablecoin.transferFrom(msg.sender, address(this), size);

    // Approve Lyra to spend stablecoin
    stablecoin.approve(address(optionMarket), size);

    // Buy call and put options
    _buyOption(strikeId, size, TestSystem.OptionType.LONG_CALL);
    _buyOption(strikeId, size, TestSystem.OptionType.LONG_PUT);
  }

  function _buyOption(uint256 strikeId, uint256 size, TestSystem.OptionType optionType) private {
    optionMarket.openPosition({
      strikeId,
      positionId: 0,
      optionType,
      amount: size,
      setCollateralTo: size,
      iterations: 1,
      minTotalCost: 0,
      maxTotalCost: type(uint256).max,
    });
  }
}