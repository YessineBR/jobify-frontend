// app/[locale]/careers/page.tsx
import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {MapPin, Clock, Briefcase, ArrowRight, Sparkles} from "lucide-react"

export async function generateMetadata({params}: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: "careers"})
    return {
        title: `${t("title")} – Rcrut.me`,
        description: t("description"),
    }
}

// Hardcoded jobs (you can later move to CMS / JSON)
const jobs = [
    {
        title: "Senior Full-Stack Engineer",
        location: "Remote (EU timezone)",
        type: "Full-time",
        department: "Engineering",
        description: "Build the next generation of AI matching algorithms and beautiful interfaces. Next.js, TypeScript, Tailwind, and a passion for clean code required.",
    },
    {
        title: "Head of Growth (German-speaking)",
        location: "Berlin or Remote",
        type: "Full-time",
        department: "Growth & Sales",
        description: "Own our go-to-market in the DACH region. B2B sales, partnerships, content — if you live and breathe the German recruiting market, let’s talk.",
    },
    {
        title: "AI Research Engineer",
        location: "Remote (EU timezone)",
        type: "Full-time",
        department: "AI & Data",
        description: "Research and implement state-of-the-art NLP models for resume parsing and candidate matching. PhD preferred but not required.",
    },
]

export default async function CareersPage({params}: { params: { locale: string } }) {
    // Correct way: await translations inside the component
    const t = await getTranslations({locale: params.locale, namespace: "careers"})

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            {/* Hero */}
            <section className="py-20 lg:py-32 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <Badge variant="secondary" className="mb-6">
                        <Briefcase className="w-4 h-4 mr-2"/>
                        {t("hero.badge")}
                    </Badge>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8">
                        {t("hero.title")}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {t("hero.subtitle")}
                    </p>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                        {t("openPositions")}
                    </h2>

                    <div className="grid gap-8">
                        {jobs.map((job, index) => (
                            <Card key={index}
                                  className="p-8 hover:shadow-xl transition-all border bg-card/95 backdrop-blur">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-foreground mb-3">{job.title}</h3>
                                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4"/>
                          {job.location}
                      </span>
                                            <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4"/>
                                                {job.type}
                      </span>
                                            <span className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4"/>
                                                {job.department}
                      </span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                                    </div>
                                    <Button size="lg" className="md:self-start whitespace-nowrap">
                                        {t("applyNow")}
                                        <ArrowRight className="ml-3 h-5 w-5"/>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-lg text-muted-foreground mb-6">{t("noRole")}</p>
                        <Button size="lg" variant="outline">
                            {t("spontaneous")}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Perks */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-foreground mb-12">
                        {t("whyJoin")}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            t("perks.remote"),
                            t("perks.equity"),
                            t("perks.pto"),
                            t("perks.health"),
                            t("perks.learning"),
                            t("perks.offsites"),
                        ].map((perk, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-3xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
                            >
                                <div
                                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <Sparkles className="w-9 h-9 text-primary"/>
                                </div>
                                <p className="text-xl font-semibold text-foreground">{perk}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}