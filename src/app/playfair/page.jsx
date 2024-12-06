'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { playfairEncrypt, playfairDecrypt, createMatrix, createPairs } from '@/logic/Playfair'

export default function PlayfairPage() {
  const [plainValue, setPlainValue] = useState('');
  const [cipherValue, setCipherValue] = useState(
    '');
  const [keyValue, setKeyValue] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [originalPlaintext, setOriginalPlaintext] = useState('');
  const [matrix, setMatrix] = useState([]);
  const [letterPairs, setLetterPairs] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(null); // Track current pair being processed

  const handlePlainTextChange = (event) => {
    setPlainValue(event.target.value);
  };

  const handleCipherTextChange = (event) => {
    setCipherValue(event.target.value);
  };

  const handleKeyChange = (event) => {
    const key = event.target.value;
    setKeyValue(key);
    setMatrix(createMatrix(key)); // Generate matrix dynamically
  };

  const handleEncrypt = () => {
    if (!plainValue) {
      alert('Please enter plaintext for encryption.');
      return;
    }
    setOriginalPlaintext(plainValue.trim());
    const pairs = createPairs(plainValue); // Create pairs from plaintext
    setLetterPairs(pairs);
    const encryptedText = playfairEncrypt(plainValue, keyValue);
    setEncrypted(encryptedText);
    setCipherValue('');
  };

  const handleDecrypt = () => {
    if (!cipherValue) {
      alert('Please enter ciphertext for decryption.');
      return;
    }
    const decryptedText = playfairDecrypt(cipherValue, keyValue);
    setDecrypted(decryptedText);
    setPlainValue('');
  };

  const handleRefresh = () => {
    setPlainValue('');
    setCipherValue('');
    setKeyValue('');
    setEncrypted('');
    setDecrypted('');
    setOriginalPlaintext('');
    setMatrix([]);
    setLetterPairs([]);
    setCurrentPairIndex(null);
  };

  const getCellStyle = (char) => {
    if (currentPairIndex !== null && letterPairs[currentPairIndex]) {
      const [first, second] = letterPairs[currentPairIndex];
      if (char === first) return 'bg-blue-200';
      if (char === second) return 'bg-green-200';
    }
    return '';
  };

  const handlePairClick = (index) => {
    setCurrentPairIndex(index);
  };

  return (
    <div className='flex flex-col items-start pl-10'>
      <h1 className='text-4xl font-bold'>Playfair Cipher</h1>

      <h1>Enter Plaintext (for Encryption):</h1>
      <Input value={plainValue} onChange={handlePlainTextChange} />

      <h1>Enter Ciphertext (for Decryption):</h1>
      <Input value={cipherValue} onChange={handleCipherTextChange} />

      <h1>Enter Key:</h1>
      <Input value={keyValue} onChange={handleKeyChange} />

      <div className='flex gap-4 mt-4'>
        <Button onClick={handleEncrypt}>Encrypt</Button>
        <Button onClick={handleDecrypt}>Decrypt</Button>
        <Button onClick={handleRefresh} className="bg-red-500 text-white">Refresh</Button>
      </div>

      {matrix.length > 0 && (
        <div className='mt-4'>
          <h4 className='font-bold'>Playfair Matrix:</h4>
          <table className='border border-gray-500'>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((char, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border px-4 py-2 text-center ${getCellStyle(char)}`}
                    >
                      {char}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {letterPairs.length > 0 && (
        <div className='mt-4'>
          <h4 className='font-bold'>Plaintext Split into Pairs:</h4>
          <ul className='flex gap-2'>
            {letterPairs.map((pair, index) => (
              <li
                key={index}
                onClick={() => handlePairClick(index)}
                className={`cursor-pointer p-2 border rounded ${
                  index === currentPairIndex ? 'bg-gray-200' : ''
                }`}
              >
                {pair.join('')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {encrypted && (
        <>
          <h4 className='mt-4'>Encrypted Message:</h4>
          <h5>{encrypted}</h5>
        </>
      )}

      {decrypted && (
        <>
          <h4 className='mt-4'>Decryption Result:</h4>
          <h5>Decrypted Plaintext (No Spaces): {decrypted}</h5>
          <h5>Original Plaintext (With Spaces): {originalPlaintext || 'N/A'}</h5>
        </>
      )}
    </div>
  );
}