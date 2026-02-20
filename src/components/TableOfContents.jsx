import React, { useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';

const TableOfContents = ({ content }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Parse content to find H2 and H3
        const matches = [...content.matchAll(/#{2,3}\s+(.+)/g)];
        const extractedHeadings = matches.map((match, index) => {
            const text = match[1];
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const level = match[0].startsWith('###') ? 3 : 2;
            return { id, text, level };
        });
        setHeadings(extractedHeadings);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    const displayedHeadings = isExpanded ? headings : headings.slice(0, 5);

    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <AlignLeft className="w-5 h-5 text-emerald-500" />
                    Table of Contents
                </h3>
                {headings.length > 5 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                        {isExpanded ? 'Show Less' : `Show All (${headings.length})`}
                    </button>
                )}
            </div>
            <nav className="space-y-1">
                {displayedHeadings.map(({ id, text, level }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                            setActiveId(id);
                        }}
                        className={`block text-sm py-1 transition-colors ${level === 3 ? 'pl-4' : ''
                            } ${activeId === id
                                ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-300'
                            }`}
                    >
                        {text}
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default TableOfContents;
