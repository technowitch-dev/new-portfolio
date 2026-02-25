import { useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Link {
    id: number;
    title: string;
    url: string;
    description?: string;
    category?: string;
    order: number;
    icon?: string;
}

interface LinkEditProps {
    link: Link;
}

export default function LinkEdit({ link }: LinkEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: link.title,
        url: link.url,
        description: link.description || '',
        category: link.category || '',
        order: link.order,
        icon: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/links/${link.id}`, {
            forceFormData: true,
        });
    };

    return (
        <PublicLayout title="Edit Link">
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/links" className="text-portfolio-color2 hover:text-portfolio-text">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-4xl text-portfolio-text mb-8">Edit Link</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-portfolio-color1 rounded-lg shadow-lg p-6 space-y-6">
                    <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="url">URL *</Label>
                        <Input
                            id="url"
                            type="url"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                            className="mt-1"
                        />
                        {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1"
                            rows={3}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1"
                            placeholder="e.g., Tools, Projects, Resources"
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <Label htmlFor="order">Order</Label>
                        <Input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                            className="mt-1"
                        />
                        {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
                    </div>

                    <div>
                        <Label htmlFor="icon">Icon</Label>
                        {link.icon && (
                            <div className="mb-2">
                                <p className="text-sm text-portfolio-color2 mb-2">Current icon:</p>
                                <img
                                    src={`/uploads/${link.icon}`}
                                    alt={link.title}
                                    className="h-16 w-16 object-contain border border-portfolio-color2 rounded"
                                />
                            </div>
                        )}
                        <Input
                            id="icon"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setData('icon', file);
                                }
                            }}
                            className="mt-1"
                        />
                        <p className="text-sm text-portfolio-color2 mt-1">
                            {link.icon ? 'Upload a new icon to replace the current one' : 'Upload an icon image'}
                        </p>
                        {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon}</p>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href="/admin/links">
                            <Button type="button" variant="outline" className="font-gothica">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="font-gothica">
                            {processing ? 'Updating...' : 'Update Link'}
                        </Button>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
