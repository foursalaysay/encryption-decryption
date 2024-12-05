// Import the crypto-js library
const CryptoJS = require('crypto-js');

// AES Encryption function
export function encryptAES(plainText, key) {
  const encrypted = CryptoJS.AES.encrypt(plainText, key).toString();
  return encrypted;
}

// AES Decryption function
export function decryptAES(cipherText, key) {
  const decrypted = CryptoJS.AES.decrypt(cipherText, key);
  const plainText = decrypted.toString(CryptoJS.enc.Utf8); // Convert to UTF-8 format
  return plainText;
}

// Example Usage
const plainText = "secretmessage";
const key = "mysecretkey123"; // Ensure the key length matches AES requirements

// Encrypt the plain text
const cipherText = encryptAES(plainText, key);
console.log("Encrypted Text:", cipherText);

// Decrypt the cipher text
const decryptedText = decryptAES(cipherText, key);
console.log("Decrypted Text:", decryptedText);
