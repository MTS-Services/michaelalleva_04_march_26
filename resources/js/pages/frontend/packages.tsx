import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import FrontendLayout from '@/layouts/frontend-layout';
import { contact, destination } from '@/routes';

interface PackageCard {
    title: string;
    price: string;
    includes: string[];
}

const Banner = {
    title: 'Unforgettable Memories Await',
    tagline:
        "Handpicked travel experiences to the world's most breathtaking and captivating destinations.",
    badgeLabel: 'DISCOVER THE UNKNOWN',
    ctaLabel: 'Explore Destinations',
    ctaHref: destination().url,
    imageSrc: '/images/hero-banner.png',
    imageAlt: 'Travel destination hero'
}

const packages: PackageCard[] = [
    {
        title: '5 Nights',
        price: '$7,000',
        includes: [
            'Luxury accommodation',
            'Guided tours',
            'Domestic flights',
            'All entrance fees',
        ],
    },
    {
        title: '5 Nights',
        price: '$9,000',
        includes: [
            'Premium accommodation',
            'Private guide',
            'Domestic flights',
            'Exclusive experiences',
        ],
    },
    {
        title: '1 Week',
        price: '$12,500',
        includes: [
            'Deluxe accommodation',
            'Full-board option',
            'All transfers',
            'Nile cruise option',
        ],
    },
    {
        title: '2 Weeks',
        price: '$15,000',
        includes: [
            'Extended itinerary',
            'Multiple destinations',
            'All inclusions',
            'Dedicated concierge',
        ],
    },
];

export default function Packages({ destination }: { destination: string }) {
    return (
        <FrontendLayout>
            <section className="relative flex min-h-[280px] w-full flex-col items-center justify-center bg-muted px-4 py-15 md:min-h-[320px]">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-foreground text-xl sm:text-2xl md:text-[40px]">
                        {destination} Packages
                    </h1>
                    <p className="text-foreground mt-4 text-lg sm:text-xl md:text-2xl">
                        Choose the perfect duration for your adventure.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-15 md:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {packages.map((pkg) => (
                        <article
                            key={`${pkg.title}-${pkg.price}`}
                            className="flex flex-col rounded-2xl bg-muted p-6"
                        >
                            <h3 className="text-foreground text-xl sm:text-2xl md:text-[40px]">
                                {pkg.title}
                            </h3>
                            <p className="text-foreground mt-2 text-xl sm:text-2xl md:text-[40px]">
                                {pkg.price}
                            </p>
                            <div className="mt-4 flex flex-1 flex-col gap-2">
                                <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl mb-4">
                                    Package includes
                                </p>
                                <ul className="text-foreground list-inside list-disc space-y-1 text-lg sm:text-xl md:text-2xl">
                                    {pkg.includes.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <Button variant="outline" asChild className="mt-6 w-fit">
                                <Link href={contact()} className="gap-2">
                                    Inquire
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </article>
                    ))}
                </div>
            </section>
        </FrontendLayout>
    );
}
