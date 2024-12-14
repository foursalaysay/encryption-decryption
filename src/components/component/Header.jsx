'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function Header() {

    const router = useRouter();

  return (
    <div className='px-10 py-5 flex flex-row justify-around'>
        <h1 className='text-5xl font-bold'>Cipher Website</h1>
        <Button onClick={
            () => {
                router.push('/')
            }
        }>
            <Menu />
        </Button>
       
       
    </div>
  )
}
