"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FloatingActions() {
    const [isVisible, setIsVisible] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    const handleScroll = useCallback(() => {
        const winScroll = window.pageYOffset || document.documentElement.scrollTop
        
        // Visibility toggle
        if (winScroll > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        // Progress calculation
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        if (height > 0) {
            const scrolled = (winScroll / height) * 100
            setScrollProgress(scrolled)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll() // Initial check
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    const whatsappNumber = "+221774272354"
    const whatsappMessage = "Bonjour Mbor B. Store, je souhaiterais avoir plus d'informations sur vos produits."
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`

    // Dimensions
    const size = 64
    const center = size / 2
    const strokeWidth = 3
    const radius = center - strokeWidth
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (scrollProgress / 100) * circumference

    return (
        <div className="fixed bottom-24 right-6 flex flex-col gap-4 z-[9999] md:bottom-10 pointer-events-none items-center">
            {/* WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto group outline-none"
            >
                <div className="h-16 w-16 bg-[#25D366] text-white flex items-center justify-center rounded-full shadow-2xl shadow-green-500/30 hover:scale-110 active:scale-90 transition-all duration-300 relative">
                    <svg 
                        viewBox="0 0 24 24" 
                        className="h-9 w-9 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0 pointer-events-none shadow-2xl">
                        WhatsApp
                    </span>
                    <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping -z-10" />
                </div>
            </a>

            {/* Scroll To Top Button with Circular Progress */}
            <div className={cn(
                "pointer-events-auto relative h-16 w-16 transition-all duration-500 ease-out flex items-center justify-center cursor-pointer group",
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90 pointer-events-none"
            )}
            onClick={scrollToTop}
            >
                {/* Progress Ring */}
                <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none">
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-gray-100/30"
                    />
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        style={{ 
                            strokeDashoffset: offset,
                            transition: 'stroke-dashoffset 10ms linear' // Very fast and linear for "instant" feel
                        }}
                        className="text-amber-500"
                        strokeLinecap="round"
                    />
                </svg>
                
                <div className="h-[50px] w-[50px] rounded-full bg-white/95 backdrop-blur-xl border border-gray-100 shadow-xl flex items-center justify-center hover:bg-white group-hover:scale-105 active:scale-90 transition-all duration-300">
                    <ArrowUp className="h-6 w-6 text-gray-900 stroke-[2.2px] transition-transform group-hover:-translate-y-0.5" />
                </div>
            </div>
        </div>
    )
}
