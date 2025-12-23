"use client"

import { motion, useInView, useAnimation, Variant } from "framer-motion"
import { useEffect, useRef } from "react"

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
    duration?: number
}

export function TextReveal({ text, className = "", delay = 0, duration = 0.5 }: TextRevealProps) {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                controls.start("visible")
            }, delay * 1000)
        }
    }, [isInView, controls, delay])

    // Split text into words regarding spaces
    const words = text.split(" ")

    const container: Variant = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    }

    const child: Variant = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: duration,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: duration,
            },
        },
    }

    return (
        <motion.h2
            ref={ref}
            className={`${className} flex flex-wrap`}
            variants={container}
            initial="hidden"
            animate={controls}
        >
            {words.map((word, index) => (
                <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index} className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                    {word}
                </motion.span>
            ))}
        </motion.h2>
    )
}
