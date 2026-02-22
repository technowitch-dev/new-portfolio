import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

import LogoIcon from '@/components/icons/logo-icon';
import { PortfolioNav } from '@/components/portfolio-nav';
import { home } from '@/routes';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-portfolio-bg">
            <PortfolioNav />
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-portfolio-bg p-6 md:p-10">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-15 w-15 items-center justify-center rounded-md">
                                <LogoIcon className="fill-current" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium text-portfolio-text">{title}</h1>
                            <p className="text-center text-sm text-portfolio-text">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
