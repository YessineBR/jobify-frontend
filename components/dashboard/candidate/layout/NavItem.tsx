// app/dashboard/candidate/components/nav-item.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface NavItemProps {
    item: {
        id: string
        icon: React.ComponentType<{ className?: string }>
        label: string
    }
    isActive: boolean
}

export function NavItem({ item, isActive }: NavItemProps) {
    const Icon = item.icon

    return (
        <Button
            variant={isActive ? "secondary" : "ghost"}
            className="flex items-center gap-2 px-4 py-2"
            asChild
        >
            <Link href={`/dashboard/candidate/${item.id}`}>
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
            </Link>
        </Button>
    )
}