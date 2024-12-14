'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { columnarEncrypt, columnarDecrypt, encryptWithFirstKey, decryptWithFirstKey, encryptWithSecondKey, decryptWithSecondKey } from '@/logic/DoubleColumnar';


export default function DoubleColumnarPage() {
  const [plainValue, setPlainValue] = useState(''); // Plain text input
 
  const [keyValue1, setKeyValue1] = useState(''); // Key input
  const [keyValue2, setKeyValue2] = useState('');
  const [encrypted2, setEncrypted2] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted2, setDecrypted2] = useState('');
  const [decrypted, setDecrypted] = useState(''); // Decrypted result
  const [error, setError] = useState(''); // Error message

  const [underscore, setUnderScore] = useState('')
  // Handle input changes for plain text and key
  const handlePlainChange = (event) => {
    setPlainValue(event.target.value);
    setError(''); // Clear error on input
  };

  const handleKeyChange1 = (event) => {
    setKeyValue1(event.target.value);
    setError(''); // Clear error on input
  };

  const handleKeyChange2 = (event) => {
    setKeyValue2(event.target.value);
    setError(''); // Clear error on input
  };

  // Encryption action
  const showEncrypted = () => {
    
    
    const result = encryptWithFirstKey(plainValue, keyValue1);
    setEncrypted(result);
    const printResult = encryptWithSecondKey(result, keyValue2);
    setEncrypted2(printResult);
    // The Result is encrypted2
    setDecrypted(''); // Clear the decrypted result for clarity
  };

  // Decryption action
  const showDecrypted = () => {
    const result = decryptWithFirstKey(plainValue, keyValue2);
    setDecrypted(result);
    const printResult = decryptWithSecondKey(result, keyValue1);
    setDecrypted2(printResult);
    setEncrypted('');
  
    // Remove underscores from decrypted2
    const cleanedString = printResult.replace(/_/g, ' ');  // Remove all underscores
    setUnderScore(cleanedString);
  };  
  
  return (
    <div className="flex flex-col p-5">
      <h1 className="text-4xl font-bold mb-4">Double Columnar</h1>

      <h2 className="mb-2 text-sm">Enter the Plain Text:</h2>
      <Input
        value={plainValue}
        onChange={handlePlainChange}
        className="mb-4 text-sm"
        placeholder="Enter plain text..."
      />

      <h2 className="mb-2 text-sm">Enter the Key 1:</h2>
      <Input
        value={keyValue1}
        onChange={handleKeyChange1}
        className="mb-4 text-sm"
        placeholder="Enter key..."
      />

  <h2 className="mb-2 text-sm">Enter the Key 2:</h2>
      <Input
        value={keyValue2}
        onChange={handleKeyChange2}
        className="mb-4 text-sm"
        placeholder="Enter key..."
      />

      <div className="flex gap-4 flex-col items-center justify-center">
        <Button onClick={showEncrypted} className="bg-black text-white w-[340px]">
          Encrypt
        </Button>
        <Button onClick={showDecrypted} className="bg-black text-white w-[340px]">
          Decrypt
        </Button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex flex-col gap-5 mt-8">
        <h4 className="text-2xl font-bold">Encrypted Result:</h4>
        <p>Encrypted Message: (K1) : {encrypted}</p>
        <p>Encrypted Message: (K2) : {encrypted2}</p>
        

        <h4 className="text-2xl font-bold">Decrypted Result:</h4>
        <p>Decrypted Message: (K2) : {decrypted}</p>
        <p>Decrypted Message: (K1) : {decrypted2}</p>
        <p>Plain Text: {underscore}</p>
        <p></p>
      </div>
    </div>
  );
}
