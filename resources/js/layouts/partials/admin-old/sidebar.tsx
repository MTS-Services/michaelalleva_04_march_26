import { Link, usePage } from '@inertiajs/react';
import { Users, User, BarChart, Shield, LayoutGrid, Settings, XIcon } from 'lucide-react';
import * as React from 'react';

import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/components/ui/nav-item';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { type NavItem as NavItemType, type SharedData } from '@/types';
import { dashboard } from '@/routes/admin';
// Navigation configuration
const adminNavItems: NavItemType[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
        slug: 'dashboard',
    },
    {
        title: 'User Management',
        href: '#',
        icon: Users,
        badge: 42,
        children: [
            {
                title: 'Admins',
                href: '#',
                icon: Shield,
                permission: 'manage admins',
                children: [
                    { title: 'All Admins', href: '#' },
                    { title: 'Active', href: '#' },
                    {
                        title: 'Inactive',
                        href: '#',
                        children: [
                            { title: 'Recently Inactive', href: '#' },
                            { title: 'Long Inactive', href: '#' },
                            {
                                title: 'Archive',
                                href: '#',
                                children: [
                                    { title: 'Over 1 year', href: '#' },
                                    { title: 'Over 2 years', href: '#' },
                                ]
                            }
                        ]
                    },
                ],
            },
            {
                title: 'Users',
                href: '#',
                icon: User,
                children: [
                    {
                        title: 'All',
                        href: route('admin.users.index'),
                        icon: User,
                        slug: 'admin-users'
                    },
                    { title: 'Active', href: '#' },
                    { title: 'Premium', href: '#', badge: 15 },
                ],
            },
        ],
    },
    {
        title: 'Analytics',
        href: '#',
        icon: BarChart,
        permission: 'view analytics',
    },
    {
        title: 'Settings',
        href: '#',
        icon: Settings,
        badge: 3,
    },
    {
        title: 'Disabled Item',
        href: '#',
        icon: Shield,
        disabled: true,
    },
];

interface AdminSidebarContentProps {
    isCollapsed: boolean;
    currentRoute: string;
    userPermissions: string[];
    activeSlug?: string | null;
    showCloseButton?: boolean;
}

function AdminSidebarContent({
    isCollapsed,
    currentRoute,
    userPermissions,
    activeSlug,
    showCloseButton = false,
}: AdminSidebarContentProps) {
    return (
        <>
            {/* Logo Section */}
            <div className={cn(
                "flex h-16 items-center border-b",
                isCollapsed ? "justify-center px-2" : "px-6"
            )}>
                <Link
                    href={dashboard()}
                    className="flex items-center gap-2 transition-opacity hover:opacity-80 w-full"
                >
                    {isCollapsed ? (
                        <LayoutGrid className="h-6 w-6 text-primary" />
                    ) : (
                        <div className="flex items-center justify-between gap-2 w-full">
                            <AppLogo />
                            {showCloseButton && (
                                <SheetClose asChild>
                                    <Button variant="ghost" size="icon" aria-label="Close menu">
                                        <XIcon className="size-5" />
                                    </Button>
                                </SheetClose>
                            )}
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
                <nav className="space-y-1">
                    {adminNavItems.map((item, index) => (
                        <NavItem
                            key={`${item.title}-${index}`}
                            item={item}
                            isCollapsed={isCollapsed}
                            currentRoute={currentRoute}
                            isActive={activeSlug === item.slug}
                            permissions={userPermissions}
                        />
                    ))}
                </nav>
            </div>

            {/* Footer Section (Optional) */}
            {!isCollapsed && (
                <div className="border-t p-4">
                    <div className="text-xs text-muted-foreground text-center">
                        v1.0.0
                    </div>
                </div>
            )}
        </>
    );
}

interface AdminSidebarProps {
    isCollapsed: boolean;
    activeSlug?: string | null;
    isMobileOpen?: boolean;
    onMobileOpenChange?: (open: boolean) => void;
}

export const AdminSidebar = React.memo<AdminSidebarProps>(({
    isCollapsed,
    activeSlug,
    isMobileOpen = false,
    onMobileOpenChange,
}) => {
    const [mounted, setMounted] = React.useState(false);
    const isMobile = useIsMobile();

    React.useEffect(() => setMounted(true), []);

    // Use mobile (Sheet) only after mount to avoid SSR/hydration mismatch with useIsMobile
    const effectiveIsMobile = mounted && isMobile;

    const { url, props } = usePage();
    const currentRoute = url;

    // Extract permissions from auth props
    const userPermissions = React.useMemo(() => {
        const auth = props.auth as SharedData['auth'];
        return auth?.user?.permissions ||
            auth?.user?.all_permissions ||
            auth?.permissions ||
            [];
    }, [props.auth]);

    const sidebarContent = (
        <AdminSidebarContent
            isCollapsed={effectiveIsMobile ? false : isCollapsed}
            currentRoute={currentRoute}
            userPermissions={userPermissions}
            activeSlug={activeSlug}
            showCloseButton={effectiveIsMobile}
        />
    );

    if (effectiveIsMobile) {
        return (
            <Sheet open={isMobileOpen} onOpenChange={onMobileOpenChange}>
                <SheetContent
                    side="left"
                    className="flex w-64 flex-col p-0 [&>button]:hidden"
                    showCloseButton={false}
                >
                    <div className="flex h-full flex-col">
                        {sidebarContent}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <aside
            className={cn(
                'relative hidden h-screen border-r bg-card',
                'transition-all duration-300 ease-in-out',
                'md:flex flex-col',
                isCollapsed ? 'w-16' : 'w-64'
            )}
        >
            {sidebarContent}
        </aside>
    );
});

AdminSidebar.displayName = 'AdminSidebar';