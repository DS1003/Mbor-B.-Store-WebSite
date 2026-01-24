"use client"

import * as React from "react"

interface ThemeConfig {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontFamily: string
}

export function ThemeVariables({ config }: { config: ThemeConfig }) {
    React.useLayoutEffect(() => {
        const root = document.documentElement

        if (config.primaryColor) root.style.setProperty("--primary-custom", config.primaryColor)
        if (config.secondaryColor) root.style.setProperty("--secondary-custom", config.secondaryColor)
        if (config.accentColor) root.style.setProperty("--accent-custom", config.accentColor)
    }, [config])

    const fontValue = config.fontFamily?.includes(' ') ? `"${config.fontFamily}"` : config.fontFamily

    return (
        <style dangerouslySetInnerHTML={{
            __html: `
                :root {
                  --font-custom: ${fontValue}, sans-serif;
                }
            `
        }} />
    )
}
