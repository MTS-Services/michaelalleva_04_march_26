import * as React from 'react';
import { usePage } from '@inertiajs/react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';


interface AdminHeaderProps {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenMobileSidebar?: () => void;
}

export function AdminHeader({ isCollapsed, setIsCollapsed, onOpenMobileSidebar }: AdminHeaderProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const isMobile = useIsMobile();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    const showMobileMenu = mounted && isMobile;

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-all ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <Button
                variant="outline"
                size="icon"
                onClick={() =>
                    showMobileMenu ? onOpenMobileSidebar?.() : setIsCollapsed(!isCollapsed)
                }
                aria-label={showMobileMenu ? 'Open menu' : 'Toggle sidebar'}
            >
                {showMobileMenu ? (
                    <ChevronsRight className="h-4 w-4" />
                ) : (
                    isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />
                )}
            </Button>

            <div className="ml-auto flex items-center space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="size-10 rounded-full p-1"
                        >
                            <Avatar className="size-8 overflow-hidden rounded-full">
                                <AvatarImage
                                    src={auth.user.avatar}
                                    alt={auth.user.name}
                                />
                                <AvatarFallback className="rounded-lg bg-primary text-white text-lg font-semibold ">
                                    {getInitials(auth.user.name)}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* <Link href={dashboard()}>
                    <Button className="relative size-12 rounded-full cursor-pointer">
                        <Avatar>
                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                            <AvatarFallback className="bg-primary text-white">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </Link> */}
            </div>

        </header>
    );
}
