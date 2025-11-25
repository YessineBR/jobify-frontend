import {Lock, CreditCard} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {useTranslations} from 'next-intl'

interface PaymentOverlayProps {
    onPay: () => void
}

export function PaymentOverlay({onPay}: PaymentOverlayProps) {
    const t = useTranslations('Dashboard.Candidate.Visa.Payment')

    return (
        <div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
            <div className="text-center px-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-destructive"/>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">{t('locked')}</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                    {t('description')}
                </p>
                <Button
                    onClick={onPay}
                    size="lg"
                    className="inline-flex items-center gap-2"
                >
                    <CreditCard className="w-5 h-5"/>
                    <span>{t('payNow')}</span>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                    {t('secure')}
                </p>
            </div>
        </div>
    )
}