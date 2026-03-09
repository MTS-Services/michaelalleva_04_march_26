import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, MapPin, User } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'My Trips', href: '/dashboard', icon: MapPin },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
];

interface UserLayoutProps {
    children: React.ReactNode;
    userName?: string;
}

export default function UserLayout({ children, userName = 'Sarah Johnson' }: UserLayoutProps) {
    const { url } = usePage();

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="relative h-screen border-r bg-card transition-all duration-300 ease-in-outflex flex-col">
                <nav className="flex-1 space-y-1 px-3 pt-6">
                    {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                        const isActive = href === '/dashboard' ? url === href : url.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'flex items-center gap-3 rounded-xl px-3 py-2.5 font-libre-franklin text-sm transition-all',
                                    isActive
                                        ? 'border border-primary/20 bg-primary/5 font-medium text-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                )}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-border p-4">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="font-libre-franklin flex items-center gap-2 text-xs text-destructive hover:underline"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Log Out
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
    );
}