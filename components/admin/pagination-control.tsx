"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function PaginationControl({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex items-center justify-end gap-2 mt-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => createPageURL(currentPage - 1)}
                disabled={currentPage <= 1}
                className="h-8 w-8 p-0"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium text-gray-700">
                Page {currentPage} sur {totalPages}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => createPageURL(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="h-8 w-8 p-0"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
