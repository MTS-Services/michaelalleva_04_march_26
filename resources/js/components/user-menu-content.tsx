import { Link, router } from '@inertiajs/react';
import { LayoutDashboard, LogOut, Settings } from 'lucide-react';

import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { edit } from '@/routes/profile';
import { dashboard as userDashboard } from '@/routes/user';
import { type User } from '@/types';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const dashboardLink = user.is_admin ? adminDashboard() : userDashboard();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        href={dashboardLink}
                        prefetch
                        onClick={cleanup}
                    >
                        <span className='bg-primary text-white rounded p-1 inline-flex items-center justify-center mr-2'>
                            <LayoutDashboard className="size-4 text-white" />
                        </span>
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <span className='bg-primary text-white rounded p-1 inline-flex items-center justify-center mr-2'>
                            <Settings className="size-4 text-white" />
                        </span>
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full cursor-pointer"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <span className='bg-primary text-white rounded p-1 inline-flex items-center justify-center mr-2'>
                        <LogOut className="size-4 text-white" />
                    </span>
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
