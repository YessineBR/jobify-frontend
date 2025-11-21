"use client"

import {useTranslations} from "next-intl"
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {CheckCircle, Search, Mail} from "lucide-react"

export default function HowItWorks() {
    const t = useTranslations("homePage.howItWorks")

    const steps = [
        {
            icon: Search,
            title: t("step1.title"),
            description: t("step1.description"),
        },
        {
            icon: Mail,
            title: t("step2.title"),
            description: t("step2.description"),
        },
        {
            icon: CheckCircle,
            title: t("step3.title"),
            description: t("step3.description"),
        },
    ]

    return (
        <div className="space-y-10">
            <h2 className="text-center text-3xl md:text-4xl font-bold">{t("title")}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                    <Card key={i} className="p-6 text-center">
                        <step.icon className="mx-auto mb-4 w-10 h-10 text-primary"/>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
