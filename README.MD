# Solana-Client-App

## Description

Solana client app designed to receive airdrops, facilitate SOL transfers between various wallets, and generate new key pairs using TypeScript.

## Dependencies Installation and Node Modules

Make sure you already have [Node js](https://nodejs.org/it/download/) installed before proceeding. Then, install the necessary node modules to start the application

```sh
npm install
```

## How to generate a new keypair

After installing all the necessary dependencies, you can now proceed to generate a new keypair

```sh
npm run keygen
```

Create a .env file and paste your **Secret Key**. You will find an example in _.env-sample_

## package.json scripts

```ts
  "scripts": {
    "keygen": "ts-node ./src/keygen.ts",
    "airdrop": "ts-node ./src/airdrop.ts",
    "transfer": "ts-node ./src/transfer.ts",
    "check-my-balance": "ts-node ./src/check-my-balance.ts",
    "check-wallet-balance": "ts-node ./src/check-wallet-balance.ts",
    "create-mint": "ts-node ./src/spl-init.ts",
    "mint-token": "ts-node ./src/spl-mint.ts",
    "transfer-token": "ts-node ./src/spl-transfer.ts",
    "upload-image": "ts-node ./src/upload-image.ts",
    "spl-metadata": "ts-node ./src/spl-metadata.ts",
    "spl-metadata2": "ts-node ./src/spl-metadata2.ts",
    "transfer-with-message": "ts-node ./src/transfer-with-message.ts",
    "trasfer-specific-token": "ts-node ./src/trasfer-specific-token.ts"
  },
```

## Author and rights

This code can be downloaded and freely modified by anyone! 😊
Any suggestions or improvements will be appreciated.
Feel free to [contact me](https://github.com/mattiach).
