import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { createGenericFile, createSignerFromKeypair, signerIdentity } from '@metaplex-foundation/umi';
import { readFile } from 'fs/promises';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

// createUmi is the same as writing: const connection = new Connection("https://api.devnet.solana.com", "finalized");
const umi = createUmi("https://api.devnet.solana.com", "finalized");

umi.use(irysUploader()); // irysUploader is a plugin that allows you to upload files to the irys network

// const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(MY_KEYPAIR_FROM_ENV.secretKey));
const myKeipairSigner = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(myKeipairSigner)); // this is a plugin that allows you to sign transactions with the keypair

const uploadFunction = async () => {
  const image = await readFile("./src/assets/custom_image.jpg");
  const nft_image = createGenericFile(image, "GALAXY");
  const [myUri] = await umi.uploader.upload([nft_image]);
  console.log(`You can view/download your image at: ${myUri}`);
}

uploadFunction();
