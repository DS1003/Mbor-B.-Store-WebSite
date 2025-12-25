"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        shop: [
            { name: "Maillots", href: "/shop?category=jerseys" },
            { name: "Sneakers", href: "/shop?category=sneakers" },
            { name: "Crampons", href: "/shop?category=boots" },
            { name: "Lifestyle", href: "/shop?category=lifestyle" },
        ],
        support: [
            { name: "Suivre ma commande", href: "/profile" },
            { name: "Livraison", href: "/shipping" },
            { name: "Retours", href: "/returns" },
            { name: "FAQ", href: "/faq" },
        ],
        legal: [
            { name: "Conditions de vente", href: "/terms" },
            { name: "Confidentialité", href: "/privacy" },
            { name: "À propos", href: "/about" },
            { name: "Contact", href: "/contact" },
        ]
    }

    return (
        <footer className="relative bg-black text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
            {/* Background Massive Text */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none select-none z-0">
                <h2 className="text-[40vw] font-black leading-none tracking-tighter uppercase italic">MBOR</h2>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">

                    {/* Brand Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="h-14 w-14 bg-[#FFD700] flex items-center justify-center rotate-12 shadow-xl shadow-[#FFD700]/10">
                                    <span className="font-black text-3xl italic text-black">M</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-2xl italic leading-none tracking-tighter uppercase">MBOR</span>
                                    <span className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-40">Business Store</span>
                                </div>
                            </Link>
                            <p className="max-w-md text-zinc-400 text-sm font-medium leading-relaxed uppercase tracking-wider italic">
                                Redéfinir la culture sport avec une essence africaine et une vision internationale.
                                L'excellence authentifiée pour l'élite.
                            </p>
                        </div>

                        {/* Newsletter Mini */}
                        <div className="space-y-6 max-w-sm">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFD700]">The Elite Circle</h4>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="VOTRE EMAIL"
                                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-[#FFD700] transition-colors"
                                />
                                <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-2 transition-transform">
                                    <ArrowRight className="h-5 w-5 text-[#FFD700]" />
                                </button>
                            </div>
                            <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Inscrivez-vous pour les accès prioritaires aux Limited Drops.</p>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, href: "#" },
                                { icon: Facebook, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Youtube, href: "#" }
                            ].map((social, i) => (
                                <Link key={i} href={social.href}>
                                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-zinc-900 border border-white/5 hover:bg-[#FFD700] hover:text-black transition-all">
                                        <social.icon className="h-5 w-5" />
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Navigation</h4>
                            <ul className="space-y-5">
                                {footerLinks.shop.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-zinc-400 hover:text-white text-xs font-black uppercase tracking-widest transition-colors block">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Service</h4>
                            <ul className="space-y-5">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-zinc-400 hover:text-white text-xs font-black uppercase tracking-widest transition-colors block">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-8 col-span-2 sm:col-span-1">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">L'Atelier</h4>
                            <div className="space-y-6">
                                <Link href="#" className="flex items-start gap-4 group">
                                    <MapPin className="h-5 w-5 text-[#FFD700] shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-white tracking-widest">Showroom Dakar</p>
                                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                                            Cité Keur Gorgui, <br /> Dakar, Sénégal
                                        </p>
                                    </div>
                                </Link>
                                <Link href="#" className="flex items-center gap-4 group">
                                    <Phone className="h-5 w-5 text-[#FFD700] shrink-0" />
                                    <p className="text-[10px] font-black uppercase text-white tracking-widest">+221 77 427 23 54</p>
                                </Link>
                                <Link href="#" className="flex items-center gap-4 group">
                                    <Mail className="h-5 w-5 text-[#FFD700] shrink-0" />
                                    <p className="text-[10px] font-black uppercase text-white tracking-widest">contact@mbor.sn</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">
                        &copy; {currentYear} MBOR BUSINESS STORE. TOUS DROITS RÉSERVÉS.
                    </p>
                    <div className="flex gap-8">
                        {footerLinks.legal.map((link) => (
                            <Link key={link.name} href={link.href} className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 hover:text-[#FFD700] transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-5" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                    </div>
                </div>
            </div>
        </footer>
    )
}
