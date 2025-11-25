"use client"

import {useState, useMemo} from "react"
import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Card} from "@/components/ui/card"
import {Sparkles, Search, MapPin} from "lucide-react"
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
        const hubs = [
            {lat: 50.9375, lng: 6.9603, label: "Köln"},
            {lat: 48.1374, lng: 11.5755, label: "Munich"}
        ]

        // Use a fixed seed for consistent randomization
        const getHub = (index: number) => hubs[index % hubs.length]

        return [
            // --- FIXED ROUTES ---
            // Köln → Munich
            {
                start: {lat: 50.9375, lng: 6.9603, label: "Köln"},
                end: {lat: 48.1374, lng: 11.5755, label: "Munich"}
            },
            // Doha → Tunis
            {
                start: {lat: 25.2854, lng: 51.5310, label: "Doha"},
                end: {lat: 36.8000, lng: 10.1800, label: "Tunis"}
            },
            // Tunis → Cairo
            {
                start: {lat: 36.8000, lng: 10.1800, label: "Tunis"},
                end: {lat: 30.0444, lng: 31.2357, label: "Cairo"}
            },
            // Paris → Warsaw
            {
                start: {lat: 48.8566, lng: 2.3522, label: "Paris"},
                end: {lat: 52.2297, lng: 21.0122, label: "Warsaw"}
            },
            // Warsaw → Jeddah
            {
                start: {lat: 52.2297, lng: 21.0122, label: "Warsaw"},
                end: {lat: 21.5433, lng: 39.1728, label: "Jeddah"}
            },
            // --- RANDOM WORLD CITY CONNECTIONS TO GERMANY ---
            // Use fixed indices to ensure consistency
            {
                start: {lat: 40.7128, lng: -74.0060, label: "New York"},
                end: getHub(0) // Always Köln
            },
            {
                start: {lat: 35.6895, lng: 139.6917, label: "Tokyo"},
                end: getHub(1) // Always Munich
            },
            {
                start: {lat: -33.8688, lng: 151.2093, label: "Sydney"},
                end: getHub(0) // Always Köln
            },
            {
                start: {lat: 55.7558, lng: 37.6173, label: "Moscow"},
                end: getHub(1) // Always Munich
            },
            {
                start: {lat: 19.4326, lng: -99.1332, label: "Mexico City"},
                end: getHub(0) // Always Köln
            }
        ]
    }, []) // Empty dependency array ensures consistent generation

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* WorldMap Background */}
            <div className="absolute inset-0 -z-10">
                <WorldMap
                    dots={mapDots}
                    lineColor="rgba(16, 185, 129, 0.4)"
                />
                {/* Overlay to make content more readable */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80"></div>
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