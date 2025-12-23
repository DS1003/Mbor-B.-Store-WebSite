import Link from "next/link"
import Image from "next/image"
import {
    Instagram, Twitter, Facebook,
    MapPin, Phone, Mail, ArrowUpRight
} from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
            <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

                    {/* BRAND */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="inline-block">
                            <div className="flex flex-col">
                                <span className="font-serif font-black text-md italic text-[#FFD700]">M</span>
                                <span className="font-black text-2xl italic leading-none tracking-tighter uppercase text-white">
                                    MBOR
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/60 leading-relaxed font-medium max-w-sm">
                            La destination première pour la culture football authentique et le streetwear d'élite au Sénégal.
                            Élevons le jeu ensemble depuis 2026.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <Link key={i} href="#" className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all">
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* LINKS GRID */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="space-y-8">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD700]">Boutique</h4>
                            <ul className="space-y-4">
                                {['Nouveautés', 'Maillots', 'Sneakers', 'Streetwear', 'Accessoires'].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-sm font-bold text-white/50 hover:text-white transition-colors flex items-center gap-2 group uppercase tracking-wider">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD700]">Support</h4>
                            <ul className="space-y-4">
                                {['Suivi de Commande', 'Politique de Livraison', 'Retours', 'Guide des Tailles', 'Contactez-nous'].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-sm font-bold text-white/50 hover:text-white transition-colors flex items-center gap-2 group uppercase tracking-wider">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8 col-span-2 md:col-span-1">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD700]">Visitez-nous</h4>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-white uppercase">Mbor Business Store</p>
                                    <p className="text-sm text-white/50">Point E, Avenue Cheikh Anta Diop<br />Dakar, Senegal</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-white uppercase">Contact</p>
                                    <p className="text-sm text-white/50">+221 77 427 23 54<br />contact@mborstore.sn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                        © 2025 MBOR Business Store. Conçu par Victory.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white">Confidentialité</Link>
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white">Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
