import { Form, Head, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { SharedData } from '@/types';
import { Field, FieldContent, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { ArrowRight } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status }: LoginProps) {
    const { features } = usePage<SharedData>().props;

    return (
        <AuthLayout
            title="Sign in"
            description="Sign in or create an account"
        >
            <Head title="Log in" />

            <div className="w-full">
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="space-y-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <FieldSet className="space-y-6">
                                <FieldGroup className="gap-7">
                                    <Field className=''>
                                        <FieldLabel htmlFor="email" className="font-oswald mb-2 block text-lg md:text-xl">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            placeholder="name@company.com"
                                        />
                                        <InputError message={errors.email} />
                                    </Field>


                                    <Field>
                                        <div className="flex items-center justify-between ml-1">
                                            <FieldLabel htmlFor="password" className="font-oswald mb-2 block text-lg md:text-xl">
                                                Password
                                            </FieldLabel>
                                            {features.canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-xs font-semibold text-primary hover:text-primary/90 transition-colors underline-offset-4 hover:underline"
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            placeholder="********"
                                        />
                                        <InputError message={errors.password} />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>

                            <Button
                                type="submit"
                                className={`w-full py-6 text-lg ${processing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={processing}
                            >
                                {processing ? <Spinner className="h-4 w-4" /> : <>Continue <ArrowRight className="h-4 w-4" /></>}
                            </Button>
                        </>
                    )}
                </Form>

                {features.canRegister && (
                    <p className="text-center text-sm text-muted-foreground mt-4">
                        New here? <TextLink href={register()} className="text-primary font-semibold hover:text-primary/90 underline-offset-4 hover:underline">Create an account</TextLink>
                    </p>
                )}

                {status && (
                    <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center text-sm font-medium text-emerald-600 animate-in fade-in slide-in-from-top-2">
                        {status}
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}