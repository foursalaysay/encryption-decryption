export const playfairEncrypt = (plaintext, key) => {
    const matrix = createMatrix(key);
    const pairs = createPairs(preprocessText(plaintext));
    return pairs.map(pair => encryptPair(pair, matrix)).join('');
  };
  
  export const playfairDecrypt = (ciphertext, key) => {
    const matrix = createMatrix(key);
    const pairs = createPairs(preprocessText(ciphertext));
    return pairs.map(pair => decryptPair(pair, matrix)).join('');
  };
  
  const preprocessText = (text) => {
    return text
      .toUpperCase()
      .replace(/J/g, 'I') // Replace J with I
      .replace(/[^A-Z]/g, ''); // Remove non-alphabet characters
  };
  
  export const createMatrix = (key) => {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // No J
    const uniqueKey = [...new Set(preprocessText(key) + alphabet)];
    return Array.from({ length: 5 }, (_, i) => uniqueKey.slice(i * 5, i * 5 + 5));
  };


  
  export const createPairs = (text) => {
    const chars = text
      .toUpperCase()
      .replace(/J/g, 'I') // Replace J with I
      .replace(/[^A-Z]/g, '') // Remove non-alphabet characters (including spaces)
      .split('');
  
    for (let i = 0; i < chars.length - 1; i += 2) {
      if (chars[i] === chars[i + 1]) {
        chars.splice(i + 1, 0, 'X'); // Insert X if duplicate pair
      }
    }
    if (chars.length % 2 !== 0) {
      chars.push('Z'); // Append Z if odd number of characters
    }
    return chars.reduce((pairs, _, i) => (i % 2 === 0 ? pairs.concat([chars.slice(i, i + 2)]) : pairs), []);
  };
  
  
  const findPosition = (char, matrix) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === char) {
          return { row, col };
        }
      }
    }
  };
  
  const encryptPair = ([a, b], matrix) => {
    const posA = findPosition(a, matrix);
    const posB = findPosition(b, matrix);
  
    if (posA.row === posB.row) {
      return matrix[posA.row][(posA.col + 1) % 5] + matrix[posB.row][(posB.col + 1) % 5];
    } else if (posA.col === posB.col) {
      return matrix[(posA.row + 1) % 5][posA.col] + matrix[(posB.row + 1) % 5][posB.col];
    } else {
      return matrix[posA.row][posB.col] + matrix[posB.row][posA.col];
    }
  };
  
  const decryptPair = ([a, b], matrix) => {
    const posA = findPosition(a, matrix);
    const posB = findPosition(b, matrix);
  
    if (posA.row === posB.row) {
      return matrix[posA.row][(posA.col + 4) % 5] + matrix[posB.row][(posB.col + 4) % 5];
    } else if (posA.col === posB.col) {
      return matrix[(posA.row + 4) % 5][posA.col] + matrix[(posB.row + 4) % 5][posB.col];
    } else {
      return matrix[posA.row][posB.col] + matrix[posB.row][posA.col];
    }
  };
  

  