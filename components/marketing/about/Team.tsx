import { useTranslations } from "next-intl"
import Image from "next/image"

export function Team() {
    const t = useTranslations("about.team")

    return (
        <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-16">
                    {t("title")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {t.raw("members").map((member: any, i: number) => (
                        <div key={i} className="space-y-4">
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={240}
                                height={240}
                                className="rounded-2xl mx-auto"
                            />
                            <h4 className="font-semibold text-foreground">{member.name}</h4>
                            <p className="text-muted-foreground">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}