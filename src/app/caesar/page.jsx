'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { caesarDecrypt, caesarEncrypt } from '@/logic/CaesarLogic';
import { Separator } from '@/components/ui/separator';


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

  const showEncrypted = () => {

    const result = caesarEncrypt(plainValue, keyValue);
    setEncrypted(result);
    setDecrypted(''); 
  };

  const showDecrypted = () => {
    const result = caesarDecrypt(plainValue, keyValue);
    setDecrypted(result);
  };

  return (
    <div className="flex flex-col items-start px-5 py-5">
      <h1 className="text-4xl font-bold mb-4">Caesar Cipher</h1>
      <Separator />

      <h2 className="my-2 text-sm">Enter the Plain Text:</h2>
      <Input
        value={plainValue}
        onChange={handlePlainChange}
        className="mb-4 text-sm w-[340px]"
        placeholder="Enter plain text..."
      />

      <h2 className="mb-2 text-sm">Enter the Key:</h2>
      <Input
        value={keyValue}
        onChange={handleKeyChange}
        className="mb-4 text-sm w-[340px]"
        placeholder="Enter key..."
      />

      <div className="flex flex-col gap-4 items-center justify-center mb-5">
        <Button onClick={showEncrypted} className="bg-black text-white w-[340px]">
          Encrypt
        </Button>
        <Button onClick={showDecrypted} className="bg-black text-white w-[340px]">
          Decrypt
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col gap-5 mt-8">
        <h4 className="text-2xl font-bold">Encrypted Result:</h4>
        <p>{encrypted || 'No result yet'}</p>

        <h4 className="text-2xl font-bold">Decrypted Result:</h4>
        <p>{decrypted || 'No result yet'}</p>
      </div>
    </div>
  );
}
