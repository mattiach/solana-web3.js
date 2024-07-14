import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { transfer, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

const keypair = Keypair.fromSecretKey(new Uint8Array(MY_KEYPAIR_FROM_ENV.secretKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");


const mint = new PublicKey("..."); // token address to transfer

// ATA (Associated Token Account) to transfer
const fromATA = new PublicKey("6XuFiUbRSbTEE6nGXDoj8g7AoeoXuwpFKzKiapLgXwmq");

// change this to your recipient's public key
const recipient = new PublicKey("HHWnPVvRp7LLr3J4MeJYemjEdo4RqizNoTwtZqajzke4");

const transferSpecificTokens = async () => {
  try {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      recipient,
    );

    // recipient's ATA
    const toAta = tokenAccount.address;

    // quantity to transfer
    const amount = 1e6; // .. 1 token (6 - token decimals)

    console.log(`Associated Token Account del destinatario: ${toAta.toBase58()}`);

    await transfer(
      connection,
      keypair,
      fromATA,
      toAta,
      keypair,
      amount,
    );

    console.log(`Transferred ${amount} tokens to ${recipient.toBase58()}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

transferSpecificTokens();
