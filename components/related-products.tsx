"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const RELATED = [
    {
        id: "2",
        name: "Elite Performance Tights",
        price: 350,
        image: "/premium-sneakers-and-jordans.jpg",
        rating: 4.9,
    },
    {
        id: "3",
        name: "Architectural Tech Jacket",
        price: 1250,
        image: "/premium-sneakers-and-jordans.jpg",
        rating: 4.7,
    },
    {
        id: "4",
        name: "Precision Glide Sneakers",
        price: 890,
        image: "/premium-sneakers-and-jordans.jpg",
        rating: 5.0,
    },
    {
        id: "5",
        name: "Dakar Series Cap",
        price: 85,
        image: "/premium-sneakers-and-jordans.jpg",
        rating: 4.6,
    },
]

export function RelatedProducts() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            {RELATED.map((product) => (
                <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group flex flex-col space-y-4"
                >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-zinc-50 border border-zinc-100 shadow-sm transition-shadow group-hover:shadow-md">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
                        />
                        <div className="absolute top-4 right-4">
                            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1.5 rounded-sm border border-zinc-100 shadow-sm">
                                <Star className="h-3 w-3 fill-black text-black" />
                                <span className="text-[10px] font-black text-zinc-600">{product.rating}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-black line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-lg font-black italic tracking-tighter tabular-nums text-black">
                            ${product.price}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
