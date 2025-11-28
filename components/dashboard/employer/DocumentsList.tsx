import {Plus, Send, FileText} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Card, CardContent} from '@/components/ui/card'
import {getStatusColor, getStatusIcon} from '@/utils/statusUtils'
import {useTranslations} from 'next-intl'

interface DocumentsListProps {
    documents: any[]
    disabled: boolean
}

export function DocumentsList({documents, disabled}: DocumentsListProps) {
    const t = useTranslations('Dashboard.Candidate.Visa.Documents')

    return (
        <Card className={disabled ? 'opacity-30 pointer-events-none' : ''}>
            <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">{t('title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('description')}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Plus className="w-5 h-5"/>
                    </Button>
                </div>
                <div className="space-y-3">
                    {documents.map((doc, index) => {
                        const StatusIcon = getStatusIcon(doc.status)

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            doc.status === 'approved' ? 'bg-green-50' : 'bg-yellow-50'
                                        }`}
                                    >
                                        <FileText
                                            className={`w-5 h-5 ${
                                                doc.status === 'approved' ? 'text-green-600' : 'text-yellow-600'
                                            }`}
                                        />
                                    </div>
                                    <span className="text-foreground font-medium">{doc.name}</span>
                                </div>
                                <Badge
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}
                                >
                                    <StatusIcon className="w-3 h-3"/>
                                    <span className="capitalize">{doc.status}</span>
                                </Badge>
                            </div>
                        )
                    })}
                </div>
                <Button className="w-full mt-6 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4"/>
                    {t('upload')}
                </Button>
            </CardContent>
        </Card>
    )
}