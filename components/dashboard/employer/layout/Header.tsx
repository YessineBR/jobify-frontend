"use client"

import {usePathname, useRouter} from "next/navigation"
import React, {useState} from "react"
import {Menu, X, Moon, Sun, Monitor, Globe} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger, SheetTitle} from "@/components/ui/sheet"
import {useTheme} from "next-themes"
import {VisuallyHidden} from "@radix-ui/react-visually-hidden"
import {Logo} from "@/components/dashboard/employer/layout/Logo";
import {Navigation} from "@/components/dashboard/employer/layout/Navigation";
import {UserMenu} from "@/components/dashboard/employer/layout/UserMenu";

interface HeaderProps {
    navItems: Array<{
        id: string
        icon: React.ComponentType<{ className?: string }>
        label: string
    }>
    activeTab: string
}

export function Header({navItems, activeTab}: HeaderProps) {
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

    return (
        <header
            className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">

                {/* Logo */}
                <Logo/>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    <Navigation items={navItems} activeTab={activeTab}/>

                    <div className="flex items-center gap-3 ml-8">
                        {/* Language Switcher */}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => switchLocale(currentLocale === "en" ? "de" : "en")}
                            className="rounded-full"
                        >
                            <Globe className="h-4 w-4"/>
                        </Button>

                        {/* Theme Switcher */}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className="rounded-full"
                            suppressHydrationWarning
                        >
                            {resolvedTheme === "dark" ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
                        </Button>

                        {/* User Menu */}
                        <UserMenu/>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden">
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
                                    <Logo/>
                                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                        <X className="h-6 w-6"/>
                                    </Button>
                                </div>

                                {/* Mobile Navigation Items */}
                                <nav className="flex-1 space-y-4">
                                    {navItems.map((item) => {
                                        const Icon = item.icon
                                        return (
                                            <Button
                                                key={item.id}
                                                variant={activeTab === item.id ? "secondary" : "ghost"}
                                                className="w-full justify-start gap-3"
                                                asChild
                                                onClick={() => setOpen(false)}
                                            >
                                                <a href={`/dashboard/employer/${item.id}`}>
                                                    <Icon className="w-4 h-4"/>
                                                    <span>{item.label}</span>
                                                </a>
                                            </Button>
                                        )
                                    })}
                                </nav>

                                <div className="mt-10 space-y-6">
                                    {/* Language Switcher */}
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

                                    {/* Theme Switcher */}
                                    <div className="border-t pt-6">
                                        <p className="text-sm text-muted-foreground mb-3">Theme</p>
                                        <div className="grid grid-cols-3 gap-3" suppressHydrationWarning>
                                            <Button
                                                variant={resolvedTheme === "light" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setTheme("light")}
                                            >
                                                <Sun className="h-4 w-4 mr-2"/> Light
                                            </Button>
                                            <Button
                                                variant={resolvedTheme === "dark" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setTheme("dark")}
                                            >
                                                <Moon className="h-4 w-4 mr-2"/> Dark
                                            </Button>
                                            <Button
                                                variant={resolvedTheme === "system" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setTheme("system")}
                                            >
                                                <Monitor className="h-4 w-4 mr-2"/> Auto
                                            </Button>
                                        </div>
                                    </div>

                                    {/* User Menu in Mobile */}
                                    <div className="border-t pt-6">
                                        <UserMenu mobile/>
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