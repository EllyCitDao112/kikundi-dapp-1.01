function stakeTokens() {
  const auto = document.getElementById("autocompound").checked;
  showToast(auto ? "Staking with auto-compounding." : "Staking manually.");
}
function unstakeTokens() {
  showToast("Unstaking tokens...");
}
function claimRewards() {
  showToast("Claiming rewards...");
}
function claimFaucet() {
  showToast("Airdrop sent! 100 KKT (Simulated)");
}