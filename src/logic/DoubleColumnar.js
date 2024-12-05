export function columnarEncrypt(text, key) {
    const numColumns = key.length;
    const columns = Array(numColumns).fill("");

    // Fill columns based on the key order
    for (let i = 0; i < text.length; i++) {
        columns[i % numColumns] += text[i];
    }

    // Sort columns based on the alphabetical order of the key
    const sortedKey = [...key].map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char));
    const sortedColumns = sortedKey.map(({ index }) => columns[index]);

    // Concatenate sorted columns
    return sortedColumns.join("");
}

export function columnarDecrypt(text, key) {
    const numColumns = key.length;
    const numRows = Math.floor(text.length / numColumns);
    const remainder = text.length % numColumns;

    // Calculate column lengths
    const columnLengths = Array(numColumns).fill(numRows).map((len, index) => (index < remainder ? len + 1 : len));

    // Extract columns in the sorted key order
    const sortedKey = [...key].map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char));
    const columns = [];
    let currentIndex = 0;

    for (let { index } of sortedKey) {
        columns[index] = text.slice(currentIndex, currentIndex + columnLengths[index]);
        currentIndex += columnLengths[index];
    }

    // Read the columns row by row to reconstruct the plaintext
    let plaintext = "";
    for (let i = 0; i < numRows + 1; i++) {
        for (let col of columns) {
            if (i < col.length) plaintext += col[i];
        }
    }

    return plaintext;
}

export function encryptWithFirstKey(text, key1) {
    return columnarEncrypt(text, key1);
}

export function encryptWithSecondKey(text, key2) {
    return columnarEncrypt(text, key2);
}

export function decryptWithSecondKey(text, key2) {
    return columnarDecrypt(text, key2);
}

export function decryptWithFirstKey(text, key1) {
    return columnarDecrypt(text, key1);
}