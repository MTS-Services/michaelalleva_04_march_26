import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/layouts/admin-layout';
import { cn } from '@/lib/utils';
import { Download, Headphones, Info, PenLine } from 'lucide-react';
import { useState } from 'react';

interface ProfileData {
    fullName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}

interface ProfilePageProps {
    profile?: ProfileData;
}

const DEMO_PROFILE: ProfileData = {
    fullName: '',
    email: 'sarah.johnson@email.com',
};

export default function ProfilePage({
    profile = DEMO_PROFILE,
}: ProfilePageProps) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<ProfileData>(profile);
    const set = (k: keyof ProfileData, v: string) => setForm((p) => ({ ...p, [k]: v }));

    return (
        <AdminLayout activeSlug="profile">
            <div className="space-y-6">
                <PageHeader
                    title="Profile Settings"
                    subtitle="Manage your account information and verification status"
                />

                <div className="space-y-5">
                    {/* Personal Information */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="font-oswald text-lg md:text-xl lg:text-2xl">
                                Personal Information
                            </h2>
                            <Button
                                onClick={() => setEditing((e) => !e)}
                                className='cursor-pointer'
                            >
                                <PenLine className="h-3.5 w-3.5" />
                                {editing ? 'Done' : 'Edit'}
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <ProfileField label="Full name">
                                <Input readOnly={!editing} value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Name" className={cn(!editing && 'border-primary cursor-help')} />
                            </ProfileField>

                            <ProfileField label="Email">
                                <Input readOnly={!editing} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={cn(!editing && 'border-primary cursor-help')} />
                            </ProfileField>
                            <div className="grid grid-cols-2 gap-4">
                                <ProfileField label="Password">
                                    <Input readOnly={!editing} type="password" value={form.password} onChange={(e) => set('password', e.target.value)} className={cn(!editing && 'border-primary cursor-help')} placeholder="Password" />
                                </ProfileField>
                                <ProfileField label="Confirm Password">
                                    <Input readOnly={!editing} type="password" value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} className={cn(!editing && 'border-primary cursor-help')} placeholder="Confirm Password" />
                                </ProfileField>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </AdminLayout>
    );
}

const inputCls = (editing: boolean) =>
    `w-full rounded-xl border ${editing ? 'border-primary/40 bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20' : 'border-border bg-muted/20'} px-4 py-3 font-libre-franklin text-sm text-foreground placeholder:text-muted-foreground transition-all`;

function ProfileField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className='space-y-2'>
            <label className="text-base md:text-lg lg:text-xl block">
                {label}
            </label>
            {children}
        </div>
    );
}