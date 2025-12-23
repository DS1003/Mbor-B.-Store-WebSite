"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { User, Mail, Lock, ChevronLeft, ArrowRight } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup attempt")
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden text-black">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image src="/football-boots-crampons.jpg" alt="bg" fill className="object-cover opacity-10 grayscale" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-colors group z-10"
      >
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Retour à la Boutique
      </Link>

      <div className="w-full max-w-[500px] space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-[#FFD700] flex items-center justify-center rounded-2xl transform -rotate-3 shadow-xl">
              <span className="font-serif font-black text-4xl italic text-black">M</span>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-black">
              Rejoignez Le <span className="text-transparent text-stroke-black">Club.</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">Découvrez la culture d'élite. Devenez membre.</p>
          </div>
        </div>

        <div className="bg-white/80 border border-white rounded-[2rem] p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Prénom</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="h-12 pl-12 rounded-xl border-zinc-200 bg-zinc-50 text-black focus:border-black focus:ring-black transition-all placeholder:text-zinc-300"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Nom</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="h-12 pl-12 rounded-xl border-zinc-200 bg-zinc-50 text-black focus:border-black focus:ring-black transition-all placeholder:text-zinc-300"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Adresse Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 pl-12 rounded-xl border-zinc-200 bg-zinc-50 text-black focus:border-black focus:ring-black transition-all placeholder:text-zinc-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mot de Passe</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 pl-12 rounded-xl border-zinc-200 bg-zinc-50 text-black focus:border-black focus:ring-black transition-all placeholder:text-zinc-300"
                  required
                />
              </div>
            </div>

            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
              En créant un compte, vous acceptez nos <Link href="/terms" className="text-black font-bold hover:text-zinc-600 transition-colors">Conditions d'Utilisation</Link> et notre <Link href="/privacy" className="text-black font-bold hover:text-zinc-600 transition-colors">Politique de Confidentialité</Link>.
            </p>

            <Button type="submit" className="w-full h-12 rounded-xl bg-black text-white hover:bg-[#FFD700] hover:text-black transition-all font-black uppercase tracking-[0.2em] text-xs group shadow-lg">
              S'inscrire Maintenant <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-100">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-11 rounded-xl font-bold border-zinc-200 bg-white text-zinc-600 hover:bg-black hover:text-white hover:border-black">Google</Button>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-zinc-200 bg-white text-zinc-600 hover:bg-black hover:text-white hover:border-black">Apple</Button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 font-medium">
          Déjà un compte ?{" "}
          <Link href="/login" className="font-bold text-black hover:text-zinc-700 transition-colors uppercase tracking-wider ml-1">
            Se Connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
