"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <button className="relative h-10 w-10 rounded-full bg-muted">
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative h-10 w-20 rounded-full bg-secondary/50 backdrop-blur-sm border border-border transition-all duration-300 hover:border-primary overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Track background with gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Sliding indicator */}
      <div
        className={`absolute top-1 h-8 w-8 rounded-full bg-primary shadow-lg transition-all duration-500 ease-out ${theme === "dark" ? "left-1" : "left-11"
          }`}
      >
        {/* Icon container with rotation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun
            className={`absolute h-4 w-4 text-primary-foreground transition-all duration-500 ${theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
          />
          <Moon
            className={`absolute h-4 w-4 text-primary-foreground transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
          />
        </div>
      </div>

      {/* Static icons for reference */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Moon className="h-4 w-4 text-muted-foreground transition-colors duration-300" />
        <Sun className="h-4 w-4 text-muted-foreground transition-colors duration-300" />
      </div>
    </button>
  )
}
