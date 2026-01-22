import { useForm } from '@inertiajs/react';
import { ArrowLeft, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/date-time-picker';

interface BlogPostImage {
    id: number;
    image_path: string;
    order: number;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_at: string | null;
    created_at: string;
    images?: BlogPostImage[];
}

interface BlogEditProps {
    post: BlogPost;
}

export default function BlogEdit({ post }: BlogEditProps) {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
    
    // Format published_at for DateTimePicker (format: "yyyy-MM-dd'T'HH:mm")
    const formatDateTimeForPicker = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
        slug: post.slug,
        published_at: formatDateTimeForPicker(post.published_at),
        images: [] as File[],
        delete_images: [] as number[],
    });

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

    const markImageForDeletion = (imageId: number) => {
        if (!imagesToDelete.includes(imageId)) {
            setImagesToDelete([...imagesToDelete, imageId]);
            setData('delete_images', [...data.delete_images, imageId]);
        }
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

    const existingImages = post.images?.filter(img => !imagesToDelete.includes(img.id)) || [];

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

                    <div>
                        <Label htmlFor="published_at">Publish Date</Label>
                        <div className="mt-1">
                            <DateTimePicker
                                value={data.published_at}
                                onChange={(value) => setData('published_at', value)}
                                placeholder="Select publish date and time"
                            />
                        </div>
                        <p className="text-sm text-portfolio-color2 mt-1">
                            Leave empty to save as draft. Set a future date to schedule publication.
                        </p>
                        {errors.published_at && <p className="text-red-500 text-sm mt-1">{errors.published_at}</p>}
                    </div>

                    <div>
                        <Label>Existing Images</Label>
                        {existingImages.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                {existingImages.map((image) => (
                                    <div key={image.id} className="relative group">
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={`Image ${image.order + 1}`}
                                            className="w-full h-32 object-cover rounded border border-portfolio-color2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => markImageForDeletion(image.id)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete image"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                            Order: {image.order}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-portfolio-color2 mt-2">No existing images</p>
                        )}
                        {imagesToDelete.length > 0 && (
                            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                                {imagesToDelete.length} image(s) marked for deletion
                            </p>
                        )}
                    </div>

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
                        {errors['images.*'] && <p className="text-red-500 text-sm mt-1">{errors['images.*']}</p>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href="/admin/blog">
                            <Button type="button" variant="outline" className="font-gothica">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="font-gothica">
                            {processing ? 'Updating...' : 'Update Post'}
                        </Button>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
