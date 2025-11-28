import {MapPin, ArrowRight, Filter} from 'lucide-react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {getStatusColor, getStatusIcon} from '@/utils/statusUtils'
import {useTranslations} from 'next-intl'

interface RecentApplicationsProps {
    applications: any[]
}

export function RecentApplications({applications}: RecentApplicationsProps) {
    const t = useTranslations('Dashboard.Candidate.Overview.RecentApplications')

    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between p-6 md:p-8 pb-0 md:pb-0">
                <div>
                    <CardTitle className="text-xl mb-1">{t('title')}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t('description')}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Filter className="w-4 h-4"/>
                    </Button>
                    <Button variant="ghost" className="text-primary hover:bg-primary/10">
                        {t('viewAll')}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 pt-6 space-y-3">
                {applications.map((app) => {
                    const StatusIcon = getStatusIcon(app.status)

                    return (
                        <div
                            key={app.id}
                            className="group flex items-center justify-between p-5 border rounded-lg hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div
                                    className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-muted-foreground font-semibold">
                                    {app.company.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-foreground truncate font-medium">{app.position}</h4>
                                        <Badge
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(app.status)}`}
                                        >
                                            <StatusIcon className="w-3 h-3"/>
                                            <span className="capitalize">{app.status}</span>
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-2">{app.company}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3"/>
                        {app.location}
                    </span>
                                        <span className="text-foreground font-medium">{app.salary}</span>
                                    </div>
                                </div>
                            </div>
                            <ArrowRight
                                className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"/>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}