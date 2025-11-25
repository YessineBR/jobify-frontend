// app/dashboard/candidate/profile/page.tsx
'use client'

import { ProfileInfo } from '@/components/dashboard/candidate/ProfileInfo'
import { SubscriptionCard } from '@/components/dashboard/candidate/SubscriptionCard'
import { QuickStats } from '@/components/dashboard/candidate/QuickStats'
import { SettingsActions } from '@/components/dashboard/candidate/SettingsActions'
import { useTranslations } from 'next-intl'

export default function ProfilePage() {
    const t = useTranslations('Dashboard.Candidate.Profile')

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl text-gray-900 mb-2">{t('title')}</h2>
                <p className="text-gray-600">{t('description')}</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
                <ProfileInfo />
                <div className="space-y-6">
                    <SubscriptionCard />
                    <QuickStats />
                    <SettingsActions />
                </div>
            </div>
        </div>
    )
}