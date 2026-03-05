import { HomeAboutSection } from '@/components/home-about-section';
import { HomeBanner } from '@/components/home-banner';
import { HomeContactSection } from '@/components/home-contact-section';
import {
    HomeDestinationSection,
    type DestinationCard,
} from '@/components/home-destination-section';
import { HomeFeatureCards } from '@/components/home-feature-cards';
import FrontendLayout from '@/layouts/frontend-layout';
import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { login, packages, register } from '@/routes';
import { Button } from '@/components/ui/button';

const placeholderImage = '/images/hero-banner.png';

const defaultDestinations: DestinationCard[] = [
    {
        title: 'Egypt',
        subtitle: 'Explore ancient wonders',
        imageSrc: placeholderImage,
        imageAlt: 'Egypt travel',
        href: packages({ destination: 'egypt' }).url,
    },
    {
        title: 'Costa Rica',
        subtitle: 'Discover tropical paradise',
        imageSrc: placeholderImage,
        imageAlt: 'Costa Rica travel',
        href: packages({ destination: 'costa-rica' }).url,
    },
    {
        title: 'Norway',
        subtitle: 'Experience Nordic beauty',
        imageSrc: placeholderImage,
        imageAlt: 'Norway travel',
        href: '/#destinations',
    },
];

export default function Home({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const dashboardRoute = auth.user?.is_admin
        ? route('admin.dashboard')
        : route('user.dashboard');

    return (
        <FrontendLayout>
            <HomeBanner />

            {auth.user ? (
                <div className="mx-auto flex max-w-7xl justify-center px-4 py-8 md:px-6 lg:px-8">
                    <Button asChild>
                        <Link href={dashboardRoute}>Go to Dashboard</Link>
                    </Button>
                </div>
            ) : (
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 py-8 md:px-6 lg:px-8">
                    <Button asChild>
                        <Link href={login()}>Get Started</Link>
                    </Button>
                    {canRegister && (
                        <Link
                            href={register()}
                            className="font-libre-franklin text-foreground text-base font-normal hover:opacity-80"
                        >
                            Create an account <span aria-hidden>→</span>
                        </Link>
                    )}
                </div>
            )}

            <HomeDestinationSection destinations={defaultDestinations} />
            <HomeAboutSection />
            <HomeFeatureCards />
            <HomeContactSection />
        </FrontendLayout>
    );
}
