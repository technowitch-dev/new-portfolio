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

interface BlogShowProps {
    post: BlogPost;
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

export default function BlogShow({ post }: BlogShowProps) {
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
                                        src={`/storage/${images[currentIndex]}`}
                                        alt={`${post.title} - Image ${currentIndex + 1}`}
                                        className="w-full h-auto object-contain"
                                    />
                                    <button
                                        type="button"
                                        onClick={goToPrevious}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-color2"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-color2"
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
                                        src={`/storage/${images[0]}`}
                                        alt={`${post.title}`}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Blog Content */}
                    <div
                        className="prose prose-lg max-w-none text-portfolio-text"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                    />
                </article>
            </div>
        </PublicLayout>
    );
}