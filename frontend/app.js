import { ethers } from "https://cdn.ethers.io/lib/ethers-5.6.umd.min.js";
import abi from "./KikundiTokenABI.json" assert { type: "json" };

const tokenAddress = "0xYourKKTTokenAddress"; // Replace with deployed address
let provider, signer, contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(tokenAddress, abi, signer);
    loadBalance();
  } else {
    alert("Please install MetaMask!");
  }
}

async function loadBalance() {
  const address = await signer.getAddress();
  const balance = await contract.balanceOf(address);
  document.getElementById("balance").innerText = ethers.utils.formatUnits(balance, 18);
}

window.connectWallet = connectWallet;
