import { HomeAboutSection } from '@/components/home-about-section';
import { HomeFeatureCards } from '@/components/home-feature-cards';
import FrontendLayout from '@/layouts/frontend-layout';

const aboutParagraphs = [
    "We are a premium travel company specializing in curated experiences to the world's most extraordinary destinations. With over 15 years of expertise, we craft journeys that transform travelers into storytellers.",
    'Our commitment to excellence ensures every detail is meticulously planned, from accommodation to activities, creating seamless adventures that exceed expectations.',
    'Why the world\'s most discerning travelers choose us: personalized itineraries, exclusive access, and unwavering attention to quality and safety.',
];

export default function AboutUs() {
    return (
        <FrontendLayout>
            <section className="relative flex min-h-[320px] w-full flex-col items-center justify-center bg-muted px-4 py-20 md:min-h-[400px]">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="font-oswald text-foreground text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        A One-of-One Travel Experience.
                    </h1>
                    <p className="font-libre-franklin text-foreground mt-4 text-lg sm:text-xl">
                        Curated journeys for discerning travelers who expect the
                        extraordinary.
                    </p>
                </div>
            </section>
            <HomeAboutSection
                heading="About Us"
                paragraphs={aboutParagraphs}
                ctaLabel="Get in Touch"
                ctaHref={route('contact.index')}
            />
            <HomeFeatureCards />
        </FrontendLayout>
    );
}
