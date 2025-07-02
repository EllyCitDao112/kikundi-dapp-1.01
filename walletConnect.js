async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const wallet = accounts[0];
      document.getElementById("wallet-address").innerText = "Connected: " + wallet;
      document.getElementById("staking-section").style.display = "block";
    } catch (error) {
      alert("Wallet connection failed: " + error.message);
    }
  } else {
    alert("No Ethereum provider found. Please install MetaMask or use a Web3 wallet.");
  }
}
