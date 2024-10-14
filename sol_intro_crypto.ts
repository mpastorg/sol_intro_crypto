import { Keypair } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

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
