import { Button } from '@/components/ui/button';
import { aboutUs } from '@/routes';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FeatureCards } from '@/components/feature-cards';

export interface HomeAboutSectionProps {
    heading?: string;
    paragraphs?: string[];
    ctaLabel?: string;
    ctaHref?: string;
    imageSrcs?: string[];
}

const defaultHeading = 'About Us';
const defaultParagraphs = [
    "We are a premium travel company specializing in curated experiences to the world's most extraordinary destinations. With over 15 years of expertise, we craft journeys that transform travelers into storytellers.",
    'Our commitment to excellence ensures every detail is meticulously planned, from accommodation to activities, creating seamless adventures that exceed expectations.',
];
const defaultCtaLabel = 'Learn more';
const defaultCtaHref = aboutUs().url;

export function HomeAboutSection({
    heading = defaultHeading,
    paragraphs = defaultParagraphs,
    ctaLabel = defaultCtaLabel,
    ctaHref = defaultCtaHref,
    imageSrcs,
}: HomeAboutSectionProps) {
    return (
        <section className="bg-background py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="flex flex-col justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-oswald text-foreground text-2xl sm:text-3xl md:text-5xl lg:text-[56px] leading-tight ">
                                {heading}
                            </h2>
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="font-libre-franklin text-foreground text-base sm:text-lg md:text-2xl leading-relaxed text-left"
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                        <Button asChild className="w-fit">
                            <Link href={ctaHref} className="gap-2">
                                {ctaLabel}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-6">
                        {imageSrcs ? (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="relative aspect-282/232 overflow-hidden rounded-2xl bg-background">
                                        <img
                                            src={imageSrcs[0]}
                                            alt=""
                                            className="size-full object-cover"
                                        />
                                    </div>
                                    <div className="relative aspect-282/232 overflow-hidden rounded-2xl bg-background">
                                        <img
                                            src={imageSrcs[1]}
                                            alt=""
                                            className="size-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="relative aspect-588/232 overflow-hidden rounded-2xl bg-background">
                                    <img
                                        src={imageSrcs[2]}
                                        alt=""
                                        className="size-full object-cover object-bottom"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="aspect-282/232 rounded-2xl bg-background/80" />
                                    <div className="aspect-282/232 rounded-2xl bg-background/80" />
                                </div>
                                <div className="aspect-588/232 w-full rounded-2xl bg-background/80" />
                            </>
                        )}
                    </div>
                </div>

                <FeatureCards />
            </div>
        </section>
    );
}
