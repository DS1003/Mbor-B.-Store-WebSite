"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    if (status === "loading") {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
                <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (status === "unauthenticated") {
        return null
    }

    return <>{children}</>
}
