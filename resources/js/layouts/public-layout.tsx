import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

import { PortfolioNav } from '@/components/portfolio-nav';

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title }: PublicLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-portfolio-bg">
                <PortfolioNav />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
            </div>
        </>
    );
}