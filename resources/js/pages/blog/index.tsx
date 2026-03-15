import { Link } from '@inertiajs/react';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_at: string | null;
    created_at: string;
    images?: string[];
}

interface BlogIndexProps {
    posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    // Get excerpt from content (first 150 characters)
    const getExcerpt = (content: string) => {
        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    };

    // Format date
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Draft';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const imageUrl = import.meta.env.VITE_UPLOADS_URL ?? ''

    return (
        <div className="space-y-8">
                <h1 className="text-4xl text-portfolio-text mb-8">Blog</h1>
                
                {posts.length === 0 ? (
                    <div className="bg-portfolio-color1 rounded-lg p-8 text-center">
                        <p className="text-portfolio-text text-lg">
                            No blog posts yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="bg-portfolio-color1 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                            >
                                {post.images && post.images.length > 0 && (
                                    <div className="h-48 overflow-hidden bg-portfolio-bg">
                                        <img
                                            src={`${imageUrl}/${post.images[0]}`}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-2xl text-portfolio-text mb-3 group-hover:text-portfolio-color2 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-portfolio-color2 text-sm mb-4">
                                        {getExcerpt(post.content)}
                                    </p>
                                    <div className="flex items-center justify-between text-portfolio-color2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(post.published_at)}</span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>
                )}
            </div>
    );
}