import { Form, Head, Link } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { ArrowRight } from 'lucide-react';
import { PasswordInput } from '@/components/ui/password-input';
import TextLink from '@/components/text-link';

export default function Register() {
    return (
        <AuthLayout
            title="Sign up"
            description="Sign up or create an account"
        >
            <Head title="Register" />

            <div className="w-full">
                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="space-y-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <FieldSet className="space-y-6">
                                <FieldGroup className="gap-7">
                                    <Field>
                                        <FieldLabel htmlFor="name" className="font-oswald mb-2 block text-lg md:text-xl">Full Name</FieldLabel>
                                        <Input id="name" type="text" required autoFocus name="name" placeholder="John Doe" className="bg-card/50" />
                                        <InputError message={errors.name} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="email" className="font-oswald mb-2 block text-lg md:text-xl">Email address</FieldLabel>
                                        <Input id="email" type="email" required name="email" placeholder="name@company.com" className="bg-card/50" />
                                        <InputError message={errors.email} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="password" className="font-oswald mb-2 block text-lg md:text-xl">Password</FieldLabel>
                                        <PasswordInput id="password" required name="password" placeholder="••••••••" className="bg-card/50" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password_confirmation" className="font-oswald mb-2 block text-lg md:text-xl">Confirm Password</FieldLabel>
                                        <PasswordInput id="password_confirmation" required name="password_confirmation" placeholder="••••••••" className="bg-card/50" />
                                    </Field>

                                    <Button type="submit" className={`w-full py-6 text-lg ${processing ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={processing}>
                                        {processing && <Spinner className="mr-2 h-4 w-4" />}
                                        {processing ? <Spinner className="h-4 w-4" /> : <>Continue <ArrowRight className="h-4 w-4" /></>}
                                    </Button>
                                </FieldGroup>
                            </FieldSet>
                        </>
                    )}
                </Form>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={login()} className="font-medium text-primary hover:text-primary/90 transition-colors underline-offset-4 hover:underline">
                        Log in
                    </TextLink>
                </div>
            </div>
        </AuthLayout >
    );
}