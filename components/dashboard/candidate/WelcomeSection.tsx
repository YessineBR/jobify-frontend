import {Search, Calendar, Star} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import Link from 'next/link'
import {useTranslations} from 'next-intl'

export function WelcomeSection() {
    const t = useTranslations('Dashboard.Candidate.Overview.Welcome')

    return (
        <Card className="bg-primary text-primary-foreground relative overflow-hidden">
            <CardContent className="p-8 md:p-10 relative z-10">
                <div
                    className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -mr-32 -mt-32"></div>
                <div
                    className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full -ml-24 -mb-24"></div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="text-primary-foreground/80 text-sm mb-2">{t('welcomeBack')}</div>
                            <h1 className="text-4xl font-bold mb-3">{t('heyUser')}</h1>
                            <p className="text-primary-foreground/80 text-lg max-w-2xl">
                                {t('statusMessage')}
                            </p>
                        </div>
                        <Card
                            className="hidden md:block bg-primary-foreground/20 backdrop-blur-sm border-primary-foreground/30">
                            <div className="px-4 py-2">
                                <div className="text-xs text-primary-foreground/80 mb-1">{t('currentPlan')}</div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-300"/>
                                    <span className="text-sm">{t('planType')}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="secondary" className="px-6 py-3 flex items-center gap-2">
                            <Search className="w-4 h-4"/>
                            <span>{t('findJobs')}</span>
                        </Button>
                        <Button asChild variant="outline"
                                className="px-6 py-3 bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/30 flex items-center gap-2">
                            <Link href="/dashboard/candidate/calendar">
                                <Calendar className="w-4 h-4"/>
                                <span>{t('viewCalendar')}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}