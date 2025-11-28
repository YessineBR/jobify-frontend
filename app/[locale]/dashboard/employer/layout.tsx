'use client'

import {usePathname} from 'next/navigation'
import {useTranslations} from 'next-intl'
import React from "react"
import {Header} from "@/components/dashboard/candidate/layout/Header";
import {Navigation} from "@/components/dashboard/candidate/layout/Navigation";
import {UserMenu} from "@/components/dashboard/candidate/layout/UserMenu";
import {Briefcase, Calendar, FileText, Home, User} from "lucide-react";

export default function CandidateLayout({children}: { children: React.ReactNode }) {
    const t = useTranslations('Dashboard.Candidate')
    const pathname = usePathname()
    const activeTab = pathname.split('/').pop() || 'overview'

    const navItems = [
        {id: '', icon: Home, label: t('nav.overview')},
        {id: 'applications', icon: Briefcase, label: t('nav.applications')},
        {id: 'calendar', icon: Calendar, label: t('nav.calendar')},
        {id: 'visa', icon: FileText, label: t('nav.visa')},
        {id: 'profile', icon: User, label: t('nav.profile')},
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header navItems={navItems} activeTab={activeTab} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
    )
}