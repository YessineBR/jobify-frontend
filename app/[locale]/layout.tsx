import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from "next-intl";
import {ThemeProvider} from "next-themes";
import React from "react";
import {SmoothScroll} from "@/components/SmoothScroll";
import {AuthProvider} from "@/contexts/AuthContext";
import {Toaster} from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Rcrut.me - Exceptional Talent Without The Hassle",
    description: "Rcrut.me - Exceptional Talent Without The Hassle",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
        >
            <NextIntlClientProvider>
                <AuthProvider>
                    {children}
                    <Toaster />
                </AuthProvider>
                <SmoothScroll/>
            </NextIntlClientProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
