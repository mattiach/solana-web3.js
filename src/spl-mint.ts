import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

const keypair = Keypair.fromSecretKey(new Uint8Array(MY_KEYPAIR_FROM_ENV.secretKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const mint = new PublicKey("..."); // address generated via "npm run createMint"

const splMint = async () => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey,
  );

  const ata = tokenAccount.address;
  const amount = 10000e6; // 10.000 tokens

  console.log(`Associated Token Account: ${ata.toBase58()}`);

  await mintTo(
    connection,
    keypair,
    mint,
    ata,
    keypair.publicKey,
    amount,
  );

  console.log(`Minted ${amount} tokens to ${ata.toBase58()}`);
}

splMint();
