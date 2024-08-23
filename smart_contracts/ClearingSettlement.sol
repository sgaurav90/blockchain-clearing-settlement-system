// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract ClearingSettlement {
    address public owner;
    ERC20 public token;

    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor(address tokenAddress) {
        owner = msg.sender;
        token = ERC20(tokenAddress);
    }

    function transferTokens(address to, uint256 amount) external {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(token.transfer(to, amount), "Transfer failed");
        emit Transfer(msg.sender, to, amount);
    }
}
