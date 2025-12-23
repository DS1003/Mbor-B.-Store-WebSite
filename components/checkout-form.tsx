"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Truck, User, MapPin, Wallet } from "lucide-react"

export function CheckoutForm() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-left-4 duration-700">
      {/* Checkout Phases */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        {[
          { label: "Personnel", icon: User, active: true },
          { label: "Livraison", icon: MapPin, active: false },
          { label: "Paiement", icon: Wallet, active: false },
        ].map((phase, i) => (
          <div key={phase.label} className="space-y-4">
            <div className={`h-1.5 w-full rounded-full transition-all duration-700 ${phase.active ? "bg-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]" : "bg-border"}`} />
            <div className={`flex items-center gap-3 ${phase.active ? "text-foreground" : "text-muted-foreground"}`}>
              <phase.icon className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{phase.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Personal Info */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight underline decoration-primary/30 decoration-4 underline-offset-4">Identité_</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/5 p-8 lg:p-10 rounded-[2.5rem] border border-border">
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Prénom</Label>
            <Input placeholder="ex. Jean" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
          </div>
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nom</Label>
            <Input placeholder="ex. Dupont" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
          </div>
          <div className="md:col-span-2 space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Adresse Email</Label>
            <Input type="email" placeholder="john.doe@example.com" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
          </div>
        </div>
      </section>

      {/* Shipping Address */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight underline decoration-primary/30 decoration-4 underline-offset-4">Destination_</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/5 p-8 lg:p-10 rounded-[2.5rem] border border-border">
          <div className="md:col-span-2 space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Adresse</Label>
            <Input placeholder="123 Avenue Dakar" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
          </div>
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Ville</Label>
            <Input placeholder="Dakar" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
          </div>
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Code Postal</Label>
            <Input placeholder="10001" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight underline decoration-primary/30 decoration-4 underline-offset-4">Financement_</h2>
        </div>

        <div className="bg-secondary/5 p-8 lg:p-10 rounded-[2.5rem] border border-border space-y-8">
          <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="card" id="card" className="sr-only" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-center p-6 border-2 border-border rounded-2xl bg-background cursor-pointer hover:border-primary/50 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <CreditCard className="h-6 w-6 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Carte de Crédit</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-center p-6 border-2 border-border rounded-2xl bg-background cursor-pointer hover:border-primary/50 transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <div className="h-6 flex items-center mb-2">
                  <span className="font-black italic text-sm">PayPal</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Paiement Digital</span>
              </Label>
            </div>
          </RadioGroup>

          <Separator className="bg-border/50" />

          <div className="space-y-6 pt-2">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Numéro de Carte</Label>
              <Input placeholder="0000 0000 0000 0000" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Date d'Expiration</Label>
                <Input placeholder="MM / AA" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">CVC</Label>
                <Input placeholder="000" className="h-14 bg-background border-border rounded-xl focus:ring-primary focus:border-primary font-bold placeholder:opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
