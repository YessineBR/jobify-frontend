// app/dashboard/candidate/overview/page.tsx
'use client'

import { useState } from 'react'
import { InterviewNotification } from '@/components/dashboard/candidate/InterviewNotification'
import { WelcomeSection } from '@/components/dashboard/candidate/WelcomeSection'
import { StatsGrid } from '@/components/dashboard/candidate/StatsGrid'
import { RecentApplications } from '@/components/dashboard/candidate/RecentApplications'
import { RecommendedJobs } from '@/components/dashboard/candidate/RecommendedJobs'
import { useTranslations } from 'next-intl'

// Mock data updated with 2025 dates
const interviews = [
    {
        id: 1,
        company: "Siemens AG",
        position: "Senior Software Engineer",
        date: "2025-11-28",
        time: "09:00",
        type: "Video Call",
        interviewer: "Dr. Schmidt",
        duration: "60 min",
        status: "upcoming",
    },
    // ... other interviews with updated dates
]

const applications = [
    {
        id: 1,
        company: "Siemens AG",
        position: "Senior Software Engineer",
        location: "Munich, Germany",
        appliedDate: "2025-11-15",
        status: "interview",
        salary: "€75,000 - €95,000",
    },
    // ... others
]

const recommendedJobs = [
    {
        id: 1,
        company: "Deutsche Telekom",
        position: "Full Stack Developer",
        location: "Bonn, Germany",
        salary: "€65,000 - €80,000",
        match: 95,
    },
    {
        id: 2,
        company: "Allianz",
        position: "Cloud Architect",
        location: "Munich, Germany",
        salary: "€85,000 - €105,000",
        match: 92,
    },
    {
        id: 3,
        company: "Volkswagen",
        position: "Software Engineer",
        location: "Wolfsburg, Germany",
        salary: "€70,000 - €90,000",
        match: 88,
    },
]

export default function OverviewPage() {
    const t = useTranslations('Dashboard.Candidate.Overview')
    const [showNotification, setShowNotification] = useState(true)
    const upcomingInterview = interviews[0]

    return (
        <div className="space-y-6">
            {showNotification && (
                <InterviewNotification
                    upcomingInterview={upcomingInterview}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <WelcomeSection />
            <StatsGrid />
            <div className="grid lg:grid-cols-3 gap-6">
                <RecentApplications applications={applications} />
                <RecommendedJobs recommendedJobs={recommendedJobs} />
            </div>
        </div>
    )
}