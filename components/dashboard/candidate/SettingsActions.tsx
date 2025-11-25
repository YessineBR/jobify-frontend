import {Settings, Bell, LogOut} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {useTranslations} from 'next-intl'

export function SettingsActions() {
    const t = useTranslations('Dashboard.Candidate.Profile.Actions')

    const actions = [
        {icon: Settings, label: t('accountSettings'), variant: 'ghost' as const},
        {icon: Bell, label: t('notifications'), variant: 'ghost' as const},
        {icon: LogOut, label: t('logout'), variant: 'ghost' as const, destructive: true},
    ]

    return (
        <Card className="p-5">
            <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        variant={action.variant}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left justify-start ${
                            action.destructive ? 'text-destructive hover:bg-destructive/10' : 'hover:bg-accent'
                        }`}
                    >
                        <action.icon className="w-4 h-4"/>
                        <span className="text-sm">{action.label}</span>
                    </Button>
                ))}
            </CardContent>
        </Card>
    )
}