'use client'

import Card from "@/components/component/Card";

const cards = [
  { title: "Caesar Cipher", link: "/caesar" },
  { title: "Vigenere", link: "/vigenere" },
  { title: "Playfair", link: "/playfair" },
  { title: "Single Columnar", link: "/single-columnar" },
  { title: "Double Columnar", link: "/double-columnar" },
  { title: "AES", link: "/aes" }
];


export default function Home() {

  return (
    <div className="flex flex-wrap px-10 py-5 gap-5 h-full">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} link={card.link} />
      ))}
    </div>
  
  );
}
