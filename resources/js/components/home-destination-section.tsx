import { Button } from '@/components/ui/button';
import { RouteDefinition } from '@/wayfinder';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export interface DestinationCard {
    title: string;
    subtitle: string;
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
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 text-center">
                <h2 className="font-oswald text-foreground text-4xl font-bold leading-tight">
                    {heading}
                </h2>
                <p className="font-libre-franklin text-foreground text-xl sm:text-2xl">
                    {subtext}
                </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((dest) => (
                    <article
                        key={dest.title}
                        className="flex flex-col overflow-hidden rounded-2xl bg-muted"
                    >
                        <div className="relative aspect-384/379 w-full overflow-hidden">
                            <img
                                src={dest.imageSrc}
                                alt={dest.imageAlt}
                                className="size-full object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-6 p-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-oswald text-foreground text-2xl font-bold">
                                    {dest.title}
                                </h3>
                                <p className="font-libre-franklin text-foreground">
                                    {dest.subtitle}
                                </p>
                            </div>
                            <Button variant="outline" asChild className="w-fit">
                                <Link href={dest.href} className="gap-2">
                                    View Packages
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
