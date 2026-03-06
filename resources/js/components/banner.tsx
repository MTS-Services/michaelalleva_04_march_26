import { Link } from '@inertiajs/react';
import { ArrowRight, LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { destination } from '@/routes';
import { Icon } from './ui/icon';
import { cn } from '@/lib/utils';

export interface BannerProps {
    title?: string;
    tagline?: string;
    badgeLabel?: string;
    ctaLabel?: string;
    ctaHref?: string;
    ctaVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    imageSrc?: string;
    imageAlt?: string;
    darkMode?: boolean;
    backCtaIcon?: LucideIcon | null;
    backCtaHref?: string | null;
    backCtaVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export function Banner({
    title,
    tagline,
    badgeLabel,
    ctaLabel,
    ctaHref,
    ctaVariant = 'default',
    imageSrc,
    imageAlt,
    darkMode = false,
    backCtaIcon = null,
    backCtaHref = null,
    backCtaVariant = 'default',
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
                <div className={cn("mx-auto flex flex-col items-center gap-2 text-center",
                    darkMode ? 'text-primary-foreground' : 'text-foreground',
                    backCtaIcon ? 'container max-w-6xl' : 'max-w-[884px]'
                )}>
                    <div className={cn("mt-24 md:mt-0", backCtaIcon && 'relative w-full')}>
                        {backCtaIcon && (
                            <div className='absolute left-0 top-1/2 -translate-y-1/2'>
                                <Button asChild variant={backCtaVariant}>
                                    <Link href={backCtaHref || ''}>
                                        <Icon iconNode={backCtaIcon} className='size-5' />
                                    </Link>
                                </Button>
                            </div>
                        )}
                        {badgeLabel ? (
                            <span className={`rounded-md border-2  px-6 py-3 text-xs ${darkMode ? 'text-primary-foreground border-primary-foreground' : 'text-foreground border-foreground'}`}>
                                {badgeLabel}
                            </span>
                        ) : null}
                    </div>
                    <div className={cn("flex flex-col gap-2",
                        backCtaIcon && 'max-w-[884px]'
                    )}>
                        <h1 className={`font-oswald ${darkMode ? 'text-primary-foreground' : 'text-foreground'} text-2xl sm:text-3xl md:text-[40px] lg:text-[56px] leading-[150%]`}>
                            {title}
                        </h1>
                        <p className={`${darkMode ? 'text-primary-foreground' : 'text-foreground'} text-lg sm:text-xl md:text-2xl`}>
                            {tagline}
                        </p>
                    </div>
                    {ctaLabel && (
                        <div className="mt-8 flex justify-center md:mt-10">
                            <Button asChild variant={ctaVariant}>
                                <Link href={ctaHref} className="gap-2">
                                    {ctaLabel}
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
}
