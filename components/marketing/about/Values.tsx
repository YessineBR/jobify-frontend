import { useTranslations } from "next-intl"
import { HeartHandshake, Rocket, Shield, Users } from "lucide-react"

const icons = [Rocket, HeartHandshake, Shield, Users]

export function Values() {
    const t = useTranslations("about.values")

    return (
        <section className="py-20 lg:py-28 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-16">
                    {t("title")}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {t.raw("items").map((item: any, i: number) => {
                        const Icon = icons[i]
                        return (
                            <div key={i} className="space-y-4">
                                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                                    <Icon className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}