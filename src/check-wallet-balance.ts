import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { PublicKeyWallet } from './interfaces/const';

async function getBalance({ walletPublicKey }: PublicKeyWallet) {
  const connection = new Connection('https://api.devnet.solana.com', 'finalized');

  try {
    // get the wallet balance
    const balance = await connection.getBalance(walletPublicKey) / LAMPORTS_PER_SOL;
    console.log('Wallet balance:', balance);

  } catch (error) {
    console.error('error', error);
  }
}

// insert a paramater to specify the wallet public key
getBalance({ walletPublicKey: new PublicKey('Cfrcn1hcF6njf367bCe5hzTutcAeFkNrEVQXExnwgfwc') });