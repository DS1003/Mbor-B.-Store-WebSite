import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
            <h1 className="text-9xl font-extrabold tracking-tighter text-primary/20 select-none">404</h1>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <h2 className="text-4xl font-bold tracking-tight mb-4 pointer-events-auto">Page Non Trouvée</h2>
                <p className="text-muted-foreground mb-8 max-w-md pointer-events-auto">
                    Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été déplacée ou n'existee pas.
                </p>
                <Link href="/" className="pointer-events-auto">
                    <Button size="lg">Retour à l'Accueil</Button>
                </Link>
            </div>
        </div>
    )
}
