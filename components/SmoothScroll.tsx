"use client"

import {useEffect} from "react"
import {usePathname, useSearchParams} from "next/navigation"

export function SmoothScroll() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Only run in browser
        if (typeof window === "undefined") return

        // If there's a hash in URL (e.g. #pricing), scroll to it smoothly
        if (window.location.hash) {
            const id = window.location.hash.substring(1) // remove #
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({behavior: "smooth"})
            }
        } else {
            // Otherwise scroll to top smoothly on page change
            window.scrollTo({top: 0, behavior: "smooth"})
        }
    }, [pathname, searchParams]) // Triggers on every navigation

    return null
}