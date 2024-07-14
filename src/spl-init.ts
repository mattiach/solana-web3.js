import { Keypair, Connection } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

const keypair = Keypair.fromSecretKey(new Uint8Array(MY_KEYPAIR_FROM_ENV.secretKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  const mint = await createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    6, // token decimals
  );

  console.log(`Mint address: ${mint.toBase58()}`);
})();  