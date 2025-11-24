"use client"

import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {useTranslations} from "next-intl"
import {useState} from "react"
import {BrainCircuit, Menu, Moon, Sun, Monitor, Globe} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTheme} from "next-themes"

export default function Header() {
    const t = useTranslations("header")
    const router = useRouter()
    const pathname = usePathname()
    const {resolvedTheme, setTheme} = useTheme()
    const [mobileOpen, setMobileOpen] = useState(false)

    const segments = pathname.split("/")
    const currentLocale = segments[1] || "en"

    const switchLocale = (locale: string) => {
        const newSegments = [...segments]
        newSegments[1] = locale
        const newPath = newSegments.join("/") || `/${locale}`
        router.push(newPath)
        setMobileOpen(false)
    }

    // Always defined — Monitor during SSR, correct icon on client
    const ThemeIcon = resolvedTheme === "dark" ? Moon : resolvedTheme === "light" ? Sun : Monitor

    return (
        <header className="border-b bg-background sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <BrainCircuit className="w-5 h-5 text-primary-foreground"/>
                        </div>
                        <span className="text-xl font-semibold text-foreground">Rcrut.me</span>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-6">

                        <NavigationMenu>
                            <NavigationMenuList className="gap-6">
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/#features"
                                              className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                            {t("features")}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/#testimonials"
                                              className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                            {t("testimonials")}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/#pricing"
                                              className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                            {t("pricing")}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <div className="flex items-center gap-3">
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/signin">{t("signIn")}</Link>
                            </Button>

                            <Button asChild size="sm">
                                <Link href="/signin">{t("getStarted")}</Link>
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">

                            {/* Language Switcher */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Globe className="h-3.5 w-3.5"/>
                                        {currentLocale.toUpperCase()}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => switchLocale("en")}>English</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => switchLocale("de")}>Deutsch</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Theme Switcher — NEVER conditionally render the whole DropdownMenu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <ThemeIcon/>
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
                                        <Sun/> Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
                                        <Moon/> Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2">
                                        <Monitor/> System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>

                    {/* Mobile */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5"/>
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <div className="flex flex-col gap-8 pt-6">

                                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                        <BrainCircuit className="w-5 h-5 text-primary-foreground"/>
                                    </div>
                                    <span className="text-xl font-semibold text-foreground">Rcrut.me</span>
                                </Link>

                                <nav className="grid gap-5">
                                    <Link href="/#features" className="text-lg font-medium hover:text-primary"
                                          onClick={() => setMobileOpen(false)}>
                                        {t("features")}
                                    </Link>
                                    <Link href="/#testimonials" className="text-lg font-medium hover:text-primary"
                                          onClick={() => setMobileOpen(false)}>
                                        {t("testimonials")}
                                    </Link>
                                    <Link href="/#pricing" className="text-lg font-medium hover:text-primary"
                                          onClick={() => setMobileOpen(false)}>
                                        {t("pricing")}
                                    </Link>
                                    <Link href="/signin" className="text-lg font-medium hover:text-primary"
                                          onClick={() => setMobileOpen(false)}>
                                        {t("signIn")}
                                    </Link>
                                </nav>

                                <Button asChild size="lg" className="w-full">
                                    <Link href="/signin" onClick={() => setMobileOpen(false)}>
                                        {t("getStarted")}
                                    </Link>
                                </Button>

                                {/* Mobile Language */}
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

                                {/* Mobile Theme — safe because ThemeIcon always exists */}
                                <div className="border-t pt-6">
                                    <p className="text-sm font-medium text-muted-foreground mb-4">Theme</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <Button
                                            variant={resolvedTheme === "light" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTheme("light")}
                                            className="justify-center gap-2"
                                        >
                                            <Sun className="h-4 w-4"/> Light
                                        </Button>
                                        <Button
                                            variant={resolvedTheme === "dark" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTheme("dark")}
                                            className="justify-center gap-2"
                                        >
                                            <Moon className="h-4 w-4"/> Dark
                                        </Button>
                                        <Button
                                            variant={resolvedTheme === "system" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTheme("system")}
                                            className="justify-center gap-2"
                                        >
                                            <Monitor className="h-4 w-4"/> Auto
                                        </Button>
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