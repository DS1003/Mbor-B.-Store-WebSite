
"use client";

import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function CancelPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen items-center justify-center space-y-8 container-custom">
            <ScrollReveal direction="up" className="flex flex-col items-center space-y-6 text-center">
                <div className="h-24 w-24 bg-red-500/10 rounded-[2rem] flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10 border border-red-500/20">
                    <XCircle className="h-12 w-12" />
                </div>
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight">Paiement Annulé</h1>
                    <p className="text-muted-foreground font-medium max-w-md mx-auto">
                        Le processus de paiement a été annulé. Vous pouvez réessayer en retournant dans votre panier.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="/cart">
                        <Button variant="outline" className="h-14 px-10 rounded-2xl transition-all font-bold tracking-tight">
                            Retour au panier
                        </Button>
                    </Link>
                    <Link href="/checkout">
                        <Button className="h-14 px-10 rounded-2xl bg-black text-white hover:bg-primary transition-all font-bold tracking-tight">
                            Réessayer le paiement
                        </Button>
                    </Link>
                </div>
            </ScrollReveal>
        </div>
    );
}
