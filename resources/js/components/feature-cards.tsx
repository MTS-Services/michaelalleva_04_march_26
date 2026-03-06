import { ShieldCheck, Star, Headset } from 'lucide-react';

export interface FeatureCard {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

const defaultFeatures: FeatureCard[] = [
    {
        icon: ShieldCheck,
        title: 'Trusted Service',
        description: '15+ years of excellence in travel',
    },
    {
        icon: Star,
        title: 'Premium Quality',
        description: 'Handpicked accommodations and experiences',
    },
    {
        icon: Headset,
        title: '24/7 Support',
        description: 'Always here for your journey',
    },
];

export interface FeatureCardsProps {
    features?: FeatureCard[];
}

export function FeatureCards({
    features = defaultFeatures,
}: FeatureCardsProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
                <article
                    key={title}
                    className="flex flex-col items-center rounded-2xl bg-white p-6 text-center"
                >
                    <div className="mb-6 flex size-[98px] items-center justify-center rounded-lg bg-card">
                        <Icon className="text-foreground size-10 font-normal" />
                    </div>
                    <h3 className="font-oswald text-foreground mb-2 text-2xl font-bold">
                        {title}
                    </h3>
                    <p className="font-libre-franklin text-foreground text-base">
                        {description}
                    </p>
                </article>
            ))}
        </div>
    );
}
