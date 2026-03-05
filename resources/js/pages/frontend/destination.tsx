import { HomeContactSection } from '@/components/home-contact-section';
import {
    HomeDestinationSection,
    type DestinationCard,
} from '@/components/home-destination-section';
import FrontendLayout from '@/layouts/frontend-layout';
import { packages } from '@/routes';

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
        href: packages({ destination: 'norway' }).url,
    },
];

export default function Destination() {
    return (
        <FrontendLayout>
            <HomeDestinationSection destinations={defaultDestinations} />
            <HomeContactSection />
        </FrontendLayout>
    );
}
