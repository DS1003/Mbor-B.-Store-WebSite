"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

const IMAGES = [
  "/premium-sneakers-and-jordans.jpg",
  "/football-jersey-collection.jpg",
  "/football-boots-crampons.jpg",
  "/streetwear-collection-urban-fashion.jpg",
]

export function ProductGallery() {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="flex flex-col gap-8">

      {/* MAIN FRAME - GALLERY STYLE */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-50 border border-zinc-200 group shadow-sm hover:shadow-xl transition-shadow duration-500">
        <Image
          src={IMAGES[activeImage] || "/placeholder.svg"}
          alt="Visualisation de l'Article"
          fill
          className="object-cover transition-all duration-700 hover:scale-105"
          priority
        />

        {/* Overlay Gradient (Light Mode) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        {/* NAV OVERLAYS */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.preventDefault(); setActiveImage((prev) => (prev > 0 ? prev - 1 : IMAGES.length - 1)) }}
            className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 flex items-center justify-center text-black hover:bg-black hover:text-[#FFD700] hover:border-black transition-all pointer-events-auto active:scale-95 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); setActiveImage((prev) => (prev < IMAGES.length - 1 ? prev + 1 : 0)) }}
            className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 flex items-center justify-center text-black hover:bg-black hover:text-[#FFD700] hover:border-black transition-all pointer-events-auto active:scale-95 shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* THUMBNAIL PROTOCOL */}
      <div className="flex gap-4 justify-center">
        {IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === i
              ? "border-black scale-105 opacity-100 shadow-md"
              : "border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0"}`}
          >
            <Image src={img} alt={`View ${i}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
