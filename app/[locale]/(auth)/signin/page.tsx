"use client"

import React, {useState} from "react"
import {useTranslations} from "next-intl"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Card} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Badge} from "@/components/ui/badge"
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Building2, Check, BrainCircuit
} from "lucide-react"
import Link from "next/link";
import {redirectToDashboard} from "@/utils/auth";

export default function SignInPage() {
    const t = useTranslations("auth.signin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [userType, setUserType] = useState<"applicant" | "company">("applicant")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Sign in with:", {email, password, rememberMe, userType})
        redirectToDashboard(userType)
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-muted/50 to-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <Link href={"/"} className="text-center">
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                            <BrainCircuit className="h-8 w-8 text-primary-foreground"/>
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">Rcrut.me</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </Link>

                <Card className="shadow-2xl border-0">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* User Type */}
                            <div className="space-y-3">
                                <Label>{t("userType.label")}</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    {(["applicant", "company"] as const).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setUserType(type)}
                                            className={`relative p-5 rounded-2xl border-2 transition-all ${
                                                userType === type
                                                    ? "border-primary bg-primary/5 ring-4 ring-primary/20"
                                                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                                            }`}
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                {type === "applicant" ? (
                                                    <User
                                                        className={`h-7 w-7 ${userType === type ? "text-primary" : "text-muted-foreground"}`}/>
                                                ) : (
                                                    <Building2
                                                        className={`h-7 w-7 ${userType === type ? "text-primary" : "text-muted-foreground"}`}/>
                                                )}
                                                <span
                                                    className={`font-medium ${userType === type ? "text-primary" : "text-foreground"}`}>
                          {t(`userType.${type}`)}
                        </span>
                                            </div>
                                            {userType === type && (
                                                <Badge className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full">
                                                    <Check/>
                                                </Badge>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">{t("email")}</Label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">{t("password")}</Label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                                    </button>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                    />
                                    <Label htmlFor="remember" className="cursor-pointer text-sm font-normal">
                                        {t("remember")}
                                    </Label>
                                </div>
                                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                    {t("forgot")}
                                </Link>
                            </div>

                            <Button type="submit" size="lg" className="w-full">
                                {t("submit")}
                            </Button>
                        </form>

                        <Separator className="my-8"/>

                        {/* Social Login */}
                        <div className="space-y-3">
                            <p className="text-center text-sm text-muted-foreground">{t("or")}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-12">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="#4285F4"
                                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853"
                                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05"
                                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335"
                                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="h-12">
                                    <svg className="w-5 h-5 mr-2" fill="#0A66C2" viewBox="0 0 24 24">
                                        <path
                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Sign Up */}
                <p className="mt-8 text-center text-sm text-muted-foreground">
                    {t("noAccount")}{" "}
                    <Link href="/signup" className="font-medium text-primary hover:underline">
                        {t("signup")}
                    </Link>
                </p>
            </div>
        </div>
    )
}