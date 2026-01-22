"use client"

import * as React from "react"
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

/* --- Marquee Component --- */
interface MarqueeProps {
    children: React.ReactNode
    reverse?: boolean
    pauseOnHover?: boolean
    className?: string
}

export function Marquee({
    children,
    reverse = false,
    pauseOnHover = false,
    className,
}: MarqueeProps) {
    return (
        <div
            className={cn(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                className
            )}
        >
            <div
                className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee",
                    reverse && "[animation-direction:reverse]",
                    pauseOnHover && "group-hover:[animation-play-state:paused]"
                )}
            >
                {children}
                {children}
            </div>
        </div>
    )
}

/* --- SpotlightCard Component --- */
export function SpotlightCard({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn(
                "relative rounded-3xl border bg-background overflow-hidden",
                className
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(var(--primary) / 0.15), transparent 40%)`,
                }}
            />
            {children}
        </div>
    )
}

/* --- Magnetic Component --- */
export function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = React.useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const rect = ref.current?.getBoundingClientRect()
        if (rect) {
            const { width, height, left, top } = rect
            const centerX = left + width / 2
            const centerY = top + height / 2
            const distanceX = clientX - centerX
            const distanceY = clientY - centerY
            x.set(distanceX * 0.4)
            y.set(distanceY * 0.4)
        }
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    React.useEffect(() => {
        const element = ref.current
        if (element) {
            element.addEventListener("mousemove", handleMouseMove)
            element.addEventListener("mouseleave", handleMouseLeave)
        }
        return () => {
            if (element) {
                element.removeEventListener("mousemove", handleMouseMove)
                element.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    }, [])

    return (
        <motion.div ref={ref} style={{ x: springX, y: springY }}>
            {children}
        </motion.div>
    )
}

/* --- ShinyText Component --- */
export function ShinyText({
    text,
    disabled = false,
    speed = 5,
    className = ""
}: {
    text: string,
    disabled?: boolean,
    speed?: number,
    className?: string
}) {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={cn(
                "text-foreground/70 inline-block",
                !disabled && "animate-shiny",
                className
            )}
            style={{
                backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                animationDuration: animationDuration,
            }}
        >
            {text}
        </div>
    );
}

/* --- DecryptText Component (Modernized) --- */
export function DecryptText({
    text,
    speed = 50,
    className = ""
}: {
    text: string,
    speed?: number,
    className?: string
}) {
    const [displayText, setDisplayText] = React.useState(text)
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()"

    const decrypt = React.useCallback(() => {
        let iteration = 0
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text.split("").map((char, index) => {
                    if (index < iteration) return text[index]
                    return characters[Math.floor(Math.random() * characters.length)]
                }).join("")
            )
            if (iteration >= text.length) clearInterval(interval)
            iteration += 1 / 3
        }, speed)
    }, [text, speed])

    return (
        <span onMouseEnter={decrypt} className={cn("font-mono", className)}>
            {displayText}
        </span>
    )
}
