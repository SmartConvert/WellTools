import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import AdComponent from './AdComponent';

export const BlogImage = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setError(false);
        setRetryCount(0);
        setLoading(true);
    }, [src]);

    const handleError = () => {
        setLoading(false);
        if (retryCount < 1) {
            setRetryCount(prev => prev + 1);
        } else {
            setError(true);
        }
    };

    if (error) {
        return (
            <div className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center aspect-ratio`}>
                <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
        );
    }

    // Comprehensive URL cleaning to prevent double encoding or malformed strings
    const processImageUrl = (url) => {
        if (!url) return '';
        try {
            // First decode in case it's already encoded
            let decoded = url;
            try {
                decoded = decodeURIComponent(url);
            } catch (e) {
                // If decode fails, use original
            }

            // Then encode specifically for spaces and special prompt chars
            // but keep the protocol and domain intact
            const encoded = encodeURI(decoded);
            return encoded.replace(/%2520/g, '%20'); // Fix common double-encoding cases
        } catch (e) {
            console.error('WellTools Debug: Image URL processing failed', e, url);
            return url;
        }
    };

    const encodedSrc = processImageUrl(src);

    // Generate srcset for Pollinations images only
    const generateSrcSet = (url) => {
        if (!url || !url.includes('pollinations.ai')) return undefined;
        // Base structure: https://image.pollinations.ai/prompt/...?width=1200&height=800...
        // We want to create versions with width=400, 800, 1200
        const makeVariant = (w, h) => {
            const newUrl = url.replace(/width=\d+/, `width=${w}`).replace(/height=\d+/, `height=${h}`);
            return `${newUrl} ${w}w`;
        };

        try {
            return `${makeVariant(400, 300)}, ${makeVariant(800, 600)}, ${makeVariant(1200, 800)}`;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <div className={`relative overflow-hidden ${className} bg-gray-200 dark:bg-gray-800`}>
            {loading && (
                <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer scale-110"></div>
            )}
            <img
                src={encodedSrc}
                srcSet={generateSrcSet(encodedSrc)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={alt}
                className={`${className} transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                crossOrigin="anonymous"
                onLoad={() => setLoading(false)}
                onError={(e) => {
                    console.warn(`WellTools Debug: Image failed to load [Retry ${retryCount}]:`, encodedSrc);
                    handleError();
                }}
                loading="lazy"
                decoding="async"
            />
        </div>
    );
};

const BlogPage = ({ setCurrentPage, setSelectedPost, t, lang = 'en' }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        import('../data/posts.json').then(module => {
            const postsData = module.default;
            setPosts(postsData[lang] || postsData['en'] || []);
            setLoading(false);
        }).catch(err => {
            console.error('Failed to load blog posts', err);
            setLoading(false);
        });
    }, [lang]);

    if (loading) {
        return (
            <div className="pt-24 pb-16 px-4 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium animate-pulse">Loading amazing content...</p>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        {t.blog_title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t.blog_subtitle}
                    </p>
                </div>

                <AdComponent slot="blog_top" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
                            {post.image && (
                                <div className="relative aspect-video overflow-hidden bg-gray-800 flex items-center justify-center">
                                    <BlogImage src={post.image} alt={post.imageAlt || post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                                </div>
                            )}
                            <div className="p-8 grow">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">{post.category}</span>
                                    <span className="text-gray-400 text-sm">{post.date}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">{post.excerpt}</p>
                            </div>
                            <div className="p-8 pt-0 mt-auto">
                                <button
                                    onClick={() => { setSelectedPost(post); setCurrentPage('blog-post'); window.scrollTo(0, 0); }}
                                    className="w-full py-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300"
                                    aria-label={`${t.read_article}: ${post.title}`}
                                >
                                    {t.read_article} <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">{t.no_posts}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
