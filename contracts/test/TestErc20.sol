// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TestErc20
 * @dev Implementation of a customizable ERC20 token with burnable and permit functionality.
 * Inherits from OpenZeppelin's ERC20, ERC20Burnable, ERC20Permit, and Ownable contracts.
 * Allows token burning, off-chain approvals, and custom decimal settings.
 */
contract TestErc20 is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    /// @dev Private variable to store the number of decimals for the token.
    /// Decimals determine the divisibility of the token, usually set to 18.
    uint8 private _decimals;

    /**
     * @dev Constructor that initializes the ERC20 token with a custom name, symbol, decimals, and total supply.
     * Mints the total supply of tokens to the deployer's address (the contract owner).
     * @param name_ The name of the token (e.g., "Test Token").
     * @param symbol_ The symbol of the token (e.g., "TST").
     * @param decimals_ The number of decimals the token uses (e.g., 18).
     * @param totalSupply_ The total supply of tokens to be minted, specified in whole units (without decimals).
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 totalSupply_
    ) ERC20(name_, symbol_) ERC20Permit(name_) Ownable() {
        _decimals = decimals_;
        _mint(_msgSender(), totalSupply_);
    }

    /**
     * @dev Overrides the default `decimals` function from the ERC20 standard.
     * This function returns the number of decimals used by the token for user representation.
     * @return The number of decimals set for the token (e.g., 18 for most tokens).
     */
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Function to mint new tokens. Can only be called by the owner of the contract.
     * Mints the specified amount of tokens to the specified address.
     * @param to The address to receive the newly minted tokens.
     * @param amount The number of tokens to be minted.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
