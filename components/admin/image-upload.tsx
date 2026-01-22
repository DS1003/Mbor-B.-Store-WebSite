"use client"

import * as React from "react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash, ImageIcon } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}

export function ImageUpload({
    disabled,
    onChange,
    onRemove,
    value
}: ImageUploadProps) {
    const onUpload = (result: any) => {
        if (result.event === "success") {
            onChange(result.info.secure_url)
            toast.success("Média uploadé")
        }
    }

    const onError = (error: any) => {
        console.error("Cloudinary Detailed Error:", error)
        const errorMsg = error?.statusText || error?.message || "Erreur de configuration"
        toast.error(`Erreur d'upload: ${errorMsg}. Vérifiez que votre preset est 'UNSIGNED'`)
    }

    return (
        <div className="space-y-4 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {value.map((url) => (
                    <div key={url} className="relative aspect-square rounded-[1.5rem] overflow-hidden group shadow-md border border-gray-50">
                        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-all">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8 rounded-xl shadow-lg"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Produit image"
                            src={url}
                        />
                    </div>
                ))}

                {value.length < 5 && (
                    <CldUploadWidget
                        onSuccess={onUpload}
                        onError={onError}
                        uploadPreset="ml_default"
                        options={{
                            maxFiles: 5,
                            clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
                            styles: {
                                palette: {
                                    window: "#FFFFFF",
                                    windowBorder: "#F3F4F6",
                                    tabIcon: "#4F46E5",
                                    menuIcons: "#4F46E5",
                                    textDark: "#111827",
                                    textLight: "#FFFFFF",
                                    link: "#4F46E5",
                                    action: "#4F46E5",
                                    inactiveTabIcon: "#9CA3AF",
                                    error: "#EF4444",
                                    inProgress: "#4F46E5",
                                    complete: "#10B981",
                                    sourceBg: "#F9FAFB"
                                },
                            }
                        }}
                    >
                        {({ open }) => {
                            const onClick = () => {
                                open()
                            }

                            return (
                                <button
                                    type="button"
                                    disabled={disabled}
                                    onClick={onClick}
                                    className="relative aspect-square flex flex-col items-center justify-center gap-2 rounded-[1.5rem] border-2 border-dashed border-gray-100 bg-gray-50/50 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 hover:border-indigo-200 transition-all group"
                                >
                                    <div className="h-10 w-10 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ImagePlus className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Ajouter Média</span>
                                </button>
                            )
                        }}
                    </CldUploadWidget>
                )}
            </div>

            {value.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-50 rounded-[2.5rem] bg-gray-50/30 text-gray-300">
                    <ImageIcon className="h-12 w-12 mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Aucun média référencé</p>
                </div>
            )}
        </div>
    )
}
