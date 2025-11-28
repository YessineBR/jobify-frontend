import {X, Video, Calendar, Clock} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import Link from 'next/link'
import {useTranslations} from 'next-intl'

interface InterviewNotificationProps {
    upcomingInterview: any
    onClose: () => void
}

export function InterviewNotification({upcomingInterview, onClose}: InterviewNotificationProps) {
    const t = useTranslations('Dashboard.Candidate.Overview.Notification')

    return (
        <Card className="mb-6 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -mr-16 -mt-16"></div>
            <Button
                variant="ghost"
                className="absolute top-4 right-4 p-1 hover:bg-primary-foreground/20 rounded-lg transition-colors text-primary-foreground"
                onClick={onClose}
            >
                <X className="w-5 h-5"/>
            </Button>
            <CardContent className="relative z-10 flex items-center gap-6 p-6">
                <div
                    className="w-16 h-16 bg-primary-foreground/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-8 h-8"/>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{t('title')}</h3>
                    <p className="text-primary-foreground/80 mb-3">
                        {t('description', {company: upcomingInterview.company, position: upcomingInterview.position})}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4"/>
                {upcomingInterview.date}
            </span>
                        <span className="flex items-center gap-2">
              <Clock className="w-4 h-4"/>
                            {upcomingInterview.time}
            </span>
                        <span className="flex items-center gap-2">
              <Video className="w-4 h-4"/>
                            {upcomingInterview.type}
            </span>
                    </div>
                </div>
                <Button asChild variant="secondary" className="px-6 py-3 flex-shrink-0">
                    <Link href="/dashboard/candidate/calendar">{t('viewDetails')}</Link>
                </Button>
            </CardContent>
        </Card>
    )
}