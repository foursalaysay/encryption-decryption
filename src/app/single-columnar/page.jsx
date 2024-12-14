'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SingleColumnarDecrypt, SingleColumnarEncrypt } from '@/logic/SingleColumnar';


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

    const result = SingleColumnarEncrypt(plainValue, keyValue);
    setEncrypted(result);
    setDecrypted(''); // Clear the decrypted result for clarity
  };

  // Decryption action
  const showDecrypted = () => {

    const result = SingleColumnarDecrypt(plainValue, keyValue);
    setDecrypted(result);
  };

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-4xl font-bold mb-4">Single Columnar</h1>

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
        <p>{encrypted || 'No result yet'}</p>

        <h4 className="text-2xl font-bold">Decrypted Result:</h4>
        <p>{decrypted || 'No result yet'}</p>
      </div>
    </div>
  );
}
