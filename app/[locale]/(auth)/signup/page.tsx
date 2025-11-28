"use client";

import React, {useState} from "react";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {useToast} from "@/hooks/use-toast";
import {useAuth} from "@/contexts/AuthContext";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Building2,
    Check,
    BrainCircuit,
    UserPlus,
} from "lucide-react";
import {useRouter} from "next/navigation";

/* ------------------------------------------------------------------ */
/* Schema                                                             */
/* ------------------------------------------------------------------ */
const formSchema = z
    .object({
        fullName: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type FormValues = z.infer<typeof formSchema>;

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function SignUpPage(): React.JSX.Element {
    const t = useTranslations("auth.signup");
    const router = useRouter();
    const {toast} = useToast();
    const {register} = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [userType, setUserType] = useState<"applicant" | "company">("applicant");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    /* ---------- submit ------------------------------------------------ */
    const onSubmit = async (data: FormValues) => {
        if (!termsAccepted) {
            form.setError("root", {message: "You must accept the terms"});
            return;
        }

        setIsLoading(true);
        try {
            const [first_name, ...rest] = data.fullName.trim().split(" ");
            const last_name = rest.join(" ") || "";

            await register({
                email: data.email,
                password1: data.password,
                password2: data.confirmPassword,
                first_name,
                last_name,
            });

            toast({title: "Success!", description: "Your account has been created."});
            router.push('/auth/login');
        } catch (err: unknown) {
            toast({
                title: "Registration failed",
                description: err instanceof Error ? err.message : "Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    /* ---------- UI ---------------------------------------------------- */
    return (
        <div
            className="min-h-screen bg-gradient-to-b from-muted/50 to-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* header */}
                <Link href="/" className="text-center block">
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                            <BrainCircuit className="h-8 w-8 text-primary-foreground"/>
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">Rcrut.me</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                        {t("title") ?? "Create your account"}
                    </h2>
                    <p className="text-muted-foreground">{t("subtitle") ?? "Join as a job seeker or employer"}</p>
                </Link>

                <Card className="shadow-2xl border-0 mt-8">
                    <div className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* user type */}
                                <div className="space-y-3">
                                    <Label>{t("userType.label") ?? "I am a"}</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {(["applicant", "company"] as const).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setUserType(type)}
                                                disabled={isLoading}
                                                className={`relative p-5 rounded-2xl border-2 transition-all ${
                                                    userType === type
                                                        ? "border-primary bg-primary/5 ring-4 ring-primary/20"
                                                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                                                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                <div className="flex flex-col items-center gap-3">
                                                    {type === "applicant" ? (
                                                        <User
                                                            className={`h-7 w-7 ${
                                                                userType === type ? "text-primary" : "text-muted-foreground"
                                                            }`}
                                                        />
                                                    ) : (
                                                        <Building2
                                                            className={`h-7 w-7 ${
                                                                userType === type ? "text-primary" : "text-muted-foreground"
                                                            }`}
                                                        />
                                                    )}
                                                    <span
                                                        className={`font-medium ${
                                                            userType === type ? "text-primary" : "text-foreground"
                                                        }`}
                                                    >
                            {t(`userType.${type}`) ?? (type === "applicant" ? "Job Seeker" : "Employer")}
                          </span>
                                                </div>
                                                {userType === type && (
                                                    <Badge
                                                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full">
                                                        <Check className="h-4 w-4"/>
                                                    </Badge>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* full name */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t("fullName") ?? "Full Name"}</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <UserPlus
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                                    <Input {...field} placeholder="John Doe" className="pl-10"
                                                           disabled={isLoading}/>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t("email") ?? "Email"}</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                                    <Input {...field} type="email" placeholder="you@example.com"
                                                           className="pl-10" disabled={isLoading}/>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t("password") ?? "Password"}</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                                    <Input
                                                        {...field}
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="pl-10 pr-12"
                                                        disabled={isLoading}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((s) => !s)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                                        disabled={isLoading}
                                                    >
                                                        {showPassword ? <EyeOff className="h-5 w-5"/> :
                                                            <Eye className="h-5 w-5"/>}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* confirm password */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t("confirmPassword") ?? "Confirm Password"}</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                                    <Input
                                                        {...field}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="pl-10 pr-12"
                                                        disabled={isLoading}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword((s) => !s)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                                        disabled={isLoading}
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="h-5 w-5"/> :
                                                            <Eye className="h-5 w-5"/>}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* terms */}
                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="terms"
                                        checked={termsAccepted}
                                        onCheckedChange={(c) => setTermsAccepted(Boolean(c))}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="terms"
                                           className="ml-1 text-sm font-normal leading-tight cursor-pointer">
                                        {t("terms.prefix") ?? "I agree to the"}{" "}
                                        <Link href="/terms" className="text-primary underline">
                                            {t("terms.terms") ?? "Terms of Service"}
                                        </Link>{" "}
                                        {t("terms.and") ?? "and"}{" "}
                                        <Link href="/privacy" className="text-primary underline">
                                            {t("terms.privacy") ?? "Privacy Policy"}
                                        </Link>
                                    </Label>
                                </div>

                                {/* submit */}
                                <Button type="submit" size="lg" className="w-full"
                                        disabled={!termsAccepted || isLoading}>
                                    {isLoading ? "Creating account…" : (t("submit") ?? "Create Account")}
                                </Button>
                            </form>
                        </Form>

                        <Separator className="my-8"/>

                        {/* social */}
                        <div className="space-y-3">
                            <p className="text-center text-sm text-muted-foreground">{t("or") ?? "Or sign up with"}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-12" disabled={isLoading}>
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="h-12" disabled={isLoading}>
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

                {/* footer link */}
                <p className="mt-8 text-center text-sm text-muted-foreground">
                    {t("haveAccount") ?? "Already have an account?"}{" "}
                    <Link href="/signin" className="font-medium text-primary hover:underline">
                        {t("signin") ?? "Sign in"}
                    </Link>
                </p>
            </div>
        </div>
    );
}