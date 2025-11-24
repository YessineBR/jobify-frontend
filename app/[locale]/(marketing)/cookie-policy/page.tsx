import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"

interface CookieType {
    name: string
    description: string
}

export async function generateMetadata({params}: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: "legal.cookies"})
    return {
        title: `${t("title")} – Rcrut.me`,
        description: t("description"),
    }
}

export default async function CookiePolicy({params}: { params: { locale: string } }) {
    const t = await getTranslations({locale: params.locale, namespace: "legal.cookies"})

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <Badge variant="secondary" className="mb-6">
                        {t("badge")}
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                        {t("title")}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {t("lastUpdated")}
                    </p>
                </div>

                <Card className="p-8 lg:p-12 shadow-xl prose prose-lg dark:prose-invert max-w-none">
                    <div className="space-y-10 text-foreground/90 leading-relaxed">
                        <section>
                            <h2>{t("sections.whatAreCookies.title")}</h2>
                            <p>{t("sections.whatAreCookies.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.types.title")}</h2>
                            <p>{t("sections.types.content")}</p>
                            <ul className="list-disc pl-6 space-y-3 mt-4">
                                {(t.raw("sections.types.list") as CookieType[]).map((cookie, i) => (
                                    <li key={i}>
                                        <strong>{cookie.name}:</strong> {cookie.description}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2>{t("sections.management.title")}</h2>
                            <p>{t("sections.management.content")}</p>
                        </section>
                    </div>
                </Card>
            </div>
        </div>
    )
}