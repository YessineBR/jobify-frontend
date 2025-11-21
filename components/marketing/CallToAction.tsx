"use client"

import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"

export default function CallToAction() {
    const t = useTranslations("homePage.cta")

    return (
        <Card className="p-10 text-center bg-primary text-white rounded-2xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
            <p className="text-sm md:text-base opacity-80">{t("subtitle")}</p>

            <Button size="lg" variant="secondary">
                {t("button")}
            </Button>
        </Card>
    )
}
