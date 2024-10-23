// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IStakingManager {
    function depositByPresale(address _user, uint256 _amount) external;
}
