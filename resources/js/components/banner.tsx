import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { destination } from '@/routes';

export interface BannerProps {
    title?: string;
    tagline?: string;
    badgeLabel?: string;
    ctaLabel?: string;
    ctaHref?: string;
    imageSrc?: string;
    imageAlt?: string;
    darkMode?: boolean;
}

export function Banner({
    title,
    tagline,
    badgeLabel,
    ctaLabel,
    ctaHref,
    imageSrc,
    imageAlt,
    darkMode = false,
}: BannerProps) {
    return (
        <section className="relative min-h-[480px] w-full md:min-h-[600px] lg:min-h-[730px]">
            {/* Background layer */}
            <div className="absolute inset-0">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="absolute inset-0 size-full object-cover"
                />
                <div className={`absolute inset-0 ${darkMode ? 'bg-black/30' : 'bg-white/30'}`} aria-hidden />
            </div>

            {/* Content layer */}
            <div className="relative flex min-h-[480px] flex-col items-center justify-center px-4 py-15 md:min-h-[600px] md:px-6 lg:min-h-[730px]">
                <div className={`mx-auto flex max-w-[884px] flex-col items-center gap-2 text-center ${darkMode ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {badgeLabel ? (
                        <span className={`rounded-md border-2  px-6 py-3 text-xs ${darkMode ? 'text-primary-foreground border-primary-foreground' : 'text-foreground border-foreground'} mt-24 md:mt-0`}>
                            {badgeLabel}
                        </span>
                    ) : null}
                    <div className="flex flex-col gap-2">
                        <h1 className={`font-oswald ${darkMode ? 'text-primary-foreground' : 'text-foreground'} text-xl sm:text-2xl md:text-[40px]`}>
                            {title}
                        </h1>
                        <p className={`${darkMode ? 'text-primary-foreground' : 'text-foreground'} text-lg sm:text-xl md:text-2xl`}>
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
