# Multitoken Wrapping

Contract that create a suite of tokens (A, B, C) and swapping them using Solidity smart contracts. The user should be able to swap either of two ERC20s for a single ERC20 token. For example, you can swap token A or token B for token C. Swaps should also be possible in the reverse direction.Token C should be redeemable for token A or token B. Token exchange rates are one-to-one. Input side ERC20 tokens do not need to swappable for each other.

A || B <==> C

## Provided Stub
Attached is a Solidity stub for the Wrapper contract. It contains two methods: `function swap(address token_, uint amount)` and `function unswap(address token_, uint amount)`. Please implement these methods. Feel free to add whatever other methods and contracts are necessary.

## Token Parameters
Each token has its own unique name and symbol. Tokens may all have the same number of decimals.


## Development Environment
- Hardhat: https://github.com/ava-labs/avalanche-smart-contract-quickstart
