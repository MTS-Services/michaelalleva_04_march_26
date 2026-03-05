import { HomeAboutSection } from '@/components/home-about-section';
import { HomeBanner } from '@/components/home-banner';
import { HomeContactSection } from '@/components/home-contact-section';
import {
    HomeDestinationSection,
    type DestinationCard,
} from '@/components/home-destination-section';
import FrontendLayout from '@/layouts/frontend-layout';
import { packages } from '@/routes';

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

export default function Home() {
    return (
        <FrontendLayout>
            <HomeBanner />
            <HomeDestinationSection destinations={defaultDestinations} />
            <HomeAboutSection imageSrcs={imageSrcs} />
            <HomeContactSection />
        </FrontendLayout>
    );
}
