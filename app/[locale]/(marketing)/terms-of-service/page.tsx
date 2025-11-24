import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"

export async function generateMetadata({params}: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: "legal.terms"})
    return {
        title: `${t("title")} – Rcrut.me`,
        description: t("description"),
    }
}

export default async function TermsOfService({params}: { params: { locale: string } }) {
    const t = await getTranslations({locale: params.locale, namespace: "legal.terms"})

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
                            <h2>{t("sections.acceptance.title")}</h2>
                            <p>{t("sections.acceptance.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.eligibility.title")}</h2>
                            <p>{t("sections.eligibility.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.accounts.title")}</h2>
                            <p>{t("sections.accounts.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.conduct.title")}</h2>
                            <p>{t("sections.conduct.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.payments.title")}</h2>
                            <p>{t("sections.payments.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.termination.title")}</h2>
                            <p>{t("sections.termination.content")}</p>
                        </section>

                        <section>
                            <h2>{t("sections.liability.title")}</h2>
                            <p>{t("sections.liability.content")}</p>
                        </section>
                    </div>
                </Card>
            </div>
        </div>
    )
}