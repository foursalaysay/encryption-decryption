'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { encryptVigenere, decryptVigenere } from '@/logic/Vigenere';

export default function VigenerePage() {
  const [plainValue, setPlainValue] = useState(''); // Plain text input
  const [keyValue, setKeyValue] = useState(''); // Key input
  const [encrypted, setEncrypted] = useState(''); // Encrypted result
  const [decrypted, setDecrypted] = useState(''); // Decrypted result
  const [error, setError] = useState(''); // Error message

  // Handle input changes for plain text and key
  const handlePlainChange = (event) => {
    setPlainValue(event.target.value);
    setError(''); // Clear error on input
  };

  const handleKeyChange = (event) => {
    setKeyValue(event.target.value);
    setError(''); // Clear error on input
  };

  // Validate key for letters only
  const isKeyValid = (key) => /^[a-zA-Z]+$/.test(key);

  // Encryption action
  const showEncrypted = () => {
    if (!plainValue || !keyValue) {
      setError('Both plain text and key are required.');
      return;
    }
    if (!isKeyValid(keyValue)) {
      setError('The key must only contain letters (A-Z or a-z).');
      return;
    }

    const result = encryptVigenere(plainValue, keyValue);
    setEncrypted(result);
    setDecrypted(''); // Clear the decrypted result for clarity
  };

  // Decryption action
  const showDecrypted = () => {
   
    if (!isKeyValid(keyValue)) {
      setError('The key must only contain letters (A-Z or a-z).');
      return;
    }

    const result = decryptVigenere(plainValue, keyValue);
    setDecrypted(result);
  };

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-4xl font-bold mb-4">Vigenère Cipher</h1>

      <h2 className="mb-2 text-sm">Enter the Plain Text:</h2>
      <Input
        value={plainValue}
        onChange={handlePlainChange}
        className="mb-4 text-sm"
        placeholder="Enter plain text..."
      />

      <h2 className="mb-2 text-sm">Enter the Key:</h2>
      <Input
        value={keyValue}
        onChange={handleKeyChange}
        className="mb-4 text-sm"
        placeholder="Enter key..."
      />

      <div className="flex flex-col gap-4">
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
        <p>{encrypted || 'No result yet'}</p>

        <h4 className="text-2xl font-bold">Decrypted Result:</h4>
        <p>{decrypted || 'No result yet'}</p>
      </div>
    </div>
  );
}
