import {NavItem} from "@/components/dashboard/candidate/layout/NavItem";
import React from "react";

interface NavigationProps {
    items: Array<{
        id: string
        icon: React.ComponentType<{ className?: string }>
        label: string
    }>
    activeTab: string
}

export function Navigation({items, activeTab}: NavigationProps) {
    return (
        <nav className="hidden lg:flex items-center gap-1">
            {items.map((item) => (
                <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeTab === item.id}
                />
            ))}
        </nav>
    )
}