function generateReferral(walletAddress) {
  return `https://kikundi.link/invite?ref=${walletAddress}`;
}

function showReferral() {
  const status = document.getElementById('wallet-status').innerText;
  if (!status.includes("Connected")) {
    alert("Please connect your wallet first.");
    return;
  }
  const wallet = status.replace("Connected: ", "");
  const referralLink = generateReferral(wallet);
  alert("🔗 Your Referral Link:\n" + referralLink);
}