
export function invite(address) {
  if (!address) return "Invalid address";
  return `Referral sent to ${address}`;
}
export function getReferralCount(wallet) {
  return 4;
}
