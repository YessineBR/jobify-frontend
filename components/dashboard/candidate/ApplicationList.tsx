import {MapPin, Clock, ArrowRight} from 'lucide-react'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {getStatusColor, getStatusIcon} from '@/utils/statusUtils'
import {useTranslations} from 'next-intl'

interface ApplicationsListProps {
    applications: any[]
}

export function ApplicationsList({applications}: ApplicationsListProps) {
    const t = useTranslations('Dashboard.Candidate.Applications')

    return (
        <Card>
            <CardContent className="p-6 space-y-4">
                {applications.map((app) => {
                    const StatusIcon = getStatusIcon(app.status)

                    return (
                        <div
                            key={app.id}
                            className="group flex items-center justify-between p-6 border rounded-lg hover:shadow-md hover:border-primary/50 transition-all"
                        >
                            <div className="flex items-center gap-6 flex-1">
                                <div
                                    className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl font-semibold text-primary">
                                    {app.company.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-foreground">{app.position}</h3>
                                        <Badge
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}
                                        >
                                            <StatusIcon className="w-3 h-3"/>
                                            <span className="capitalize">{app.status}</span>
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground mb-3">{app.company}</p>
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4"/>
                        {app.location}
                    </span>
                                        <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4"/>
                                            {t('appliedOn')} {app.appliedDate}
                    </span>
                                        <span className="text-foreground font-medium">{app.salary}</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="default"
                                className="px-6 py-3 opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity"
                            >
                                <span>{t('viewDetails')}</span>
                                <ArrowRight className="w-4 h-4"/>
                            </Button>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}