import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { AirdropSol } from "./interfaces/const";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");
const keypair = Keypair.fromSecretKey(new Uint8Array(MY_KEYPAIR_FROM_ENV.secretKey));
const connection = new Connection("https://api.devnet.solana.com", "finalized");

// airdrop 2 SOL to the keypair
const getAirdrop = async ({ solanaAmount }: AirdropSol) => {
  try {
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      solanaAmount * LAMPORTS_PER_SOL
    );

    console.log(`Success! check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster%2Fdevnet=&cluster=devnet`);

  } catch (error) {
    console.log('error ➡️', error);
  }
}

getAirdrop({ solanaAmount: 1 }); // specify the amount of SOL (max 2 SOL!)