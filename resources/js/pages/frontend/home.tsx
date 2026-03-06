import { HomeAboutSection } from '@/components/home-about-section';
import { Banner } from '@/components/banner';
import { HomeContactSection } from '@/components/home-contact-section';
import {
    HomeDestinationSection,
    type DestinationCard,
} from '@/components/home-destination-section';
import FrontendLayout from '@/layouts/frontend-layout';
import { destination, packages } from '@/routes';

const defaultDestinations: DestinationCard[] = [
    {
        title: 'Egypt',
        description: 'Explore ancient wonders',
        imageSrc: '/images/egypt.jpg',
        imageAlt: 'Egypt travel',
        href: packages({ destination: 'egypt' }).url,
    },
    {
        title: 'Costa Rica',
        description: 'Discover tropical paradise',
        imageSrc: '/images/costa-rica.jpg',
        imageAlt: 'Costa Rica travel',
        href: packages({ destination: 'costa-rica' }).url,
    },
    {
        title: 'Norway',
        description: 'Experience Nordic beauty',
        imageSrc: '/images/norway.jpg',
        imageAlt: 'Norway travel',
        href: packages({ destination: 'norway' }).url,
    },
];

const imageSrcs = [
    '/images/sea.jpg',
    '/images/leady-swim.jpg',
    '/images/fishing.jpg',
];

const BannerConfig = {
    title: 'Unforgettable Memories Await',
    tagline:
        "Handpicked travel experiences to the world's most breathtaking and captivating destinations.",
    badgeLabel: 'DISCOVER THE UNKNOWN',
    ctaLabel: 'Explore Destinations',
    ctaHref: destination().url,
    imageSrc: '/images/hero-banner.png',
    imageAlt: 'Travel destination hero'
}

export default function Home() {
    return (
        <FrontendLayout>
            <Banner title={BannerConfig.title} tagline={BannerConfig.tagline} badgeLabel={BannerConfig.badgeLabel} ctaLabel={BannerConfig.ctaLabel} ctaHref={BannerConfig.ctaHref} imageSrc={BannerConfig.imageSrc} imageAlt={BannerConfig.imageAlt} />
            <HomeDestinationSection destinations={defaultDestinations} />
            <HomeAboutSection imageSrcs={imageSrcs} />
            <HomeContactSection />
        </FrontendLayout>
    );
}
