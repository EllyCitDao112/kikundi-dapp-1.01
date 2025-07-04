
import { initWalletConnect } from './utils/walletConnectProvider';
import { loadStakingDashboard } from './components/StakingDashboard';

export default async function App() {
  await initWalletConnect();
  loadStakingDashboard();
}
