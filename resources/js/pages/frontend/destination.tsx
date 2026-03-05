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

export default function Destination() {
    return (
        <FrontendLayout>
            <div className='mt-28'></div>
            <HomeDestinationSection destinations={defaultDestinations} />
            <HomeContactSection />
        </FrontendLayout>
    );
}
