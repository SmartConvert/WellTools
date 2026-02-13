import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';

const parseMarkdown = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, i) => {
        // Headers
        if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.slice(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-black text-gray-900 dark:text-white mt-10 mb-6">{line.slice(3)}</h2>;
        }
        if (line.startsWith('# ')) {
            return <h1 key={i} className="text-3xl font-black text-gray-900 dark:text-white mt-12 mb-8">{line.slice(2)}</h1>;
        }

        // Lists
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return <li key={i} className="ml-6 list-disc text-gray-700 dark:text-gray-300 mb-2">{parseInlineMarkdown(line.trim().slice(2))}</li>;
        }
        if (/^\d+\.\s/.test(line.trim())) {
            return <li key={i} className="ml-6 list-decimal text-gray-700 dark:text-gray-300 mb-2">{parseInlineMarkdown(line.trim().replace(/^\d+\.\s/, ''))}</li>;
        }

        // Empty lines
        if (!line.trim()) return <div key={i} className="h-4" />;

        // Regular paragraphs
        return <p key={i} className="mb-4 leading-relaxed">{parseInlineMarkdown(line)}</p>;
    });
};

const parseInlineMarkdown = (text) => {
    if (typeof text !== 'string') return text;

    // Remove Images: ![alt](url) -> replace with empty string or skip
    let processedText = text.replace(/!\[.*?\]\(.*?\)/g, '');

    // Bold: **text**
    const subParts = processedText.split(/(\*\*.*?\*\*)/g);
    return subParts.flatMap((subPart, j) => {
        if (subPart.startsWith('**') && subPart.endsWith('**')) {
            return [<strong key={`bold-${j}`} className="font-bold text-gray-900 dark:text-white">{subPart.slice(2, -2)}</strong>];
        }

        // Final Links: [text](url)
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const linkParts = [];
        let lMatch;
        let lLastIdx = 0;
        while ((lMatch = linkRegex.exec(subPart)) !== null) {
            if (lMatch.index > lLastIdx) {
                linkParts.push(subPart.slice(lLastIdx, lMatch.index));
            }
            linkParts.push(
                <a key={`link-${lMatch.index}`} href={lMatch[2]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">
                    {lMatch[1]}
                </a>
            );
            lLastIdx = linkRegex.lastIdx;
        }
        if (lLastIdx < subPart.length) {
            linkParts.push(subPart.slice(lLastIdx));
        }

        return linkParts.length > 0 ? linkParts : [subPart];
    });
};

const BlogPostPage = ({ post, setCurrentPage, t }) => {
    // Inject Article Schema for SEO
    useEffect(() => {
        if (!post) return;

        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "image": post.image || "https://welltools.online/images/hero_fitness.png",
            "datePublished": post.date || new Date().toISOString(),
            "dateModified": post.lastUpdated || post.date || new Date().toISOString(),
            "author": {
                "@type": "Organization",
                "name": "WellTools Health Team",
                "url": "https://welltools.online/about"
            },
            "publisher": {
                "@type": "Organization",
                "name": "WellTools",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://welltools.online/favicon.svg"
                }
            },
            "description": post.excerpt || post.title,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": window.location.href
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `article-schema-${post.id}`;
        script.innerHTML = JSON.stringify(articleSchema);
        document.head.appendChild(script);

        return () => {
            const oldScript = document.getElementById(`article-schema-${post.id}`);
            if (oldScript) document.head.removeChild(oldScript);
        };
    }, [post]);

    if (!post) return null;
    return (
        <div className="bg-white dark:bg-gray-900 pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => setCurrentPage('blog')}
                    className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-bold transition-all group"
                    aria-label={t.aria_back}
                >
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-emerald-50">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    {t.back_to_blog}
                </button>
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8 tracking-tight">{post.title}</h1>
                    <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 font-bold mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-500" />
                            <span>Last Updated: {post.lastUpdated || post.date}</span>
                        </div>
                        <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm">
                            Health Verified
                        </div>
                    </div>
                </header>
                <article className="max-w-none text-gray-700 dark:text-gray-300">
                    {parseMarkdown(post.content)}
                </article>

                {post.faq && post.faq.length > 0 && (
                    <div className="mt-20 p-8 md:p-12 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] border border-slate-200 dark:border-gray-700">
                        <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-8">{t.faq_title}</h2>
                        <div className="space-y-6">
                            {post.faq.map((item, i) => (
                                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{item.question}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {post.sources && post.sources.length > 0 && (
                    <div className="mt-12 p-8 md:p-10 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-900/30">
                        <h2 className="text-2xl font-black text-emerald-900 dark:text-emerald-400 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm">#</span>
                            {t.sources_title}
                        </h2>
                        <ul className="flex flex-col gap-3">
                            {post.sources.map((source, i) => (
                                <li key={i}>
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-emerald-50 dark:border-emerald-900/20 hover:border-emerald-500 transition-all group"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                                        <span className="text-gray-700 dark:text-gray-300 font-semibold group-hover:text-emerald-600 transition-colors line-clamp-1">
                                            {source.title}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPostPage;
