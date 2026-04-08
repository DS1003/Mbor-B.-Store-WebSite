"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, PartyPopper, Sparkles } from "lucide-react"
import Link from "next/link"

/* Confetti particle component */
function ConfettiParticle({ delay, color, left }: { delay: number; color: string; left: string }) {
    return (
        <motion.div
            className="absolute top-0 w-2 h-2 rounded-full pointer-events-none"
            style={{ left, backgroundColor: color }}
            initial={{ y: -10, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
                y: [0, 60, 120],
                opacity: [1, 1, 0],
                rotate: [0, 180, 360],
                scale: [1, 0.8, 0.5],
                x: [0, Math.random() * 30 - 15, Math.random() * 60 - 30],
            }}
            transition={{
                duration: 3,
                delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 2 + 1,
                ease: "easeOut",
            }}
        />
    )
}

export function IndependenceBanner({ promotion }: { promotion?: any }) {
    const [isVisible, setIsVisible] = React.useState(true)

    if (!isVisible || !promotion) return null

    const senegalColors = ["#00853F", "#FDEF42", "#E31B23"] // green, gold, red

    return (
        <AnimatePresence>
            {isVisible && promotion && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative w-full overflow-x-hidden max-w-[100vw] z-50"
                >
                    <div className="relative bg-gradient-to-r from-[#00853F] via-[#FDEF42] to-[#E31B23] overflow-hidden">
                        {/* Confetti particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <ConfettiParticle
                                    key={i}
                                    delay={i * 0.3}
                                    color={senegalColors[i % 3]}
                                    left={`${(i / 20) * 100}%`}
                                />
                            ))}
                        </div>

                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

                        <div className="relative z-10 px-4 py-2 sm:py-2.5">
                            <div className="flex items-center justify-center gap-2 sm:gap-4 text-center pr-6 sm:pr-0">
                                <motion.div
                                    className="shrink-0"
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                >
                                    <PartyPopper className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-white drop-shadow-md" />
                                </motion.div>

                                <Link href="/shop" className="group flex items-center gap-2 sm:gap-3">
                                    <span className="text-[10px] sm:text-sm font-black text-white drop-shadow-md uppercase tracking-wide sm:tracking-wider whitespace-nowrap">
                                        🇸🇳 {promotion.title}
                                    </span>
                                    <span className="hidden sm:inline text-white/90 font-bold drop-shadow-sm">
                                        —
                                    </span>
                                    <motion.span
                                        className="text-[10px] sm:text-sm font-black text-white drop-shadow-md bg-black/20 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-sm whitespace-nowrap"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        -{promotion.discount}% {promotion.isGlobal ? 'PARTOUT' : 'SUR SÉLECTION'}
                                    </motion.span>
                                    <span className="hidden sm:inline text-white/90 font-bold drop-shadow-sm">—</span>
                                    <span className="hidden md:inline text-[10px] sm:text-sm font-bold text-white/80 drop-shadow-sm group-hover:underline">
                                        Profitez-en maintenant →
                                    </span>
                                </Link>

                                <motion.div
                                    className="hidden sm:block shrink-0"
                                    animate={{ rotate: [0, -15, 15, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
                                >
                                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-md" />
                                </motion.div>

                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
                                    aria-label="Fermer la bannière"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* Full-page confetti burst for the homepage — client-only to avoid hydration mismatch */
export function ConfettiBurst() {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const particles = React.useMemo(() => {
        if (!mounted) return []
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: ["#00853F", "#FDEF42", "#E31B23"][i % 3],
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 3,
            size: 4 + Math.random() * 8,
            rotation: Math.random() * 360,
        }))
    }, [mounted])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-sm"
                    style={{
                        left: `${p.x}%`,
                        width: p.size,
                        height: p.size * 0.6,
                        backgroundColor: p.color,
                    }}
                    initial={{ y: -20, opacity: 0, rotate: 0 }}
                    animate={{
                        y: ["0vh", "110vh"],
                        opacity: [0, 1, 1, 0],
                        rotate: [0, p.rotation, p.rotation * 2, p.rotation * 3],
                        x: [0, Math.sin(p.id) * 50, Math.cos(p.id) * 30],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: 1,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    )
}
