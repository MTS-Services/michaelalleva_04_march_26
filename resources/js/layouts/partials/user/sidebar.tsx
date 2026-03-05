import { Link } from '@inertiajs/react';
import { Settings, LayoutGrid, LayoutDashboard } from 'lucide-react';
import * as React from 'react';

import AppLogo from '@/components/app-logo';
import { cn } from '@/lib/utils';
import { type NavItem as NavItemType } from '@/types';

const mainNavItems: NavItemType[] = [
    {
        title: 'Dashboard',
        href: route('user.dashboard'),
        icon: LayoutDashboard,
    },
    {
        title: 'Settings',
        href: route('profile.edit'),
        icon: Settings,
    },
];

interface UserSidebarProps {
    isCollapsed: boolean;
}

export function UserSidebar({ isCollapsed }: UserSidebarProps) {
    return (
        <div
            className={cn(
                'relative hidden h-screen border-r bg-background transition-all duration-300 md:flex flex-col',
                isCollapsed ? 'w-20' : 'w-64'
            )}
        >
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/">
                    {isCollapsed ? <LayoutDashboard className="h-6 w-6" /> : <AppLogo />}
                </Link>
            </div>
            <nav className="flex-1 space-y-2 p-4">
                {mainNavItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-all hover:text-primary',
                            isCollapsed && 'justify-center'
                        )}
                    >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span className={cn('text-sm', isCollapsed && 'hidden')}>{item.title}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
