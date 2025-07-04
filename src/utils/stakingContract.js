import { web3Provider } from './walletConnectProvider';
import abi from '../abi.json';

const CONTRACT_ADDRESS = "0x36a0a9b083f68f20E7C3B930CFd5b3900845b94E";

export function getStakingContract() {
  return new web3Provider.Contract(CONTRACT_ADDRESS, abi);
}
