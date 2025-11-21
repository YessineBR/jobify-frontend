"use client"

import {useTranslations} from "next-intl"
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card"

export default function Testimonials() {
    const t = useTranslations("homePage.testimonials")

    const items = ["t1", "t2", "t3"]

    return (
        <div className="space-y-10">
            <h2 className="text-center text-3xl md:text-4xl font-bold">{t("title")}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((key) => (
                    <Card key={key} className="p-6">
                        <CardContent className="space-y-4">
                            <CardDescription className="italic">
                                “{t(`${key}.quote`)}”
                            </CardDescription>

                            <CardTitle className="text-base font-semibold">
                                {t(`${key}.name`)}
                            </CardTitle>

                            <p className="text-xs text-muted-foreground">
                                {t(`${key}.role`)}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
