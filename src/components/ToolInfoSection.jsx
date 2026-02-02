import React from 'react';
import { BookOpen, Activity, Heart } from 'lucide-react';

const ToolInfoSection = ({ toolId, t }) => {
    if (!t) return null;
    return (
        <div className="mt-12 space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Definition Card */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.tool_info_definition}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t[`${toolId}_definition`]}
                    </p>
                </div>

                {/* Usage Card */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                        <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.tool_info_usage}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t[`${toolId}_usage`]}
                    </p>
                </div>

                {/* Benefits Card */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                        <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.tool_info_benefits}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t[`${toolId}_benefits`]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ToolInfoSection;
