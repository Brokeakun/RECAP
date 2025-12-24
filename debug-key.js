// Debug script untuk cek format private key
console.log('=== DEBUGGING PRIVATE KEY FORMAT ===');

const key = process.env.GDRIVE_PRIVATE_KEY || '';

console.log('1. Env variable ada:', key.length > 0);
console.log('2. Panjang key:', key.length);
console.log('3. Dimulai dengan quote:', key.startsWith('"'));
console.log('4. Diakhiri dengan quote:', key.endsWith('"'));

let processedKey = key;
if (processedKey.startsWith('"') && processedKey.endsWith('"')) {
  processedKey = processedKey.slice(1, -1);
}
processedKey = processedKey.replace(/\\n/g, '\n');

console.log('5. Setelah remove quotes:', processedKey.slice(0, 50));
console.log('6. Ada BEGIN marker:', processedKey.includes('-----BEGIN PRIVATE KEY-----'));
console.log('7. Ada END marker:', processedKey.includes('-----END PRIVATE KEY-----'));
console.log('8. Panjang setelah process:', processedKey.length);

// Try parse it
try {
  const crypto = require('crypto');
  const keyObj = crypto.createPrivateKey({
    key: processedKey,
    format: 'pem'
  });
  console.log('✓ Private key valid!');
  console.log('  Type:', keyObj.type);
  console.log('  KeyType:', keyObj.asymmetricKeyType);
} catch (error) {
  console.log('✗ Private key INVALID!');
  console.log('  Error:', (error as any).message);
}
