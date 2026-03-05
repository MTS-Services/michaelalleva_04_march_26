export default function MissionVission() {
    return (
        <section className="py-12 md:py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 space-y-8 md:space-y-12">

                {/* Header Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <h3 className="font-oswald text-foreground text-xl sm:text-2xl md:text-3xl lg:text-[40px] leading-tight">
                        We Don’t Design Vacations; We Author Your Life’s Greatest Stories.
                    </h3>
                    <p className="text-foreground text-lg sm:text-xl md:text-2xl leading-relaxed">
                        We bring a refined approach to travel, ensuring every detail is perfectly aligned with your desire for luxury and discovery.
                    </p>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Our Story - Full width on mobile, 60% on Desktop */}
                    <div className="flex-1 lg:flex-[60%] relative overflow-hidden rounded-2xl min-h-[400px] md:min-h-[500px]">
                        <img
                            src="/images/photography.jpg"
                            alt="Our story"
                            className="absolute inset-0 size-full object-cover rounded-2xl"
                        />
                        <span className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></span>
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20">
                            <h4 className="font-oswald text-primary-foreground text-xl md:text-2xl mb-4">Our Story</h4>
                            <p className="text-primary-foreground text-sm md:text-base">
                                Pearl-Ation was born to redefine boutique travel for the modern explorer who seeks the unexpected. We scouted the globe’s most iconic landscapes—from Egypt to Norway—to build a sanctuary of discovery. Today, we stand as a premier gateway, bridging the gap between your ambition and our flawless execution. Our journey is about crafting one-of-one stories that stay with you long after the trip ends.
                            </p>
                        </div>
                    </div>

                    {/* Mission & Vision Cards - Full width on mobile, 40% on Desktop */}
                    <div className="space-y-6 flex-1 lg:flex-[40%]">
                        <article className="rounded-2xl bg-muted p-6 md:p-8 shadow-sm">
                            <h4 className="font-oswald text-foreground mb-3 text-lg">
                                Our Mission
                            </h4>
                            <p className="text-sm md:text-base">
                                We envision a future where travel is once again an intimate and transformative art form for the elite. Pearl-Ation aims to set the global gold standard for exclusivity, where every journey is a unique masterpiece. We strive to create a world where you can step into the unknown with total, unshakable confidence.
                            </p>
                        </article>

                        <article className="rounded-2xl bg-primary p-6 md:p-8 shadow-sm">
                            <h4 className="font-oswald text-primary-foreground mb-3 text-lg">
                                Our Vision
                            </h4>
                            <p className="text-primary-foreground text-sm md:text-base">
                                Our mission is to orchestrate a seamless, all-inclusive ecosystem where luxury and surgical precision are non-negotiable. By limiting our service to just five bookings per week, we ensure every client receives our absolute focus. We handle the complex logistics of global travel so you can immerse yourself in pure, effortless adventure.
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}