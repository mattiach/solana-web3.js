import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

async function getBalance() {
  const connection = new Connection('https://api.devnet.solana.com', 'finalized');

  try {
    // get the wallet balance
    const balance = await connection.getBalance(MY_KEYPAIR_FROM_ENV.publicKey) / LAMPORTS_PER_SOL;
    console.log('Wallet balance:', balance);

  } catch (error) {
    console.error('error', error);
  }
}

getBalance();