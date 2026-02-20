import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const RelatedArticles = ({ currentPostId, category, setCurrentPage, setSelectedPost }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        // Dynamically import posts to avoid bundle bloat
        import('../data/posts.json').then(module => {
            const postsData = module.default;
            const allPosts = postsData?.en || [];

            if (!Array.isArray(allPosts)) {
                setRelatedPosts([]);
                return;
            }

            // Filter by category, exclude current, limit to 3
            const related = allPosts
                .filter(post => post && post.category === category && post.id !== currentPostId)
                .slice(0, 3);

            // If not enough related by category, just fill with recent
            if (related.length < 3) {
                const recent = allPosts
                    .filter(post => post && post.id !== currentPostId && !related.includes(post))
                    .slice(0, 3 - related.length);
                setRelatedPosts([...related, ...recent]);
            } else {
                setRelatedPosts(related);
            }
        }).catch(err => {
            console.error('Failed to load related articles:', err);
            setRelatedPosts([]);
        });
    }, [currentPostId, category]);

    if (relatedPosts.length === 0) return null;

    return (
        <div className="mt-16 pt-16 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Read Next</h3>
            <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map(post => (
                    <div
                        key={post.id}
                        className="group cursor-pointer"
                        onClick={() => {
                            setSelectedPost(post);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4 overflow-hidden">
                            {/* Use low-res or optimized image if available, else standard */}
                            <img
                                src={post.image}
                                alt={post.imageAlt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors line-clamp-2">
                            {post.title}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                            {post.excerpt}
                        </p>
                        <span className="inline-flex items-center text-emerald-500 font-semibold text-sm group-hover:gap-2 transition-all">
                            Read Article <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedArticles;
