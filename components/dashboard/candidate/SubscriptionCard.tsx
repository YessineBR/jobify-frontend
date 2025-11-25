import {Star} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Card, CardContent} from '@/components/ui/card'
import {useTranslations} from 'next-intl'

export function SubscriptionCard() {
    const t = useTranslations('Dashboard.Candidate.Profile.Subscription')

    return (
        <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6"/>
                    </div>
                    <Badge variant="secondary"
                           className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground">
                        {t('active')}
                    </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('plan')}</h3>
                <div className="text-primary-foreground/80 text-sm mb-4">
                    {t('details')}
                </div>
                <Button variant="secondary" className="w-full py-3">
                    {t('upgrade')}
                </Button>
            </CardContent>
        </Card>
    )
}