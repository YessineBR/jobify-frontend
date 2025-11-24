"use client"

import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Card} from "@/components/ui/card"
import {Plane, CheckCircle2, Clock, FileText, Shield, Zap, ArrowRight} from "lucide-react"
import Image from "next/image"

export default function ExpressVisa() {
    const t = useTranslations("homePage.expressVisa")

    const benefits = t.raw("benefits") as Array<{
        icon: "Clock" | "FileText" | "Shield" | "Zap"
        title: string
        description: string
    }>

    const steps = t.raw("steps") as Array<{
        step: string
        title: string
        description: string
    }>

    const iconMap = {Clock, FileText, Shield, Zap}

    return (
        <section id="express-visa" className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge variant="secondary"
                           className="mb-6 inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:bg-green-500/20">
                        <Plane className="h-4 w-4"/>
                        {t("badge")}
                    </Badge>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        {t("title")}
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                        {t("subtitle")}
                    </p>

                    {/* Price Badge */}
                    <div
                        className="inline-flex flex-col sm:flex-row items-center gap-3 px-8 py-5 bg-primary text-primary-foreground rounded-2xl shadow-xl">
                        <span className="text-4xl font-bold">€999</span>
                        <span className="text-sm opacity-90">
              {t("priceIncludes")}
            </span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-3xl font-bold text-foreground mb-4">
                                {t("sectionTitle")}
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t("sectionDesc")}
                            </p>
                        </div>

                        {/* Benefits List */}
                        <div className="space-y-6">
                            {t.raw("forWho").map((item: any, i: number) => (
                                <div key={i} className="flex gap-4">
                                    <CheckCircle2
                                        className="h-7 w-7 text-green-600 dark:text-green-400 flex-shrink-0 mt-1"/>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                                        <p className="text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" className="shadow-lg">
                            {t("startApplication")}
                            <ArrowRight className="ml-2 h-5 w-5"/>
                        </Button>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-3xl -rotate-3 shadow-2xl"/>
                        <Image
                            src="https://images.unsplash.com/photo-1721138942121-a26751b520b5?w=800&h=600&fit=crop"
                            alt="German passport and visa"
                            width={800}
                            height={600}
                            className="relative rounded-3xl shadow-2xl object-cover w-full border-8 border-background"
                        />
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="mb-20">
                    <h3 className="text-center text-3xl font-bold text-foreground mb-12">
                        {t("benefitsTitle")}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => {
                            const Icon = iconMap[benefit.icon]
                            return (
                                <Card key={i} className="p-6 hover:shadow-xl transition-all border">
                                    <div
                                        className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-5">
                                        <Icon className="h-7 w-7 text-primary-foreground"/>
                                    </div>
                                    <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Process Steps */}
                <Card className="p-10 lg:p-16 shadow-2xl bg-card/95 backdrop-blur">
                    <h3 className="text-center text-3xl font-bold text-foreground mb-12">
                        {t("howItWorks")}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {steps.map((step, i) => (
                            <div key={i} className="relative text-center">
                                {i < steps.length - 1 && (
                                    <div
                                        className="hidden lg:block absolute top-12 left-[60%] right-[-40%] h-0.5 bg-primary/20"/>
                                )}
                                <div className="relative">
                                    <div
                                        className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-primary-foreground shadow-lg">
                                        {step.step}
                                    </div>
                                    <h4 className="font-bold text-foreground mb-3">{step.title}</h4>
                                    <p className="text-sm text-muted-foreground px-2">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Final CTA */}
                <Card className="mt-20 bg-gradient-to-r from-primary to-primary/90 p-10 lg:p-16 text-center text-white">
                    <h3 className="text-3xl lg:text-4xl font-bold mb-6">{t("finalCta.title")}</h3>
                    <p className="text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto">
                        {t("finalCta.subtitle")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button size="lg" variant="secondary"
                                className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-10">
                            {t("finalCta.primary")}
                        </Button>
                        <Button size="lg" variant="outline"
                                className="border-white/50 text-white hover:bg-white/10 backdrop-blur text-lg px-10">
                            {t("finalCta.secondary")}
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    )
}