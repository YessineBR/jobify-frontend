"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

// shadcn components
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

// Lucide icons
import { Menu, ChevronDown, Moon, Sun, Monitor } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { DialogTitle } from "@/components/ui/dialog"

// Theme hook (you probably already have this — if not, see note below)
import { useTheme } from "next-themes"

export default function Header() {
    const t = useTranslations("header")
    const router = useRouter()
    const pathname = usePathname() || "/en"
    const { theme, setTheme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    const segments = pathname.split("/")
    const currentLocale = segments[1] || "en"

    // Prevent hydration mismatch
    useEffect(() => setMounted(true), [])

    const switchLocale = (locale: string) => {
        const updated = [...segments]
        updated[1] = locale
        router.push(updated.join("/") || `/${locale}`)
    }

    // Icon + label based on current theme
    const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor
    const themeLabel =
        theme === "dark" ? "Dark" :
            theme === "light" ? "Light" :
                "System"

    return (
        <header className="border-b sticky top-0 bg-background z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href={`/${currentLocale}`} className="font-bold text-xl">
                    Jobify
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <NavigationMenu>
                        <NavigationMenuList className="flex items-center gap-6">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={`/${currentLocale}/jobs`} className="text-sm font-medium hover:text-primary transition-colors">
                                        {t("browseJobs")}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={`/${currentLocale}/companies`} className="text-sm font-medium hover:text-primary transition-colors">
                                        {t("companies")}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={`/${currentLocale}/pricing`} className="text-sm font-medium hover:text-primary transition-colors">
                                        {t("pricing")}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <Button variant="default">{t("login")}</Button>

                    {/* Language Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                                {currentLocale.toUpperCase()}
                                <ChevronDown size={14} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => switchLocale("en")}>English</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => switchLocale("de")}>Deutsch</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Theme Switcher – Desktop */}
                    {mounted && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="relative">
                                    <ThemeIcon className="h-4 w-4" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
                                    <Sun size={16} /> Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
                                    <Moon size={16} /> Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
                                    <Monitor size={16} /> System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <VisuallyHidden>
                                <DialogTitle>Navigation Menu</DialogTitle>
                            </VisuallyHidden>

                            <div className="m-8 flex flex-col gap-6">

                                {/* Mobile Nav Links */}
                                <nav className="flex flex-col gap-4">
                                    <Link href={`/${currentLocale}/jobs`} className="text-lg font-medium">
                                        {t("browseJobs")}
                                    </Link>
                                    <Link href={`/${currentLocale}/companies`} className="text-lg font-medium">
                                        {t("companies")}
                                    </Link>
                                    <Link href={`/${currentLocale}/pricing`} className="text-lg font-medium">
                                        {t("pricing")}
                                    </Link>
                                </nav>

                                <Button className="w-full">{t("login")}</Button>

                                {/* Mobile Language Switcher */}
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant={currentLocale === "en" ? "default" : "outline"}
                                        onClick={() => switchLocale("en")}
                                    >
                                        EN
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={currentLocale === "de" ? "default" : "outline"}
                                        onClick={() => switchLocale("de")}
                                    >
                                        DE
                                    </Button>
                                </div>

                                {/* Mobile Theme Switcher */}
                                {mounted && (
                                    <div className="border-t pt-6">
                                        <p className="text-sm font-medium mb-3 text-muted-foreground">Theme</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            <Button
                                                variant={theme === "light" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setTheme("light")}
                                                className="flex items-center gap-2"
                                            >
                                                <Sun size={16} /> Light
                                            </Button>
                                            <Button
                                                variant={theme === "dark" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setTheme("dark")}
                                                className="flex items-center gap-2"
                                            >
                                                <Moon size={16} /> Dark
                                            </Button>
                                            <Button
                                                variant={theme === "system" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setTheme("system")}
                                                className="flex items-center gap-2"
                                            >
                                                <Monitor size={16} /> Auto
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}