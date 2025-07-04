import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";

export async function startChat(privateKey) {
  const wallet = new Wallet(privateKey);
  const xmtp = await Client.create(wallet);
  const conversation = await xmtp.conversations.newConversation("kikundi-dao@xmtp.dev");
  await conversation.send("👋 Hello from Kikundi DApp!");
}

