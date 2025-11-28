"use client"

import {useMemo, useState} from "react"
import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Card} from "@/components/ui/card"
import {MapPin, Search, Sparkles} from "lucide-react"
import WorldMap from "@/components/ui/world-map";

export default function Hero() {
    const t = useTranslations("homePage.hero")
    const [prompt, setPrompt] = useState("")
    const [city, setCity] = useState("")
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = async () => {
        if (!prompt.trim()) return

        setIsSearching(true)
        setTimeout(() => {
            setIsSearching(false)
            document.getElementById("jobs")?.scrollIntoView({behavior: "smooth"})
        }, 1500)
    }

    const examples = t.raw("examples") as string[]

    // Use useMemo to ensure consistent dots between server and client
    const mapDots = useMemo(() => {
        // Accurate coordinates
        const hubs = {
            koln: {lat: 37, lng: 9.9603, label: "Köln"},
            munich: {lat: 43.1374, lng: 11.5755, label: "Munich"},
        }

        const germanyHubs = [hubs.koln, hubs.munich]

        // Deterministic pseudo-random generator (consistent on every render)
        const seededRandom = (seed: number) => {
            const x = Math.sin(seed) * 10000
            return x - Math.floor(x)
        }

        // Helper to pick a Germany hub deterministically
        const pickHub = (index: number) => germanyHubs[index % germanyHubs.length]

        // Groups of accurate world coordinates
        const worldCities = [
            // North America
            {lat: 40.7128, lng: -74.0060, label: "New York"},
            {lat: 34.0522, lng: -118.2437, label: "Los Angeles"},
            {lat: 45.5017, lng: -73.5673, label: "Montreal"},

            // South America
            {lat: -23.5505, lng: -46.6333, label: "São Paulo"},
            {lat: -34.6037, lng: -58.3816, label: "Buenos Aires"},

            // Europe
            {lat: 48.8566, lng: 2.3522, label: "Paris"},
            {lat: 41.9028, lng: 12.4964, label: "Rome"},
            {lat: 52.5200, lng: 13.4050, label: "Berlin"},

            // Africa
            {lat: 30.0444, lng: 31.2357, label: "Cairo"},
            {lat: -1.2921, lng: 36.8219, label: "Nairobi"},
            {lat: 6.5244, lng: 3.3792, label: "Lagos"},

            // Middle East
            {lat: 25.2854, lng: 51.5310, label: "Doha"},
            {lat: 24.7136, lng: 46.6753, label: "Riyadh"},
            {lat: 21.3891, lng: 39.8579, label: "Jeddah"},

            // South Asia
            {lat: 28.6139, lng: 77.2090, label: "New Delhi"},
            {lat: 23.8103, lng: 90.4125, label: "Dhaka"},

            // East Asia
            {lat: 35.6895, lng: 139.6917, label: "Tokyo"},
            {lat: 31.2304, lng: 121.4737, label: "Shanghai"},
            {lat: 37.5665, lng: 126.9780, label: "Seoul"},

            // Oceania
            {lat: -33.8688, lng: 151.2093, label: "Sydney"},
            {lat: -37.8136, lng: 144.9631, label: "Melbourne"},
        ]

        // Create consistent random connections
        return worldCities.map((city, index) => ({
            start: city,
            end: pickHub(Math.floor(seededRandom(index + 42) * 2)), // deterministic 0 or 1
        }))
    }, [])

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* WorldMap Background */}
            <div className="absolute inset-0 -z-10">
                <WorldMap
                    dots={mapDots}
                    lineColor="oklch(64% 0.20 258 / 0.35)"
                />
                {/* Overlay to make content more readable */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <Badge variant="secondary" className="mb-6 inline-flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5"/>
                        {t("badge")}
                    </Badge>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        {t("title")}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>

                    {/* Search Card */}
                    <Card className="p-6 shadow-xl border bg-background/95 backdrop-blur-sm">
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            {/* Job Prompt Input */}
                            <div className="flex-1 relative">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder={t("jobPlaceholder")}
                                    className="pl-10 h-12 text-base"
                                />
                            </div>

                            {/* Location Input */}
                            <div className="sm:w-64 relative">
                                <MapPin
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder={t("locationPlaceholder")}
                                    className="pl-10 h-12"
                                />
                            </div>

                            {/* Search Button */}
                            <Button
                                size="lg"
                                onClick={handleSearch}
                                disabled={isSearching || !prompt.trim()}
                                className="h-12 px-8"
                            >
                                {isSearching ? (
                                    <>
                                        <Sparkles className="h-5 w-5 animate-spin mr-2"/>
                                        {t("searching")}
                                    </>
                                ) : (
                                    <>
                                        <Search className="h-5 w-5 mr-2"/>
                                        {t("search")}
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Example Pills */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {examples.map((example) => (
                                <Button
                                    key={example}
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setPrompt(example)}
                                    className="text-xs h-8 rounded-full"
                                >
                                    {example}
                                </Button>
                            ))}
                        </div>
                    </Card>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        {t.raw("stats").map((stat: any, i: number) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}