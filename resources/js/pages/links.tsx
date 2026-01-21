import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

import PublicLayout from '@/layouts/public-layout';

interface Link {
    id: number;
    title: string;
    url: string;
    description?: string;
    icon?: string;
    category?: string;
}

interface LinksProps {
    links: Link[];
}

export default function Links({ links }: LinksProps) {
    // Group links by category
    const groupedLinks = links.reduce((acc, link) => {
        const category = link.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(link);
        return acc;
    }, {} as Record<string, Link[]>);

    // Sort links within each category by order
    Object.keys(groupedLinks).forEach((category) => {
        groupedLinks[category].sort((a, b) => (a as any).order - (b as any).order);
    });

    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(Object.keys(groupedLinks)) // All categories expanded by default
    );

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    return (
        <PublicLayout title="Links">
            <div className="space-y-6">
                <h1 className="text-4xl text-portfolio-text mb-8">Links</h1>
                
                {Object.entries(groupedLinks).map(([category, categoryLinks]) => {
                    const isExpanded = expandedCategories.has(category);
                    
                    return (
                        <div
                            key={category}
                            className="bg-portfolio-color1 rounded-lg shadow-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between p-4 bg-portfolio-color2 hover:bg-portfolio-color1 transition-colors"
                            >
                                <h2 className="text-2xl text-portfolio-text">{category}</h2>
                                {isExpanded ? (
                                    <ChevronUp className="h-6 w-6 text-portfolio-text" />
                                ) : (
                                    <ChevronDown className="h-6 w-6 text-portfolio-text" />
                                )}
                            </button>
                            
                            {isExpanded && (
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categoryLinks.map((link) => (
                                            <a
                                                key={link.id}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-portfolio-bg rounded-lg p-6 border border-portfolio-color2 hover:border-portfolio-text transition-all hover:shadow-lg group"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-xl text-portfolio-text group-hover:text-portfolio-color2">
                                                        {link.title}
                                                    </h3>
                                                    <ExternalLink className="h-5 w-5 text-portfolio-color2 group-hover:text-portfolio-text flex-shrink-0 ml-2" />
                                                </div>
                                                {link.description && (
                                                    <p className="text-portfolio-color2 text-sm">
                                                        {link.description}
                                                    </p>
                                                )}
                                                {link.icon && (
                                                    <div className="mt-4">
                                                        <img
                                                            src={link.icon}
                                                            alt={link.title}
                                                            className="h-8 w-8 object-contain"
                                                        />
                                                    </div>
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </PublicLayout>
    );
}