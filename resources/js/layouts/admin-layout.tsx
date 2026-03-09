import { router } from '@inertiajs/react';
import * as React from 'react';

import { useAppearance } from '@/hooks/use-appearance';
import { AdminHeader } from '@/layouts/partials/admin/header';
import { AdminSidebar } from '@/layouts/partials/admin/sidebar';

import { AdminFooter } from './partials/admin/footer';


interface AdminLayoutProps {
    children: React.ReactNode;
    activeSlug?: string | null;
}

export default function AdminLayout({ children, activeSlug }: AdminLayoutProps) {
    const { appearance, updateAppearance } = useAppearance();
    React.useEffect(() => {
        if (appearance !== 'light') {
            updateAppearance('light');
        }
    }, [appearance, updateAppearance]);
    const [isCollapsed, setIsCollapsed] = React.useState(() => {
        // Persist sidebar state in localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('admin-sidebar-collapsed');
            return saved ? JSON.parse(saved) : false;
        }
        return false;
    });
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

    // Save sidebar state to localStorage
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(isCollapsed));
        }
    }, [isCollapsed]);

    // Close mobile sidebar on Inertia navigation
    React.useEffect(() => {
        const removeListener = router.on('navigate', () => {
            setIsMobileSidebarOpen(false);
        });
        return removeListener;
    }, []);

    return (
        <div className="relative flex h-full max-h-screen min-h-screen bg-card">
            <AdminSidebar
                isCollapsed={isCollapsed}
                activeSlug={activeSlug}
                isMobileOpen={isMobileSidebarOpen}
                onMobileOpenChange={setIsMobileSidebarOpen}
            />
            <div className="flex flex-1 flex-col overflow-hidden">
                <AdminHeader
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
                />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-6">
                    {children}
                </main>

                <AdminFooter />
            </div>
        </div>
    );
}
