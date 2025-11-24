import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const {locale} = await params
    const t = await getTranslations({locale, namespace: "legal.privacy"})
    return {
        title: `${t("title")} – Rcrut.me`,
        description: t("description"),
    }
}

export default async function PrivacyPolicy({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = await params
    const t = await getTranslations({locale, namespace: "legal.privacy"})

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
                            <h2>{t("sections.introduction.title")}</h2>
                            <p>{t("sections.introduction.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.dataCollection.title")}</h2>
                            <p>{t("sections.dataCollection.content")}</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                {(t.raw("sections.dataCollection.list") as string[]).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2>{t("sections.dataUsage.title")}</h2>
                            <p>{t("sections.dataUsage.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.sharing.title")}</h2>
                            <p>{t("sections.sharing.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.cookies.title")}</h2>
                            <p>{t("sections.cookies.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.rights.title")}</h2>
                            <p>{t("sections.rights.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.contact.title")}</h2>
                            <p>
                                {t("sections.contact.content")}{" "}
                                <a href="mailto:privacy@Rcrut.me.jobs" className="text-primary underline">
                                    privacy@Rcrut.me.jobs
                                </a>
                            </p>
                        </section>
                    </div>
                </Card>
            </div>
        </div>
    )
}