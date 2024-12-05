 export function encryptVigenere(plainText, key) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    plainText = plainText.toUpperCase();
    key = key.toUpperCase();
  
    let cipherText = "";
    let keyIndex = 0;
  
    for (const char of plainText) {
      if (alphabet.includes(char)) {
        const plainIndex = alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length];
        const keyIndexValue = alphabet.indexOf(keyChar);
  
        const encryptedIndex = (plainIndex + keyIndexValue) % 26;
        cipherText += alphabet[encryptedIndex];
  
        keyIndex++;
      } else {
        cipherText += char; // Non-alphabetic characters remain unchanged
      }
    }
    return cipherText;
  }

  
export function decryptVigenere(cipherText, key) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    cipherText = cipherText.toUpperCase();
    key = key.toUpperCase();
  
    let plainText = "";
    let keyIndex = 0;
  
    for (const char of cipherText) {
      if (alphabet.includes(char)) {
        const cipherIndex = alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length];
        const keyIndexValue = alphabet.indexOf(keyChar);
  
        const decryptedIndex = (cipherIndex - keyIndexValue + 26) % 26;
        plainText += alphabet[decryptedIndex];
  
        keyIndex++;
      } else {
        plainText += char; // Non-alphabetic characters remain unchanged
      }
    }
    return plainText;
  }
  