import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge } from '@/components/dashboard/status-badge';
import UserLayout from '@/layouts/user-layout';
import { Link } from '@inertiajs/react';
import { Calendar, Globe, PlaneTakeoff } from 'lucide-react';
import { useState } from 'react';

interface TripCard {
    id: string;
    destination: string;
    destinationImage: string;
    packageName: string;
    nights: number;
    guests: number;
    dateRange: string;
    amount: number;
    status: string;
    ref: string;
    guestAges: string;
    detailHref: string;
}

interface MyTripsPageProps {
    userName?: string;
    activeTrips?: TripCard[];
    historyTrips?: TripCard[];
}

const DEMO_ACTIVE: TripCard[] = [
    { id: '1', destination: 'Egypt', destinationImage: '/images/egypt.jpg', packageName: 'Grand Egypt Expedition', nights: 14, guests: 1, dateRange: 'Mar 15, 2026 – Jun 29, 2026', amount: 25000, status: 'Confirmed', ref: 'WL-EGY-2025-001', guestAges: '29 years old', detailHref: '/dashboard/trips/1' },
    { id: '2', destination: 'Costa rica', destinationImage: '/images/costa-rica.jpg', packageName: 'Rainforest Adventure', nights: 14, guests: 1, dateRange: 'Mar 15, 2026 – Jun 29, 2026', amount: 25000, status: 'Paid', ref: 'WL-EGY-2025-001', guestAges: '29 years old', detailHref: '/dashboard/trips/2' },
];

export default function MyTrips({
    userName = 'Sarah Johnson',
    activeTrips = DEMO_ACTIVE,
    historyTrips = [],
}: MyTripsPageProps) {
    const [tab, setTab] = useState<'active' | 'history'>('active');
    const displayTrips = tab === 'active' ? activeTrips : historyTrips;

    return (
        <UserLayout userName={userName}>
            <div className="space-y-6">
                <PageHeader
                    title={`Welcome back, ${userName}!`}
                    subtitle="Manage your bookings and track your travel adventures"
                />

                {/* Stats strip */}
                <div className="grid grid-cols-3 gap-4">
                    <StatPill icon={<PlaneTakeoff className="h-6 w-6" />} value={activeTrips.length} label="Active Trips" />
                    <StatPill icon={<Calendar className="h-6 w-6" />} value={historyTrips.length} label="Completed" />
                    <StatPill icon={<Globe className="h-6 w-6" />} value={activeTrips.length + historyTrips.length} label="Total Bookings" />
                </div>

                {/* Tabs */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setTab('active')}
                        className={`font-libre-franklin rounded-xl px-5 py-2 text-sm font-medium transition ${
                            tab === 'active'
                                ? 'bg-primary text-primary-foreground'
                                : 'border border-primary text-primary hover:bg-primary/5'
                        }`}
                    >
                        Active Trips {activeTrips.length}
                    </button>
                    <button
                        onClick={() => setTab('history')}
                        className={`font-libre-franklin rounded-xl px-5 py-2 text-sm font-medium transition ${
                            tab === 'history'
                                ? 'bg-primary text-primary-foreground'
                                : 'border border-primary text-primary hover:bg-primary/5'
                        }`}
                    >
                        History ({historyTrips.length})
                    </button>
                </div>

                {/* Trip cards */}
                <div className="space-y-4">
                    {displayTrips.length === 0 ? (
                        <div className="rounded-2xl border border-border bg-card p-10 text-center">
                            <p className="font-libre-franklin text-muted-foreground">No trips found.</p>
                        </div>
                    ) : (
                        displayTrips.map((trip) => (
                            <div key={trip.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                                <div className="flex items-start gap-4 p-5">
                                    {/* Destination image */}
                                    <img
                                        src={trip.destinationImage}
                                        alt={trip.destination}
                                        className="h-24 w-32 flex-shrink-0 rounded-xl object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${trip.destination}&background=14b8a6&color=fff&size=96`;
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-oswald text-lg font-semibold text-foreground">
                                                {trip.destination}
                                            </h3>
                                            <StatusBadge status={trip.status} />
                                        </div>
                                        <p className="font-libre-franklin mt-0.5 text-sm text-foreground">
                                            {trip.packageName}
                                        </p>
                                        <p className="font-libre-franklin text-xs text-muted-foreground">
                                            {trip.nights} Nights · {trip.guests} Guests
                                        </p>
                                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span className="font-libre-franklin">{trip.dateRange}</span>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="font-oswald text-lg font-semibold text-foreground">
                                            ${trip.amount.toLocaleString()}
                                        </p>
                                        <p className="font-libre-franklin text-xs text-muted-foreground">
                                            Ref: {trip.ref}
                                        </p>
                                        <Link
                                            href={trip.detailHref}
                                            className="font-libre-franklin mt-2 inline-block rounded-xl bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition hover:bg-primary/90"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                                {/* Guest ages row */}
                                <div className="flex items-center gap-2 border-t border-border px-5 py-3">
                                    <PlaneTakeoff className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="font-libre-franklin text-xs text-muted-foreground">
                                        Guest Ages: {trip.guestAges}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </UserLayout>
    );
}

function StatPill({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground">
                {icon}
            </div>
            <div>
                <p className="font-oswald text-2xl font-semibold text-foreground">{value}</p>
                <p className="font-libre-franklin text-xs text-muted-foreground">{label}</p>
            </div>
        </div>
    );
}