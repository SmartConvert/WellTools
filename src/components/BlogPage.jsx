import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

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
                <div className="text-center mb-12 md:mb-16 animate-fade-in">
                    <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                            <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tight">
                        {t.blog_title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                        {t.blog_subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
                            {/* Blog Post Image */}
                            {post.image && (
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.imageAlt || post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
