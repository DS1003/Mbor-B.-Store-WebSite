"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: "up" | "down" | "left" | "right"
    distance?: number
    duration?: number
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    direction = "up",
    distance = 50,
    duration = 0.8
}: ScrollRevealProps) {
    const ref = React.useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    const variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? distance : direction === "right" ? -distance : 0,
            y: direction === "up" ? distance : direction === "down" ? -distance : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
