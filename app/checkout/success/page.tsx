
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart on successful payment return
        clearCart();
    }, [clearCart]);

    return (
        <div className="flex flex-col w-full bg-background min-h-screen items-center justify-center space-y-8 container-custom">
            <ScrollReveal direction="up" className="flex flex-col items-center space-y-6 text-center">
                <div className="h-24 w-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary shadow-xl shadow-primary/10 border border-primary/20">
                    <CheckCircle2 className="h-12 w-12" />
                </div>
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight">Paiement Réussi !</h1>
                    <p className="text-muted-foreground font-medium max-w-md mx-auto">
                        Votre paiement a été validé avec succès. Merci pour votre commande #{orderId?.slice(-6).toUpperCase()}.
                    </p>
                </div>
                <Link href="/">
                    <Button className="h-14 px-10 rounded-2xl bg-black text-white hover:bg-primary transition-all font-bold tracking-tight">
                        Retour à l'accueil
                    </Button>
                </Link>
            </ScrollReveal>
        </div>
    );
}
