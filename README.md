# Multitoken Wrapping

Contract that create a suite of tokens (A, B, C) and swapping them using Solidity smart contracts. The user should be able to swap either of two ERC20s for a single ERC20 token. For example, you can swap token A or token B for token C. Swaps should also be possible in the reverse direction.Token C should be redeemable for token A or token B. Token exchange rates are one-to-one. Input side ERC20 tokens do not need to swappable for each other.

A || B <==> C

This is a Solidity smart contract that allows for the swapping of tokens A, B, and C using the ERC20 standard. The contract includes methods for swapping and unswapping tokens, as well as specific functions for swapping and unswapping individual token pairs.

## Provided Stub
Attached is a Solidity stub for the Wrapper contract. It contains two methods: `function swap(address token_, uint amount)` and `function unswap(address token_, uint amount)`. Please implement these methods. Feel free to add whatever other methods and contracts are necessary.

## Getting Started

To use this contract, you will need a wallet that is compatible with the ERC20 standard and can interact with the Ethereum blockchain. You will also need to deploy the contract to the blockchain, either through a platform like [Remix](https://remix.ethereum.org/) or through a deployment script.

## Using the Contract

### swap(address token_, uint amount)

This function allows you to swap an amount of token_ for an equivalent amount of token C. The exchange rate is one-to-one.

### unswap(address token_, uint amount)

This function allows you to unswap an amount of token C for an equivalent amount of token_. The exchange rate is one-to-one.

### swapAforC(uint256 amount)

This function allows you to swap an amount of token A for an equivalent amount of token C. The exchange rate is one-to-one.

### swapBforC(uint256 amount)

This function allows you to swap an amount of token B for an equivalent amount of token C. The exchange rate is one-to-one.

### unswapCforA(uint256 amount)

This function allows you to unswap an amount of token C for an equivalent amount of token A. The exchange rate is one-to-one.

### unswapCforB(uint256 amount)

This function allows you to unswap an amount of token C for an equivalent amount of token B. The exchange rate is one-to-one.

## Built With

-   [OpenZeppelin ERC20](https://docs.openzeppelin.com/contracts/erc20) - The ERC20 token library used
-   [Solidity](https://solidity.readthedocs.io/) - The programming language used to write the contract