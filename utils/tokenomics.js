
// utils/tokenomics.js

/**
 * Format a number with commas and fixed decimals
 */
export function formatCurrency(value, currency = "USD") {
  const options = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return new Intl.NumberFormat('en-US', options).format(value);
}

/**
 * Estimate the wallet value in USDT and TZS based on KKT balance
 * @param {number} kktBalance - User's KKT token balance
 * @param {number} kktToUsdtRate - 1 KKT = ? USDT
 * @param {number} usdtToTzsRate - 1 USDT = ? TZS
 */
export function estimateWalletValue(kktBalance, kktToUsdtRate, usdtToTzsRate) {
  const usdt = kktBalance * kktToUsdtRate;
  const tzs = usdt * usdtToTzsRate;
  return {
    usdt: formatCurrency(usdt, 'USD'),
    tzs: formatCurrency(tzs, 'TZS')
  };
}

/**
 * Calculate APY projection over X days
 * @param {number} stakedAmount - amount of KKT staked
 * @param {number} annualRate - APY in decimal (e.g. 0.10 = 10%)
 * @param {number} days - number of days projected
 */
export function projectYield(stakedAmount, annualRate, days) {
  const dailyRate = annualRate / 365;
  const projected = stakedAmount * (1 + dailyRate) ** days;
  const yieldAmount = projected - stakedAmount;
  return {
    projectedBalance: projected.toFixed(2),
    earned: yieldAmount.toFixed(2)
  };
}

/**
 * Render tokenomics stats to the UI
 */
export function renderTokenomicsUI({ usdt, tzs, apy, treasury }) {
  document.getElementById("walletValueUSDT").innerText = usdt;
  document.getElementById("walletValueTZS").innerText = tzs;
  document.getElementById("apyProjection").innerText = `${apy}%`;
  document.getElementById("treasuryBalance").innerText = formatCurrency(treasury, 'USD');
}
