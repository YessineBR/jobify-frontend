import {MapPin} from 'lucide-react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {useTranslations} from 'next-intl'

interface RecommendedJobsProps {
    recommendedJobs: any[]
}

export function RecommendedJobs({recommendedJobs}: RecommendedJobsProps) {
    const t = useTranslations('Dashboard.Candidate.Overview.RecommendedJobs')

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-0">
                <div>
                    <CardTitle className="text-lg mb-1">{t('title')}</CardTitle>
                    <p className="text-xs text-muted-foreground">{t('description')}</p>
                </div>
                <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm">
                    {t('more')}
                </Button>
            </CardHeader>
            <CardContent className="p-6 pt-6 space-y-3">
                {recommendedJobs.map((job) => (
                    <div
                        key={job.id}
                        className="group p-4 border rounded-lg hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                                <h4 className="text-foreground text-sm font-medium mb-1 truncate">{job.position}</h4>
                                <p className="text-muted-foreground text-xs mb-2 truncate">{job.company}</p>
                            </div>
                            <Badge className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs flex-shrink-0">
                                {job.match}%
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground truncate">
                <MapPin className="w-3 h-3 flex-shrink-0"/>
                <span className="truncate">{job.location}</span>
              </span>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                            <Button variant="secondary" className="w-full py-2 text-xs">
                                {t('quickApply')}
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}