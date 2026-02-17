import React from 'react';
import { ShieldCheck, Award, FileText } from 'lucide-react';

const TrustBadge = ({ setCurrentPage }) => {
    return (
        <div className="mt-8 mb-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full flex-shrink-0">
                <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                    Medically Reviewed & Verified
                    <Award className="w-4 h-4 text-amber-500" />
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    This tool uses the <strong>Mifflin-St Jeor</strong> and <strong>Harris-Benedict</strong> equations, trusted by healthcare professionals worldwide. Our content is reviewed by certified nutritionists to ensure scientific accuracy.
                </p>
                <button
                    onClick={() => { setCurrentPage('editorial-policy'); window.scrollTo(0, 0); }}
                    className="text-blue-600 dark:text-blue-400 text-xs font-semibold hover:underline mt-2 inline-flex items-center gap-1 bg-transparent border-none cursor-pointer"
                >
                    <FileText className="w-3 h-3" />
                    Read our Editorial Policy
                </button>
            </div>
        </div>
    );
};

export default TrustBadge;
