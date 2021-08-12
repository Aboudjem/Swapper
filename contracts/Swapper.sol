// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Token.sol";

pragma solidity ^0.8.6;

contract Swapper {
    IERC20 public tokenA;
    IERC20 public tokenB;
    IERC20 public tokenC;

    constructor() {
        tokenA = new Token("tokenA", "TKNA", 1_000_000 * 1E18, msg.sender);

        tokenB = new Token("tokenB", "TKNB", 1_000_000 * 1E18, msg.sender);

        tokenC = new Token("tokenC", "TKNC", 1_000_000 * 1E18, address(this));
    }

    /**
     * Convert an amount of input token_ to an equivalent amount of the output token
     *
     * @param token_ address of token to swap
     * @param amount amount of token to swap/receive
     */
    function swap(address token_, uint256 amount) external {
        _swap(address(token_), amount);
    }

    /**
     * Convert an amount of the output token to an equivalent amount of input token_
     *
     * @param token_ address of token to receive
     * @param amount amount of token to swap/receive
     */
    function unswap(address token_, uint256 amount) external {
        _unswap(address(token_), amount);
    }

    /**
     * Convert an amount of input tokenA to an equivalent amount of the output tokenC
     *
     * @param amount amount of token to swap/receive
     */
    function swapAforC(uint256 amount) external {
        _swap(address(tokenA), amount);
    }

    /**
     * Convert an amount of input tokenB to an equivalent amount of the output tokenC
     *
     * @param amount amount of token to swap/receive
     */
    function swapBforC(uint256 amount) external {
        _swap(address(tokenB), amount);
    }

    /**
     * Convert an amount of tokenC to an equivalent amount of input tokenA
     *
     * @param amount amount of token to swap/receive
     */
    function unswapCforA(uint256 amount) external {
        _unswap(address(tokenA), amount);
    }

    /**
     * Convert an amount of tokenC to an equivalent amount of input tokenB
     *
     * @param amount amount of token to swap/receive
     */
    function unswapCforB(uint256 amount) external {
        _unswap(address(tokenB), amount);
    }

    /**
     * Convert an amount of input token_ to an equivalent amount of the output token
     *
     * @param token_ address of token to swap
     * @param amount amount of token to swap/receive
     */
    function _swap(address token_, uint256 amount) private {
        require(
            (IERC20(token_).allowance(msg.sender, address(this)) >= amount),
            "ERC20: transfer amount exceeds allowance"
        );
        require(
            tokenC.balanceOf(address(this)) >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        require(
            IERC20(token_).transferFrom(msg.sender, address(this), amount),
            "ERC20: Error"
        );
        require(tokenC.transfer(msg.sender, amount), "Error");
    }

    /**
     * Convert an amount of the output token to an equivalent amount of input token_
     *
     * @param token_ address of token to receive
     * @param amount amount of token to swap/receive
     */
    function _unswap(address token_, uint256 amount) private {
        require(
            (tokenC.allowance(msg.sender, address(this)) >= amount),
            "ERC20: transfer amount exceeds allowance"
        );
        require(
            IERC20(token_).balanceOf(address(this)) >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        require(
            tokenC.transferFrom(msg.sender, address(this), amount),
            "ERC20: Error"
        );
        require(IERC20(token_).transfer(msg.sender, amount), "Error");
    }
}
