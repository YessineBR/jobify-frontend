import {CheckCircle2} from 'lucide-react'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Progress} from '@/components/ui/progress'
import {useTranslations} from 'next-intl'

interface VisaStatusCardProps {
    visaStatus: any
}

export function VisaStatusCard({visaStatus}: VisaStatusCardProps) {
    const t = useTranslations('Dashboard.Candidate.Visa.Status')

    return (
        <Card className="bg-secondary text-primary">
            <CardContent className="px-8 py-5 md:px-10 md:py-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <Badge variant="secondary"
                               className="inline-flex items-center gap-2 px-3 py-1 bg-primary-foreground/20 backdrop-blur-sm mb-4">
                            <CheckCircle2 className="w-4 h-4"/>
                            <span className="text-sm">{t('active')}</span>
                        </Badge>
                        <h3 className="text-3xl font-bold mb-2">{t('title')}</h3>
                        <p>{t('description')}</p>
                    </div>
                    <div className="text-center md:text-right">
                        <div className="text-sm text-primary/80 mb-2">{t('expectedCompletion')}</div>
                        <div className="text-2xl font-bold mb-1">{visaStatus.expectedDate}</div>
                        <div className="text-sm text-primary/80">{t('timeline')}</div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-semibold">{visaStatus.stage}</span>
                        <span className="text-2xl font-bold">{visaStatus.progress}%</span>
                    </div>
                    <Progress
                        value={visaStatus.progress}
                        className="h-4 bg-primary/20 [&>div]:bg-primary"
                    />
                </div>
            </CardContent>
        </Card>
    )
}