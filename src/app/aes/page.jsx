'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aesDecrypt, aesEncrypt } from '@/logic/AES';

export default function AESPage() {
  const [plainValue, setPlainValue] = useState(''); // Plain text input
  const [keyValue, setKeyValue] = useState(''); // Key input
  const [encrypted, setEncrypted] = useState(''); // Encrypted result
  const [decrypted, setDecrypted] = useState(''); // Decrypted result
  const [error, setError] = useState(''); // Error message
  const key128 = "0123456789abcdef";

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
    const result = aesEncrypt(plainValue, key128);
    setEncrypted(result);
    setDecrypted(''); // Clear the decrypted result for clarity
  };

  // Decryption action
  const showDecrypted = () => {
    const result = aesDecrypt(plainValue, key128);
    setDecrypted(result);
  };

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-4xl font-bold mb-4">AES Cipher</h1>

      <h2 className="mb-2">Enter the Plain Text:</h2>
      <Input
        value={plainValue}
        onChange={handlePlainChange}
        className="mb-4"
        placeholder="Enter plain text..."
      />

      {/* <h2 className="mb-2">Enter the Key:</h2>
      <Input
        value={keyValue}
        onChange={handleKeyChange}
        className="mb-4"
        placeholder="Enter key..."
      /> */}

      <div className="flex flex-col  gap-4">
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
