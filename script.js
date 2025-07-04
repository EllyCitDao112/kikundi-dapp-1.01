async function connectWallet() {
  if (window.ethereum) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    document.getElementById("wallet-address").textContent = `Wallet: ${accounts[0]}`;
    fetchKKTBalance(accounts[0]);
  } else {
    showToast("Please install MetaMask.");
  }
}
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
async function fetchKKTBalance(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract("0x36a0a9b083f68f20E7C3B930CFd5b3900845b94E", ["function balanceOf(address) view returns (uint256)"], provider);
  const balance = await contract.balanceOf(address);
  document.getElementById("balance").textContent = `KKT: ${balance / 1e18}`;
}
function claimReferralBonus() {
  showToast("Referral bonus claimed!");
  document.getElementById("refCount").textContent = 5;
}