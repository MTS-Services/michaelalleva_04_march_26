import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import FrontendLayout from '@/layouts/frontend-layout';
import { contact, destination } from '@/routes';
import { Banner } from '@/components/banner';
import PackageCard from '@/components/package-card';

interface PackageCardProps {
    title?: string;
    price?: string;
    includes?: string[];
    badge?: string;
    href?: string;
}
const BannerConfig = {
    tagline:
        "Choose the perfect duration for your adventure",
    badgeLabel: 'Packages',
    imageSrc: '/images/egyptcity.jpg',
    imageAlt: 'Travel destination hero',
    backCtaIcon: ArrowLeft,
    backCtaHref: destination().url,
}


const packages: PackageCardProps[] = [
    {
        badge: '5 Nights',
        price: '$7,000',
        includes: [
            'Luxury accommodation',
            'Guided tours',
            'Domestic flights',
            'All entrance fees',
        ],
        href: '#',
    },
    {
        badge: '5 Nights',
        price: '$9,000',
        includes: [
            'Premium accommodation',
            'Private guide',
            'Domestic flights',
            'Exclusive experiences',
        ],
        href: '#',
    },
    {
        badge: '1 Week',
        price: '$12,500',
        includes: [
            'Deluxe accommodation',
            'Full-board option',
            'All transfers',
            'Nile cruise option',
        ],
        href: '#',
    },
    {
        badge: '2 Weeks',
        price: '$15,000',
        includes: [
            'Extended itinerary',
            'Multiple destinations',
            'All inclusions',
            'Dedicated concierge',
        ],
        href: '#',
    },
];

export default function Packages({ destination }: { destination: string }) {
    return (
        <FrontendLayout>
            <Banner title={`${destination.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')} Packages`} tagline={BannerConfig.tagline} badgeLabel={BannerConfig.badgeLabel} imageSrc={BannerConfig.imageSrc} imageAlt={BannerConfig.imageAlt} backCtaIcon={BannerConfig.backCtaIcon} backCtaHref={BannerConfig.backCtaHref} />

            <section className="mx-auto max-w-7xl px-4 py-15 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <PackageCard key={index} badge={pkg.badge}
                            priceUnit="/Per person" includesTitle={'Trip Includes:'} price={pkg.price} features={pkg.includes} href={pkg.href || '#'} />
                    ))}
                </div>
            </section>
        </FrontendLayout>
    );
}
