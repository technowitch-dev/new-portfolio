import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import DOMPurify from 'dompurify';

import PublicLayout from '@/layouts/public-layout';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_at: string | null;
    created_at: string;
    images: string[];
}

interface BlogPostNav {
    id: number;
    slug: string;
    title: string;
}

interface BlogShowProps {
    post: BlogPost;
    previousPost?: BlogPostNav | null;
    nextPost?: BlogPostNav | null;
}

export default function BlogShow({ post, previousPost, nextPost }: BlogShowProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Draft';
        return new Date(dateString).toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const images = post.images ?? [];
    const hasMultipleImages = images.length > 1;

    useEffect(() => {
        if (!hasMultipleImages || isPaused) return;
        intervalRef.current = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % images.length);
        }, 15000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [hasMultipleImages, isPaused, images.length]);

    const goToPrevious = () => {
        setCurrentIndex((i) => (i - 1 + images.length) % images.length);
        setIsPaused(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const goToNext = () => {
        setCurrentIndex((i) => (i + 1) % images.length);
        setIsPaused(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
    };
    const cleanContent = DOMPurify.sanitize(post.content);

    return (
        <PublicLayout title={post.title}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Fixed prev/next: hidden on small screens to avoid overlapping content; shown from sm up */}
                {nextPost && (
                    <Link
                        href={`/blog/${nextPost.slug}`}
                        className="hidden sm:flex fixed left-4 top-1/2 -translate-y-1/2 p-3 min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-portfolio-color1 text-portfolio-color2 hover:text-portfolio-text shadow-lg hover:bg-portfolio-color2 transition-colors z-10"
                        aria-label={`Next: ${nextPost.title}`}
                        title="Next Post"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Link>
                )}
                {previousPost && (
                    <Link
                        href={`/blog/${previousPost.slug}`}
                        className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 p-3 min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-portfolio-color1 text-portfolio-color2 hover:text-portfolio-text shadow-lg hover:bg-portfolio-color2 transition-colors z-10"
                        aria-label={`Previous: ${previousPost.title}`}
                        title="Previous Post"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Link>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center min-h-[44px] space-x-2 text-portfolio-color2 hover:text-portfolio-text transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Blog</span>
                    </Link>
                    {/* Inline prev/next for mobile (fixed links hidden on small screens) */}
                    <nav className="flex items-center gap-3 sm:hidden" aria-label="Adjacent posts">
                        {nextPost && (
                            <Link
                                href={`/blog/${nextPost.slug}`}
                                className="inline-flex items-center min-h-[44px] min-w-[44px] justify-center rounded-md bg-portfolio-color2 px-3 py-2 text-portfolio-text hover:bg-portfolio-color1 transition-colors text-sm"
                                aria-label={`Next: ${nextPost.title}`}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Link>
                        )}
                        {previousPost && (
                            <Link
                                href={`/blog/${previousPost.slug}`}
                                className="inline-flex items-center min-h-[44px] min-w-[44px] justify-center rounded-md bg-portfolio-color2 px-3 py-2 text-portfolio-text hover:bg-portfolio-color1 transition-colors text-sm"
                                aria-label={`Previous: ${previousPost.title}`}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        )}
                    </nav>
                </div>

                <article className="bg-portfolio-color1 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg">
                    <header className="mb-6">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-portfolio-text mb-4">{post.title}</h1>
                        <div className="flex items-center space-x-2 text-portfolio-color2">
                            <Calendar className="h-5 w-5" />
                            <span>{formatDate(post.published_at)}</span>
                        </div>
                    </header>

                    {/* Blog Images Gallery / Carousel */}
                    {images.length > 0 && (
                        <div className="mb-8">
                            {hasMultipleImages ? (
                                <div
                                    className="relative rounded-lg overflow-hidden bg-portfolio-bg"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    <img
                                        src={`/uploads/${images[currentIndex]}`}
                                        alt={`${post.title} - Image ${currentIndex + 1}`}
                                        className="w-full h-auto object-contain"
                                    />
                                    <button
                                        type="button"
                                        onClick={goToPrevious}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-color2"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-color2"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                                        {currentIndex + 1} / {images.length}
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-lg overflow-hidden bg-portfolio-bg">
                                    <img
                                        src={`/uploads/${images[0]}`}
                                        alt={`${post.title}`}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Blog Content */}
                    <div
                        className="prose max-w-none sm:prose-lg text-portfolio-text"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                    />
                </article>
            </div>
        </PublicLayout>
    );
}