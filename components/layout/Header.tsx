"use client"

import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {useTranslations} from "next-intl"
import {useState} from "react"
import {BrainCircuit, Menu, X, Moon, Sun, Monitor, Globe} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger, SheetTitle} from "@/components/ui/sheet"
import {useTheme} from "next-themes"
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

export default function Header() {
    const t = useTranslations("header")
    const router = useRouter()
    const pathname = usePathname()
    const {resolvedTheme, setTheme} = useTheme()
    const [open, setOpen] = useState(false)

    const currentLocale = pathname.split("/")[1] || "en"

    const switchLocale = (locale: string) => {
        const segments = pathname.split("/")
        segments[1] = locale
        router.push(segments.join("/") || `/${locale}`)
        setOpen(false)
    }

    const ThemeIcon = resolvedTheme === "dark" ? Moon : Sun

    const navItems = [
        {label: t("features"), href: "/#features"},
        {label: t("pricing"), href: "/#pricing"},
        {label: t("testimonials"), href: "/#testimonials"},
        {label: t("about"), href: "/about"},
    ]

    return (
        <header
            className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                        <BrainCircuit className="w-6 h-6 text-primary-foreground"/>
                    </div>
                    <span className="text-xl font-bold">Rcrut.me</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            scroll={false}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-3 ml-8">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/signin">{t("signIn")}</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href="/signup">{t("getStarted")}</Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => switchLocale(currentLocale === "en" ? "de" : "en")}
                            className="rounded-full"
                        >
                            <Globe className="h-4 w-4"/>
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className="rounded-full"
                        >
                            <ThemeIcon/>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu - Moved outside of nav */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6"/>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-80">
                            <VisuallyHidden>
                                <SheetTitle>Navigation Menu</SheetTitle>
                            </VisuallyHidden>
                            <div className="flex flex-col h-full p-4">

                                <div className="flex items-center justify-between mb-10">
                                    <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                                        <div
                                            className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                            <BrainCircuit className="w-7 h-7 text-primary-foreground"/>
                                        </div>
                                        <span className="text-2xl font-bold">Rcrut.me</span>
                                    </Link>
                                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                        <X className="h-6 w-6"/>
                                    </Button>
                                </div>

                                <nav className="flex-1 space-y-6 text-lg">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            scroll={false}
                                            onClick={() => setOpen(false)}
                                            className="block font-medium hover:text-primary"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    <Link href="/signin" onClick={() => setOpen(false)}
                                          className="block font-medium hover:text-primary">
                                        {t("signIn")}
                                    </Link>
                                </nav>

                                <div className="mt-10 space-y-6">
                                    <Button asChild size="lg" className="w-full">
                                        <Link href="/signup" onClick={() => setOpen(false)}>
                                            {t("getStarted")}
                                        </Link>
                                    </Button>

                                    <div className="flex gap-3">
                                        <Button
                                            variant={currentLocale === "en" ? "default" : "outline"}
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => switchLocale("en")}
                                        >
                                            EN
                                        </Button>
                                        <Button
                                            variant={currentLocale === "de" ? "default" : "outline"}
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => switchLocale("de")}
                                        >
                                            DE
                                        </Button>
                                    </div>

                                    <div className="border-t pt-6">
                                        <p className="text-sm text-muted-foreground mb-3">Theme</p>
                                        <div className="grid grid-cols-3 gap-3">
                                            <Button variant={resolvedTheme === "light" ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setTheme("light")}>
                                                <Sun className="h-4 w-4 mr-2"/> Light
                                            </Button>
                                            <Button variant={resolvedTheme === "dark" ? "default" : "outline"} size="sm"
                                                    onClick={() => setTheme("dark")}>
                                                <Moon className="h-4 w-4 mr-2"/> Dark
                                            </Button>
                                            <Button variant={resolvedTheme === "system" ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setTheme("system")}>
                                                <Monitor className="h-4 w-4 mr-2"/> Auto
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}