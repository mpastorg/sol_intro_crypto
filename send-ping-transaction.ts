import {
    Keypair, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, Transaction,
    SystemProgram, sendAndConfirmTransaction, TransactionInstruction
} from "@solana/web3.js";
import * as dotenv from 'dotenv';
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";

dotenv.config();

const rpcUrl = process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com";
const connection = new Connection(rpcUrl, "confirmed");
const publicKey = new PublicKey(process.env.LOCAL_PUB_KEY || "BbMwxEkVi84w476HmzJHSbs5FSU2haJwPQL6Ezi43bnu");

const programAddress = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const accountAddress = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");
const payer = getKeypairFromEnvironment("SECRET_KEY");

const instruction = new TransactionInstruction({
    programId: programAddress,
    keys: [
        {
            pubkey: accountAddress,
            isSigner: false,
            isWritable: true,
        },
    ],
    //data?: Buffer;
});

const transaction = new Transaction().add(instruction);

const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [payer],
);

console.log(`✅ Success! Transaction signature is: ${signature}`);
console.log(`balance of account sender ${payer.publicKey} is ${(await connection.getBalance(payer.publicKey)) / LAMPORTS_PER_SOL} SOL`);
