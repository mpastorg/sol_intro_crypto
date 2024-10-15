import { Keypair, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import * as dotenv from 'dotenv';
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";

dotenv.config();

const rpcUrl = process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com";
const connection = new Connection(rpcUrl, "confirmed");
const publicKey = new PublicKey(process.env.LOCAL_PUB_KEY || "BbMwxEkVi84w476HmzJHSbs5FSU2haJwPQL6Ezi43bnu");

var suppliedPublicKey = process.argv[2];
var receiver;

if (!suppliedPublicKey) {
    receiver = publicKey;
} else {
    receiver = new PublicKey(suppliedPublicKey);
}
const balance = await connection.getBalance(receiver);
console.log(`balance of account receiver ${receiver} is ${balance} lamports and ${balance / LAMPORTS_PER_SOL} SOL`);

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log('read from file keypair!');
console.log('public key sender:', sender.publicKey.toBase58());
var balanceSender = await connection.getBalance(sender.publicKey);
console.log(`balance of account sender ${sender.publicKey} is ${balanceSender} lamports and ${balanceSender / LAMPORTS_PER_SOL} SOL`);

const transaction = new Transaction();
const toPubkey = receiver;
console.log('public key receiver:', toPubkey.toBase58());

await airdropIfRequired(
    connection,
    sender.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
);

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey,
    lamports: 5000,
});
transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender,]);
console.log('transaction signature :', signature);

var balanceSender = await connection.getBalance(sender.publicKey);

console.log(`balance of account sender ${sender.publicKey} is ${balanceSender} lamports and ${balanceSender / LAMPORTS_PER_SOL} SOL`);

console.log(`balance of account receiver ${receiver} is ${balance} lamports and ${balance / LAMPORTS_PER_SOL} SOL`);
