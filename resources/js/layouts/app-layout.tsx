import * as React from 'react';

import { useAppearance } from '@/hooks/use-appearance';
import { UserFooter } from '@/layouts/partials/user/footer';
import { UserHeader } from '@/layouts/partials/user/header';
import { UserSidebar } from '@/layouts/partials/user/sidebar';

interface AppLayoutProps {
    children: React.ReactNode;
    activeSlug?: string;
}

export default function AppLayout({ children, activeSlug }: AppLayoutProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const { appearance, updateAppearance } = useAppearance();
    React.useEffect(() => {
        if (appearance !== 'light') {
            updateAppearance('light');
        }
    }, [appearance, updateAppearance]);
    return (
        <div className="relative flex h-full max-h-screen min-h-screen bg-background">
            <UserSidebar isCollapsed={isCollapsed} activeSlug={activeSlug} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <UserHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-6">{children}</main>
            </div>
        </div>
    );
}