import { Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Eye, Calendar } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_at: string | null;
    created_at: string;
    images: string[];
}

interface BlogIndexProps {
    posts: BlogPost[];
}

const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

export default function BlogIndex({ posts }: BlogIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            router.delete(`/admin/blog/${id}`);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Draft';
        return new Date(dateString).toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isPublished = (publishedAt: string | null) => {
        if (!publishedAt) return false;
        return new Date(publishedAt) <= new Date();
    };

    return (
        <PublicLayout title="Manage Blog Posts">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl text-portfolio-text mb-8">Manage Blog Posts</h1>
                    <Link href="/admin/blog/create">
                        <Button className="font-gothica bg-portfolio-color1 hover:bg-portfolio-color2 text-portfolio-text transition-colors duration-200 cursor-pointer">
                            <Plus className="h-4 w-4 mr-2" />
                            New Post
                        </Button>
                    </Link>
                </div>

                <div className="bg-portfolio-color1 rounded-lg shadow-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-portfolio-color2">
                        <thead className="bg-portfolio-color2">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-portfolio-text uppercase tracking-wider font-gothica">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-portfolio-text uppercase tracking-wider font-gothica">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-portfolio-text uppercase tracking-wider font-gothica">
                                    Published
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-portfolio-text uppercase tracking-wider font-gothica">
                                    Images
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-portfolio-text uppercase tracking-wider font-gothica">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-portfolio-color1 divide-y divide-portfolio-color2">
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-portfolio-color2">
                                        No blog posts found
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id}>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-portfolio-text">
                                                {post.title}
                                            </div>
                                            <div className="text-sm text-portfolio-color2 mt-1">
                                                {baseUrl}/blog/{post.slug}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {isPublished(post.published_at) ? (
                                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    Published
                                                </Badge>
                                            ) : post.published_at ? (
                                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                    Scheduled
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                                    Draft
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-portfolio-color2">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatDate(post.published_at)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-portfolio-color2">
                                            {post.images && post.images.length > 0 ? (
                                                <span>{post.images.length ?? 0} image{post.images.length !== 1 ? 's' : ''}</span>
                                            ) : (
                                                <span className="text-portfolio-color2 opacity-50">No images</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end items-center space-x-2">
                                                {isPublished(post.published_at) && (
                                                    <a
                                                        href={`/blog/${post.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-portfolio-color2 hover:text-portfolio-text"
                                                        title="View post"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </a>
                                                )}
                                                <Link
                                                    href={`/admin/blog/${post.id}/edit`}
                                                    className="text-portfolio-color2 hover:text-portfolio-text"
                                                    title="Edit post"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                                    title="Delete post"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </PublicLayout>
    );
}
