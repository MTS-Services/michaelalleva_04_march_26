import { PageHeader } from '@/components/dashboard/page-header';
import UserLayout from '@/layouts/user-layout';
import { Download, Headphones, Info, PenLine } from 'lucide-react';
import { useState } from 'react';

interface ProfileData {
    fullName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    country: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
}

interface ProfilePageProps {
    userName?: string;
    profile?: ProfileData;
}

const DEMO_PROFILE: ProfileData = {
    fullName: '',
    dateOfBirth: '15-Mar-1992',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    country: 'United States',
    streetAddress: '1234 oak Street',
    city: 'Austin',
    state: 'Texas',
    zipCode: '78701',
};

export default function ProfilePage({
    userName = 'Sarah Johnson',
    profile = DEMO_PROFILE,
}: ProfilePageProps) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<ProfileData>(profile);
    const set = (k: keyof ProfileData, v: string) => setForm((p) => ({ ...p, [k]: v }));

    return (
        <UserLayout userName={userName}>
            <div className="space-y-6">
                <PageHeader
                    title="Profile Settings"
                    subtitle="Manage your account information and verification status"
                />

                <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                    {/* Left: forms */}
                    <div className="space-y-5">
                        {/* Personal Information */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="font-oswald font-semibold text-foreground">
                                    Personal Information
                                </h2>
                                <button
                                    onClick={() => setEditing((e) => !e)}
                                    className="font-libre-franklin flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                                >
                                    <PenLine className="h-3.5 w-3.5" />
                                    {editing ? 'Done' : 'Edit'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                <ProfileField label="Full name">
                                    <input readOnly={!editing} value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Name" className={inputCls(editing)} />
                                </ProfileField>
                                <ProfileField label="Date of Birth">
                                    <input readOnly={!editing} value={form.dateOfBirth} onChange={(e) => set('dateOfBirth', e.target.value)} className={inputCls(editing)} />
                                </ProfileField>
                                <ProfileField label="Email">
                                    <input readOnly={!editing} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls(editing)} />
                                </ProfileField>
                                <div className="grid grid-cols-2 gap-4">
                                    <ProfileField label="Phone Number (US Only)">
                                        <input readOnly={!editing} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls(editing)} />
                                    </ProfileField>
                                    <ProfileField label="Country">
                                        <input readOnly={!editing} value={form.country} onChange={(e) => set('country', e.target.value)} className={inputCls(editing)} />
                                    </ProfileField>
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="font-oswald mb-5 font-semibold text-foreground">
                                Address Information
                            </h2>
                            <div className="space-y-4">
                                <ProfileField label="Street Address">
                                    <input readOnly={!editing} value={form.streetAddress} onChange={(e) => set('streetAddress', e.target.value)} className={inputCls(editing)} />
                                </ProfileField>
                                <div className="grid grid-cols-3 gap-4">
                                    <ProfileField label="City">
                                        <input readOnly={!editing} value={form.city} onChange={(e) => set('city', e.target.value)} className={inputCls(editing)} />
                                    </ProfileField>
                                    <ProfileField label="State">
                                        <input readOnly={!editing} value={form.state} onChange={(e) => set('state', e.target.value)} className={inputCls(editing)} />
                                    </ProfileField>
                                    <ProfileField label="Zip Code">
                                        <input readOnly={!editing} value={form.zipCode} onChange={(e) => set('zipCode', e.target.value)} className={inputCls(editing)} />
                                    </ProfileField>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: actions + notice */}
                    <div className="space-y-4">
                        {/* Quick Actions */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h3 className="font-oswald mb-3 font-semibold text-foreground">
                                Quick actions
                            </h3>
                            <div className="space-y-2">
                                <button className="font-libre-franklin flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                                    <Download className="h-4 w-4" />
                                    Download Invoice
                                </button>
                                <button className="font-libre-franklin flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
                                    <Headphones className="h-4 w-4" />
                                    Contact Support
                                </button>
                            </div>
                        </div>

                        {/* USA Clients Only */}
                        <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/40 dark:bg-yellow-900/10">
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400">
                                <Info className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="font-libre-franklin mb-1 text-sm font-semibold text-foreground">
                                    USA Clients Only
                                </p>
                                <p className="font-libre-franklin mb-2 text-xs text-muted-foreground">
                                    Our services are exclusively available to residents of the United States.
                                </p>
                                <ul className="space-y-1">
                                    {['US phone number required', 'US address required', 'Verification mandatory'].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                                            <span className="font-libre-franklin text-xs text-muted-foreground">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

const inputCls = (editing: boolean) =>
    `w-full rounded-xl border ${editing ? 'border-primary/40 bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20' : 'border-border bg-muted/20'} px-4 py-3 font-libre-franklin text-sm text-foreground placeholder:text-muted-foreground transition-all`;

function ProfileField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="font-oswald mb-1.5 block text-sm font-medium text-foreground">
                {label}
            </label>
            {children}
        </div>
    );
}