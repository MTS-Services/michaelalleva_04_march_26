import { Head, Link } from '@inertiajs/react';
import * as React from 'react';

import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { useAppearance } from '@/hooks/use-appearance';
import { AuthFooter } from '@/layouts/partials/auth/footer';
import { AuthHeader } from '@/layouts/partials/auth/header';
import { home } from '@/routes';
import { Button } from '@/components/ui/button';


interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    showHeader?: boolean; // New prop
    showFooter?: boolean; // New prop
}

export default function AuthLayout({
    children,
    title,
    description,
    showHeader = true,
    showFooter = true,
}: AuthLayoutProps) {
    const { appearance, updateAppearance } = useAppearance();
    React.useEffect(() => {
        if (appearance !== 'light') {
            updateAppearance('light');
        }
    }, [appearance, updateAppearance]);
    return (
        <div className="flex min-h-screen flex-col">
            {showHeader && <AuthHeader />}


            <div className='mt-24 md:mt-28 lg:mt-32'></div>
            <main className="flex flex-1 items-center justify-center px-4 py-15 md:px-6 lg:px-8">
                <div className="container max-w-xl bg-card p-10 rounded-md space-y-7">
                    <div className="space-y-10">
                        <div className='flex justify-center'>
                            <Button asChild>
                                <Link href={home()}>
                                    <AppLogo />
                                </Link>
                            </Button>
                        </div>
                        <div className="space-y-2 ">
                            <h1 className="text-lg md:text-xl lg:text-2xl">{title}</h1>
                            <p>{description}</p>
                        </div>
                    </div>

                    {/* Content Slot */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </div>
            </main>

            {showFooter && <AuthFooter />}
        </div>
    );
}