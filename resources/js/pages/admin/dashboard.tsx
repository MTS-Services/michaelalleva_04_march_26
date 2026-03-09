import { PageHeader } from '@/components/dashboard/page-header';
import { StatsCard } from '@/components/dashboard/stats-card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import AdminLayout from '@/layouts/admin-layout';
import { Link } from '@inertiajs/react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// ── Static demo data ──────────────────────────────────────────────────────────

const revenueWeekly = [
    { day: 'Mon', value: 38000 },
    { day: 'Tue', value: 28000 },
    { day: 'Wed', value: 52000 },
    { day: 'Thu', value: 63000 },
    { day: 'Fri', value: 42000 },
    { day: 'Sat', value: 67000 },
    { day: 'Sun', value: 62000 },
];

const avgBookings = [
    { name: 'Egypt', value: 98, color: '#e53e3e' },
    { name: 'Costa Rica', value: 99, color: '#14b8a6' },
    { name: 'Norway', value: 10, color: '#2d3748' },
];

const recentBookings = [
    { name: 'Freida Varnes', destination: 'Egypt', package: '5 Nights', amount: '$7,000', status: 'Confirmed', avatar: '' },
    { name: 'Sanjuanita Ordonez', destination: 'Egypt', package: '5 Nights', amount: '$7,000', status: 'Paid', avatar: '' },
];

// ── Component ─────────────────────────────────────────────────────────────────

interface DashboardProps {
    totalBookings?: number;
    totalRevenue?: string;
    activeTravelers?: number;
    activeDestinations?: number;
}

export default function Dashboard({
    totalBookings = 501,
    totalRevenue = '$60k+',
    activeTravelers = 200,
    activeDestinations = 3,
}: DashboardProps) {
    return (
        <AdminLayout activeSlug="dashboard">
            <div className="space-y-6">
                <PageHeader
                    title="Dashboard overview"
                    subtitle="Welcome back! Here's your booking overview."
                />

                <div className='grid gap-4 lg:grid-cols-3'>
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatsCard label="Total Bookings" value={totalBookings} change="68.95%" />
                        <StatsCard label="Total revenue" value={totalRevenue} change="68.95%" />
                        <StatsCard label="Active Travelers" value={activeTravelers} change="68.95%" />
                        <StatsCard label="Active destination" value={activeDestinations} />
                    </div>

                    {/* Charts row */}

                    {/* Revenue bar chart */}
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm col-span-2">
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <h3 className="font-oswald font-semibold text-foreground">
                                    Revenue overview
                                </h3>
                                <p className="font-libre-franklin mt-0.5 text-xs text-muted-foreground">
                                    Monitor sales trends and gain insights for growth.
                                </p>
                            </div>
                            <div className="flex rounded-xl border border-border overflow-hidden">
                                <button className="font-libre-franklin bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                                    Weekly
                                </button>
                                <button className="font-libre-franklin px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
                                    Monthly
                                </button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={revenueWeekly} barSize={28}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(173,80%,90%)" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(173,21%,50%)' }} />
                                <YAxis
                                    tickFormatter={(v) => `$${v / 1000}0k`}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: 'hsl(173,21%,50%)' }}
                                    width={42}
                                />
                                <Tooltip
                                    formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, 'Revenue']}
                                    contentStyle={{ borderRadius: 12, border: '1px solid hsl(173,80%,90%)', fontSize: 12 }}
                                />
                                <Bar dataKey="value" fill="hsl(173,80%,40%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_500px]">
                    {/* Recent bookings */}
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-oswald font-semibold text-foreground">
                                Recent bookings
                            </h3>
                            <Link
                                href="/admin/bookings"
                                className="font-libre-franklin text-sm font-medium text-primary hover:underline"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentBookings.map((b, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={b.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(b.name)}&background=14b8a6&color=fff&size=36`}
                                            alt={b.name}
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-libre-franklin text-sm font-medium text-foreground">
                                                {b.name}
                                            </p>
                                            <p className="font-libre-franklin text-xs text-muted-foreground">
                                                {b.destination} · {b.package}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-libre-franklin text-sm font-medium text-foreground">
                                            {b.amount}
                                        </span>
                                        <StatusBadge status={b.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Avg bookings donut */}
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                        <h3 className="font-oswald mb-4 font-semibold text-foreground">
                            Avg bookings
                        </h3>
                        <div className="flex justify-center">
                            <ResponsiveContainer width={180} height={180}>
                                <PieChart>
                                    <Pie
                                        data={avgBookings}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={80}
                                        paddingAngle={4}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {avgBookings.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Legend */}
                        <div className="mt-3 space-y-1.5">
                            {avgBookings.map((d) => (
                                <div key={d.name} className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                                    <span className="font-libre-franklin text-xs text-muted-foreground">
                                        {d.name}{' '}
                                        <span className="font-medium text-foreground">
                                            booking {d.value}
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}