import { Link, usePage, router } from '@inertiajs/react';
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

interface PortfolioNavProps {
    className?: string;
}

export function PortfolioNav({ className = '' }: PortfolioNavProps) {
    const { urlIsActive } = useActiveUrl();
    const { auth } = usePage<SharedData>().props;
    
    const navItems = [
        //TODO: change route to home().url when route is created
        { title: 'Home', href: '/', icon: HutIcon, method: 'get' },
        { title: 'Links & Tools', href: '/links', icon: WandIcon, method: 'get' },
        { title: 'Blog', href: '/blog', icon: SpellbookIcon, method: 'get' },
    ];
    
    // Add admin link if authenticated
    if (auth.user) {
        navItems.push({ title: 'Admin', href: '/admin', icon: CrystalBallIcon, method: 'get' });
        navItems.push({ title: 'Logout', href: logout.url(), icon: WitchIcon, method: 'post' });
    }

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        router.post(logout.url(), {}, { preserveScroll: true });
    };
    
    return (
        <nav className={`bg-portfolio-bg border-b border-portfolio-color1 z-2 relative ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center">
                            <img 
                                src="/logo.svg" 
                                alt="Logo" 
                                className="h-8 w-auto"
                            />
                        </Link>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = urlIsActive(item.href);
                            
                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    method={item.method as Method}
                                    className={`
                                        flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                                        transition-colors duration-200
                                        ${isActive 
                                            ? 'text-portfolio-text bg-portfolio-color1' 
                                            : 'text-portfolio-color2 hover:text-portfolio-text hover:bg-portfolio-color1'
                                        }
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}