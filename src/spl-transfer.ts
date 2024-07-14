import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { transfer, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

const keypair = Keypair.fromSecretKey(new Uint8Array(MY_KEYPAIR_FROM_ENV.secretKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("..."); // address generated via "npm run createMint"
const fromATA = new PublicKey("..."); // "Associated Token Account" generated via "npm run mintToken"
const recipient = new PublicKey("..."); // recipient's public key


const splTransfer = async () => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    recipient,
  );

  const toAta = tokenAccount.address;
  const amount = 2500e6;
  console.log(`Associated Token Account: ${toAta.toBase58()}`);

  await transfer(
    connection,
    keypair,
    fromATA,
    toAta,
    keypair,
    amount,
  )

  console.log(`Transferred ${amount} tokens to ${recipient}`);
}

splTransfer();
