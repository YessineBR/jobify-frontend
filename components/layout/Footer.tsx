"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {useTranslations} from "next-intl"

// shadcn components
import {Card, CardHeader} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {Separator} from "@/components/ui/separator"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

export default function Footer() {
    const t = useTranslations("footer")
    const pathname = usePathname() || "/en"
    const locale = pathname.split("/")[1] || "en"

    const navLinks = [
        {href: `/${locale}/jobs`, label: t("jobs")},
        {href: `/${locale}/companies`, label: t("companies")},
        {href: `/${locale}/pricing`, label: t("pricing")},
    ]

    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Branding */}
                    <Card className="border-0 bg-transparent shadow-none">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-3">
                                <div
                                    className="rounded-lg w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md">
                                    J
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{t("title")}</h3>
                                    <Badge variant="secondary" className="mt-1 text-xs">
                                        {t("tagline")}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">{t("links")}</h4>
                        <ul className="space-y-2 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Auth Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">{t("auth")}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href={`/${locale}/login`}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {t("login")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/register`}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {t("signup")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">{t("newsletter")}</h4>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                // TODO: connect to newsletter API
                            }}
                            className="flex flex-col sm:flex-row gap-2"
                        >
                            <Input
                                placeholder={t("newsletterPlaceholder")}
                                className="min-w-0"
                                type="email"
                                required
                            />
                            <Button type="submit" className="whitespace-nowrap">
                                {t("subscribe")}
                            </Button>
                        </form>
                    </div>
                </div>

                <Separator className="my-8"/>

                <div className="text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Jobify. {t("allRights")}
                </div>
            </div>
        </footer>
    )
}