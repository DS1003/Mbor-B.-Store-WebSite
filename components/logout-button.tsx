"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { Button } from "./ui/button"

export function LogoutButton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-red-500 hover:bg-red-50"
            onClick={() => signOut({ callbackUrl: "/login" })}
        >
            <LogOut className="h-4 w-4" />
        </Button>
    )
}
