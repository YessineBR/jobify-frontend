"use client"

import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ArrowRight, Sparkles} from "lucide-react"
import Link from "next/link"

export default function CTA() {
    const t = useTranslations("homePage.cta")

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden">
            {/* Gradient background – works beautifully in light & dark */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 dark:from-blue-600 dark:via-cyan-600 dark:to-teal-700"/>

            {/* Light overlay for text contrast – no blur, no shadow */}
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30"/>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Badge – clean, flat style */}
                    <Badge
                        variant="secondary"
                        className="mb-8 inline-flex items-center gap-2 bg-white/20 border-white/40 text-white backdrop-blur-sm"
                    >
                        <Sparkles className="h-4 w-4"/>
                        {t("badge")}
                    </Badge>

                    {/* Title – pure white, no drop-shadow */}
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                        {t("title")}
                    </h2>

                    {/* Subtitle – clean white text */}
                    <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>

                    {/* Buttons – flat, modern, no shadows */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            size="lg"
                            asChild
                            className="px-10 h-14 text-lg font-semibold bg-white text-primary hover:bg-white/90 transition-colors"
                        >
                            <Link href="/signup">
                                {t("primaryCta")}
                                <ArrowRight className="ml-3 h-5 w-5"/>
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="px-10 h-14 text-lg font-medium border-2 border-white hover:bg-white/15 transition-colors"
                        >
                            <Link href="/demo">{t("secondaryCta")}</Link>
                        </Button>
                    </div>

                    {/* Trust line – clean text */}
                    <p className="mt-10 text-white/80 text-sm font-medium">
                        {t("trust")}
                    </p>
                </div>
            </div>
        </section>
    )
}