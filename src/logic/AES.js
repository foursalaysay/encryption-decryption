const crypto = require('crypto');

// Function to encrypt using AES-128
export function aesEncrypt(text, key) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted; // IV is prepended to ciphertext
}

// Function to decrypt using AES-128
export function aesDecrypt(encryptedText, key) {
  const [ivHex, encryptedData] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedBuffer = Buffer.from(encryptedData, 'hex');
  const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedBuffer, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}