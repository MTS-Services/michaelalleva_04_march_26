import * as React from 'react';

import { useAppearance } from '@/hooks/use-appearance';
import { FrontendFooter } from '@/layouts/partials/frontend/footer';
import { FrontendHeader } from '@/layouts/partials/frontend/header';

interface FrontendLayoutProps {
    children: React.ReactNode;
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
    const { appearance, updateAppearance } = useAppearance();
    React.useEffect(() => {
        if (appearance !== 'light') {
            updateAppearance('light');
        }
    }, [appearance, updateAppearance]);
    return (
        <div className="flex min-h-screen flex-col">
            <FrontendHeader />
            <main className="flex-1 flex flex-col">{children}</main>
            <FrontendFooter />
        </div>
    );
}