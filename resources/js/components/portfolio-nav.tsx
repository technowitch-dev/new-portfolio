import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import CrystalBallIcon from '@/components/icons/crystal-ball-icon';
import SpellbookIcon from '@/components/icons/spellbook-icon';
import HutIcon from '@/components/icons/hut-icon';
import WandIcon from '@/components/icons/wand-icon';
import WitchIcon from '@/components/icons/witch-icon';
import { useActiveUrl } from '@/hooks/use-active-url';
//import { home } from '@/routes';
import { type SharedData } from '@/types';
import { logout } from '@/routes';
import { Method } from '@inertiajs/core';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface PortfolioNavProps {
    className?: string;
}

const navLinkBase =
    'flex items-center min-h-[44px] space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200';

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    method: 'get' | 'post';
};

export function PortfolioNav({ className = '' }: PortfolioNavProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { urlIsActive } = useActiveUrl();
    const { auth } = usePage<SharedData>().props;

    const navItems: NavItem[] = [
        { title: 'Home', href: '/', icon: HutIcon, method: 'get' },
        { title: 'Links & Tools', href: '/links', icon: WandIcon, method: 'get' },
        { title: 'Blog', href: '/blog', icon: SpellbookIcon, method: 'get' },
    ];

    if (auth?.user) {
        navItems.push({ title: 'Admin', href: '/admin', icon: CrystalBallIcon, method: 'get' });
        navItems.push({ title: 'Logout', href: logout.url(), icon: WitchIcon, method: 'post' });
    }

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        setMobileOpen(false);
        router.post(logout.url(), {}, { preserveScroll: true });
    };

    const closeMobile = () => setMobileOpen(false);

    return (
        <nav aria-label="Main navigation" className={`bg-portfolio-bg border-b border-portfolio-color1 z-2 relative ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 min-h-[44px]">
                    <Link href="/" className="flex items-center min-h-[44px]" aria-label="technowitch.dev - Home">
                        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
                    </Link>

                    {/* Desktop nav: hidden on small screens */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = urlIsActive(item.href);
                            if (item.method === 'post') {
                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={handleLogout}
                                        className={`${navLinkBase} ${
                                            isActive
                                                ? 'text-portfolio-text bg-portfolio-color1'
                                                : 'text-portfolio-color2 hover:text-portfolio-text hover:bg-portfolio-color1'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="font-gothica">{item.title}</span>
                                    </button>
                                );
                            }
                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    method={item.method}
                                    className={`${navLinkBase} ${
                                        isActive
                                            ? 'text-portfolio-text bg-portfolio-color1'
                                            : 'text-portfolio-color2 hover:text-portfolio-text hover:bg-portfolio-color1'
                                    }`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-gothica">{item.title}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile: hamburger that opens sheet */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md text-portfolio-text hover:bg-portfolio-color1 transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="bg-portfolio-bg border-portfolio-color1 flex flex-col pt-12"
                        >
                            <div className="flex flex-col gap-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = urlIsActive(item.href);
                                    if (item.method === 'post') {
                                        return (
                                            <button
                                                key={item.title}
                                                type="button"
                                                onClick={handleLogout}
                                                className={`${navLinkBase} text-left ${
                                                    isActive
                                                        ? 'text-portfolio-text bg-portfolio-color1'
                                                        : 'text-portfolio-color2 hover:text-portfolio-text hover:bg-portfolio-color1'
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span className="font-gothica">{item.title}</span>
                                            </button>
                                        );
                                    }
                                    return (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            method={item.method}
                                            onClick={closeMobile}
                                            className={`${navLinkBase} ${
                                                isActive
                                                    ? 'text-portfolio-text bg-portfolio-color1'
                                                    : 'text-portfolio-color2 hover:text-portfolio-text hover:bg-portfolio-color1'
                                            }`}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="font-gothica">{item.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}