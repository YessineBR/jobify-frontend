// app/dashboard/candidate/applications/page.tsx
'use client'

import {ApplicationsList} from '@/components/dashboard/candidate/ApplicationList'
import {Button} from '@/components/ui/button'
import {Download, Plus} from 'lucide-react'
import {useTranslations} from 'next-intl'

const applications = [
    {
        id: 1,
        company: "Siemens AG",
        position: "Senior Software Engineer",
        location: "Munich, Germany",
        appliedDate: "2024-11-15",
        status: "interview",
        salary: "€75,000 - €95,000",
    },
    {
        id: 2,
        company: "SAP SE",
        position: "Product Manager",
        location: "Berlin, Germany",
        appliedDate: "2024-11-18",
        status: "pending",
        salary: "€80,000 - €100,000",
    },
    {
        id: 3,
        company: "BMW Group",
        position: "Data Scientist",
        location: "Stuttgart, Germany",
        appliedDate: "2024-11-10",
        status: "rejected",
        salary: "€70,000 - €85,000",
    },
]

export default function ApplicationsPage() {
    const t = useTranslations('Dashboard.Candidate.Applications')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-2">{t('title')}</h2>
                    <p>{t('description')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4"/>
                        <span className="hidden sm:inline">{t('export')}</span>
                    </Button>
                    <Button className="flex items-center gap-2 shadow-lg">
                        <Plus className="w-4 h-4"/>
                        <span className="hidden sm:inline">{t('newApplication')}</span>
                    </Button>
                </div>
            </div>
            <ApplicationsList applications={applications}/>
        </div>
    )
}