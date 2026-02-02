import React, { useState, useEffect, Suspense } from 'react';
import { Calculator, Heart, Droplet, Globe, Scale, Apple, TrendingDown, Activity, Utensils, ChevronRight, Menu, X, Percent, TrendingUp, Calendar, BarChart3, LineChart as LineChartIcon, Plus, Trash2, BookOpen, ArrowLeft, ExternalLink, Moon, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import postsData from './data/posts.json';
import { translations } from './translations';
import { mealCategories } from './data/meals';
import AdComponent from './components/AdComponent';
import ToolInfoSection from './components/ToolInfoSection';

const BMICalculatorPage = React.lazy(() => import('./components/BMICalculatorPage'));
const MealPlannerPage = React.lazy(() => import('./components/MealPlannerPage'));







const NavBar = ({ setCurrentPage, setMobileMenuOpen, mobileMenuOpen, lang, setLang, t }) => (
  <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-2xl font-black bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
            WellTools
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <button onClick={() => setCurrentPage('home')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.nav_home}
          </button>
          <button onClick={() => { const el = document.getElementById('tools-grid'); el?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.nav_apps}
          </button>
          <button onClick={() => setCurrentPage('tracking')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.daily_tracking}
          </button>
          <button onClick={() => setCurrentPage('meal-planner')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.meal_planner_title}
          </button>
          <button onClick={() => setCurrentPage('blog')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.nav_blog}
          </button>
          <button onClick={() => setCurrentPage('about')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.nav_about}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative group">
            <button
              aria-label="Change Language"
              className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-bold uppercase">{lang}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              {['en', 'ar', 'fr', 'de', 'es'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-between ${lang === l ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-800 dark:text-gray-200'}`}
                >
                  <span className="uppercase font-bold">{l}</span>
                  {lang === l && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t.aria_menu_toggle}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

    {mobileMenuOpen && (
      <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="px-4 py-4 space-y-3">
          <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.nav_home}
          </button>
          <button onClick={() => { const el = document.getElementById('tools-grid'); el?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.nav_apps}
          </button>
          <button onClick={() => { setCurrentPage('tracking'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.daily_tracking}
          </button>
          <button onClick={() => { setCurrentPage('meal-planner'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.meal_planner_title}
          </button>
          <button onClick={() => { setCurrentPage('blog'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.nav_blog}
          </button>
          <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors font-semibold">
            {t.nav_about}
          </button>

          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="px-4 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest mb-3">{t.language}</p>
            <div className="grid grid-cols-5 gap-2 px-4">
              {['en', 'ar', 'fr', 'de', 'es'].map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setMobileMenuOpen(false); }}
                  className={`py-2 rounded-xl text-xs font-black uppercase transition-all border ${lang === l ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </nav>
);
const HomePage = ({ setCurrentPage, setSelectedMealCategory, setSelectedPost, lang, t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Safety check for translations
  if (!t) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>;

  useEffect(() => {
    setImageError(false);
  }, [lang]);
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=2670&q=80',
      title: t.hero_title,
      accent: t.hero_title_accent,
      subtitle: t.hero_subtitle
    },
    {
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=2670&q=80',
      title: t.hero_title,
      accent: t.hero_title_accent,
      subtitle: t.hero_subtitle
    },
    {
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=2670&q=80',
      title: t.hero_title,
      accent: t.hero_title_accent,
      subtitle: t.hero_subtitle
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Get the latest blog post for current language or fallback to English
  const currentLangPosts = (postsData[lang] && postsData[lang].length > 0) ? postsData[lang] : (postsData['en'] || []);
  const latestPost = currentLangPosts[0];

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Modern Hero Carousel */}
        <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden mb-12 lg:mb-16 shadow-2xl animate-fade-in group">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
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
                  <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                    {slide.title} <br className="md:hidden" />
                    <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      {slide.accent}
                    </span>
                  </h1>
                  <p className="text-xl text-gray-200 max-w-xl leading-relaxed mb-10">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        const el = document.getElementById('tools-grid');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                      {t.explore_tools}
                    </button>
                    <button
                      onClick={() => setCurrentPage('blog')}
                      className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all shadow-sm"
                    >
                      {t.nav_blog}
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
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-12 bg-emerald-500' : 'w-2 bg-white/50'
                  }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Latest Blog Post Feature */}
        {latestPost && (
          <div className="mb-16 lg:mb-24 animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-between mb-8 px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-emerald-500" />
                {t.latest_blog_title}
              </h2>
              <button
                onClick={() => setCurrentPage('blog')}
                className="hidden md:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:gap-3 transition-all"
              >
                {t.nav_blog} <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div
              onClick={() => {
                setSelectedPost(latestPost);
                setCurrentPage('blog-post');
              }}
              className="group cursor-pointer relative bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 mx-auto max-w-7xl"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-64 lg:h-[400px] relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {latestPost.image && !imageError ? (
                    <img
                      src={latestPost.image}
                      alt={latestPost.title}
                      loading="lazy"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 animate-fade-in"
                    />
                  ) : (
                    <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 animate-pulse" />
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold text-sm shadow-lg">
                      {t.featured_post}
                    </span>
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    {latestPost.date}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight group-hover:text-emerald-500 transition-colors">
                    {latestPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {latestPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    <button className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg group-hover:shadow-emerald-500/25 transition-all flex items-center gap-2">
                      {t.read_more} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden`}>
                          <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="user" loading="lazy" />
                        </div>
                      ))}
                      <div className="pl-4 text-sm text-gray-500 dark:text-gray-400 font-medium">+1.2k views</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <AdComponent slot="home_top" />

        {/* Tools Grid with Fruit/Veg Theme */}
        <div id="tools-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 lg:mb-20">
          {[
            { id: 'bmi', emoji: '🥑', color: 'from-lime-400 to-green-500', name: t.bmi_calc, description: t.bmi_desc },
            { id: 'calories', emoji: '🍎', color: 'from-red-400 to-rose-500', name: t.calories_calc, description: t.calories_desc },
            { id: 'water', emoji: '💧', color: 'from-blue-400 to-cyan-500', name: t.water_calc, description: t.water_desc },
            { id: 'ideal-weight', emoji: '🍐', color: 'from-yellow-400 to-amber-500', name: t.ideal_weight, description: t.ideal_weight_desc },
            { id: 'sleep', emoji: '🍇', color: 'from-purple-400 to-violet-500', name: t.sleep_calc, description: t.sleep_desc },
            { id: 'body-fat', emoji: '🍊', color: 'from-orange-400 to-orange-600', name: t.body_fat_calc, description: t.body_fat_desc }
          ].map((tool) => (
            <div
              key={tool.id}
              onClick={() => setCurrentPage(tool.id)}
              className="group bg-white dark:bg-gray-800 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-50 dark:border-gray-700 hover:-translate-y-2 active:scale-95"
            >
              <div className={`text-5xl md:text-6xl mb-4 md:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                {tool.emoji}
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-3">{tool.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{tool.description}</p>
              <div className={`inline-flex items-center bg-linear-to-r ${tool.color} text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold gap-2 shadow-lg group-hover:shadow-xl transition-all text-sm md:text-base`}>
                {t.explore_tool} <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>


        {/* Daily Tracking & Meals Feature Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-20">
          <div
            onClick={() => setCurrentPage('tracking')}
            className="group relative bg-linear-to-br from-orange-500 to-amber-600 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
          >
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform">
                🥕
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">{t.daily_tracking}</h3>
              <p className="text-orange-100 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-md leading-relaxed">{t.daily_tracking_desc}</p>
              <div className="inline-flex items-center gap-2 md:gap-3 px-5 md:px-6 py-3 md:py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors text-sm md:text-base">
                {t.open_dashboard} <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/20 blur-[80px] md:blur-[100px] -mr-24 md:-mr-32 -mt-24 md:-mt-32"></div>
          </div>

          <div
            onClick={() => setCurrentPage('meals')}
            className="group relative bg-linear-to-br from-green-600 to-emerald-700 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
          >
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform">
                🥗
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">{t.meal_suggestions}</h3>
              <p className="text-green-100 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-md leading-relaxed">{t.meal_suggestions_desc}</p>
              <div className="inline-flex items-center gap-2 md:gap-3 px-5 md:px-6 py-3 md:py-3 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-colors text-sm md:text-base">
                {t.view_meal_plans} <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/20 blur-[80px] md:blur-[100px] -mr-24 md:-mr-32 -mt-24 md:-mt-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};



const CaloriesCalculatorPage = ({ calWeight, setCalWeight, calHeight, setCalHeight, calAge, setCalAge, calGender, setCalGender, calActivity, setCalActivity, calculateCalories, calResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.calories_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.calories_desc}
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
              <input
                type="number"
                value={calWeight}
                onChange={(e) => setCalWeight(e.target.value)}
                placeholder="70"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
              <input
                type="number"
                value={calHeight}
                onChange={(e) => setCalHeight(e.target.value)}
                placeholder="175"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
              <input
                type="number"
                value={calAge}
                onChange={(e) => setCalAge(e.target.value)}
                placeholder="25"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
              <select
                value={calGender}
                onChange={(e) => setCalGender(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              >
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.activity_level}</label>
            <select
              value={calActivity}
              onChange={(e) => setCalActivity(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
            >
              <option value="sedentary">{t.activity_sedentary}</option>
              <option value="light">{t.activity_light}</option>
              <option value="moderate">{t.activity_moderate}</option>
              <option value="active">{t.activity_active}</option>
              <option value="veryActive">{t.activity_very_active}</option>
            </select>
          </div>

          <button
            onClick={calculateCalories}
            className="w-full py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {t.calculate}
          </button>
        </div>

        {calResult && (
          <div id="calories-result" className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-scale-in relative">
            <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 text-center shadow-lg hover:scale-105 transition-all">
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.maintain_weight}</p>
              <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{calResult.maintain}</p>
              <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
            </div>
            <div className="p-6 bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 text-center shadow-lg hover:scale-105 transition-all">
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.weight_loss}</p>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{calResult.loss}</p>
              <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
            </div>
            <div className="p-6 bg-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 rounded-2xl border-2 border-rose-200 dark:border-rose-800 text-center shadow-lg hover:scale-105 transition-all">
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.weight_gain}</p>
              <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{calResult.gain}</p>
              <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
            </div>

            <button
              onClick={() => setCurrentPage('meal-planner')}
              className="md:col-span-3 mt-4 p-4 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse-slow"
            >
              <Utensils className="w-6 h-6" />
              {t.meal_planner_title}
            </button>
          </div>
        )}

        <ToolInfoSection toolId="calories" t={t} />

        <AdComponent slot="calories_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const WaterCalculatorPage = ({ waterWeight, setWaterWeight, waterActivity, setWaterActivity, calculateWater, waterResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Droplet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.water_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.water_desc}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
            <input
              type="number"
              value={waterWeight}
              onChange={(e) => setWaterWeight(e.target.value)}
              placeholder="70"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.activity_level}</label>
            <select
              value={waterActivity}
              onChange={(e) => setWaterActivity(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
            >
              <option value="low">{t.activity_low}</option>
              <option value="moderate">{t.activity_moderate}</option>
              <option value="high">{t.activity_high}</option>
            </select>
          </div>

          <button
            onClick={calculateWater}
            className="w-full py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t.calculate}
          </button>
        </div>

        {waterResult && (
          <div id="water-result" className="mt-8 p-8 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{t.result}:</h3>
            <div className="flex items-center justify-center gap-4">
              <Droplet className="w-12 h-12 text-blue-500" fill="currentColor" />
              <p className="text-5xl font-black text-blue-600 dark:text-blue-400">{waterResult} {t.unit_liter}</p>
            </div>
          </div>
        )}

        <ToolInfoSection toolId="water" t={t} />

        <AdComponent slot="water_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const IdealWeightPage = ({ idealHeight, setIdealHeight, idealGender, setIdealGender, calculateIdealWeight, idealResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.ideal_weight}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.ideal_weight_desc}
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
              <input
                type="number"
                value={idealHeight}
                onChange={(e) => setIdealHeight(e.target.value)}
                placeholder="175"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
              <select
                value={idealGender}
                onChange={(e) => setIdealGender(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 focus:outline-none transition-colors text-lg"
              >
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateIdealWeight}
            className="w-full py-4 bg-linear-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t.calculate}
          </button>
        </div>

        {idealResult && (
          <div id="ideal-weight-result" className="mt-8 p-8 bg-linear-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-rose-200 dark:border-rose-800 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{t.result}:</h3>
            <div className="space-y-4">
              <p className="text-5xl font-black text-rose-600 dark:text-rose-400 text-center">{idealResult.ideal} <span className="text-2xl">{t.unit_kg}</span></p>
              <div className="flex gap-4">
                <div className="flex-1 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Min</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-200">{idealResult.min} {t.unit_kg}</p>
                </div>
                <div className="flex-1 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Max</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-200">{idealResult.max} {t.unit_kg}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <ToolInfoSection toolId="ideal_weight" t={t} />

        <AdComponent slot="ideal_weight_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const SleepCalculatorPage = ({ sleepAge, setSleepAge, calculateSleep, sleepResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Moon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.sleep_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.sleep_desc}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
            <input
              type="number"
              value={sleepAge}
              onChange={(e) => setSleepAge(e.target.value)}
              placeholder="30"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none transition-colors text-lg"
            />
          </div>

          <button
            onClick={calculateSleep}
            className="w-full py-4 bg-linear-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t.calculate}
          </button>
        </div>

        {sleepResult && (
          <div id="sleep-result" className="mt-8 p-8 bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-violet-200 dark:border-violet-800 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{t.result}:</h3>
            <p className="text-4xl font-black text-violet-600 dark:text-violet-400 text-center">{sleepResult}</p>
          </div>
        )}

        <ToolInfoSection toolId="sleep" t={t} />

        <AdComponent slot="sleep_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const BodyFatCalculatorPage = ({ bfWeight, setBfWeight, bfHeight, setBfHeight, bfAge, setBfAge, bfGender, setBfGender, bfNeck, setBfNeck, bfWaist, setBfWaist, bfHip, setBfHip, calculateBodyFat, bfResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Percent className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.body_fat_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.body_fat_desc}
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
              <input
                type="number"
                value={bfWeight}
                onChange={(e) => setBfWeight(e.target.value)}
                placeholder="70"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
              <input
                type="number"
                value={bfHeight}
                onChange={(e) => setBfHeight(e.target.value)}
                placeholder="175"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
              <input
                type="number"
                value={bfAge}
                onChange={(e) => setBfAge(e.target.value)}
                placeholder="25"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
              <select
                value={bfGender}
                onChange={(e) => setBfGender(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">{t.measurements} ({t.unit_cm})</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.neck}</label>
                <input
                  type="number"
                  value={bfNeck}
                  onChange={(e) => setBfNeck(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.waist}</label>
                <input
                  type="number"
                  value={bfWaist}
                  onChange={(e) => setBfWaist(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              {bfGender === 'female' && (
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.hip}</label>
                  <input
                    type="number"
                    value={bfHip}
                    onChange={(e) => setBfHip(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={calculateBodyFat}
            className="w-full py-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t.calculate}
          </button>
        </div>

        {bfResult && (
          <div id="body-fat-result" className="mt-8 p-8 bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border-2 border-orange-200 dark:border-orange-800 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{t.result}:</h3>
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-5xl font-black text-orange-600 dark:text-orange-400">{bfResult.bodyFat}%</p>
              <p className={`text-2xl font-bold ${bfResult.color} mt-2`}>{bfResult.category}</p>
            </div>
          </div>
        )}

        <ToolInfoSection toolId="body_fat" t={t} />

        <AdComponent slot="body_fat_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const DailyTrackingPage = ({ trackingData, newWeight, setNewWeight, addWeightEntry, newWater, setNewWater, addWaterEntry, newSleep, setNewSleep, addSleepEntry, deleteEntry, setCurrentPage, t }) => {
  const [activeTab, setActiveTab] = useState('weight');

  const weightChartData = trackingData.weight.map(entry => ({
    date: entry.date,
    weight: entry.value
  }));

  const waterChartData = trackingData.water.map(entry => ({
    date: entry.date,
    liters: entry.value
  }));

  const sleepChartData = trackingData.sleep.map(entry => ({
    date: entry.date,
    hours: entry.value
  }));

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">{t.daily_tracking}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{t.tracking_subtitle}</p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setCurrentPage('calculators')}
            className="px-6 py-3 rounded-xl font-semibold transition-all bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
          >
            <Calculator className="w-5 h-5 inline mr-2" />
            {t.nav_apps}
          </button>
          <button
            onClick={() => setActiveTab('weight')}
            aria-label={t.weight}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'weight'
              ? 'bg-linear-to-r from-violet-500 to-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
              }`}
          >
            <Scale className="w-5 h-5 inline mr-2" />
            {t.weight}
          </button>
          <button
            onClick={() => setActiveTab('water')}
            aria-label={t.water_calc}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'water'
              ? 'bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
              }`}
          >
            <Droplet className="w-5 h-5 inline mr-2" />
            {t.water_calc}
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            aria-label={t.sleep_calc}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'sleep'
              ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
              }`}
          >
            <Moon className="w-5 h-5 inline mr-2" />
            {t.sleep_calc}
          </button>
        </div>

        {activeTab === 'weight' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <Scale className="w-8 h-8 text-violet-600" />
                {t.weight} {t.history}
              </h2>

              <div className="flex gap-4 mb-6">
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder={`${t.weight} (${t.unit_kg})`}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none transition-colors text-lg"
                />
                <button
                  onClick={addWeightEntry}
                  className="px-8 py-4 bg-linear-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  {t.add_entry}
                </button>
              </div>

              {weightChartData.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={weightChartData}>
                      <defs>
                        <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '2px solid #8b5cf6',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="weight"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fill="url(#weightGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                {trackingData.weight.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-300 text-center py-8">{t.no_entries}</p>
                ) : (
                  <div className="space-y-2">
                    {[...trackingData.weight].reverse().slice(0, 10).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-linear-to-r from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 rounded-xl border border-violet-100 dark:border-violet-900/30">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.unit_kg}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                        </div>
                        <button
                          onClick={() => deleteEntry('weight', trackingData.weight.length - 1 - index)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2"
                          aria-label={t.aria_delete_entry}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'water' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <Droplet className="w-8 h-8 text-blue-600" />
                {t.water_calc} {t.history}
              </h2>

              <div className="flex gap-4 mb-6">
                <input
                  type="number"
                  value={newWater}
                  onChange={(e) => setNewWater(e.target.value)}
                  placeholder={t.liters}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
                />
                <button
                  onClick={addWaterEntry}
                  className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  {t.add_entry}
                </button>
              </div>

              {waterChartData.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={waterChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '2px solid #3b82f6',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Bar dataKey="liters" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                {trackingData.water.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-300 text-center py-8">{t.no_entries}</p>
                ) : (
                  <div className="space-y-2">
                    {[...trackingData.water].reverse().slice(0, 10).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.liters}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                        </div>
                        <button
                          onClick={() => deleteEntry('water', trackingData.water.length - 1 - index)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2"
                          aria-label={t.aria_delete_entry}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sleep' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <Moon className="w-8 h-8 text-indigo-600" />
                {t.sleep_calc} {t.history}
              </h2>

              <div className="flex gap-4 mb-6">
                <input
                  type="number"
                  value={newSleep}
                  onChange={(e) => setNewSleep(e.target.value)}
                  placeholder={t.hours}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors text-lg"
                />
                <button
                  onClick={addSleepEntry}
                  className="px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  {t.add_entry}
                </button>
              </div>

              {sleepChartData.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sleepChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '2px solid #6366f1',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ fill: '#6366f1', r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                {trackingData.sleep.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-300 text-center py-8">{t.no_entries}</p>
                ) : (
                  <div className="space-y-2">
                    {[...trackingData.sleep].reverse().slice(0, 10).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.hours}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                        </div>
                        <button
                          onClick={() => deleteEntry('sleep', trackingData.sleep.length - 1 - index)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2"
                          aria-label={t.aria_delete_entry}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
        >
          {t.back_to_home}
        </button>
      </div>
    </div>
  );
};

const MealsPage = ({ selectedMealCategory, setSelectedMealCategory, t }) => {
  const selectedCategory = selectedMealCategory ? mealCategories[selectedMealCategory] : null;

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          {t.meals_title}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          {t.meals_subtitle}
        </p>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(mealCategories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <div
                  key={key}
                  onClick={() => setSelectedMealCategory(key)}
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className={`w-16 h-16 bg-linear-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    {t[category.title]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {category.meals.length} {t.explore_tool}
                  </p>
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold group-hover:gap-2 transition-all">
                    {t.view_meals} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedMealCategory(null)}
              className="mb-8 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              ← {t.back_to_categories}
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-gray-50 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 bg-linear-to-br ${selectedCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  {React.createElement(selectedCategory.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  {t[selectedCategory.title]}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategory.meals.map((meal, index) => (
                  <div
                    key={index}
                    className="p-6 bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Utensils className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t[meal.name]}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.calories}</p>
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{meal.calories}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.protein}</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{meal.protein}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.carbs}</p>
                        <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{meal.carbs}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.fat}</p>
                        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{meal.fat}</p>
                      </div>
                      {meal.gi && (
                        <div className="col-span-2 bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.gi}</p>
                          <p className="text-lg font-bold text-green-600">{meal.gi}</p>
                        </div>
                      )}
                      {meal.sodium && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.sodium}</p>
                          <p className="text-lg font-bold text-rose-600 dark:text-rose-400">{meal.sodium}</p>
                        </div>
                      )}
                      {meal.potassium && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.potassium}</p>
                          <p className="text-lg font-bold text-teal-600">{meal.potassium}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-6 rounded-2xl shadow-md mt-8">
          <p className="text-amber-800 dark:text-amber-200 font-medium">
            {t.meals_note}
          </p>
        </div>
      </div>
    </div>
  );
};

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

      {/* Expert Team Section */}
      <div className="mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">{t.our_experts}</h2>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium">Science-backed tools verified by global wellness professionals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'nutrition', title: t.expert_nutrition_title, role: t.expert_nutrition_role, bio: t.expert_nutrition_bio, color: 'emerald' },
            { id: 'fitness', title: t.expert_fitness_title, role: t.expert_fitness_role, bio: t.expert_fitness_bio, color: 'blue' },
            { id: 'mental', title: t.expert_mental_title, role: t.expert_mental_role, bio: t.expert_mental_bio, color: 'violet' }
          ].map((expert) => (
            <div key={expert.id} className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700 hover:shadow-2xl transition-all group hover:-translate-y-2 duration-300">
              <div className={`w-20 h-20 bg-${expert.color === 'emerald' ? 'emerald' : expert.color === 'blue' ? 'blue' : 'violet'}-500/10 rounded-3xl mb-8 flex items-center justify-center text-${expert.color === 'emerald' ? 'emerald' : expert.color === 'blue' ? 'blue' : 'violet'}-500 shadow-inner`}>
                {expert.id === 'nutrition' && <Utensils className="w-10 h-10" />}
                {expert.id === 'fitness' && <Activity className="w-10 h-10" />}
                {expert.id === 'mental' && <Heart className="w-10 h-10" />}
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-emerald-500 transition-colors">{expert.title}</h3>
              <p className={`text-xs font-black uppercase tracking-widest text-${expert.color === 'emerald' ? 'emerald' : expert.color === 'blue' ? 'blue' : 'violet'}-500 mb-6 py-1 px-3 bg-${expert.color === 'emerald' ? 'emerald' : expert.color === 'blue' ? 'blue' : 'violet'}-500/10 rounded-lg inline-block`}>
                {expert.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{expert.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Quote / CTA */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-700 rounded-[3rem] p-8 md:p-16 text-center text-white shadow-2xl mb-16 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-6 tracking-tight">Built on Precision. Designed for Health.</h2>
          <p className="max-w-2xl mx-auto text-emerald-50 text-lg md:text-xl font-medium mb-10 leading-relaxed opacity-90">
            Join thousands of users who trust WellTools for their daily health tracking and wellness journey. Free, forever, and secure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setCurrentPage('home')} className="px-10 py-5 bg-white text-emerald-700 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95">
              Start Tracking Now
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 flex items-center gap-2 mx-auto md:mx-0"
      >
        <ArrowLeft className="w-5 h-5" />
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const TermsOfUsePage = ({ setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.terms}</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <p>{t.terms_intro}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_usage_title}</h2>
          <p>{t.terms_usage_desc}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_intellectual_title}</h2>
          <p>{t.terms_intellectual_desc}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_liability_title}</h2>
          <p>{t.terms_liability_desc}</p>
        </div>
      </div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const DisclaimerPage = ({ setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.disclaimer}</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <div className="bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-400 p-6 rounded-2xl mb-8">
            <p className="text-rose-800 dark:text-rose-400 font-bold mb-4">{t.disclaimer_title}</p>
            <p className="text-rose-700 dark:text-rose-300">{t.disclaimer_desc}</p>
          </div>
          <p>{t.medical_disclaimer_intro}</p>
        </div>
      </div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const PrivacyPolicyPage = ({ setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.privacy}</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <p>{t.privacy_intro}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.privacy_collection_title}</h2>
          <p>{t.privacy_collection_desc}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.privacy_storage_title}</h2>
          <p>{t.privacy_storage_desc}</p>
        </div>
      </div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const ContactPage = ({ setCurrentPage, t }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('https://formspree.io/f/mykpwodd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, subject, message })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setEmail(''); setSubject(''); setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">{t.contact_title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{t.contact_subtitle}</p>
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-400 dark:border-emerald-600 rounded-2xl text-emerald-900 dark:text-emerald-200 animate-fade-in">
              <p className="font-bold text-xl mb-1">{t.msg_sent_success}</p>
              <p>{t.msg_sent_desc}</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-8 p-6 bg-rose-100 dark:bg-rose-900/30 border-2 border-rose-400 dark:border-rose-600 rounded-2xl text-rose-900 dark:text-rose-200 animate-fade-in">
              <p className="font-bold text-xl mb-1">{t.msg_error}</p>
              <p>{t.msg_error_desc}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.your_email}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg" />
            </div>
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.subject}</label>
              <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t.subject} className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg" />
            </div>
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.message}</label>
              <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.message} rows="5" className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg resize-none"></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg transform transition-all duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-linear-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:-translate-y-1'}`}>
              {isSubmitting ? t.sending : t.send_message}
            </button>
          </form>
        </div>
        <button onClick={() => setCurrentPage('home')} className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
          {t.back_to_home}
        </button>
      </div>
    </div>
  );
};



const BlogPage = ({ setCurrentPage, setSelectedPost, t, lang }) => {
  // Fallback to English if no posts in current language
  const posts = (postsData[lang] && postsData[lang].length > 0) ? postsData[lang] : (postsData['en'] || []);
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
                <div className="relative h-64 overflow-hidden bg-gray-800">
                  <img src={post.image} alt={post.imageAlt || post.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                <button onClick={() => { setSelectedPost(post); setCurrentPage('blog-post'); window.scrollTo(0, 0); }} className="w-full py-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
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

const parseMarkdown = (text) => {
  if (!text) return null;

  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Headers
    if (line.startsWith('### ')) {
      return <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.slice(4)}</h3>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-black text-gray-900 dark:text-white mt-10 mb-6">{line.slice(3)}</h2>;
    }
    if (line.startsWith('# ')) {
      return <h1 key={i} className="text-3xl font-black text-gray-900 dark:text-white mt-12 mb-8">{line.slice(2)}</h1>;
    }

    // Lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      return <li key={i} className="ml-6 list-disc text-gray-700 dark:text-gray-300 mb-2">{parseInlineMarkdown(line.trim().slice(2))}</li>;
    }
    if (/^\d+\.\s/.test(line.trim())) {
      return <li key={i} className="ml-6 list-decimal text-gray-700 dark:text-gray-300 mb-2">{parseInlineMarkdown(line.trim().replace(/^\d+\.\s/, ''))}</li>;
    }

    // Empty lines
    if (!line.trim()) return <div key={i} className="h-4" />;

    // Regular paragraphs
    return <p key={i} className="mb-4 leading-relaxed">{parseInlineMarkdown(line)}</p>;
  });
};

const parseInlineMarkdown = (text) => {
  if (typeof text !== 'string') return text;
  // Bold: **text**
  let parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }

    // Links: [text](url)
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
};

const BlogPostPage = ({ post, setCurrentPage, t }) => {
  const [imageError, setImageError] = useState(false);
  if (!post) return null;
  return (
    <div className="bg-white dark:bg-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentPage('blog')}
          className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-bold transition-all group"
          aria-label={t.aria_back}
        >
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-emerald-50">
            <ArrowLeft className="w-5 h-5" />
          </div>
          {t.back_to_blog}
        </button>
        <header className="mb-12">
          {post.image && (
            <div className="w-full h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl bg-gray-800 flex items-center justify-center">
              {!imageError ? (
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  onError={() => setImageError(true)}
                  decoding="async"
                  className="w-full h-full object-cover animate-fade-in"
                />
              ) : (
                <BookOpen className="w-24 h-24 text-gray-600" />
              )}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8 tracking-tight">{post.title}</h1>
        </header>
        <article className="max-w-none text-gray-700 dark:text-gray-300" dir="ltr">
          {parseMarkdown(post.content)}
        </article>

        {post.faq && post.faq.length > 0 && (
          <div className="mt-20 p-8 md:p-12 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] border border-slate-200 dark:border-gray-700">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-8">{t.faq_title}</h2>
            <div className="space-y-6" dir="ltr">
              {post.faq.map((item, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{item.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <AdComponent slot="blog_post_bottom" />
      </div>
    </div>
  );
};

const DailyHealthTools = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Safe Language Initialization with URL Support
  const getInitialLang = () => {
    // 1. Check URL parameters (highest priority for SEO/Links)
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && translations[urlLang]) return urlLang;

    // 2. Check localStorage
    const saved = localStorage.getItem('lang');
    if (saved && translations[saved]) return saved;

    // 3. Fallback
    return 'en';
  };

  const [lang, setLang] = useState(getInitialLang());

  const t = translations[lang] || translations['en']; // Fallback safety

  useEffect(() => {
    localStorage.setItem('lang', lang);
    if (t?.dir) {
      document.documentElement.dir = t.dir;
    }
    document.documentElement.lang = lang;
  }, [lang, t]);

  // BMI Calculator State
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // Calories Calculator State
  const [calWeight, setCalWeight] = useState('');
  const [calHeight, setCalHeight] = useState('');
  const [calAge, setCalAge] = useState('');
  const [calGender, setCalGender] = useState('male');
  const [calActivity, setCalActivity] = useState('sedentary');
  const [calResult, setCalResult] = useState(null);

  // Water Calculator State
  const [waterWeight, setWaterWeight] = useState('');
  const [waterActivity, setWaterActivity] = useState('low');
  const [waterResult, setWaterResult] = useState(null);

  // Ideal Weight Calculator State
  const [idealHeight, setIdealHeight] = useState('');
  const [idealGender, setIdealGender] = useState('male');
  const [idealResult, setIdealResult] = useState(null);

  // Sleep Calculator State
  const [sleepAge, setSleepAge] = useState('');
  const [sleepResult, setSleepResult] = useState(null);

  // Body Fat Calculator State
  const [bfWeight, setBfWeight] = useState('');
  const [bfHeight, setBfHeight] = useState('');
  const [bfAge, setBfAge] = useState('');
  const [bfGender, setBfGender] = useState('male');
  const [bfNeck, setBfNeck] = useState('');
  const [bfWaist, setBfWaist] = useState('');
  const [bfHip, setBfHip] = useState('');
  const [bfResult, setBfResult] = useState(null);

  // Daily Tracking State
  const [trackingData, setTrackingData] = useState({
    weight: [],
    water: [],
    sleep: []
  });
  const [newWeight, setNewWeight] = useState('');
  const [newWater, setNewWater] = useState('');
  const [newSleep, setNewSleep] = useState('');

  // Selected Meal Category
  const [selectedMealCategory, setSelectedMealCategory] = useState(null);

  // Load tracking data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('healthTracking');
    if (saved) {
      setTrackingData(JSON.parse(saved));
    }
  }, []);

  // Save tracking data to localStorage
  const saveTrackingData = (data) => {
    setTrackingData(data);
    localStorage.setItem('healthTracking', JSON.stringify(data));
  };

  // Calculator Functions
  const calculateBMI = () => {
    const weight = parseFloat(bmiWeight);
    const height = parseFloat(bmiHeight) / 100;
    const bmi = (weight / (height * height)).toFixed(1);

    let category = '';
    let color = '';
    let suitable = false;
    let tip = '';

    if (bmi < 18.5) {
      category = 'cat_underweight';
      color = 'text-blue-600';
      suitable = false;
      tip = t.tip_underweight;
    }
    else if (bmi < 25) {
      category = 'cat_normal';
      color = 'text-green-600';
      suitable = true;
      tip = t.tip_normal;
    }
    else if (bmi < 30) {
      category = 'cat_overweight';
      color = 'text-yellow-600';
      suitable = false;
      tip = t.tip_overweight;
    }
    else {
      category = 'cat_obese';
      color = 'text-red-600';
      suitable = false;
      tip = t.tip_obese;
    }

    setBmiResult({ bmi, category, color, suitable, tip });
  };

  const calculateCalories = () => {
    const weight = parseFloat(calWeight);
    const height = parseFloat(calHeight);
    const age = parseInt(calAge);

    let bmr;
    if (calGender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = Math.round(bmr * activityMultipliers[calActivity]);
    const weightLoss = Math.round(tdee - 500);
    const weightGain = Math.round(tdee + 500);

    setCalResult({ maintain: tdee, loss: weightLoss, gain: weightGain });
  };

  const calculateWater = () => {
    const weight = parseFloat(waterWeight);
    let waterIntake = weight * 0.033;

    if (waterActivity === 'moderate') waterIntake += 0.5;
    if (waterActivity === 'high') waterIntake += 1;

    setWaterResult(waterIntake.toFixed(1));
  };

  const calculateIdealWeight = () => {
    const height = parseFloat(idealHeight);
    let ideal;

    if (idealGender === 'male') {
      ideal = 50 + 0.91 * (height - 152.4);
    } else {
      ideal = 45.5 + 0.91 * (height - 152.4);
    }

    const min = (ideal * 0.9).toFixed(1);
    const max = (ideal * 1.1).toFixed(1);

    setIdealResult({ ideal: ideal.toFixed(1), min, max });
  };

  const calculateSleep = () => {
    const age = parseInt(sleepAge);
    let hours = '';

    if (age < 1) hours = `14-17 ${t.hours}`;
    else if (age < 2) hours = `11-14 ${t.hours}`;
    else if (age < 5) hours = `10-13 ${t.hours}`;
    else if (age < 13) hours = `9-11 ${t.hours}`;
    else if (age < 18) hours = `8-10 ${t.hours}`;
    else if (age < 65) hours = `7-9 ${t.hours}`;
    else hours = `7-8 ${t.hours}`;

    setSleepResult(hours);
  };

  const calculateBodyFat = () => {
    const weight = parseFloat(bfWeight);
    const height = parseFloat(bfHeight);
    const age = parseInt(bfAge);
    const neck = parseFloat(bfNeck);
    const waist = parseFloat(bfWaist);
    const hip = parseFloat(bfHip);

    let bodyFat;

    if (bfGender === 'male') {
      // US Navy formula for men
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      // US Navy formula for women
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    bodyFat = bodyFat.toFixed(1);

    let category = '';
    let color = '';

    if (bfGender === 'male') {
      if (bodyFat < 6) { category = t.cat_essential; color = 'text-blue-600'; }
      else if (bodyFat < 14) { category = t.cat_athletes; color = 'text-green-600'; }
      else if (bodyFat < 18) { category = t.cat_fitness; color = 'text-emerald-600'; }
      else if (bodyFat < 25) { category = t.cat_average; color = 'text-yellow-600'; }
      else { category = t.cat_obese; color = 'text-red-600'; }
    } else {
      if (bodyFat < 14) { category = t.cat_essential; color = 'text-blue-600'; }
      else if (bodyFat < 21) { category = t.cat_athletes; color = 'text-green-600'; }
      else if (bodyFat < 25) { category = t.cat_fitness; color = 'text-emerald-600'; }
      else if (bodyFat < 32) { category = t.cat_average; color = 'text-yellow-600'; }
      else { category = t.cat_obese; color = 'text-red-600'; }
    }

    const leanMass = (weight * (1 - bodyFat / 100)).toFixed(1);
    const fatMass = (weight * (bodyFat / 100)).toFixed(1);

    setBfResult({ bodyFat, category, color, leanMass, fatMass });
  };

  // Tracking Functions
  const addWeightEntry = () => {
    if (newWeight) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        value: parseFloat(newWeight),
        timestamp: Date.now()
      };
      const updated = {
        ...trackingData,
        weight: [...trackingData.weight, entry].slice(-30) // Keep last 30 entries
      };
      saveTrackingData(updated);
      setNewWeight('');
    }
  };

  const addWaterEntry = () => {
    if (newWater) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        value: parseFloat(newWater),
        timestamp: Date.now()
      };
      const updated = {
        ...trackingData,
        water: [...trackingData.water, entry].slice(-30)
      };
      saveTrackingData(updated);
      setNewWater('');
    }
  };

  const addSleepEntry = () => {
    if (newSleep) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        value: parseFloat(newSleep),
        timestamp: Date.now()
      };
      const updated = {
        ...trackingData,
        sleep: [...trackingData.sleep, entry].slice(-30)
      };
      saveTrackingData(updated);
      setNewSleep('');
    }
  };

  const deleteEntry = (type, index) => {
    const updated = {
      ...trackingData,
      [type]: trackingData[type].filter((_, i) => i !== index)
    };
    saveTrackingData(updated);
  };














  return (
    <div className="min-h-screen font-sans transition-colors duration-300 dark bg-gray-900 text-white">
      <style>{`
        * {
          font-family: 'Plus Jakarta Sans', 'IBM Plex Sans Arabic', sans-serif;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #06b6d4);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0891b2);
        }
      `}</style>

      <NavBar
        setCurrentPage={setCurrentPage}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      <main className="min-h-[80vh]">
        <Suspense fallback={<div className="flex justify-center items-center min-h-[400px]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>}>
          {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} setSelectedMealCategory={setSelectedMealCategory} setSelectedPost={setSelectedPost} lang={lang} t={t} />}
          {currentPage === 'bmi' && <BMICalculatorPage bmiWeight={bmiWeight} setBmiWeight={setBmiWeight} bmiHeight={bmiHeight} setBmiHeight={setBmiHeight} calculateBMI={calculateBMI} bmiResult={bmiResult} setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'calories' && <CaloriesCalculatorPage calWeight={calWeight} setCalWeight={setCalWeight} calHeight={calHeight} setCalHeight={setCalHeight} calAge={calAge} setCalAge={setCalAge} calGender={calGender} setCalGender={setCalGender} calActivity={calActivity} setCalActivity={setCalActivity} calculateCalories={calculateCalories} calResult={calResult} setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'water' && <WaterCalculatorPage waterWeight={waterWeight} setWaterWeight={setWaterWeight} waterActivity={waterActivity} setWaterActivity={setWaterActivity} calculateWater={calculateWater} waterResult={waterResult} setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'ideal-weight' && <IdealWeightPage idealHeight={idealHeight} setIdealHeight={setIdealHeight} idealGender={idealGender} setIdealGender={setIdealGender} calculateIdealWeight={calculateIdealWeight} idealResult={idealResult} setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'sleep' && <SleepCalculatorPage sleepAge={sleepAge} setSleepAge={setSleepAge} calculateSleep={calculateSleep} sleepResult={sleepResult} setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'body-fat' && <BodyFatCalculatorPage bfWeight={bfWeight} setBfWeight={setBfWeight} bfHeight={bfHeight} setBfHeight={setBfHeight} bfAge={bfAge} setBfAge={setBfAge} bfGender={bfGender} setBfGender={setBfGender} bfNeck={bfNeck} setBfNeck={setBfNeck} bfWaist={bfWaist} setBfWaist={setBfWaist} bfHip={bfHip} setBfHip={setBfHip} calculateBodyFat={calculateBodyFat} bfResult={bfResult} setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'tracking' && <DailyTrackingPage trackingData={trackingData} newWeight={newWeight} setNewWeight={setNewWeight} addWeightEntry={addWeightEntry} newWater={newWater} setNewWater={setNewWater} addWaterEntry={addWaterEntry} newSleep={newSleep} setNewSleep={setNewSleep} addSleepEntry={addSleepEntry} deleteEntry={deleteEntry} setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'meals' && <MealsPage selectedMealCategory={selectedMealCategory} setSelectedMealCategory={setSelectedMealCategory} t={t} />}
          {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'terms-of-use' && <TermsOfUsePage setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'disclaimer' && <DisclaimerPage setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'privacy-policy' && <PrivacyPolicyPage setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'blog' && <BlogPage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} t={t} lang={lang} />}
          {currentPage === 'blog-post' && <BlogPostPage post={selectedPost} setCurrentPage={setCurrentPage} t={t} />}
          {currentPage === 'meal-planner' && <MealPlannerPage t={t} setCurrentPage={setCurrentPage} calResult={calResult} />}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold">WellTools</span>
          </div>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">{t.footer_desc}</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            <button onClick={() => setCurrentPage('blog')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.blog}</button>
            <button onClick={() => setCurrentPage('about')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.about}</button>
            <button onClick={() => setCurrentPage('terms-of-use')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.terms}</button>
            <button onClick={() => setCurrentPage('disclaimer')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.disclaimer}</button>
            <button onClick={() => setCurrentPage('privacy-policy')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.privacy}</button>
            <button onClick={() => setCurrentPage('contact')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.contact}</button>
          </div>
          <p className="text-gray-400 text-sm font-medium">© {new Date().getFullYear()} WellTools. {t.all_rights}</p>
          <p className="text-gray-400 text-xs mt-2 max-w-2xl mx-auto leading-relaxed opacity-80">{t.footer_medical_disclaimer}</p>
        </div>
      </footer>
    </div>
  );
};

export default DailyHealthTools;
