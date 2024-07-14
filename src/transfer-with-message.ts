// this version works the same way as 'transfer-with-message.ts' with less code but requires '@solana/spl-memo'
import { createMemoInstruction } from "@solana/spl-memo";
import { Connection, sendAndConfirmTransaction, Transaction, } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

const connection = new Connection("https://api.devnet.solana.com", "finalized");

const createMemo = async () => {
  // create a new memo instruction
  const messageToSolana = 'Greetings from Mattia!';
  const instruction = createMemoInstruction(messageToSolana, [MY_KEYPAIR_FROM_ENV.publicKey]);
  const transaction = new Transaction().add(instruction);

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [MY_KEYPAIR_FROM_ENV],
    { commitment: 'finalized', skipPreflight: true }
  );

  console.log(`Success! Check out your transaction here: https://explorer.solana.com/tx/${signature}?cluster%2Fdevnet=&cluster=devnet`);
}

createMemo();
