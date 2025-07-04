// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract KikundiStaking {
    IERC20 public kkt;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public stakeTimestamps;

    uint256 public rewardRate = 1e16; // 0.01 KKT per second

    constructor(address _kkt) {
        kkt = IERC20(_kkt);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Stake must be > 0");
        kkt.transferFrom(msg.sender, address(this), amount);
        _updateRewards(msg.sender);
        balances[msg.sender] += amount;
        stakeTimestamps[msg.sender] = block.timestamp;
    }

    function unstake(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient stake");
        _updateRewards(msg.sender);
        balances[msg.sender] -= amount;
        kkt.transfer(msg.sender, amount);
    }

    function _updateRewards(address user) internal {
        uint256 timeStaked = block.timestamp - stakeTimestamps[user];
        uint256 reward = timeStaked * rewardRate * balances[user] / 1e18;
        if (reward > 0) {
            kkt.transfer(user, reward);
        }
        stakeTimestamps[user] = block.timestamp;
    }

    function getStakedBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}
