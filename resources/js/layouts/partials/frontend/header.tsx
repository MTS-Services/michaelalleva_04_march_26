import { Link, usePage } from '@inertiajs/react';
import { Menu, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import AppLogo from '@/components/app-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useActiveUrl } from '@/hooks/use-active-url';
import { useInitials } from '@/hooks/use-initials';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { aboutUs, contact, destination, login, register } from '@/routes';
import { home } from '@/routes';
import { type SharedData } from '@/types';

const NavItems = [
    {
        name: 'Home',
        href: home(),
    },
    {
        name: 'Destination',
        href: destination(),
    },
    {
        name: 'About Us',
        href: aboutUs(),
    },
    {
        name: 'Contact',
        href: contact(),
    },
];

export function FrontendHeader() {
    const { auth, features } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const { urlIsActive } = useActiveUrl();
    const isMobile = useIsMobile();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [topOffset, setTopOffset] = useState(13);

    useEffect(() => {
        const handleScroll = () => {
            if (isMobile) {
                if (window.scrollY > 10) {
                    setTopOffset(1);
                } else {
                    setTopOffset(8);
                }
            } else {
                if (window.scrollY > 10) {
                    setTopOffset(3);
                } else {
                    setTopOffset(13);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className="fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4"
            style={{ top: `${topOffset * 0.25}rem` }}
        >
            <div className='container mx-auto flex items-center justify-between p-3 md:p-4 bg-card rounded-lg shadow-sm'>
                <Button asChild>
                    <Link href="/">
                        <AppLogo />
                    </Link>
                </Button>

                <nav className={cn("items-center gap-6 md:flex justify-center", isMobile ? 'hidden' : 'flex')}>
                    {NavItems.map((item) => (
                        <Link key={item.name} href={item.href} className={cn(
                            "hover:text-primary/90 transition-colors duration-200",
                            urlIsActive(item.href) && 'text-primary'
                        )}>
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className={cn("flex items-center gap-3", isMobile ? 'hidden' : 'flex')}>
                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="relative size-12 rounded-full">
                                    <Avatar className="">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="bg-primary text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-52" align="end" sideOffset={5}>
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-3">
                            {features.canRegister &&
                                <Button variant="outline" asChild>
                                    <Link href={register()}>
                                        Sign Up
                                    </Link>
                                </Button>
                            }
                            <Button asChild>
                                <Link href={login()}>
                                    Login
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} >
                    <SheetTrigger asChild>
                        <Button variant="ghost" className={cn("transition-all duration-200", !isMobile && 'hidden')}>
                            <Menu className="size-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" showCloseButton={false} className="flex w-full flex-col p-0 sm:max-w-sm">
                        <SheetHeader className="flex-row items-center justify-between border-b p-6 space-y-0">
                            <Button asChild>
                                <Link href="/">
                                    <AppLogo />
                                </Link>
                            </Button>
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <XIcon className="size-5" />
                                </Button>
                            </SheetClose>
                        </SheetHeader>

                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div className="flex flex-col gap-2 space-y-2">
                                {NavItems.map((item) => (
                                    <Link key={item.name} href={item.href} className={cn(
                                        "hover:text-primary/90 transition-colors duration-200 text-lg font-medium",
                                        urlIsActive(item.href) && 'text-primary'
                                    )}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="space-y-3">
                                {!auth.user ? (
                                    <div className="flex flex-col gap-2 space-y-2">
                                        {features.canRegister &&
                                            <Button variant="outline" asChild>
                                                <Link href={register()}>
                                                    Sign Up
                                                </Link>
                                            </Button>
                                        }
                                        <Button asChild>
                                            <Link href={login()}>
                                                Login
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <Link href={route('admin.dashboard')} className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full bg-violet-600 py-6">Dashboard</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>



            {/* <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="transition-transform active:scale-95">
                        <AppLogo />
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <AppearanceToggleDropdown />

                    <div className="hidden h-6 w-[1px] bg-border md:block" />

                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-ring">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="bg-violet-600 text-white text-xs">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden items-center gap-2 md:flex">
                            <Link href={login()}>
                                <Button variant="ghost" size="sm" className="text-sm font-medium">Log in</Button>
                            </Link>
                            <Link href={register()}>
                                <Button size="sm" className="bg-violet-600 text-white shadow-sm hover:bg-violet-700">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}

                   
                </div>
            </div> */}
        </header >
    );
}