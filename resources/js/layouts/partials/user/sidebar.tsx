import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, CalendarCheck, MapPinPlus, PencilLine, XIcon, LogOut, MapPin } from 'lucide-react';
import * as React from 'react';

import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/components/ui/nav-item';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { type NavItem as NavItemType, type SharedData } from '@/types';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useInitials } from '@/hooks/use-initials';
import { home, logout } from '@/routes';
import { index as tripsIndex } from '@/routes/user/trips';
import { index as profileIndex } from '@/routes/user/profile';
// Navigation configuration
const userNavItems: NavItemType[] = [
    {
        title: 'My Trips',
        href: tripsIndex(),
        icon: MapPin,
        slug: 'user-trips',
    },
    {
        title: 'Profile',
        href: profileIndex(),
        icon: PencilLine,
        slug: 'user-profile',
    },
];

interface UserSidebarContentProps {
    isCollapsed: boolean;
    currentRoute: string;
    userPermissions: string[];
    activeSlug?: string | null;
    showCloseButton?: boolean;
}

function UserSidebarContent({
    isCollapsed,
    currentRoute,
    userPermissions,
    activeSlug,
    showCloseButton = false,
}: UserSidebarContentProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    return (
        <>
            {/* Logo Section */}
            {/* <div className={cn(
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
                            <Button asChild>
                                <Link href={home()}>
                                    <AppLogo />
                                </Link>
                            </Button>
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
            </div> */}

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
                <nav className="space-y-1">
                    {userNavItems.map((item, index) => (
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
                <div className="border-t border-foreground p-4">
                    <Link href={profileIndex()} className="flex items-center gap-3">
                        <Button className="relative size-12 rounded-full cursor-pointer">
                            <Avatar>
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback className="bg-primary text-white flex items-center justify-center w-full">
                                    {getInitials(auth.user.name)}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                        <div className="min-w-0 flex-1">
                            <p className="font-libre-franklin truncate text-sm font-semibold text-foreground">
                                {auth.user.name}
                            </p>
                            <p className="font-libre-franklin truncate text-xs text-muted-foreground">
                                {auth.user.email}
                            </p>
                        </div>
                    </Link>
                    <Button
                        variant="ghost"
                        className="mt-3 w-full cursor-pointer text-destructive justify-start"
                        asChild
                    >
                        <Link href={logout()}>
                            <LogOut className="size-6" />
                            Log Out
                        </Link>
                    </Button>
                </div>
            )}
        </>
    );
}


interface UserSidebarProps {
    isCollapsed: boolean;
    activeSlug?: string | null;
    isMobileOpen?: boolean;
    onMobileOpenChange?: (open: boolean) => void;
}

export const UserSidebar = React.memo<UserSidebarProps>(({
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
        <UserSidebarContent
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

UserSidebar.displayName = 'UserSidebar';