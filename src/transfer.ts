import { Keypair, Connection, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import { TransferSol } from "./interfaces/const";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

const sender = Keypair.fromSecretKey(new Uint8Array(MY_KEYPAIR_FROM_ENV.secretKey));
const recipient = new PublicKey('...'); // change this to your recipient's public key

const connection = new Connection("https://api.devnet.solana.com", "finalized");

const transferSol = async ({ totalSolana }: TransferSol) => {
  try {
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipient,
      lamports: totalSolana * LAMPORTS_PER_SOL
    });

    const transaction = new Transaction().add(transferInstruction);
    transaction.feePayer = sender.publicKey;

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [sender],
      { commitment: 'finalized', skipPreflight: true, },
    );

    console.log(`Success! check out your TX here: https://explorer.solana.com/tx/${signature}?cluster%2Fdevnet=&cluster=devnet`);

    // print the recipient's balance
    const recipientBalance = await connection.getBalance(recipient) / LAMPORTS_PER_SOL;
    console.log('Recipient balance:', recipientBalance);

  } catch (error) {
    console.log('error ➡️', error);
  }
}

transferSol({
  totalSolana: 0.5, // specify the amount of SOL to transfer
  recipient: new PublicKey('...'), // change this to your recipient's public key
}); 
