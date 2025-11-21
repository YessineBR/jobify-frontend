"use client"

import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"

export default function Hero() {
    const t = useTranslations("homePage.hero")

    return (
        <section className="relative py-20 sm:py-28 overflow-hidden">
            {/* Optional subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background -z-10"/>

            <div className="container mx-auto px-4">
                <Card className="border-0 bg-transparent shadow-none text-center">
                    <CardHeader className="space-y-6">
                        <CardTitle className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                            {t("title")}
                        </CardTitle>
                        <CardDescription className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                            {t("description")}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-base">
                            {t("getStarted")}
                        </Button>
                        <Button size="lg" variant="outline" className="text-base">
                            {t("browseJobs")}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}