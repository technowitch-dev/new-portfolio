import type { SubmitEvent } from 'react';
import { router, useForm } from '@inertiajs/react';

import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Field, Switch } from '@headlessui/react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
interface SettingsProps {
    colorScheme: {
        background: string;
        color1: string;
        color2: string;
        text: string;
    };
    registrationEnabled: boolean;
}

export default function Settings({ colorScheme, registrationEnabled }: SettingsProps) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, put, processing, errors } = useForm({
        background: colorScheme.background,
        color1: colorScheme.color1,
        color2: colorScheme.color2,
        text: colorScheme.text,
        name: auth.user.name,
        email: auth.user.email,
        password: '',
        password_confirmation: '',
    });

    const handleColorSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        put('/admin/settings/colors');
    };

    const handleUserSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        put('/admin/settings/user_settings');
    };

    const handleRegistrationChange = (checked: boolean) => {
        router.put('/admin/settings/registration', { registration_enabled: checked });
    };

    return (
        <PublicLayout title="Settings">
            <div className="space-y-6">
                <h1 className="text-4xl text-portfolio-text mb-8">Settings</h1>

                <section className="bg-portfolio-color1 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-portfolio-text">Color Scheme</h2>
                    
                    <form onSubmit={handleColorSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="background">Background Color</Label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Input
                                        id="background"
                                        type="color"
                                        value={data.background}
                                        onChange={(e) => setData('background', e.target.value)}
                                        className="w-20 h-10 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={data.background}
                                        onChange={(e) => setData('background', e.target.value)}
                                        className="flex-1"
                                        pattern="^#[0-9A-Fa-f]{6}$"
                                    />
                                </div>
                                {errors.background && (
                                    <p className="text-red-500 text-sm mt-1">{errors.background}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="color1">Color 1</Label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Input
                                        id="color1"
                                        type="color"
                                        value={data.color1}
                                        onChange={(e) => setData('color1', e.target.value)}
                                        className="w-20 h-10 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={data.color1}
                                        onChange={(e) => setData('color1', e.target.value)}
                                        className="flex-1"
                                        pattern="^#[0-9A-Fa-f]{6}$"
                                    />
                                </div>
                                {errors.color1 && (
                                    <p className="text-red-500 text-sm mt-1">{errors.color1}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="color2">Color 2</Label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Input
                                        id="color2"
                                        type="color"
                                        value={data.color2}
                                        onChange={(e) => setData('color2', e.target.value)}
                                        className="w-20 h-10 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={data.color2}
                                        onChange={(e) => setData('color2', e.target.value)}
                                        className="flex-1"
                                        pattern="^#[0-9A-Fa-f]{6}$"
                                    />
                                </div>
                                {errors.color2 && (
                                    <p className="text-red-500 text-sm mt-1">{errors.color2}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="text">Text Color</Label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Input
                                        id="text"
                                        type="color"
                                        value={data.text}
                                        onChange={(e) => setData('text', e.target.value)}
                                        className="w-20 h-10 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={data.text}
                                        onChange={(e) => setData('text', e.target.value)}
                                        className="flex-1"
                                        pattern="^#[0-9A-Fa-f]{6}$"
                                    />
                                </div>
                                {errors.text && (
                                    <p className="text-red-500 text-sm mt-1">{errors.text}</p>
                                )}
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="mt-6 p-6 rounded-lg border border-portfolio-color2" style={{ backgroundColor: data.background }}>
                            <h3 className="text-xl mb-4" style={{ color: data.text }}>Preview</h3>
                            <div className="space-y-2">
                                <div className="p-4 rounded" style={{ backgroundColor: data.color1 }}>
                                    <p style={{ color: data.text }}>Color 1 Preview</p>
                                </div>
                                <div className="p-4 rounded" style={{ backgroundColor: data.color2 }}>
                                    <p style={{ color: data.text }}>Color 2 Preview</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} className="font-gothica bg-portfolio-bg hover:bg-portfolio-color2 text-portfolio-text transition-colors duration-200">
                                {processing ? 'Saving...' : 'Save Colours'}
                            </Button>
                        </div>
                    </form>
                </section>

                <section className="bg-portfolio-color1 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-portfolio-text">Site Settings</h2>
                        <Field>
                            <Label className="mr-4 h-6">Enable User Registration</Label>
                            <Switch
                                checked={registrationEnabled}
                                onChange={handleRegistrationChange}
                                className="group inline-flex h-6 w-11 items-center rounded-full bg-portfolio-color2 transition data-checked:bg-portfolio-bg"
                            >
                                <span className="size-4 translate-x-1 rounded-full bg-portfolio-text transition group-data-checked:translate-x-6" />
                            </Switch>
                        </Field>
                </section>

                <section className="bg-portfolio-color1 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-portfolio-text">User Settings</h2>
                        <form onSubmit={handleUserSubmit} className="space-y-6">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required/>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="text" value={data.email} onChange={(e) => setData('email', e.target.value)} required/>
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)}/>
                        <Label htmlFor="password_confirmation">Confirm New Password</Label>
                        <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)}/>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} className="font-gothica bg-portfolio-bg hover:bg-portfolio-color2 text-portfolio-text transition-colors duration-200">
                                {processing ? 'Saving...' : 'Save User Settings'}
                            </Button>
                        </div>
                        </form>
                </section>
            </div>
        </PublicLayout>
    );
}
