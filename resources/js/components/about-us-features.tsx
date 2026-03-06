import { FeatureCards } from "./feature-cards";

export default function AboutUsFeatures() {
    return (
        <section className="bg-card py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 space-y-10">
                <div className="mx-auto max-w-5/6 space-y-4 text-center">
                    <h2 className="font-oswald text-foreground text-xl sm:text-2xl md:text-[40px]">
                        Why the World’s Most Discerning Travelers Choose Us
                    </h2>
                    <p className="font-libre-franklin text-muted-foreground text-lg sm:text-xl md:text-2xl">
                        We obsess over every detail of your journey&mdash;from the first email to the final transfer
                        home&mdash;so you can simply arrive, exhale, and enjoy. Here are the pillars that shape every
                        itinerary we design.
                    </p>
                </div>

                <FeatureCards />
            </div>
        </section>
    );
}
