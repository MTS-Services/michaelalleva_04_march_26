import { Button } from '@/components/ui/button';
import { RouteDefinition } from '@/wayfinder';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import ArticleCard from './articale-card';

export interface DestinationCard {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
}

export interface HomeDestinationSectionProps {
    heading?: string;
    subtext?: string;
    destinations: DestinationCard[];
}

const defaultHeading = 'Choose Your Destination';
const defaultSubtext =
    'Select from our carefully curated destinations, each offering unique experiences and unforgettable memories.';

export function HomeDestinationSection({
    heading = defaultHeading,
    subtext = defaultSubtext,
    destinations,
}: HomeDestinationSectionProps) {
    return (
        <section className="container mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 text-center">
                <h2 className="font-oswald text-foreground text-2xl sm:text-3xl md:text-5xl lg:text-[56px] leading-tight ">
                    {heading}
                </h2>
                <p className="font-libre-franklin text-foreground text-base sm:text-lg md:text-2xl">
                    {subtext}
                </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((dest) => (
                    <ArticleCard key={dest.title} title={dest.title} description={dest.description} imageSrc={dest.imageSrc} imageAlt={dest.imageAlt} ctaHref={dest.href} ctaLabel="View Packages" ctaVariant="link" />
                ))}
            </div>
        </section>
    );
}
