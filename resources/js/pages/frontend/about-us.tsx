
import { AboutUsBanner } from '@/components/about-us-banner';
import FrontendLayout from '@/layouts/frontend-layout';
import MissionVission from '@/components/mission-vission';
import AboutUsFeatures from '@/components/about-us-features';
import { DestinationCard, HomeDestinationSection } from '@/components/home-destination-section';
import { packages } from '@/routes';
import TeamArchitects from '@/components/team-architects';
import GetInTouch from '@/components/get-in-touch';

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

export default function AboutUs() {
    return (
        <FrontendLayout>
            <AboutUsBanner />
            <MissionVission />
            <AboutUsFeatures />
            <HomeDestinationSection destinations={defaultDestinations} />
            <TeamArchitects />
            <GetInTouch />
        </FrontendLayout>
    );
}
