export function caesarEncrypt(text, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const shiftAmount = shift % 26; 
    let result = '';

    for (let char of text) {
        const isUpperCase = char === char.toUpperCase();
        const lowerChar = char.toLowerCase();
        const index = alphabet.indexOf(lowerChar);

        if (index !== -1) {
            // Calculate new index with wrap-around
            let newIndex = (index + shiftAmount) % 26;
            if (newIndex < 0) newIndex += 26; // Handle negative shifts
            const newChar = alphabet[newIndex];
            result += isUpperCase ? newChar.toUpperCase() : newChar;
        } else {
            // Non-alphabetic characters remain unchanged
            result += char;
        }
    }

    return result;
}

export function caesarDecrypt(text, shift) {
    // Decrypting is the same as encrypting with a negative shift
    return caesarEncrypt(text, -shift);
}

// Example usage:
const plaintext = "Hello, World!";
const shift = 3;

const encrypted = caesarEncrypt(plaintext, shift);
console.log("Encrypted:", encrypted); // Output: Khoor, Zruog!

const decrypted = caesarDecrypt(encrypted, shift);
console.log("Decrypted:", decrypted); // Output: Hello, World!
