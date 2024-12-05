'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { columnarEncrypt, columnarDecrypt } from '@/logic/DoubleColumnar';


export default function DoubleColumnarPage() {
  const [plainValue, setPlainValue] = useState(''); // Plain text input
  const [plainValue2, setPlainValue2] = useState('');
  const [keyValue1, setKeyValue1] = useState(''); // Key input
  const [keyValue2, setKeyValue2] = useState('');
  const [encrypted, setEncrypted] = useState(''); // Encrypted result
  const [decrypted, setDecrypted] = useState(''); // Decrypted result
  const [error, setError] = useState(''); // Error message

  // Handle input changes for plain text and key
  const handlePlainChange = (event) => {
    setPlainValue(event.target.value);
    setError(''); // Clear error on input
  };

  const handleKeyChange1 = (event) => {
    setKeyValue(event.target.value);
    setError(''); // Clear error on input
  };

  const handleKeyChange2 = (event) => {
    setKeyValue(event.target.value);
    setError(''); // Clear error on input
  };

  // Validate key for letters only
  const isKeyValid = (key) => /^[a-zA-Z]+$/.test(key);

  // Encryption action
  const showEncrypted = () => {
    
    const result = doubleColumnarEncrypt(plainValue, keyValue);
    setEncrypted(result);
    setDecrypted(''); // Clear the decrypted result for clarity
  };

  // Decryption action
  const showDecrypted = () => {
   
    if (!isKeyValid(keyValue)) {
      setError('The key must only contain letters (A-Z or a-z).');
      return;
    }

    const result = doubleColumnarDecrypt(plainValue, keyValue);
    setDecrypted(result);
  };

  return (
    <div className="flex flex-col items-start pl-10">
      <h1 className="text-4xl font-bold mb-4">Double Columnar Cipher</h1>

      <h2 className="mb-2">Enter the Plain Text:</h2>
      <Input
        value={plainValue}
        onChange={handlePlainChange}
        className="mb-4"
        placeholder="Enter plain text..."
      />

      <h2 className="mb-2">Enter the Key 1:</h2>
      <Input
        value={keyValue}
        onChange={handleKeyChange}
        className="mb-4"
        placeholder="Enter key..."
      />

  <h2 className="mb-2">Enter the Key 2:</h2>
      <Input
        value={keyValue}
        onChange={handleKeyChange}
        className="mb-4"
        placeholder="Enter key..."
      />

      <div className="flex gap-4">
        <Button onClick={showEncrypted} className="bg-green-500">
          Encrypt
        </Button>
        <Button onClick={showDecrypted} className="bg-blue-500">
          Decrypt
        </Button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex flex-col gap-5 mt-8">
        <h4 className="text-2xl font-bold">Encrypted Result:</h4>
        <p>{encrypted || 'No result yet'}</p>

        <h4 className="text-2xl font-bold">Decrypted Result:</h4>
        <p>{decrypted || 'No result yet'}</p>
      </div>
    </div>
  );
}
