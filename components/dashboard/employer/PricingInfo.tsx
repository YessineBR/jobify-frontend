import {CheckCircle2, Lock, CreditCard} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {useTranslations} from 'next-intl'

interface PricingInfoProps {
    visaPaid: boolean
    onPay: () => void
}

export function PricingInfo({visaPaid, onPay}: PricingInfoProps) {
    const t = useTranslations('Dashboard.Candidate.Visa.Pricing')

    return (
        <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="text-primary-foreground/80 text-sm mb-2">{t('totalPackage')}</div>
                        <div className="text-5xl font-bold mb-2">€999</div>
                        <div className="text-primary-foreground/80">{t('includes')}</div>
                    </div>
                    <div
                        className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        {visaPaid ? (
                            <CheckCircle2 className="w-6 h-6"/>
                        ) : (
                            <Lock className="w-6 h-6"/>
                        )}
                    </div>
                </div>
                <div className="pt-4 border-t border-primary-foreground/20">
                    {visaPaid ? (
                        <div className="text-sm text-primary-foreground/80">{t('completed')}</div>
                    ) : (
                        <Button
                            onClick={onPay}
                            variant="secondary"
                            className="w-full py-3 flex items-center justify-center gap-2"
                        >
                            <CreditCard className="w-5 h-5"/>
                            <span>{t('payNow')}</span>
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}