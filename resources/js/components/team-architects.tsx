import { Twitter, Instagram, Globe, Facebook, Linkedin, Youtube } from 'lucide-react';

const teamMembers = [
    {
        name: 'Emily Rhodes',
        role: 'Lead Travel Architect',
        bio: 'Specializes in one-of-one journeys that blend culture, cuisine, and wilderness.',
        imageSrc: '/images/person1.png',
        color: 'bg-[#14b8a6]',
        socialLinks: {
            twitter: 'https://x.com/',
            instagram: 'https://www.instagram.com',
            linkedin: 'https://www.linkedin.com/in/',
            facebook: 'https://www.facebook.com/',
            website: 'https://www.google.com/',
        }
    },
    {
        name: 'Marco Alvarez',
        role: 'Destination Curator',
        bio: 'On-the-ground relationships across the globe to unlock rare experiences.',
        imageSrc: '/images/person2.jpg',
        color: 'bg-[#14b8a6]',
        socialLinks: {
            twitter: 'https://x.com/',
            instagram: 'https://www.instagram.com/',
            linkedin: 'https://www.linkedin.com/in/',
            facebook: 'https://www.facebook.com/',
            website: 'https://www.google.com',
        }
    },
    {
        name: 'Sofia Bennett',
        role: 'Guest Experience Director',
        bio: 'Ensures every moment feels effortless, from airport pickups to final farewells.',
        imageSrc: '/images/person3.jpg',
        color: 'bg-[#14b8a6]',
        socialLinks: {
            twitter: 'https://x.com/',
            instagram: 'https://www.instagram.com/',
            linkedin: 'https://www.linkedin.com/in/',
            facebook: 'https://www.facebook.com/',
            website: 'https://www.google.com',
        }
    },
];

export default function TeamArchitects() {
    return (
        <section className="py-15">
            <div className="container max-w-7xl px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

                {/* Left Side: Header */}
                <div className="w-full lg:w-1/3 space-y-4 md:space-y-6 ">
                    <h2 className="text-xl sm:text-2xl md:text-[40px]">
                        Meet the Architects of Your Next Adventure.
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl">
                        Our curators bring surgery-like precision and bespoke luxury to every world-class journey.
                    </p>
                </div>

                {/* Right Side: Expanding Gallery */}
                {/* Fixed: flex-row and height are now consistent on mobile and desktop */}
                <div className="flex flex-row flex-1 gap-2 md:gap-4 w-full items-start">
                    {teamMembers.map((member) => (
                        <article
                            key={member.name}
                            className="group relative flex-1 hover:flex-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden rounded-2xl h-[350px]! md:h-[472px]!"
                        >
                            <div className="relative h-full w-full">
                                <img
                                    src={member.imageSrc}
                                    alt={member.name}
                                    className="absolute inset-0 size-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />

                                {/* Website/Globe Icon */}
                                {member.socialLinks.website && (
                                    <a
                                        href={member.socialLinks.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-200 z-10 hover:scale-110 transition-all"
                                    >
                                        <Globe className="text-white w-6 h-6 drop-shadow-md" />
                                    </a>
                                )}

                                {/* Content Block - Now triggers on touch/hover for both mobile and desktop */}
                                <div className={`absolute bottom-0 left-0 right-0 ${member.color} p-4 md:p-8 
                                    translate-y-[101%] group-hover:translate-y-0 
                                    transition-transform duration-500 ease-out`}>
                                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                                        <div className="mb-2 sm:mb-0">
                                            <h3 className="text-white font-semibold text-lg md:text-2xl leading-tight">{member.name}</h3>
                                            <p className="text-white/90 text-[10px] md:text-sm">{member.role}</p>
                                        </div>
                                        {/* Social Icons mapping */}
                                        <div className="flex gap-3 text-white/80">
                                            {member.socialLinks.twitter && (
                                                <a href={member.socialLinks.twitter} target="_blank" className="hover:text-white transition-colors">
                                                    <Twitter className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.socialLinks.instagram && (
                                                <a href={member.socialLinks.instagram} target="_blank" className="hover:text-white transition-colors">
                                                    <Instagram className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.socialLinks.linkedin && (
                                                <a href={member.socialLinks.linkedin} target="_blank" className="hover:text-white transition-colors">
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.socialLinks.facebook && (
                                                <a href={member.socialLinks.facebook} target="_blank" className="hover:text-white transition-colors">
                                                    <Facebook className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.socialLinks.youtube && (
                                                <a href={member.socialLinks.youtube} target="_blank" className="hover:text-white transition-colors">
                                                    <Youtube className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    {/* Bio hidden on very small expanded cards to prevent overflow */}
                                    <p className="text-white/80 text-[11px] md:text-sm leading-snug hidden sm:block">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}