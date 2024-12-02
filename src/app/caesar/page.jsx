'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { caesarEncrypt, caesarDecrypt } from '@/logic/CaesarLogic'



export default function CaesarPage() {

  const [plainValue, setPlainValue] = useState('')
  const [shiftValue, setShiftValue] = useState(0);

  const encrypted = caesarEncrypt(plainValue, shiftValue);
  const decrypted = caesarDecrypt(plainValue, shiftValue);

  const plainTextChange = (event) => {
    setPlainValue(event.target.value);
  };

  const shiftChange = (event) => {
    setShiftValue(event.target.value);
  };

  return (
    <div className='flex flex-col items-start pl-10'>
        <h1 className='text-4xl font-bold'>Caesar Cipher</h1>
        <h1>Enter the Plain Text</h1>
        <Input onChange={plainTextChange}  />
        <h1>Enter Shift Value:</h1>
        <Input onChange={shiftChange}  />

    <h4>Encryption</h4>
    <h5>{encrypted}</h5>
    <h4>Decryption</h4>
    <h5>{decrypted}</h5>


    </div>
  )
}
