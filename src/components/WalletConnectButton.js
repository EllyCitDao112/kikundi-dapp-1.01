export function WalletConnectButton() {
  const btn = document.createElement('button');
  btn.innerText = 'Connect WalletConnect';
  btn.onclick = async () => {
    console.log('WalletConnect flow would start here');
  };
  document.body.appendChild(btn);
}
