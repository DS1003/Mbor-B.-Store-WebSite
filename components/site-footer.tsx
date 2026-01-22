"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Facebook,
    Instagram,
    Twitter,
    MapPin,
    Phone,
    Mail,
    ArrowUpRight,
    Send,
    ShieldCheck,
    Truck,
    CreditCard
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
    const pathname = usePathname()
    if (pathname?.startsWith("/admin")) return null

    return (
        <footer className="w-full bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
            <div className="container-custom">
                {/* Upper Section: Brand & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-white/10">
                    <div className="lg:col-span-5 space-y-10">
                        <Link href="/" className="inline-block">
                            <span className="font-heading text-4xl font-bold tracking-tight leading-none">
                                Mbor<span className="text-primary">.Store</span>
                            </span>
                        </Link>
                        <p className="text-lg text-white/50 max-w-sm leading-relaxed font-medium tracking-tight">
                            La référence du sport et de la mode urbaine au Sénégal. Authenticité, Excellence et Passion.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Instagram, label: "Instagram" },
                                { icon: Facebook, label: "Facebook" },
                                { icon: Twitter, label: "Twitter" },
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-black transition-all duration-300 border border-white/10"
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-10 bg-white/5 p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 blur-3xl rounded-full" />
                        <div className="space-y-3 relative z-10">
                            <h4 className="text-2xl font-bold tracking-tight">Mbor Insider</h4>
                            <p className="text-white/50 font-medium tracking-tight">Recevez les accès prioritaires aux sorties exclusives.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                            <div className="relative flex-1">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                <Input
                                    placeholder="votre@email.com"
                                    className="h-14 pl-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 text-white placeholder:text-white/20"
                                />
                            </div>
                            <Button className="h-14 px-8 bg-white text-black hover:bg-primary rounded-xl font-bold tracking-tight text-sm">
                                Nous rejoindre
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-20 border-b border-white/10">
                    {[
                        { icon: Truck, title: "Livraison Express", desc: "Dakar en 24h & Régions en 48h" },
                        { icon: ShieldCheck, title: "100% Authentique", desc: "Produits certifiés officiels" },
                        { icon: CreditCard, title: "Paiement Sécurisé", desc: "Wave, OM & Espèces à livraison" },
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center space-x-5 group">
                            <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-white/5">
                                <badge.icon className="h-7 w-7" />
                            </div>
                            <div>
                                <h5 className="font-bold tracking-tight text-lg leading-none">{badge.title}</h5>
                                <p className="text-white/40 text-[13px] font-medium mt-1 tracking-tight">{badge.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Links */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-20">
                    <div className="space-y-6">
                        <h4 className="text-[12px] font-bold uppercase tracking-widest text-primary">Découvrir</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Boutique", href: "/shop" },
                                { label: "Notre Histoire", href: "/about" },
                                { label: "Nos Boutiques", href: "/stores" },
                                { label: "Le Blog", href: "/blog" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-sm font-medium text-white/50 hover:text-white transition-colors">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[12px] font-bold uppercase tracking-widest text-primary">Collections</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Maillots & Kits", href: "/shop/maillots" },
                                { label: "Sneakers & Mode", href: "/shop/sneakers" },
                                { label: "Performance", href: "/shop/crampons" },
                                { label: "Accessoires", href: "/shop/accessoires" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-sm font-medium text-white/50 hover:text-white transition-colors">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[12px] font-bold uppercase tracking-widest text-primary">Service Client</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Centre d'Aide (FAQ)", href: "/faq" },
                                { label: "Suivi de Commande", href: "/account/orders" },
                                { label: "Retours & Remboursements", href: "/returns" },
                                { label: "Livraison & Expédition", href: "/delivery" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-sm font-medium text-white/50 hover:text-white transition-colors">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[12px] font-bold uppercase tracking-widest text-primary">Contact Direct</h4>
                        <div className="space-y-3">
                            <Link href="/contact" className="flex items-center text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer tracking-tight">
                                <Phone className="h-4 w-4 mr-3 text-primary/60" /> +221 33 800 00 00
                            </Link>
                            <Link href="/contact" className="flex items-center text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer tracking-tight">
                                <Mail className="h-4 w-4 mr-3 text-primary/60" /> contact@mborstore.com
                            </Link>
                            <Link href="/stores" className="flex items-center text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer tracking-tight">
                                <MapPin className="h-4 w-4 mr-3 text-primary/60" /> Nos Adresses
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center space-x-3">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <p className="text-[11px] font-medium text-white/20 tracking-tight">
                            &copy; {new Date().getFullYear()} Mbor Store — Élegance Sportive. Tous droits réservés.
                        </p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link href="/terms" className="text-[11px] font-medium text-white/20 hover:text-white transition-colors">CGV</Link>
                        <Link href="/privacy" className="text-[11px] font-medium text-white/20 hover:text-white transition-colors">Vie privée</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
