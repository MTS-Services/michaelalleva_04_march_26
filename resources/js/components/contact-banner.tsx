import { Button } from '@/components/ui/button';
import { destination } from '@/routes';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export interface ContactBannerProps {
    title?: string;
    tagline?: string;
    badgeLabel?: string;
    ctaLabel?: string;
    ctaHref?: string;
    imageSrc?: string;
    imageAlt?: string;
}

const defaultTitle = 'Get in Touch';
const defaultTagline =
    "Our travel experts are ready to help you plan the journey of a lifetime";
const defaultBadgeLabel = 'Contact';
const defaultCtaLabel = 'Explore Destinations';
const defaultCtaHref = destination().url;
const defaultImageSrc = '/images/airplane.jpg';
const defaultImageAlt = 'Travel destination hero';

export function ContactBanner({
    title = defaultTitle,
    tagline = defaultTagline,
    badgeLabel = defaultBadgeLabel,
    ctaLabel = defaultCtaLabel,
    ctaHref = defaultCtaHref,
    imageSrc = defaultImageSrc,
    imageAlt = defaultImageAlt,
}: ContactBannerProps) {
    return (
        <section className="relative min-h-[480px] w-full md:min-h-[600px] lg:min-h-[730px]">
            {/* Background layer */}
            <div className="absolute inset-0">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" aria-hidden />
            </div>

            {/* Content layer */}
            <div className="relative flex min-h-[480px] flex-col items-center justify-center px-4 py-15 md:min-h-[600px] md:px-6 lg:min-h-[730px]">
                <div className="mx-auto flex max-w-[884px] flex-col items-center gap-2 text-center">
                    {badgeLabel ? (
                        <span className="font-libre-franklin rounded-md border-2 border-primary-foreground px-6 py-3 text-xs text-primary-foreground mt-24 md:mt-0">
                            {badgeLabel}
                        </span>
                    ) : null}
                    <div className="flex flex-col gap-2">
                        <h1 className="font-oswald text-primary-foreground text-2xl sm:text-3xl md:text-5xl lg:text-[56px] leading-tight ">
                            {title}
                        </h1>
                        <p className="font-libre-franklin text-primary-foreground text-base sm:text-lg md:text-2xl">
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
