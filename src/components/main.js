// main.js - Kikundi 1.01 DApp WalletConnect + Staking

let userAddress = null;
const KKT_TOKEN_ADDRESS = "0x36a0a9b083f68f20E7C3B930CFd5b3900845b94E"; // KKT Token on BSC Testnet
const STAKING_CONTRACT_ADDRESS = "0x000000000000000000000000000000000000dead"; // Replace with real staking contract

const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: {
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
      },
      chainId: 97
    }
  }
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: true,
  providerOptions,
  theme: "dark"
});

let web3;

async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    web3 = new Web3(instance);
    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];
    document.getElementById("wallet-address").textContent = userAddress;
    getTokenBalance();
    getStakedInfo();
  } catch (err) {
    console.error("Wallet connection failed:", err);
  }
}

async function getTokenBalance() {
  const abi = ["function balanceOf(address) view returns (uint256)"];
  const token = new web3.eth.Contract(abi, KKT_TOKEN_ADDRESS);
  const balance = await token.methods.balanceOf(userAddress).call();
  document.getElementById("balance").textContent = web3.utils.fromWei(balance);
}

async function getStakedInfo() {
  const abi = [
    "function stakedAmount(address) view returns (uint256)",
    "function rewardOf(address) view returns (uint256)"
  ];
  const staking = new web3.eth.Contract(abi, STAKING_CONTRACT_ADDRESS);
  const staked = await staking.methods.stakedAmount(userAddress).call();
  const reward = await staking.methods.rewardOf(userAddress).call();
  document.getElementById("staked").textContent = web3.utils.fromWei(staked);
  document.getElementById("reward").textContent = web3.utils.fromWei(reward);
}

async function stakeTokens() {
  const amount = prompt("Enter KKT amount to stake:");
  const abi = ["function approve(address spender, uint256 amount) returns (bool)"];
  const token = new web3.eth.Contract(abi, KKT_TOKEN_ADDRESS);
  await token.methods.approve(STAKING_CONTRACT_ADDRESS, web3.utils.toWei(amount)).send({ from: userAddress });

  const stakingAbi = ["function stake(uint256 amount)"];
  const staking = new web3.eth.Contract(stakingAbi, STAKING_CONTRACT_ADDRESS);
  await staking.methods.stake(web3.utils.toWei(amount)).send({ from: userAddress });
  getTokenBalance();
  getStakedInfo();
}

async function unstakeTokens() {
  const stakingAbi = ["function unstake()"];
  const staking = new web3.eth.Contract(stakingAbi, STAKING_CONTRACT_ADDRESS);
  await staking.methods.unstake().send({ from: userAddress });
  getTokenBalance();
  getStakedInfo();
}

window.connectWallet = connectWallet;
window.stakeTokens = stakeTokens;
window.unstakeTokens = unstakeTokens;
