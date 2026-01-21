import { Link } from '@inertiajs/react';
import { Calendar, ArrowLeft } from 'lucide-react';

import PublicLayout from '@/layouts/public-layout';

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

interface BlogShowProps {
    post: BlogPost;
}

export default function BlogShow({ post }: BlogShowProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Draft';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Sort images by order
    const sortedImages = post.images
        ? [...post.images].sort((a, b) => a.order - b.order)
        : [];

    return (
        <PublicLayout title={post.title}>
            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center space-x-2 text-portfolio-color2 hover:text-portfolio-text transition-colors mb-6"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Blog</span>
                </Link>

                <article className="bg-portfolio-color1 rounded-lg p-8 shadow-lg">
                    <header className="mb-6">
                        <h1 className="text-4xl text-portfolio-text mb-4">{post.title}</h1>
                        <div className="flex items-center space-x-2 text-portfolio-color2">
                            <Calendar className="h-5 w-5" />
                            <span>{formatDate(post.published_at)}</span>
                        </div>
                    </header>

                    {/* Blog Images Gallery */}
                    {sortedImages.length > 0 && (
                        <div className="mb-8 space-y-4">
                            {sortedImages.map((image) => (
                                <div key={image.id} className="rounded-lg overflow-hidden">
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={`${post.title} - Image ${image.order + 1}`}
                                        className="w-full h-auto object-contain bg-portfolio-bg"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Blog Content */}
                    <div
                        className="prose prose-lg max-w-none text-portfolio-text"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </PublicLayout>
    );
}