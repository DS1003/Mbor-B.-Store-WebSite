"use client"

import * as React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle } from "lucide-react"

interface DeleteConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
    isLoading?: boolean
}

export function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    isLoading
}: DeleteConfirmModalProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md rounded-[2.5rem] border-gray-50 p-8 shadow-2xl">
                <AlertDialogHeader className="space-y-4">
                    <div className="mx-auto h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <AlertDialogTitle className="text-xl font-bold text-center text-gray-900">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-gray-500 font-medium leading-relaxed">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-8 flex gap-3 sm:justify-center">
                    <AlertDialogCancel asChild>
                        <Button
                            variant="outline"
                            className="h-11 px-6 rounded-xl font-bold border-gray-100 hover:bg-gray-50 flex-1"
                            onClick={onClose}
                        >
                            Annuler
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            className="h-11 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex-1 shadow-lg shadow-rose-100"
                            onClick={(e) => {
                                e.preventDefault()
                                onConfirm()
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Suppression..." : "Confirmer"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
