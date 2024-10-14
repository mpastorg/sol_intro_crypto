import { Keypair, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as dotenv from 'dotenv';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

dotenv.config();

const rpcUrl = process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com";
const connection = new Connection(rpcUrl, "confirmed");
const address = new PublicKey(process.env.LOCAL_PUB_KEY || "BbMwxEkVi84w476HmzJHSbs5FSU2haJwPQL6Ezi43bnu");

var suppliedPublicKey = process.argv[2];
var publicKey;

if (!suppliedPublicKey) {
    publicKey = address;
} else {
    publicKey = new PublicKey(suppliedPublicKey);
}
const balance = await connection.getBalance(publicKey);
console.log(`balance of account ${publicKey} is ${balance} lamports and ${balance / LAMPORTS_PER_SOL} SOL`);



var keypair = Keypair.generate();
console.log('Generated keypair!');
console.log('public key:', keypair.publicKey.toBase58());
console.log('Private key:', keypair.secretKey);
console.log('Finished');

keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log('read from file keypair!');
console.log('public key:', keypair.publicKey.toBase58());
console.log('Private key:', keypair.secretKey);
console.log('overwritten');
