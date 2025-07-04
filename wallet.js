async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const wallet = accounts[0];
      document.getElementById('wallet-status').innerText = `Connected: ${wallet}`;
      localStorage.setItem('wallet', wallet);
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  } else {
    alert("No Web3 wallet detected. Please install MetaMask or Trust Wallet.");
  }
}