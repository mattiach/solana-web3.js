import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey, createSignerFromKeypair, signerIdentity } from '@metaplex-foundation/umi';
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionArgs, CreateMetadataAccountV3InstructionAccounts, DataV2Args, MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { string, publicKey as publicKeySerializer } from '@metaplex-foundation/umi/serializers';
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// the keypair is retrieved from the environment
const MY_KEYPAIR_FROM_ENV = getKeypairFromEnvironment("MY_SECRET_KEY");

// const connection = new Connection("https://api.devnet.solana.com", "finalized");
const umi = createUmi("https://api.devnet.solana.com", "finalized");

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(MY_KEYPAIR_FROM_ENV.secretKey));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));

const mint = publicKey("..."); // address generated via "npm run createMint"

const seeds = [
  string({ size: "variable" }).serialize("metadata"),
  publicKeySerializer().serialize(MPL_TOKEN_METADATA_PROGRAM_ID),
  publicKeySerializer().serialize(mint),
];

const metadata = umi.eddsa.findPda(MPL_TOKEN_METADATA_PROGRAM_ID, seeds);

const createMetadata = async () => {
  const data: DataV2Args = {
    name: "Sad Hamster",
    symbol: "SH",
    uri: "https://arweave.net/CHx1bKh....",
    sellerFeeBasisPoints: 0,
    creators: [
      {
        address: keypair.publicKey,
        verified: true,
        share: 100,
      },
    ],
    collection: null,
    uses: null,
  }

  const accounts: CreateMetadataAccountV3InstructionAccounts = {
    metadata: metadata,
    mint: mint,
    mintAuthority: myKeypairSigner,
  }

  const args: CreateMetadataAccountV3InstructionArgs = {
    data: data,
    isMutable: true,
    collectionDetails: null,
  }

  const transaction = createMetadataAccountV3(umi, { ...accounts, ...args });
  let result = await transaction.sendAndConfirm(umi);
  const signature = umi.transactions.deserialize(result.signature);

  console.log('signature ➡️', signature)
  console.log(`Successfully minted! transaction here: https://explorer.solana.com/tx/${transaction}?cluster=devnet`);
}

createMetadata();