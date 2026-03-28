import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Activity, Percent, Scale, Droplet, Moon, Clock, Heart, Apple, TrendingDown, Calendar, BarChart3, LineChart as LineChartIcon, Utensils, Zap, Dumbbell, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';
import EmailCaptureForm from './EmailCaptureForm';

const HomePage = ({ setCurrentPage, setSelectedMealCategory, setSelectedPost, t }) => {
    const [currentLangPosts, setCurrentLangPosts] = React.useState([]);

    React.useEffect(() => {
        import('../data/posts.json').then(module => {
            const postsData = module.default;
            const data = postsData[t.lang || 'en'] || postsData['en'] || [];
            setCurrentLangPosts(data);
        });
    }, [t.lang]);

    const tools = [
        { id: 'bmi', icon: <Scale />, title: 'BMI Calculator', desc: 'Assess your body mass instantly.', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-500/10' },
        { id: 'calories', icon: <Activity />, title: 'Daily Calories', desc: 'Find your target energy needs.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
        { id: 'water', icon: <Droplet />, title: 'Water Intake', desc: 'Calculate your daily water needs.', color: 'text-blue-400', bg: 'bg-blue-50 dark:bg-blue-400/10' },
        { id: 'ideal-weight', icon: <Scale />, title: 'Ideal Weight', desc: 'Calculate your healthy range.', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-500/10' },
        { id: 'sleep', icon: <Moon />, title: 'Sleep Cycles', desc: 'Find your perfect REM sleep times.', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
        { id: 'body-fat', icon: <Percent />, title: 'Body Fat', desc: 'Measure your composition.', color: 'text-fuchsia-500', bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10' },
        { id: 'bmr', icon: <Zap />, title: 'BMR Calculator', desc: 'Your resting metabolic rate.', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
        { id: 'macro', icon: <Utensils />, title: 'Macro Split', desc: 'Calculate your perfect daily macros.', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
        { id: '1rm', icon: <Dumbbell />, title: '1-Rep Max', desc: 'Track your strength gains.', color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
        { id: 'fasting', icon: <Clock />, title: 'Fasting Timer', desc: 'Plan your feeding windows.', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-500/10' }
    ];

    return (
        <div className="pt-24 pb-16 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
            
            {/* HER0 SECTION - Centered & Lightweight */}
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center mb-16 sm:mb-24 z-10 pt-6 md:pt-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-bold mb-8 transition-transform hover:scale-105">
                    <Sparkles className="w-4 h-4" />
                    <span>Free Medical-Grade Tools</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.1] mb-6">
                    Scan Your Meals. <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-cyan-500">Track Your Health.</span>
                </h1>
                
                <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10">
                    Take out the guesswork. Use professional health calculators, nutrition tools, and AI trackers to perfectly optimize your body.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button
                        onClick={() => {
                            document.getElementById('ai-food-scanner')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
                    >
                        Try AI Food Scanner 📸
                    </button>
                    <button
                         onClick={() => setCurrentPage('meal-planner')}
                        className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all flex justify-center items-center"
                    >
                        {t.meal_planner_title}
                    </button>
                </div>
            </div>

            {/* AI Food Scanner Featured Strip */}
            <div id="ai-food-scanner" className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 lg:mb-24">
                <div 
                    onClick={() => {
                        window.history.pushState({}, '', '/food-scanner');
                        window.dispatchEvent(new Event('popstate'));
                        window.scrollTo(0, 0);
                    }}
                    className="group cursor-pointer bg-linear-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-1.5 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center mix-blend-overlay opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                    <div className="bg-slate-900/40 backdrop-blur-md rounded-[1.6rem] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 w-full">
                        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left w-full">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 shrink-0 shadow-inner">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-white">
                                <h3 className="text-2xl font-black mb-2">New: AI Food Scanner</h3>
                                <p className="text-emerald-50 font-medium opacity-90 text-sm sm:text-base leading-snug">Upload any meal photo. Let Google Gemini instantly calculate its macros & calories.</p>
                            </div>
                        </div>
                        <div className="shrink-0 w-full md:w-auto">
                            <span className="w-full md:w-auto bg-white text-emerald-600 font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-300 shadow-md">
                                Try It Now <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightweight Minimalist Tools Grid */}
            <div id="tools-grid" className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 lg:mb-24">
                <div className="text-center mb-10 md:mb-12">
                     <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Complete Health Toolkit</h2>
                     <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium text-lg">All the tools you need to optimize your physiology, 100% free.</p>
                </div>
                
                {/* Mobile: 2 cols, Tablet: 2 cols, Desktop: 3/4 cols. Card design is compact! */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
                     {tools.map((tool) => (
                         <a
                            key={tool.id}
                            href={`/${tool.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', `/${tool.id}`);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo(0, 0);
                            }}
                            className="group flex flex-col items-start gap-3 p-4 md:p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
                         >
                            <div className={`w-12 h-12 shrink-0 ${tool.bg} ${tool.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                {React.cloneElement(tool.icon, { className: "w-6 h-6" })}
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors leading-tight mb-1">{tool.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-snug line-clamp-2 sm:line-clamp-1 xl:line-clamp-2">{tool.desc}</p>
                            </div>
                         </a>
                     ))}
                </div>
            </div>

            {/* Combined Clean Features Section */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-16 mb-20 lg:mb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                        <div className="px-4 py-4 md:py-0">
                            <div className="w-12 h-12 mx-auto bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-5">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Medical Accuracy</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Valid formulas used by clinics worldwide.</p>
                        </div>
                        <div className="px-4 pt-8 md:pt-0 md:py-0">
                            <div className="w-12 h-12 mx-auto bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-xl flex items-center justify-center mb-5">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Instant Results</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">No sign-up required. Compute in your browser instantly.</p>
                        </div>
                        <div className="px-4 pt-8 md:pt-0 md:py-0">
                            <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-5">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">100% Free Forever</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Premium insights without the paywalls or intrusive ads.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Email Capture Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 lg:mb-24 mt-20">
                <EmailCaptureForm position="inline" />
            </div>

            {/* Clean Blog Cards Section */}
            {currentLangPosts && currentLangPosts.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">Wellness Hub</h2>
                            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">Evidence-based advice for your health journey.</p>
                        </div>
                        <button
                            onClick={() => setCurrentPage('blog')}
                            className="text-slate-900 dark:text-white font-bold hover:text-emerald-500 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors text-sm sm:text-base"
                        >
                            View All Articles <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(() => {
                            const featuredIds = ['bmi-athlete-truth', 'increase-bmr-naturally'];
                            const featuredPosts = currentLangPosts.filter(p => featuredIds.includes(p.id));
                            featuredPosts.sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));
                            const displayPosts = featuredPosts.length > 0 ? featuredPosts : currentLangPosts.slice(0, 2);

                            return displayPosts.map((post) => (
                                <div
                                    key={post.id}
                                    onClick={() => {
                                        setSelectedPost(post);
                                        setCurrentPage('blog-post');
                                        window.scrollTo(0, 0);
                                    }}
                                    className="group cursor-pointer flex flex-col bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 h-full"
                                >
                                    {post.image && (
                                        <div className="h-48 sm:h-56 w-full overflow-hidden shrink-0">
                                            <img
                                                src={post.image}
                                                alt={post.imageAlt || post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col grow">
                                        <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">{post.category || 'Health'}</div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 line-clamp-2 leading-snug transition-colors">{post.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-4 grow">{post.excerpt}</p>
                                        <div className="text-slate-900 dark:text-white font-bold text-sm inline-flex items-center group-hover:text-emerald-500 transition-colors">
                                            {t.read_article} <ChevronRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default HomePage;
