
async function connectWallet() {
  if (window.ethereum) {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return account;
  } else {
    alert("Please install MetaMask!");
    return "Not connected";
  }
}

async function getBalance(wallet) {
  return 1250.00;
}

async function stakeTokens() {
  alert("Staking KKT...");
}

async function unstakeTokens() {
  alert("Unstaking KKT...");
}

async function claimRewards() {
  alert("Claiming rewards...");
}

document.addEventListener("DOMContentLoaded", async () => {
  const walletInfo = document.getElementById("walletInfo");
  const balanceEl = document.getElementById("kktBalance");
  const apyEl = document.getElementById("apy");
  const tzsEl = document.getElementById("tzsValue");

  const walletAddress = await connectWallet();
  walletInfo.innerText = `Wallet: ${walletAddress}`;

  const balance = await getBalance(walletAddress);
  balanceEl.innerText = `KKT Balance: ${balance} KKT`;
  apyEl.innerText = `APY: 8.5%`;
  tzsEl.innerText = `Value: TSh ${(balance * 64).toLocaleString()}`;
});
