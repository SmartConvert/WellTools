import React from 'react';

const AboutPage = ({ setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl p-8 md:p-16 border border-gray-100 dark:border-gray-700 mb-16 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                <div className="relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                        {t.about_title} <span className="text-emerald-500">WellTools</span>
                    </h1>
                    <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto md:mx-0">
                        <p className="font-medium italic border-l-4 border-emerald-500 pl-6 mb-8 py-2">
                            "{t.mission_desc}"
                        </p>
                        <p>{t.about_desc}</p>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {[
                    { icon: '🎯', title: t.mission_title, desc: t.mission_desc },
                    { icon: '⚡', title: t.vision_title, desc: t.vision_desc },
                    { icon: '🤝', title: t.values_title, desc: t.values_desc }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-50 dark:border-gray-700 hover:-translate-y-2 transition-all">
                        <div className="text-5xl mb-6">{item.icon}</div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => setCurrentPage('home')}
                className="mt-8 px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all mx-auto block"
            >
                {t.back_to_home}
            </button>
        </div>
    </div>
);

export default AboutPage;
