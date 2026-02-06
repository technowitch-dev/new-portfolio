import { useForm } from '@inertiajs/react';
import { ArrowLeft, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Checkbox } from '@/components/ui/checkbox';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_at: string | null;
    created_at: string;
    images?: string[];  // Array of image paths
    is_draft: boolean;
}

interface BlogEditProps {
    post: BlogPost;
}

export default function BlogEdit({ post }: BlogEditProps) {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
        slug: post.slug,
        is_draft: post.is_draft,
        images: [] as File[],
        existing_images: post.images ?? [],
        deleted_images: [] as string[],
    });

    const removeExistingImage = (path: string) => {
        setData('existing_images', data.existing_images.filter((p) => p !== path));
        setData('deleted_images', [...data.deleted_images, path]);
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setData('images', [...data.images, ...files]);
            
            // Create previews for new images
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...previews]);
        }
    };

    const removeNewImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setData('images', newImages);
        setImagePreviews(newPreviews);
        // Revoke the URL to free memory
        URL.revokeObjectURL(imagePreviews[index]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/blog/${post.id}`, {
            forceFormData: true,
            onSuccess: () => {
                // Clean up preview URLs
                imagePreviews.forEach(url => URL.revokeObjectURL(url));
            },
        });
    };

    const existingImages = data.existing_images || [];

    return (
        <PublicLayout title="Edit Blog Post">
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/blog" className="text-portfolio-color2 hover:text-portfolio-text">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-4xl text-portfolio-text mb-8">Edit Blog Post</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-portfolio-color1 rounded-lg shadow-lg p-6 space-y-6">
                    <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => {
                                setData('title', e.target.value);
                                // Auto-generate slug if empty
                                if (!data.slug) {
                                    const slug = e.target.value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, '-')
                                        .replace(/(^-|-$)/g, '');
                                    setData('slug', slug);
                                }
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
                            URL: /blog/{data.slug || 'your-slug'}
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
                        Uncheck to publish. Check to save as draft.
                    </p>
                    <div>
                        <Label>Existing Images</Label>
                        {existingImages.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                {existingImages.map((path) => (
                                    <div key={path} className="relative group">
                                        <img
                                            src={`/storage/${path}`}
                                            alt={`Image ${existingImages.indexOf(path) + 1}`}
                                            className="w-full h-32 object-cover rounded border border-portfolio-color2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(path)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete image"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-portfolio-color2 mt-2">No existing images</p>
                        )}
                    </div>
                    {data.deleted_images.map((path, index) => (
                    
                        <input
                            key={path}
                            type="hidden"
                            name={`deleted_images[${index}]`}
                            value={path}
                        />
                    ))}

                    <div>
                        <Label htmlFor="images">Add New Images</Label>
                        <div className="mt-1">
                            <Input
                                id="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="mb-2"
                            />
                            <p className="text-sm text-portfolio-color2 mb-4">
                                Select multiple images to add. They will be appended to existing images.
                            </p>
                            
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`New preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded border border-portfolio-color2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="absolute bottom-1 left-1 bg-blue-500 bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                                New {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href="/admin/blog">
                            <Button type="button" variant="outline" className="font-gothica">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="font-gothica text-portfolio-text bg-portfolio-bg hover:bg-portfolio-color2 transition-colors duration-200">
                            {processing ? 'Updating...' : 'Update Post'}
                        </Button>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
