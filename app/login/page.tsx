"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ChevronLeft, ArrowRight } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("Identifiants incorrects. Veuillez réessayer.")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden text-black">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image src="/football-jersey-collection.jpg" alt="bg" fill className="object-cover opacity-10 grayscale" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-colors group z-10"
      >
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Retour à la Boutique
      </Link>

      <div className="w-full max-w-[450px] space-y-8 animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-black flex items-center justify-center rounded-2xl transform rotate-3 shadow-xl">
              <span className="font-serif font-black text-4xl italic text-[#FFD700]">M</span>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-black">
              Protocole <span className="text-transparent text-stroke-black">d'Accès.</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">Entrez vos identifiants pour accéder au coffre.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="bg-white/80 border border-white rounded-[2rem] p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Adresse Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-12 rounded-xl border-zinc-200 bg-zinc-50 text-black focus:border-black focus:ring-black transition-all placeholder:text-zinc-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mot de Passe</Label>
                  <Link href="/forgot-password" title="Recover Password" className="text-[10px] font-bold text-black hover:text-zinc-600 transition-colors uppercase tracking-wider">
                    Oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-12 pr-12 rounded-xl border-zinc-200 bg-zinc-50 text-black focus:border-black focus:ring-black transition-all placeholder:text-zinc-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-black text-white hover:bg-[#FFD700] hover:text-black transition-all font-black uppercase tracking-[0.2em] text-xs shadow-lg disabled:opacity-50"
            >
              {isLoading ? "Chargement..." : "Se Connecter"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-zinc-400 font-bold tracking-widest text-[10px]">Ou continuer avec</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-11 rounded-xl font-bold border-zinc-200 bg-white text-zinc-600 hover:bg-black hover:text-white hover:border-black">
                Google
              </Button>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-zinc-200 bg-white text-zinc-600 hover:bg-black hover:text-white hover:border-black">
                Apple
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 font-medium">
          Pas de compte ?{" "}
          <Link href="/signup" title="Create Account" className="font-bold text-black hover:text-zinc-700 transition-colors uppercase tracking-wider ml-1">
            S'inscrire Gratuitement
          </Link>
        </p>
      </div>
    </div>
  )
}
