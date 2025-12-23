"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"

const PRODUCTS = [
    {
        id: "1",
        name: "Nike Forward Hoodie",
        category: "Vêtements",
        price: 1099,
        image: "/premium-sneakers-and-jordans.jpg",
        rating: 4.8,
    },
    {
        id: "2",
        name: "Elite Performance Tights",
        category: "Sports",
        price: 350,
        image: "/premium-sneakers-and-jordans.jpg",
        rating: 4.9,
    },
    {
        id: "3",
        name: "Architectural Tech Jacket",
        category: "Vêtements d'Extérieur",
        price: 1250,
        image: "/premium-sneakers-and-jordans.jpg",
        rating: 4.7,
    },
    {
        id: "4",
        name: "Precision Glide Sneakers",
        category: "Chaussures",
        price: 890,
        image: "/premium-sneakers-and-jordans.jpg",
        rating: 5.0,
    },
    {
        id: "5",
        name: "Urban Cargo Pant",
        category: "Streetwear",
        price: 450,
        image: "/streetwear-collection-urban-fashion.jpg",
        rating: 4.5,
    },
    {
        id: "6",
        name: "Speed Force Cleats",
        category: "Crampons",
        price: 890,
        image: "/football-boots-crampons.jpg",
        rating: 4.9,
    },
]

export function ProductGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 row-gap-12">
            {PRODUCTS.map((product) => (
                <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group relative flex flex-col space-y-4"
                >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-50 border border-zinc-100 group-hover:border-zinc-300 transition-colors shadow-sm">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay Gradient - Light Mode specific (subtle dark bottom) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Top Badges */}
                        <div className="absolute top-5 left-5">
                            <Badge className="bg-white/90 backdrop-blur-md text-black border-zinc-200 rounded-sm px-3 py-1 text-[9px] font-black uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-colors">
                                {product.category}
                            </Badge>
                        </div>

                        {/* Actions */}
                        <div className="absolute top-5 right-5">
                            <button className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-[#FFD700] hover:border-black">
                                <Heart className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Bottom Info Card */}
                        <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="bg-white/90 backdrop-blur-xl border border-zinc-200 p-4 rounded-xl flex items-center justify-between shadow-lg">
                                <span className="text-[10px] font-black uppercase tracking-widest text-black">Ajout Rapide</span>
                                <div className="bg-black text-white p-1.5 rounded-full">
                                    <ShoppingCart className="h-3 w-3" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1 px-2">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="text-lg font-black italic uppercase tracking-tighter leading-none text-black group-hover:text-zinc-600 transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-black text-black" />
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">{product.rating} Avis</span>
                                </div>
                            </div>
                            <p className="text-xl font-black italic tracking-tighter tabular-nums text-black">
                                ${product.price}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
