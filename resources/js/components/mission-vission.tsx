export default function MissionVission() {
    return (
        <section className="bg-background py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="flex flex-col justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-oswald text-foreground text-2xl sm:text-3xl md:text-5xl lg:text-[56px] leading-tight ">
                                Mission
                            </h2>
                            <p className="font-libre-franklin text-foreground text-base sm:text-lg md:text-2xl leading-relaxed text-left">
                                Our mission is to provide our clients with the best possible travel experience.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="font-oswald text-foreground text-2xl sm:text-3xl md:text-5xl lg:text-[56px] leading-tight ">
                                Vision
                            </h2>
                            <p className="font-libre-franklin text-foreground text-base sm:text-lg md:text-2xl leading-relaxed text-left">
                                Our vision is to be the best travel company in the world.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="relative aspect-282/232 overflow-hidden rounded-2xl bg-background">
                            <img src="/images/mission.jpg" alt="Mission" className="size-full object-cover" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="relative aspect-282/232 overflow-hidden rounded-2xl bg-background">
                            <img src="/images/vision.jpg" alt="Vision" className="size-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
