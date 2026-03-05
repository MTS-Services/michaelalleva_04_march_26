import { FeatureCards } from "./feature-cards";

export default function AboutUsFeatures() {
    return (
        <section className="bg-background py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="flex flex-col justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-oswald text-foreground text-2xl sm:text-3xl md:text-5xl lg:text-[56px] leading-tight ">
                                Features
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-libre-franklin text-foreground text-base sm:text-lg md:text-2xl leading-relaxed text-left">
                                We are a premium travel company specializing in curated experiences to the world's most extraordinary destinations. With over 15 years of expertise, we craft journeys that transform travelers into storytellers.
                                Our commitment to excellence ensures every detail is meticulously planned, from accommodation to activities, creating seamless adventures that exceed expectations.
                                Why the world's most discerning travelers choose us: personalized itineraries, exclusive access, and unwavering attention to quality and safety.
                            </p>
                        </div>
                    </div>
                    <FeatureCards />
                </div>
            </div>
        </section>
    )
}
