import {LucidePlus, Users2, Star} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import Link from 'next/link'
import {useTranslations} from 'next-intl'

export function WelcomeSection() {
    const t = useTranslations('Dashboard.Employer.Overview.Welcome')

    return (
        <Card className="bg-gradient-to-br from-primary via-blue-500 to-purple-600 relative overflow-hidden text-white">
            <CardContent className="p-8 md:p-10 relative z-10">
                <div
                    className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -mr-32 -mt-32"></div>
                <div
                    className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full -ml-24 -mb-24"></div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="text-sm mb-2">{t('welcomeBack')}</div>
                            <h1 className="text-4xl font-bold mb-3">{t('heyUser')}</h1>
                            <p className="text-lg max-w-2xl">
                                {t('statusMessage')}
                            </p>
                        </div>
                        <Card
                            className="hidden text-white md:block bg-primary-foreground/20 backdrop-blur-sm border-primary-foreground/30">
                            <div className="px-4 py-2">
                                <div className="text-xs mb-1">{t('currentPlan')}</div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-green-500"/>
                                    <span className="text-sm">{t('planType')}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="secondary" className="px-6 py-3 flex items-center gap-2">
                            <LucidePlus className="w-4 h-4"/>
                            <span>{t('findJobs')}</span>
                        </Button>
                        <Button asChild variant="outline"
                                className="px-6 py-3 bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground/30 hover:bg-primary-foreground/30 flex items-center gap-2">
                            <Link href="/dashboard/candidate/calendar">
                                <Users2 className="w-4 h-4"/>
                                <span>{t('viewCalendar')}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}