import { useForm } from '@inertiajs/react';

import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SettingsProps {
    colorScheme: {
        background: string;
        color1: string;
        color2: string;
        text: string;
    };
}

export default function Settings({ colorScheme }: SettingsProps) {
    const { data, setData, put, processing, errors } = useForm({
        background: colorScheme.background,
        color1: colorScheme.color1,
        color2: colorScheme.color2,
        text: colorScheme.text,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/settings/colors');
    };

    return (
        <PublicLayout title="Settings">
            <div className="space-y-6">
                <h1 className="text-4xl text-portfolio-text mb-8">Settings</h1>

                <div className="bg-portfolio-color1 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-portfolio-text">Color Scheme</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="background">Background Color</Label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Input
                                        id="background"
                                        type="color"
                                        value={data.background}
                                        onChange={(e) => setData('background', e.target.value)}
                                        className="w-20 h-10"
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
                                        className="w-20 h-10"
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
                                        className="w-20 h-10"
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
                                        className="w-20 h-10"
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
                            <Button type="submit" disabled={processing} className="font-gothica">
                                {processing ? 'Saving...' : 'Save Colors'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
}
