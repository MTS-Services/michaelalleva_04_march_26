import AboutUsFeatures from '@/components/about-us-features';
import { Banner } from '@/components/banner';
import GetInTouch from '@/components/get-in-touch';
import { DestinationCard, HomeDestinationSection } from '@/components/home-destination-section';
import MissionVission from '@/components/mission-vission';
import TeamArchitects from '@/components/team-architects';
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

const BannerConfig = {
    title: 'A One-of-One Travel Experience.',
    tagline:
        "We don’t just book trips; we curate experiences that surprise even the most seasoned travelers.",
    badgeLabel: 'Our Story',
    ctaLabel: 'Explore Destinations',
    ctaHref: destination().url,
    imageSrc: '/images/city.png',
    imageAlt: 'Travel destination hero'
}

export default function AboutUs() {
    return (
        <FrontendLayout>
            <Banner title={BannerConfig.title} tagline={BannerConfig.tagline} badgeLabel={BannerConfig.badgeLabel} ctaLabel={BannerConfig.ctaLabel} ctaHref={BannerConfig.ctaHref} imageSrc={BannerConfig.imageSrc} imageAlt={BannerConfig.imageAlt} />
            <MissionVission />
            <AboutUsFeatures />
            <HomeDestinationSection destinations={defaultDestinations} />
            <TeamArchitects />
            <GetInTouch />
        </FrontendLayout>
    );
}
