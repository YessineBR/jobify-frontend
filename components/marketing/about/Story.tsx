import {useTranslations} from "next-intl"
import Image from "next/image"

export function Story() {
    const t = useTranslations("about.story")

    return (
        <section className="py-16 lg:py-28 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

                    {/* Text Content – appears second on mobile */}
                    <div className="order-2 lg:order-1 space-y-8 lg:space-y-10 pb-3">
                        <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                            {t("title")}
                        </h2>

                        <div
                            className="prose prose-lg max-w-none text-muted-foreground space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed">
                            <p>{t("p1")}</p>
                            <p>{t("p2")}</p>
                            <p>{t("p3")}</p>
                        </div>
                    </div>

                    {/* Image – appears first on mobile */}
                    <div className="order-1 lg:order-2 relative">
                        {/* Decorative background */}
                        <div
                            className="absolute inset-0 -z-10 bg-primary/20 rounded-3xl -rotate-3 lg:-rotate-6 shadow-2xl scale-95 lg:scale-100"/>

                        {/* Main image */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-background">
                            <Image
                                src="/about-team.jpg"
                                alt="Rcrut.me team working together"
                                width={1200}
                                height={900}
                                className="w-full h-auto object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            />
                        </div>

                        {/* Optional: small floating accent */}
                        <div
                            className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-20 hidden lg:block"/>
                    </div>
                </div>
            </div>
        </section>
    )
}