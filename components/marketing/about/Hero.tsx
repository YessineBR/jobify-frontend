import {Button} from "@/components/ui/button"
import {ArrowRight} from "lucide-react"
import {useTranslations} from "next-intl"
import Link from "next/link"

export function Hero() {
    const t = useTranslations("about.hero")

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pt-24 pb-32">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8">
                    {t("title")}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
                    {t("subtitle")}
                </p>
                <Button size="lg" asChild>
                    <Link href="/#express-visa">
                        {t("cta")} <ArrowRight className="ml-2 h-5 w-5"/>
                    </Link>
                </Button>
            </div>
        </section>
    )
}