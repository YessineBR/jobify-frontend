// components/dashboard/candidate/user-menu.tsx
import {Bell, LogOut} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Avatar, AvatarFallback} from '@/components/ui/avatar'
import {Separator} from '@/components/ui/separator'
import {Badge} from '@/components/ui/badge'
import {useTranslations} from 'next-intl'

interface UserMenuProps {
    mobile?: boolean
}

export function UserMenu({mobile = false}: UserMenuProps) {
    const t = useTranslations('Dashboard.Candidate')

    if (mobile) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {t('user.initials')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <div className="text-sm font-medium text-foreground">{t('user.name')}</div>
                        <div className="text-xs text-muted-foreground">{t('user.role')}</div>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    // onClick={onLogout}
                >
                    <LogOut className="w-4 h-4"/>
                    {t('logout')}
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5"/>
                <Badge
                    className="absolute -top-1 -right-1 w-3 h-3 p-0 flex items-center justify-center"
                    variant="destructive"
                >
                    <span className="sr-only">Notifications</span>
                </Badge>
            </Button>
            <Separator orientation="vertical" className="h-8"/>
            <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium text-foreground">{t('user.name')}</div>
                    <div className="text-xs text-muted-foreground">{t('user.role')}</div>
                </div>
                <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        {t('user.initials')}
                    </AvatarFallback>
                </Avatar>
                <Button
                    variant="ghost"
                    size="icon"
                    title={t('logout')}
                    // onClick={onLogout}
                >
                    <LogOut className="w-5 h-5"/>
                </Button>
            </div>
        </div>
    )
}