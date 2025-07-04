export function loadStakingDashboard() {
  const dashboard = document.createElement('div');
  dashboard.innerHTML = `
    <p>KKT Balance: <span id="balance">Loading...</span></p>
    <button onclick="alert('Stake action')">Stake</button>
    <button onclick="alert('Unstake action')">Unstake</button>
  `;
  document.body.appendChild(dashboard);
}
