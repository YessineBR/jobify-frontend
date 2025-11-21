"use client"

import {useTranslations} from "next-intl"
import {Briefcase, Building2, Rocket} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

export default function Features() {
    const t = useTranslations("homePage.features")

    const items = [
        {
            icon: <Briefcase className="w-8 h-8 text-primary"/>,
            title: t("feature1.title"),
            desc: t("feature1.desc"),
        },
        {
            icon: <Building2 className="w-8 h-8 text-primary"/>,
            title: t("feature2.title"),
            desc: t("feature2.desc"),
        },
        {
            icon: <Rocket className="w-8 h-8 text-primary"/>,
            title: t("feature3.title"),
            desc: t("feature3.desc"),
        },
    ]

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {items.map((item, i) => (
                    <Card key={i} className="rounded-2xl shadow-sm hover:shadow-md transition">
                        <CardHeader>
                            <div className="mb-2">{item.icon}</div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            {item.desc}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
