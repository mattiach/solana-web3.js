import { PublicKey } from "@solana/web3.js";

export interface TransferSol {
  totalSolana: number;
  recipient: PublicKey;
}

export interface AirdropSol {
  solanaAmount: number;
}

export interface PublicKeyWallet {
  walletPublicKey: PublicKey;
}