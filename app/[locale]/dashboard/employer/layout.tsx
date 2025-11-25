'use client'

import {useState} from 'react'
import {X, Video, Calendar, Clock} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {useTranslations} from 'next-intl'

export function InterviewNotification({upcomingInterview, onViewDetails}: {
    upcomingInterview: any,
    onViewDetails: () => void
}) {
    const t = useTranslations('Dashboard.Candidate.Overview.Notification')
    const [show, setShow] = useState(true)

    if (!show) return null

    return (
        <Card
            className="mb-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <Button
                variant="ghost"
                className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => setShow(false)}
            >
                <X className="w-5 h-5"/>
            </Button>
            <CardContent className="relative z-10 flex items-center gap-6 p-6">
                <div
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Video className="w-8 h-8"/>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl mb-2">{t('title')}</h3>
                    <p className="text-green-100 mb-3">
                        {t('description', {company: upcomingInterview.company, position: upcomingInterview.position})}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4"/>
                {upcomingInterview.date}
            </span>
                        <span className="flex items-center gap-2">
              <Clock className="w-4 h-4"/>
                            {t('time', {time: upcomingInterview.time})}
            </span>
                        <span className="flex items-center gap-2">
              <Video className="w-4 h-4"/>
                            {upcomingInterview.type}
            </span>
                    </div>
                </div>
                <Button
                    onClick={onViewDetails}
                    className="px-6 py-3 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-colors shadow-lg flex-shrink-0"
                >
                    {t('viewDetails')}
                </Button>
            </CardContent>
        </Card>
    )
}