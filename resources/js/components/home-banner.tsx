import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { destination } from '@/routes';

export interface HomeBannerProps {
    title?: string;
    tagline?: string;
    badgeLabel?: string;
    ctaLabel?: string;
    ctaHref?: string;
    imageSrc?: string;
    imageAlt?: string;
}

const defaultTitle = 'Unforgettable Memories Await';
const defaultTagline =
    "Handpicked travel experiences to the world's most breathtaking and captivating destinations.";
const defaultBadgeLabel = 'DISCOVER THE UNKNOWN';
const defaultCtaLabel = 'Explore Destinations';
const defaultCtaHref = destination().url;
const defaultImageSrc = '/images/hero-banner.png';
const defaultImageAlt = 'Travel destination hero';

export function HomeBanner({
    title = defaultTitle,
    tagline = defaultTagline,
    badgeLabel = defaultBadgeLabel,
    ctaLabel = defaultCtaLabel,
    ctaHref = defaultCtaHref,
    imageSrc = defaultImageSrc,
    imageAlt = defaultImageAlt,
}: HomeBannerProps) {
    return (
        <section className="relative min-h-[480px] w-full md:min-h-[600px] lg:min-h-[730px]">
            {/* Background layer */}
            <div className="absolute inset-0">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-white/30" aria-hidden />
            </div>

            {/* Content layer */}
            <div className="relative flex min-h-[480px] flex-col items-center justify-center px-4 py-15 md:min-h-[600px] md:px-6 lg:min-h-[730px]">
                <div className="mx-auto flex max-w-[884px] flex-col items-center gap-2 text-center">
                    {badgeLabel ? (
                        <span className="font-libre-franklin rounded-md border-2 border-foreground px-6 py-3 text-xs text-foreground mt-24 md:mt-0">
                            {badgeLabel}
                        </span>
                    ) : null}
                    <div className="flex flex-col gap-2">
                        <h1 className="font-oswald text-foreground text-xl sm:text-2xl md:text-[40px]">
                            {title}
                        </h1>
                        <p className="font-libre-franklin text-foreground text-lg sm:text-xl md:text-2xl">
                            {tagline}
                        </p>
                    </div>
                    <div className="mt-8 flex justify-center md:mt-10">
                        <Button asChild>
                            <Link href={ctaHref} className="gap-2">
                                {ctaLabel}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

        </section>
    );
}
