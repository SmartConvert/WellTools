import React from 'react';
import { ShoppingBag, ExternalLink, Star } from 'lucide-react';
import affiliateProducts from '../data/affiliateProducts.json';

const AffiliateBlock = ({ toolId }) => {
    // Fallback to 'general' if toolId not found, or combine them
    const products = affiliateProducts[toolId] || affiliateProducts['general'];

    if (!products || products.length === 0) return null;

    return (
        <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl">
                    <ShoppingBag className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Gear</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Hand-picked tools to help you reach your goals</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                    <a
                        key={product.id}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow" // Important for SEO/Affiliate links
                        className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-amber-200 dark:hover:border-amber-800 transition-all group"
                    >
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-xl shrink-0 overflow-hidden flex items-center justify-center">
                            {/* Placeholder for actual image if not available */}
                            {product.image.startsWith('http') || product.image.startsWith('/') ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                            ) : (
                                <ShoppingBag className="w-8 h-8 text-gray-300" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-900 dark:text-white truncate pr-2 group-hover:text-amber-600 transition-colors">
                                    {product.name}
                                </h4>
                                <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                            </div>

                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 mb-2">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="font-bold text-amber-600 dark:text-amber-400">{product.price}</span>
                                <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-md">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    {product.rating}
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center italic">
                * As an Amazon Associate, we earn from qualifying purchases. This helps support our free tools.
            </p>
        </div>
    );
};

export default AffiliateBlock;
