"use client"

import {useTranslations} from "next-intl"
import {Brain, Target, Zap, Shield, BarChart, Users} from "lucide-react"

const iconMap = {
    Brain,
    Target,
    Zap,
    Shield,
    BarChart,
    Users,
} as const

export default function Features() {
    const t = useTranslations("homePage.features")

    // Use t.raw() to get the array of features from translations
    const features = t.raw("items") as Array<{
        icon: keyof typeof iconMap
        title: string
        description: string
    }>

    return (
        <section id="features" className="py-20 lg:py-28 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6">
                        <span className="text-sm font-medium text-primary">{t("badge")}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                        {t("title")}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon]

                        return (
                            <div
                                key={index}
                                className="group relative p-6 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Icon */}
                                <div
                                    className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <Icon className="w-7 h-7 text-primary-foreground"/>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}