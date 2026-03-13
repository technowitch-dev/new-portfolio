import { useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function LinkCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        url: '',
        description: '',
        category: '',
        order: 0,
        icon: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/links', {
            forceFormData: true,
        });
    };

    return (
        <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/links" className="text-portfolio-color2 hover:text-portfolio-text">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-4xl text-portfolio-text mb-8">Create Link</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-portfolio-color1 rounded-lg shadow-lg p-6 space-y-6">
                    <div>
                        <Label htmlFor="title" className="text-portfolio-text">Title *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 text-portfolio-text"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="url" className="text-portfolio-text">URL *</Label>
                        <Input
                            id="url"
                            type="url"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                            className="mt-1 text-portfolio-text"
                        />
                        {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description" className="text-portfolio-text">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 text-portfolio-text"
                            rows={3}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <Label htmlFor="category" className="text-portfolio-text">Category</Label>
                        <Input
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1 text-portfolio-text placeholder:text-portfolio-color2"
                            placeholder="e.g., Tools, Projects, Resources"
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <Label htmlFor="order" className="text-portfolio-text">Order</Label>
                        <Input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                            className="mt-1 text-portfolio-text"
                        />
                        {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
                    </div>

                    <div>
                        <Label htmlFor="icon" className="text-portfolio-text">Icon</Label>
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
                            className="mt-1 text-portfolio-color2"
                        />
                        {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon}</p>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href="/admin/links">
                            <Button type="button" variant="outline" className="font-gothica text-portfolio-text transition-colors duration-200">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="font-gothica text-portfolio-text bg-portfolio-bg hover:bg-portfolio-color2 transition-colors duration-200">
                            {processing ? 'Creating...' : 'Create Link'}
                        </Button>
                    </div>
                </form>
            </div>
    );
}
