"use client"

import {useState} from "react"
import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Card} from "@/components/ui/card"
import {Sparkles, Search, MapPin, ArrowRight} from "lucide-react"

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

    return (
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                    <Card className="p-6 shadow-xl border">
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

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="px-8">
                            <a href="/post-job">
                                {t("startHiring")}
                                <ArrowRight className="ml-2 h-5 w-5"/>
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="/jobs">{t("browseJobs")}</a>
                        </Button>
                    </div>

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