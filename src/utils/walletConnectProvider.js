import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

export let web3Provider;

export async function initWalletConnect() {
  const provider = new WalletConnectProvider({
    rpc: { 97: import.meta.env.VITE_RPC_URL },
    chainId: 97
  });

  await provider.enable();
  web3Provider = new ethers.BrowserProvider(provider);
}
