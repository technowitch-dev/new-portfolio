import { Link } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import WandIcon from '@/components/icons/wand-icon';
import SpellbookIcon from '@/components/icons/spellbook-icon';
import CrystalBallIcon from '@/components/icons/crystal-ball-icon';
import ScrollIcon from '@/components/icons/scroll-icon';

interface DashboardProps {
    stats: {
        total_links: number;
        total_blog_posts: number;
        published_posts: number;
        draft_posts: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <div className="space-y-6">
                <h1 className="text-4xl text-portfolio-text mb-8">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <section className="bg-portfolio-color1 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-portfolio-color2">Total Links</p>
                                <p className="text-2xl font-bold mt-2 text-portfolio-text">{stats.total_links}</p>
                            </div>
                            <WandIcon className="h-8 w-8 text-portfolio-color2" />
                        </div>
                    </section>

                    <section className="bg-portfolio-color1 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-portfolio-color2">Total Posts</p>
                                <p className="text-2xl font-bold mt-2 text-portfolio-text">{stats.total_blog_posts}</p>
                            </div>
                            <SpellbookIcon className="h-8 w-8 text-portfolio-color2" />
                        </div>
                    </section>

                    <section className="bg-portfolio-color1 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-portfolio-color2">Published</p>
                                <p className="text-2xl font-bold mt-2 text-portfolio-text">{stats.published_posts}</p>
                            </div>
                            <ScrollIcon className="h-8 w-8 text-portfolio-color2" />
                        </div>
                    </section>

                    <section className="bg-portfolio-color1 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-portfolio-color2">Drafts</p>
                                <p className="text-2xl font-bold mt-2 text-portfolio-text">{stats.draft_posts}</p>
                            </div>
                            <ScrollIcon className="h-8 w-8 text-portfolio-color2" />
                        </div>
                    </section>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        href="/admin/links"
                        className="bg-portfolio-color1 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:bg-portfolio-color2"
                    >
                        <WandIcon className="h-6 w-6 mb-2 text-portfolio-color2" />
                        <h3 className="text-lg font-semibold mb-1 text-portfolio-text">Manage Links</h3>
                        <p className="text-sm text-portfolio-color2">
                            Add, edit, or delete links
                        </p>
                    </Link>

                    <Link
                        href="/admin/blog"
                        className="bg-portfolio-color1 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:bg-portfolio-color2"
                    >
                        <SpellbookIcon className="h-6 w-6 mb-2 text-portfolio-color2" />
                        <h3 className="text-lg font-semibold mb-1 text-portfolio-text">Manage Blog</h3>
                        <p className="text-sm text-portfolio-color2">
                            Create and edit blog posts
                        </p>
                    </Link>

                    <Link
                        href="/admin/settings"
                        className="bg-portfolio-color1 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:bg-portfolio-color2"
                    >
                        <CrystalBallIcon className="h-6 w-6 mb-2 text-portfolio-color2" />
                        <h3 className="text-lg font-semibold mb-1 text-portfolio-text">Settings</h3>
                        <p className="text-sm text-portfolio-color2">
                            Change site or user settings
                        </p>
                    </Link>
                </div>
            </div>
    );
}