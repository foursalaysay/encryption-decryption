// Single Columnar

export function SingleColumnarEncrypt(text, key) {
    // Replace spaces with underscores
    const cleanedText = text.replace(/ /g, '_').toUpperCase();
  
    // Determine grid dimensions
    const columns = key.length;
    const rows = Math.ceil(cleanedText.length / columns);
  
    // Create the grid and fill it row by row
    const grid = Array.from({ length: rows }, () => new Array(columns).fill('_'));
    let index = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (index < cleanedText.length) {
                grid[r][c] = cleanedText[index];
                index++;
            }
        }
    }
  
    // Sort the key and determine column order
    const keyOrder = Array.from(key)
        .map((char, i) => ({ char, index: i }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);
  
    // Read columns in the sorted key order to generate ciphertext
    let ciphertext = '';
    for (let colIndex of keyOrder) {
        for (let r = 0; r < rows; r++) {
            ciphertext += grid[r][colIndex];
        }
    }
  
    return ciphertext;
  }
  
  
  
  
  // Function to perform columnar decryption
  export function SingleColumnarDecrypt(ciphertext, key) {
  // Calculate grid dimensions
  const columns = key.length;
  const rows = Math.ceil(ciphertext.length / columns);
  const grid = Array.from({ length: rows }, () => Array(columns).fill(''));
  
  // Create a mapping of columns based on the key order
  const keyOrder = Array.from(key)
      .map((char, i) => ({ char, index: i }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(item => item.index);
  
  // Determine how many characters go in each column
  const columnLengths = Array(columns).fill(0);
  const fullColumns = ciphertext.length % columns;
  const rowsInFullColumn = Math.floor(ciphertext.length / columns) + 1;
  
  for (let i = 0; i < columns; i++) {
      columnLengths[i] = i < fullColumns ? rowsInFullColumn : Math.floor(ciphertext.length / columns);
  }
  
  // Fill the grid column by column using the ciphertext
  let index = 0;
  for (let col = 0; col < columns; col++) {
      const colIndex = keyOrder[col];
      for (let row = 0; row < columnLengths[col]; row++) {
          grid[row][colIndex] = ciphertext[index];
          index++;
      }
  }
  
  // Read the grid row by row to form the decrypted message
  let decryptedText = '';
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
          decryptedText += grid[row][col];
      }
  }
  
  return decryptedText;
  }