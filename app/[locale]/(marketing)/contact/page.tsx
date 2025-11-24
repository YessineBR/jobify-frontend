import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Send
} from "lucide-react"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale, namespace: "contact" })
    return {
        title: `${t("title")} – Rcrut.me`,
        description: t("description"),
    }
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
    const t = await getTranslations({ locale: params.locale, namespace: "contact" })

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            {/* Hero */}
            <section className="py-20 lg:py-32 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <Badge variant="secondary" className="mb-6">
                        <MessageCircle className="w-4 h-4 mr-2" />
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

            {/* Contact Options */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Email */}
                        <Card className="p-8 hover:shadow-xl transition-all border group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">{t("email.title")}</h3>
                                    <p className="text-sm text-muted-foreground">{t("email.subtitle")}</p>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full justify-start h-12">
                                <Mail className="w-5 h-5 mr-3" />
                                hello@Rcrut.me.jobs
                            </Button>
                        </Card>

                        {/* Phone */}
                        <Card className="p-8 hover:shadow-xl transition-all border group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Phone className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">{t("phone.title")}</h3>
                                    <p className="text-sm text-muted-foreground">{t("phone.subtitle")}</p>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full justify-start h-12">
                                <Phone className="w-5 h-5 mr-3" />
                                +49 30 12345678
                            </Button>
                        </Card>

                        {/* Location */}
                        <Card className="p-8 hover:shadow-xl transition-all border group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">{t("location.title")}</h3>
                                    <p className="text-sm text-muted-foreground">{t("location.subtitle")}</p>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>Mitte, Berlin</p>
                                <p>Germany</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="max-w-3xl mx-auto">
                    <Card className="p-12 shadow-2xl border-0">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-foreground mb-4">
                                {t("form.title")}
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                {t("form.subtitle")}
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t("form.name")}</Label>
                                    <Input id="name" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t("form.email")}</Label>
                                    <Input id="email" type="email" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">{t("form.subject")}</Label>
                                <Input id="subject" placeholder={t("form.subjectPlaceholder")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">{t("form.message")}</Label>
                                <Textarea
                                    id="message"
                                    placeholder={t("form.messagePlaceholder")}
                                    rows={6}
                                />
                            </div>

                            <Button size="lg" className="w-full">
                                <Send className="mr-2 h-5 w-5" />
                                {t("form.submit")}
                            </Button>
                        </form>
                    </Card>
                </div>
            </section>
        </div>
    )
}