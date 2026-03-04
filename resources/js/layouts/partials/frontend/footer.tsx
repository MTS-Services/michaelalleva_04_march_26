import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const SocialLinks = [
    {
        name: 'Facebook',
        icon: Facebook,
        href: 'https://www.facebook.com/'
    },
    {
        name: 'Instagram',
        icon: Instagram,
        href: 'https://www.instagram.com'
    },
    {
        name: 'Twitter',
        icon: Twitter,
        href: 'https://x.com/'
    }
]

const Destinations = [
    {
        name: 'Egypt',
        href: '#'
    },

    {
        name: 'Costa Rica',
        href: '#'
    },
    {
        name: 'Norway',
        href: '#'
    }
]

const Company = [
    {
        name: 'About Us',
        href: '#'
    },

    {
        name: 'Terms of Service',
        href: '#'
    },
    {
        name: 'Privacy Policy',
        href: '#'
    }
]
export function FrontendFooter() {
    return (
        <footer className="bg-foreground">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 px-3 md:px-4 py-10 space-y-10">
                <div className='space-y-5'>
                    <Button asChild className="w-fit">
                        <Link href="/" className='pr-10'>
                            <AppLogo />
                        </Link>
                    </Button>
                    <p className='text-muted-foreground w-full md:max-w-3/5'>
                        Expertly creating unforgettable journeys since 2009. As a trusted travel partner for USA clients, we specialize in premium 5-night to 2-week excursions to Egypt, Norway, and Costa Rica. Book your next adventure at least 14 days in advance and experience the world with a team that prioritizes your safety, comfort, and discovery.
                    </p>
                    <div className='flex items-center gap-2'>
                        {SocialLinks.map((link) => (
                            <a href={link.href} target='_blank'>
                                <Button key={link.name} size="icon" className='bg-card-foreground text-white cursor-pointer p-2 hover:bg-card-foreground/80 transition-all duration-200'>
                                    <link.icon className="w-4 h-4" />
                                </Button>
                            </a>
                        ))}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div className='space-y-5'>
                        <h5 className='text-white font-normal!'>Destinations</h5>
                        <ul className='space-y-2'>
                            {Destinations.map((destination) => (
                                <li key={destination.name}>
                                    <Link href={destination.href} className='text-muted-foreground text-sm! hover:text-white transition-all duration-200'>{destination.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='space-y-5'>
                        <h5 className='text-white font-normal!'>Company</h5>
                        <ul className='space-y-2'>
                            {Company.map((company) => (
                                <li key={company.name}>
                                    <Link href={company.href} className='text-muted-foreground text-sm! hover:text-white transition-all duration-200'>{company.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}