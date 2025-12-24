"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface FilterOption {
    label: string
    value: string
}

export function FilterControl({ options, paramName, label }: { options: FilterOption[], paramName: string, label: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleFilter = (value: string | null) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set(paramName, value)
            params.set("page", "1")
        } else {
            params.delete(paramName)
        }
        replace(`${pathname}?${params.toString()}`)
    }

    const currentFilter = searchParams.get(paramName)
    const currentLabel = options.find(o => o.value === currentFilter)?.label || label

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 px-5 border-zinc-200 text-zinc-600 rounded-xl hover:bg-black hover:text-[#FFD700] hover:border-black transition-all flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                    <Filter className="h-4 w-4" />
                    {currentLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 bg-white/90 backdrop-blur-xl border border-white rounded-2xl shadow-2xl mt-2 animate-in fade-in zoom-in duration-200">
                <DropdownMenuItem
                    onClick={() => handleFilter(null)}
                    className="cursor-pointer rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-500 hover:bg-zinc-50 hover:text-black uppercase tracking-wide flex items-center justify-between group"
                >
                    Tout voir
                    {!currentFilter && <div className="h-1.5 w-1.5 rounded-full bg-black group-hover:bg-[#FFD700]" />}
                </DropdownMenuItem>
                <div className="h-px bg-zinc-100 my-1 mx-2" />
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleFilter(option.value)}
                        className={`cursor-pointer rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wide flex items-center justify-between group
                            ${currentFilter === option.value ? "bg-zinc-50 text-black font-black" : "text-zinc-500 hover:bg-zinc-50 hover:text-black"}`}
                    >
                        {option.label}
                        {currentFilter === option.value && <div className="h-1.5 w-1.5 rounded-full bg-black group-hover:bg-[#FFD700]" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
