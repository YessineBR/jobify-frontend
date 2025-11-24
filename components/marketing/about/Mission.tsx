import { useTranslations } from "next-intl"

export function Mission() {
    const t = useTranslations("about.mission")

    return (
        <section className="py-20 lg:py-28 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t("description")}
                        </p>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-3xl p-12 text-center">
                        <blockquote className="text-2xl lg:text-3xl font-medium text-foreground italic">
                            “{t("quote")}”
                        </blockquote>
                        <p className="mt-6 text-primary font-semibold">— The Rcrut.me Team</p>
                    </div>
                </div>
            </div>
        </section>
    )
}