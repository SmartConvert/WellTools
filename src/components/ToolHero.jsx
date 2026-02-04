import React from 'react';
import { calculatorContent } from '../data/seoContent';

const ToolHero = ({ toolId }) => {
    const content = calculatorContent[toolId]?.['en'];
    if (!content) return null;

    return (
        <div className={`relative min-h-64 md:h-80 rounded-3xl md:rounded-4xl overflow-hidden mb-12 shadow-2xl group border-4 border-white dark:border-gray-800 bg-linear-to-br ${toolId === 'bmi' ? 'from-cyan-600 to-blue-700' :
            toolId === 'calories' ? 'from-emerald-600 to-teal-700' :
                toolId === 'water' ? 'from-blue-600 to-cyan-700' :
                    toolId === 'ideal-weight' ? 'from-rose-600 to-pink-700' :
                        toolId === 'sleep' ? 'from-violet-600 to-purple-700' :
                            toolId === 'bmr' ? 'from-amber-600 to-orange-700' :
                                toolId === 'macro' ? 'from-green-600 to-emerald-700' :
                                    toolId === '1rm' ? 'from-slate-700 to-gray-800' :
                                        'from-orange-600 to-red-700'
            }`}>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xl"></div>
            <div className="relative z-10 p-6 md:p-16 flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="text-6xl md:text-9xl transform hover:scale-110 transition-transform duration-500 animate-bounce-slow">
                    {content.hero_emoji}
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-6xl font-black text-white mb-3 md:mb-4 tracking-tight">
                        {content.hero_title}
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed">
                        {content.hero_subtitle}
                    </p>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] -mr-32 -mt-32"></div>
        </div>
    );
};

export default ToolHero;
