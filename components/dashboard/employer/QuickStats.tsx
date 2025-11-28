import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {useTranslations} from 'next-intl'

export function QuickStats() {
    const t = useTranslations('Dashboard.Candidate.Profile.Stats')

    const stats = [
        {label: t('memberSince'), value: 'Jan 2024'},
        {label: t('totalApplications'), value: '47'},
        {label: t('successRate'), value: '32%', color: 'text-green-600'},
        {label: t('profileViews'), value: '1,247'},
    ]

    return (
        <Card className="p-5">
            <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">{stat.label}</span>
                        <span className={`text-foreground ${stat.color || ''}`}>{stat.value}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}