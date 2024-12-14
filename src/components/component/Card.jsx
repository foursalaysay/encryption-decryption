'use client'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Card({title, link}) {

  return (
    <Button asChild className='bg-white text-black px-10 py-10 hover:bg-slate-300 border-2 border-black w-full'>
    <Link href={link}>
      <div>
        <h3 className='text-xl text-left'>{title}</h3>
      </div>
    </Link>
  </Button>
  
  )
}