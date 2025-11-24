import {useTranslations} from "next-intl"

export function Stats() {
    const t = useTranslations("about.stats")
    const stats = t.raw("items") as Array<{ value: number; suffix: string; label: string }>

    return (
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, i) => (
                        <div key={i}>
                            <div className="text-5xl lg:text-7xl font-bold tabular-nums">
                                {stat.value.toLocaleString("en-US")}
                                <span className="text-4xl lg:text-6xl ml-1">{stat.suffix}</span>
                            </div>
                            <p className="mt-4 text-xl text-primary-foreground/90">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}