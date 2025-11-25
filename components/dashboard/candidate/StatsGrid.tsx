import {Briefcase, Calendar, FileText, BarChart3, ArrowRight} from 'lucide-react'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import Link from 'next/link'
import {useTranslations} from 'next-intl'

export function StatsGrid() {
    const t = useTranslations('Dashboard.Candidate.Overview.Stats')

    const stats = [
        {
            icon: Briefcase,
            badge: {variant: 'secondary' as const, text: t('applications.badge')},
            value: '12',
            label: t('applications.label'),
            link: '/dashboard/candidate/applications',
            linkText: t('applications.linkText'),
        },
        {
            icon: Calendar,
            badge: {variant: 'secondary' as const, text: t('interview.badge')},
            value: '1',
            label: t('interview.label'),
            link: '/dashboard/candidate/calendar',
            linkText: t('interview.linkText'),
        },
        {
            icon: FileText,
            badge: {variant: 'secondary' as const, text: t('visa.badge')},
            value: '65%',
            label: t('visa.label'),
            link: '/dashboard/candidate/visa',
            linkText: t('visa.linkText'),
        },
        {
            icon: BarChart3,
            badge: {variant: 'secondary' as const, text: t('profile.badge')},
            value: '89%',
            label: t('profile.label'),
            link: '/dashboard/candidate/profile',
            linkText: t('profile.linkText'),
        },
    ]

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className="group hover:shadow-md transition-all cursor-pointer"
                >
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <stat.icon className="w-6 h-6 text-primary-foreground"/>
                            </div>
                            <Badge variant={stat.badge.variant} className="text-xs">
                                {stat.badge.text}
                            </Badge>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                        <div className="text-muted-foreground text-sm">{stat.label}</div>
                        <div
                            className="mt-4 flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                            <Link href={stat.link}>
                                {stat.linkText}
                            </Link>
                            <ArrowRight className="w-4 h-4"/>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}