import { Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface LinkItem {
    id: number;
    title: string;
    url: string;
    description?: string;
    category?: string;
    order: number;
}

interface LinksIndexProps {
    links: LinkItem[];
}

export default function LinksIndex({ links }: LinksIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this link?')) {
            router.delete(`/admin/links/${id}`);
        }
    };

    return (
        <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl text-portfolio-text mb-8">Manage Links</h1>
                    <Link href="/admin/links/create">
                        <Button className="font-gothica text-portfolio-text bg-portfolio-color1 hover:bg-portfolio-color2 transition-colors duration-200">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Link
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
                                    URL
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-portfolio-text uppercase tracking-wider font-gothica">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-portfolio-text uppercase tracking-wider font-gothica">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-portfolio-text uppercase tracking-wider font-gothica">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-portfolio-color1 divide-y divide-portfolio-color2">
                            {links.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-portfolio-color2">
                                        No links found. Create your first link!
                                    </td>
                                </tr>
                            ) : (
                                links.map((link) => (
                                    <tr key={link.id} className="hover:bg-portfolio-color2 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-portfolio-text">
                                            {link.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-portfolio-color2">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-portfolio-color2 hover:text-portfolio-text hover:underline"
                                            >
                                                {link.url}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-portfolio-color2">
                                            {link.category || 'Uncategorized'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-portfolio-color2">
                                            {link.order}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={`/admin/links/${link.id}/edit`}
                                                    className="text-portfolio-color2 hover:text-portfolio-text"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(link.id)}
                                                    className="text-red-600 hover:text-red-800"
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
    );
}
