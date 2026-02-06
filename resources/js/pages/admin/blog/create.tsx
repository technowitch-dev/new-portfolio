import { useForm } from '@inertiajs/react';
import { ArrowLeft, X, Upload } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function BlogCreate() {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        slug: '',
        is_draft: true,
        images: [] as File[],
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setData('images', files);
            
            // Create previews
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const removeImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setData('images', newImages);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/blog', {
            forceFormData: true,
            onSuccess: () => {
                // Clean up preview URLs
                imagePreviews.forEach(url => URL.revokeObjectURL(url));
            },
        });
    };

    return (
        <PublicLayout title="Create Blog Post">
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/blog" className="text-portfolio-color2 hover:text-portfolio-text">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-4xl text-portfolio-text mb-8">Create Blog Post</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-portfolio-color1 rounded-lg shadow-lg p-6 space-y-6">
                    <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => {
                                setData('title', e.target.value); 
                                const slug = e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, '-')
                                    .replace(/(^-|-$)/g, '');
                                setData('slug', slug);
                            }}
                            className="mt-1"
                            placeholder="Enter blog post title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="mt-1"
                            placeholder="url-friendly-slug"
                        />
                        <p className="text-sm text-portfolio-color2 mt-1">
                            Will be auto-generated from title if left empty. URL: /blog/{data.slug || 'your-slug'}
                        </p>
                        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                    </div>

                    <div>
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1"
                            rows={15}
                            placeholder="Write your blog post content here. You can use HTML tags for formatting."
                        />
                        <p className="text-sm text-portfolio-color2 mt-1">
                            HTML is supported. Use &lt;p&gt;, &lt;h1&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, etc.
                        </p>
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_draft"
                            checked={data.is_draft}
                            onCheckedChange={(checked) => setData('is_draft', checked === true)}
                        />
                        <Label htmlFor="is_draft" className="text-sm font-normal cursor-pointer">
                            Save as draft
                        </Label>
                    </div>
                    <p className="text-sm text-portfolio-color2 mt-1">
                        Uncheck to publish immediately. Check to save as draft.
                    </p>

                    <div>
                        <Label htmlFor="images">Images</Label>
                        <div className="mt-1">
                            <Input
                                id="images"
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="mb-2"
                            />
                            <p className="text-sm text-portfolio-color2 mb-4">
                                You can select multiple images. They will be displayed in the order selected.
                            </p>
                            
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded border border-portfolio-color2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                        {'images.*' in errors && <p className="text-red-500 text-sm mt-1">{(errors as Record<string, string>)['images.*']}</p>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href="/admin/blog">
                            <Button type="button" variant="outline" className="font-gothica">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="font-gothica text-portfolio-text bg-portfolio-bg hover:bg-portfolio-color2 transition-colors duration-200">
                            {processing ? 'Creating...' : 'Create Post'}
                        </Button>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
