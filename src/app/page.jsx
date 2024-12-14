'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {


  const router = useRouter();

 useEffect(() => {
  router.push('/caesar')
 },[router])
 
  
  return (
   <div className="flex flex-col items-center justify-center">
        <p>Loading...</p>
   </div>
  );
}
