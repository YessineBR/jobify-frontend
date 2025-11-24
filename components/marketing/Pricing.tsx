"use client"

import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Check, Crown, Sparkles, Star} from "lucide-react"

export default function Pricing() {
    const t = useTranslations("homePage.pricing")

    const plans = t.raw("plans") as Array<{
        name: string
        icon: "Sparkles" | "Star" | "Crown"
        price: string
        period: string
        description: string
        features: string[]
        notIncluded: string[]
        buttonText: string
        popular: boolean
    }>

    return (
        <section id="pricing" className="py-20 lg:py-28 bg-gradient-to-b from-muted/50 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-6">
                        {t("badge")}
                    </Badge>
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Mobile: Horizontal Scroll */}
                <div
                    className="md:hidden flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
                    {plans.map((plan, i) => (
                        <Card
                            key={i}
                            className={`relative min-w-[300px] w-[85vw] max-w-[340px] snap-center border-2 p-8 ${
                                plan.popular
                                    ? "border-primary shadow-2xl ring-2 ring-primary/20"
                                    : "border-border shadow-lg"
                            }`}
                        >
                            {plan.popular && (
                                <Badge
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                                    {t("popularBadge")}
                                </Badge>
                            )}

                            <PricingCardContent plan={plan}/>
                        </Card>
                    ))}
                </div>

                {/* Desktop: Grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <Card
                            key={i}
                            className={`relative border-2 p-8 transition-all ${
                                plan.popular
                                    ? "border-primary shadow-2xl ring-2 ring-primary/20 scale-105"
                                    : "border-border shadow-lg hover:shadow-xl hover:border-primary/50"
                            }`}
                        >
                            {plan.popular && (
                                <Badge
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                                    {t("popularBadge")}
                                </Badge>
                            )}

                            <PricingCardContent plan={plan}/>
                        </Card>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground mb-6">{t("trialInfo")}</p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                        {t.raw("guarantees").map((item: string, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-600 dark:text-green-400"/>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enterprise CTA */}
                <Card className="mt-16 bg-gradient-to-r from-primary to-primary/90 p-10 md:p-14 text-center text-white">
                    <h3 className="text-3xl font-bold mb-4">{t("enterprise.title")}</h3>
                    <p className="text-white mb-8 max-w-2xl mx-auto">
                        {t("enterprise.subtitle")}
                    </p>
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                        {t("enterprise.cta")}
                    </Button>
                </Card>
            </div>
        </section>
    )
}

// Reusable card content
function PricingCardContent({plan}: { plan: any }) {
    return (
        <>
            {/* Icon */}
            <div className="flex justify-center mb-6">
                <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        plan.popular ? "bg-primary" : "bg-muted"
                    }`}
                >
                    {plan.popular ? (
                        <Star className="h-8 w-8 text-primary-foreground"/>
                    ) : plan.name === "Basic" ? (
                        <Sparkles className="h-8 w-8 text-muted-foreground"/>
                    ) : (
                        <Crown className="h-8 w-8 text-muted-foreground"/>
                    )}
                </div>
            </div>

            {/* Name & Description */}
            <h3 className="text-2xl font-bold text-foreground mb-3 text-center">
                {plan.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 text-center">
                {plan.description}
            </p>

            {/* Price */}
            <div className="text-center mb-8">
                <span className="text-5xl font-bold text-foreground">€{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"/>
                        <span className="text-foreground/90 text-sm">{feature}</span>
                    </li>
                ))}
                {plan.notIncluded.map((feature: string, i: number) => (
                    <li key={`not-${i}`} className="flex items-start gap-3 opacity-50">
                        <Check className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5"/>
                        <span className="text-muted-foreground text-sm line-through">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <Button
                size="lg"
                variant={plan.popular ? "default" : "outline"}
                className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}`}
            >
                {plan.buttonText}
            </Button>
        </>
    )
}