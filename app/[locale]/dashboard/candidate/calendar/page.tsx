// app/dashboard/candidate/calendar/page.tsx
'use client'

import { InterviewsList } from '@/components/dashboard/candidate/InterviewList'
import { useTranslations } from 'next-intl'

const interviews = [
    {
        id: 1,
        company: "Siemens AG",
        position: "Senior Software Engineer",
        date: "2024-11-25",
        time: "09:00",
        type: "Video Call",
        interviewer: "Dr. Schmidt",
        duration: "60 min",
        status: "upcoming",
    },
    {
        id: 2,
        company: "Deutsche Telekom",
        position: "Full Stack Developer",
        date: "2024-11-28",
        time: "14:00",
        type: "In-Person",
        interviewer: "Anna Müller",
        duration: "45 min",
        status: "confirmed",
    },
    {
        id: 3,
        company: "SAP SE",
        position: "Product Manager",
        date: "2024-12-02",
        time: "10:30",
        type: "Video Call",
        interviewer: "Thomas Weber",
        duration: "90 min",
        status: "pending",
    },
]

export default function CalendarPage() {
    const t = useTranslations('Dashboard.Candidate.Calendar')

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl mb-2">{t('title')}</h2>
                <p>{t('description')}</p>
            </div>
            <InterviewsList interviews={interviews} />
        </div>
    )
}