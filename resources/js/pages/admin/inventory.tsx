import { AddDestinationModal } from '@/components/dashboard/add-destination-modal';
import { AddPackageModal, type PackageFormData } from '@/components/dashboard/add-package-modal';
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/layouts/admin-layout';
import { cn } from '@/lib/utils';
import { CalendarX, Check, PenLine, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Package {
    id: number;
    name: string;
    nights: number;
    pricePerPerson: number;
    weeklyCapacity: number;
    booked: number;
    active: boolean;
    details?: string[];
}

interface Destination {
    id: string;
    name: string;
    packages: Package[];
}

interface BlockedWeek {
    id: number;
    dateRange: string;
    reason: string;
    destinationId: string;
}

const DEMO_DESTINATIONS: Destination[] = [
    {
        id: 'egypt',
        name: 'Egypt',
        packages: [
            { id: 1, name: 'Desert Safari', nights: 5, pricePerPerson: 7000, weeklyCapacity: 5, booked: 4, active: true, details: ['Airport pickup & drop-off', '4-night desert camp stay', 'Camel ride experience', 'All meals included'] },
            { id: 2, name: 'Pyramids & Pharaohs', nights: 5, pricePerPerson: 7000, weeklyCapacity: 5, booked: 3, active: true, details: ['Guided Giza pyramid tour', 'Egyptian Museum entry', 'Nile dinner cruise'] },
            { id: 3, name: 'Luxury Nile Experience', nights: 5, pricePerPerson: 7000, weeklyCapacity: 5, booked: 2, active: true, details: ['5-star Nile cruise cabin', 'Luxor & Karnak temples', 'Private Egyptologist guide'] },
            { id: 4, name: 'Ancient Wonders', nights: 5, pricePerPerson: 7000, weeklyCapacity: 5, booked: 0, active: false, details: ['Abu Simbel flight', 'Valley of the Kings', 'Aswan High Dam visit'] },
            { id: 5, name: 'Complete Egypt Journey', nights: 5, pricePerPerson: 7000, weeklyCapacity: 5, booked: 1, active: true, details: ['Cairo + Luxor + Aswan', 'All domestic flights', 'Luxury hotels throughout'] },
        ],
    },
    { id: 'costa-rica', name: 'Costa Rica', packages: [] },
    { id: 'norway', name: 'Norway', packages: [] },
];

const DEMO_BLOCKED: BlockedWeek[] = [
    { id: 1, dateRange: '2024-04-15 → 2024-04-21', reason: 'Maintenance period', destinationId: 'egypt' },
];

interface InventoryPageProps {
    globalWeeklyCapacity?: number;
    advanceBookingWindow?: number;
    destinations?: Destination[];
    blockedWeeks?: BlockedWeek[];
}

export default function AdminInventory({
    globalWeeklyCapacity = 5,
    advanceBookingWindow = 14,
    destinations = DEMO_DESTINATIONS,
    blockedWeeks = DEMO_BLOCKED,
}: InventoryPageProps) {
    const [selectedDest, setSelectedDest] = useState(destinations[0]?.id ?? '');
    const [showAddDest, setShowAddDest] = useState(false);
    const [showAddPkg, setShowAddPkg] = useState(false);
    /** When set, opens the edit modal for this package */
    const [editingPkg, setEditingPkg] = useState<(PackageFormData & { id: number }) | null>(null);
    const [capacity, setCapacity] = useState(globalWeeklyCapacity);
    const [window_, setWindow] = useState(advanceBookingWindow);
    const [activeMap, setActiveMap] = useState<Record<number, boolean>>(
        Object.fromEntries(
            destinations.flatMap((d) => d.packages.map((p) => [p.id, p.active])),
        ),
    );

    const activeDest = destinations.find((d) => d.id === selectedDest);
    const toggleActive = (id: number) =>
        setActiveMap((prev) => ({ ...prev, [id]: !prev[id] }));

    /** Convert a Package → PackageFormData for the modal */
    const toFormData = (pkg: Package): PackageFormData & { id: number } => ({
        id: pkg.id,
        destination: selectedDest,
        name: pkg.name,
        duration: String(pkg.nights),
        price: String(pkg.pricePerPerson),
        weeklyCapacity: String(pkg.weeklyCapacity),
        details: pkg.details && pkg.details.length > 0 ? pkg.details : [''],
        active: activeMap[pkg.id] ?? pkg.active,
    });

    return (
        <AdminLayout activeSlug="admin-inventory">
            <div className="space-y-5">
                <PageHeader
                    title="Inventory & Capacity Management"
                    subtitle="Manage destinations, packages, capacities, and blocked weeks"
                />

                {/* ── Global Settings ───────────────────────────────────── */}
                <Card>
                    <h2 className={cn(heading, 'mb-5')}>Global Settings</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <SettingField label="Global Weekly Capacity" suffix="bookings / week">
                            <Input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} className={inputCls} />
                        </SettingField>
                        <SettingField label="Advance Booking Window" suffix="days in advance">
                            <input type="number" value={window_} onChange={(e) => setWindow(Number(e.target.value))} className={inputCls} />
                        </SettingField>
                    </div>
                </Card>

                {/* ── Select Destination ────────────────────────────────── */}
                <Card>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <h2 className={heading}>Select Destination</h2>
                        <Button onClick={() => setShowAddDest(true)} className='cursor-pointer'>Add Destination</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                        {destinations.map((d) => (
                            <button
                                key={d.id}
                                onClick={() => setSelectedDest(d.id)}
                                className={cn(
                                    'relative rounded-xl border p-3 text-left transition-all pb-4 sm:p-4 sm:pb-8 cursor-pointer',
                                    selectedDest === d.id
                                        ? 'border-primary bg-primary/5'
                                        : 'border-muted bg-transparent',
                                )}
                            >
                                {selectedDest === d.id && (
                                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground border-2 border-background">
                                        <Check className="h-3 w-3" strokeWidth={3} />
                                    </span>
                                )}
                                <h4 className="text-base md:text-lg lg:text-xl mb-1">{d.name}</h4>
                                <p className="mt-0.5 text-xs text-muted-foreground">{d.packages.length} packages</p>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* ── Packages & Capacity ───────────────────────────────── */}
                {activeDest && (
                    <Card>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <h2 className={heading}>{activeDest.name} — Packages &amp; Capacity</h2>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" className='cursor-pointer'>Block Week</Button>
                                <Button onClick={() => setShowAddPkg(true)} className='cursor-pointer' >Add Package</Button>
                            </div>
                        </div>

                        {activeDest.packages.length === 0 ? (
                            <p className=" py-8 text-center text-sm text-muted-foreground">
                                No packages yet. Click "Add Package" to create one.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {activeDest.packages.map((pkg) => {
                                    const isActive = activeMap[pkg.id] ?? pkg.active;
                                    const pct = Math.round((pkg.booked / pkg.weeklyCapacity) * 100);
                                    return (
                                        <div key={pkg.id} className="rounded-xl border-[1.5px] border-primary bg-primary/30 px-4 py-3">
                                            <div className="flex items-start gap-3 lg:items-center">
                                                {/* Toggle */}
                                                <Switch checked={isActive} onCheckedChange={() => toggleActive(pkg.id)} className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-foreground/20" aria-label={isActive ? 'Deactivate' : 'Activate'} aria-checked={isActive} />

                                                {/* Name + meta */}
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-base md:text-lg lg:text-xl mb-1">{pkg.name}</p>
                                                    <p className=" text-xs text-muted-foreground">
                                                        {pkg.nights} nights · ${pkg.pricePerPerson.toLocaleString()}/person
                                                    </p>
                                                    {/* Capacity — mobile only */}
                                                    <div className="mt-2 flex flex-wrap items-center gap-2 lg:hidden">
                                                        <CapacityRow pkg={pkg} pct={pct} showBar />
                                                    </div>
                                                </div>

                                                {/* Capacity — desktop only */}
                                                <div className="hidden items-center gap-2 lg:flex">
                                                    <CapacityRow pkg={pkg} pct={pct} showBar />
                                                </div>

                                                {/* Edit / Delete */}
                                                <div className="flex shrink-0 gap-1.5">
                                                    <IconBtn
                                                        aria-label="Edit package"
                                                        onClick={() => setEditingPkg(toFormData(pkg))}
                                                    >
                                                        <PenLine className="h-3.5 w-3.5" />
                                                    </IconBtn>
                                                    <IconBtn variant="danger" aria-label="Delete package">
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </IconBtn>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card>
                )}

                {/* ── Blocked Weeks ─────────────────────────────────────── */}
                {blockedWeeks.filter((w) => w.destinationId === selectedDest).length > 0 && (
                    <Card>
                        <h2 className={cn(heading, 'mb-4')}>Blocked Weeks — {activeDest?.name}</h2>
                        <div className="space-y-3">
                            {blockedWeeks
                                .filter((w) => w.destinationId === selectedDest)
                                .map((w) => (
                                    <div key={w.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                <CalendarX className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className=" text-sm font-medium text-foreground">{w.dateRange}</p>
                                                <p className=" text-xs text-muted-foreground">{w.reason}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className='cursor-pointer'>Unblock</Button>
                                    </div>
                                ))}
                        </div>
                    </Card>
                )}
            </div>

            {/* ── Modals ────────────────────────────────────────────────── */}
            {showAddDest && <AddDestinationModal onClose={() => setShowAddDest(false)} />}

            {/* Add Package modal */}
            {showAddPkg && (
                <AddPackageModal
                    destinationName={activeDest?.name}
                    onClose={() => setShowAddPkg(false)}
                    onSubmit={(data) => console.log('Add package:', data)}
                />
            )}

            {/* Edit Package modal — same component, pre-filled via initialData */}
            {editingPkg && (
                <AddPackageModal
                    initialData={editingPkg}
                    destinationName={activeDest?.name}
                    onClose={() => setEditingPkg(null)}
                    onSubmit={(data) => {
                        console.log('Update package', editingPkg.id, data);
                        // Update activeMap if the active flag changed
                        setActiveMap((prev) => ({ ...prev, [editingPkg.id]: data.active }));
                    }}
                />
            )}
        </AdminLayout>
    );
}

/* ── Shared style tokens ──────────────────────────────────────────────── */
const heading = 'text-lg md:text-xl text-2xl';
const inputCls = 'w-20 rounded-md border border-primary bg-background px-3 py-2  text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all';


/* ── Sub-components ───────────────────────────────────────────────────── */
function Card({ children }: { children: React.ReactNode }) {
    return <div className="rounded-2xl border border-primary/70 bg-card p-4 shadow-sm sm:p-6">{children}</div>;
}

function SettingField({ label, suffix, children }: { label: string; suffix: string; children: React.ReactNode }) {
    return (
        <div className='space-y-3'>
            <label className="font-oswald mb-1.5 block text-muted-foreground">{label}</label>
            <div className="flex flex-wrap items-center gap-3">{children}<span className="text-xs text-muted-foreground">{suffix}</span></div>
        </div>
    );
}

function CapacityRow({ pkg, pct, showBar }: { pkg: Package; pct: number; showBar?: boolean }) {
    return (
        <>
            <span className=" whitespace-nowrap text-xs text-muted-foreground">Weekly cap:</span>
            {/* <div className='flex items-center gap-2 bg-secondary-foreground rounded-md p-2 cursor-pointer'>
                <span className=" text-xs font-medium text-foreground">{pkg.weeklyCapacity}</span>
                <button type="button" className="text-muted-foreground transition hover:text-primary cursor-pointer" aria-label="Edit capacity">
                    <PenLine className="h-3.5 w-3.5" />
                </button>
            </div> */}
            {showBar && (
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted sm:w-20">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
            )}
            <span className=" text-xs text-muted-foreground">{pkg.booked}/{pkg.weeklyCapacity}</span>
        </>
    );
}

function IconBtn({ children, variant = 'default', 'aria-label': ariaLabel, onClick }: {
    children: React.ReactNode;
    variant?: 'default' | 'danger';
    'aria-label': string;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md transition bg-secondary-foreground cursor-pointer',
                variant === 'danger'
                    ? 'hover:border-destructive hover:text-destructive'
                    : 'hover:border-primary hover:text-primary',
            )}
        >
            {children}
        </button>
    );
}