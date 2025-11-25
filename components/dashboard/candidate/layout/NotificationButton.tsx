import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function NotificationButton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative"
        >
            <Bell className="w-5 h-5" />
            <Badge
                className="absolute -top-1 -right-1 w-3 h-3 p-0 flex items-center justify-center"
                variant="destructive"
            >
                <span className="sr-only">Notifications</span>
            </Badge>
        </Button>
    )
}