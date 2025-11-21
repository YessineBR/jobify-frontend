"use client"

import {useTranslations} from "next-intl"
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"

export default function Pricing() {
    const t = useTranslations("homePage.pricing")

    const tiers = ["basic", "pro", "enterprise"]

    return (
        <div className="space-y-10">
            <h2 className="text-center text-3xl md:text-4xl font-bold">{t("title")}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {tiers.map((tier) => (
                    <Card key={tier} className="p-6 border-2 hover:border-primary transition">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                {t(`${tier}.title`)}
                            </CardTitle>

                            <CardDescription className="text-lg font-bold mt-2">
                                {t(`${tier}.price`)}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {t.raw(`${tier}.features`).map((f: string, i: number) => (
                                <p key={i} className="text-sm text-muted-foreground">
                                    • {f}
                                </p>
                            ))}

                            <Button className="w-full mt-4">{t("button")}</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
