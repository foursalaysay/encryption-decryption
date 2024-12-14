const crypto = require('crypto');

// Function to encrypt using AES-128
export function aesEncrypt(plaintext, key) {
  // Ensure the key is exactly 16 bytes (128 bits)
  if (Buffer.from(key).length !== 16) {
    throw new Error("Key must be exactly 16 bytes for AES-128.");
  }

  const iv = crypto.randomBytes(16); // Generate a 16-byte IV (Initialization Vector)
  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key), iv);

  // Encrypt the plaintext
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return IV and encrypted data separated by ':'
  return iv.toString('hex') + ':' + encrypted;
}

// Function to decrypt using AES-128
export function aesDecrypt(encryptedText, key) {
  // Ensure the key is exactly 16 bytes (128 bits)
  if (Buffer.from(key).length !== 16) {
    throw new Error("Key must be exactly 16 bytes for AES-128.");
  }

  // Split the IV and ciphertext
  const [ivHex, encryptedData] = encryptedText.split(':');
  if (!ivHex || !encryptedData) {
    throw new Error("Invalid encrypted text format. Expected 'IV:Ciphertext'.");
  }

  const iv = Buffer.from(ivHex, 'hex'); // Convert IV from hex to Buffer
  const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key), iv);

  // Decrypt the ciphertext
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
