import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link"

export function CTA() {
    const t = useTranslations("about.cta")

    return (
        <section className="py-20 lg:py-28 bg-gradient-to-r from-primary to-primary/80 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl lg:text-6xl font-bold mb-8">{t("title")}</h2>
                <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">{t("subtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/signup">{t("signup")}</Link>
                    </Button>
                    <Button size="lg" variant="secondary" className="" asChild>
                        <Link href="/#express-visa">{t("visa")}</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}