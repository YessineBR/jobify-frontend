import {Calendar, Clock, Video, User} from 'lucide-react'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {getStatusColor, getStatusIcon} from '@/utils/statusUtils'
import {useTranslations} from 'next-intl'

interface InterviewsListProps {
    interviews: any[]
}

export function InterviewsList({interviews}: InterviewsListProps) {
    const t = useTranslations('Dashboard.Candidate.Calendar')

    return (
        <div className="grid gap-6">
            {interviews.map((interview) => {
                const StatusIcon = getStatusIcon(interview.status)

                return (
                    <Card key={interview.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-6 flex-1">
                                    <div
                                        className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-primary text-2xl font-semibold flex-shrink-0">
                                        {interview.company.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-foreground">{interview.position}</h3>
                                            <Badge
                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(interview.status)}`}
                                            >
                                                <StatusIcon className="w-3 h-3"/>
                                                <span className="capitalize">{interview.status}</span>
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground mb-4">{interview.company}</p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2 text-foreground">
                                                <Calendar className="w-4 h-4 text-primary"/>
                                                <span className="text-sm">{interview.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-foreground">
                                                <Clock className="w-4 h-4 text-primary"/>
                                                <span className="text-sm">{interview.time} ({interview.duration})</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-foreground">
                                                <Video className="w-4 h-4 text-primary"/>
                                                <span className="text-sm">{interview.type}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-foreground">
                                                <User className="w-4 h-4 text-primary"/>
                                                <span className="text-sm">{interview.interviewer}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button className="flex items-center justify-center gap-2">
                                        <Video className="w-4 h-4"/>
                                        <span>{t('join')}</span>
                                    </Button>
                                    <Button variant="outline" className="flex items-center justify-center gap-2">
                                        <Calendar className="w-4 h-4"/>
                                        <span>{t('details')}</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}