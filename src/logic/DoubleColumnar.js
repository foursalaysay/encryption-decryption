export function columnarEncrypt(text, key) {
    const sanitizedText = text.replace(/ /g, '_'); // Replace spaces with underscores
    const numColumns = key.length;

    // Step 1: Fill text into rows based on the number of columns
    const rows = [];
    for (let i = 0; i < sanitizedText.length; i += numColumns) {
        rows.push(
            sanitizedText.slice(i, i + numColumns).padEnd(numColumns, '_') // Pad with '_'
        );
    }

    // Step 2: Reorganize the columns based on the key's alphabetical order
    const sortedKey = [...key].map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char));
    const columnIndices = sortedKey.map(({ index }) => index);

    const columns = Array(numColumns).fill("").map((_, colIndex) =>
        rows.map(row => row[colIndex] || "").join("")
    );

    // Step 3: Concatenate columns in sorted order
    const sortedColumns = columnIndices.map(index => columns[index]);
    return sortedColumns.join("");
}

export function columnarDecrypt(text, key) {
    const numColumns = key.length;
    const numRows = Math.floor(text.length / numColumns);
    const remainder = text.length % numColumns;

    // Step 1: Calculate the lengths of each column
    const columnLengths = Array(numColumns).fill(numRows).map((len, index) => (index < remainder ? len + 1 : len));

    // Step 2: Sort the key alphabetically and map to original indices
    const sortedKey = [...key]
        .map((char, index) => ({ char, index })) // create array of { char, index }
        .sort((a, b) => a.char.localeCompare(b.char)); // sort by character

    // Step 3: Create an array of columns based on the sorted key
    const columns = [];
    let currentIndex = 0;
    for (let { index } of sortedKey) {
        const colLength = columnLengths[index];
        columns[index] = text.slice(currentIndex, currentIndex + colLength); // slice text into columns
        currentIndex += colLength;
    }

    // Step 4: Reconstruct the plaintext row by row
    let plaintext = "";
    for (let i = 0; i < numRows + (remainder > 0 ? 1 : 0); i++) {
        for (let col of columns) {
            if (i < col.length) plaintext += col[i]; // append the i-th character of each column
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