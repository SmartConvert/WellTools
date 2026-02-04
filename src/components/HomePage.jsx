import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Activity, Percent, Scale, Droplet, Moon, Clock, Heart, Apple, TrendingDown, Calendar, BarChart3, LineChart as LineChartIcon, Utensils } from 'lucide-react';
import postsData from '../data/posts.json';
import { BlogImage } from './BlogPage';
import AdComponent from './AdComponent';

const HomePage = ({ setCurrentPage, setSelectedMealCategory, setSelectedPost, lang, t }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=2670&q=80',
            title: t.hero_title,
            accent: t.hero_title_accent,
            subtitle: t.hero_subtitle,
            stats: { icon: '🥗', number: '100+', label: 'Healthy Recipes' }
        },
        {
            image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2670&q=80',
            title: 'Track Your',
            accent: 'Health Journey',
            subtitle: 'Smart calculators to help you achieve your wellness goals',
            stats: { icon: '🎯', number: '6+', label: 'Health Tools' }
        },
        {
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2670&q=80',
            title: 'Personalized',
            accent: 'Nutrition Plans',
            subtitle: 'AI-powered meal suggestions tailored to your goals',
            stats: { icon: '🍎', number: '50+', label: 'Food Categories' }
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const currentLangPosts = (postsData[lang] && postsData[lang].length > 0) ? postsData[lang] : (postsData['en'] || []);

    const tools = [
        { id: 'bmi', icon: <Scale className="w-8 h-8" />, title: t.bmi_calc, desc: t.bmi_desc, color: 'from-emerald-400 to-teal-500' },
        { id: 'calories', icon: <Activity className="w-8 h-8" />, title: t.calories_calc, desc: t.calories_desc, color: 'from-emerald-400 to-teal-500' },
        { id: 'water', icon: <Droplet className="w-8 h-8" />, title: t.water_calc, desc: t.water_desc, color: 'from-blue-400 to-cyan-500' },
        { id: 'ideal-weight', icon: <Scale className="w-8 h-8" />, title: t.ideal_weight, desc: t.ideal_weight_desc, color: 'from-rose-400 to-pink-500' },
        { id: 'sleep', icon: <Moon className="w-8 h-8" />, title: t.sleep_calc, desc: t.sleep_desc, color: 'from-violet-400 to-purple-500' },
        { id: 'body-fat', icon: <Percent className="w-8 h-8" />, title: t.body_fat_calc, desc: t.body_fat_desc, color: 'from-orange-400 to-red-500' }
    ];

    return (
        <div className="pt-20 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Modern Hero Carousel */}
                <div className="relative h-[420px] md:h-[600px] rounded-4xl md:rounded-[3rem] overflow-hidden mb-12 lg:mb-16 shadow-2xl animate-fade-in group">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            aria-hidden={index !== currentSlide}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                loading={index === 0 ? "eager" : "lazy"}
                                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-10000"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 via-gray-900/40 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center px-8 md:px-16">
                                <div className="max-w-2xl">
                                    <h1 className="text-2xl md:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
                                        {slide.title} <br className="md:hidden" />
                                        <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                            {slide.accent}
                                        </span>
                                    </h1>
                                    <p className="text-base md:text-xl text-gray-200 max-w-xl leading-relaxed mb-8 md:mb-10">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex flex-wrap gap-3 md:gap-4">
                                        <button
                                            onClick={() => {
                                                const el = document.getElementById('tools-grid');
                                                el?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="px-5 py-2.5 md:px-8 md:py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                                        >
                                            {t.explore_tools}
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage('meal-planner')}
                                            className="px-5 py-2.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 rounded-2xl font-bold text-base md:text-lg hover:bg-white/20 transition-all"
                                        >
                                            {t.meal_planner_title}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-12 bg-emerald-500' : 'w-2 bg-white/50'
                                    }`}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* Latest Blog Posts Feature */}
                {currentLangPosts && currentLangPosts.length > 0 && (
                    <div className="mb-16 lg:mb-24 animate-fade-in">
                        <div className="flex items-center justify-between mb-8 px-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-emerald-500" />
                                {t.latest_blog_title}
                            </h2>
                            <button
                                onClick={() => setCurrentPage('blog')}
                                className="hidden md:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:gap-3 transition-all"
                            >
                                {t.nav_blog} <ChevronRight className="w-5 h-5 rtl-mirror" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            {currentLangPosts.slice(0, 2).map((post) => (
                                <div
                                    key={post.id}
                                    onClick={() => {
                                        setSelectedPost(post);
                                        setCurrentPage('blog-post');
                                        window.scrollTo(0, 0);
                                    }}
                                    className="group cursor-pointer relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="h-40 md:h-56 relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        <BlogImage src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-6">
                                            <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors line-clamp-1">{post.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base line-clamp-2 font-medium mb-4">{post.excerpt}</p>
                                        <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                                            {t.read_article} <ChevronRight className="w-4 h-4 ms-1 group-hover:ms-2 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tools Grid */}
                <div id="tools-grid" className="scroll-mt-24 mb-16 lg:mb-24">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">{t.explore_tools}</h2>
                        <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {tools.map((tool) => (
                            <div
                                key={tool.id}
                                onClick={() => {
                                    setCurrentPage(tool.id);
                                    window.scrollTo(0, 0);
                                }}
                                className="group cursor-pointer bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-50 dark:border-gray-700 relative overflow-hidden flex flex-col h-full"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className={`w-16 h-16 bg-linear-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    {React.cloneElement(tool.icon, { className: "w-8 h-8 text-white" })}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-emerald-500 transition-colors tracking-tight">{tool.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium grow mb-6">{tool.desc}</p>
                                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold group-hover:gap-2 transition-all">
                                    {t.explore_tool} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl-mirror" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <AdComponent slot="home_bottom" />
            </div>
        </div>
    );
};

export default HomePage;
