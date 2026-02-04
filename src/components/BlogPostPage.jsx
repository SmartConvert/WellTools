import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import AdComponent from './AdComponent';
import { BlogImage } from './BlogPage';

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

    // Handle Images FIRST: ![alt](url)
    const parts = [];
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    let match;
    let lastIdx = 0;

    while ((match = imgRegex.exec(text)) !== null) {
        if (match.index > lastIdx) {
            parts.push(text.slice(lastIdx, match.index));
        }
        parts.push(
            <img
                key={`img-${match.index}`}
                src={match[2]}
                alt={match[1]}
                className="max-w-full h-auto rounded-2xl my-6 shadow-lg block mx-auto bg-gray-100"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
            />
        );
        lastIdx = imgRegex.lastIdx;
    }
    if (lastIdx < text.length) {
        parts.push(text.slice(lastIdx));
    }

    const result = parts.length > 0 ? parts : [text];

    return result.flatMap((part, i) => {
        if (typeof part !== 'string') return [part];

        // Bold: **text**
        const subParts = part.split(/(\*\*.*?\*\*)/g);
        return subParts.flatMap((subPart, j) => {
            if (subPart.startsWith('**') && subPart.endsWith('**')) {
                return [<strong key={`${i}-${j}`} className="font-bold text-gray-900 dark:text-white">{subPart.slice(2, -2)}</strong>];
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
                    <a key={`link-${i}-${j}-${lMatch.index}`} href={lMatch[2]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">
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
    });
};

const BlogPostPage = ({ post, setCurrentPage, t }) => {
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
                    {post.image && (
                        <div className="w-full h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl bg-gray-800 flex items-center justify-center">
                            <BlogImage
                                src={post.image}
                                alt={post.imageAlt || post.title}
                                className="w-full h-full object-cover animate-fade-in"
                            />
                        </div>
                    )}
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8 tracking-tight">{post.title}</h1>
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

                <AdComponent slot="blog_post_bottom" />
            </div>
        </div>
    );
};

export default BlogPostPage;
