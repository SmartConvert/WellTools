import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Activity, Percent, Scale, Droplet, Moon, Clock, Heart, Apple, TrendingDown, Calendar, BarChart3, LineChart as LineChartIcon, Utensils, Zap, Dumbbell, ShieldCheck, Sparkles } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';
import EmailCaptureForm from './EmailCaptureForm';

import heroImage from '../assets/hero-clinic.png?as=metadata&format=webp;avif&w=1200;800;400';

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
        { id: 'bmi', icon: <Scale className="w-8 h-8" />, title: 'BMI Calculator Free', desc: 'Calculate your Body Mass Index instantly with our free BMI calculator. Get health risk assessments and personalized weight recommendations.', color: 'from-emerald-400 to-teal-500', shadowColor: 'shadow-emerald-500/40' },
        { id: 'calories', icon: <Activity className="w-8 h-8" />, title: 'Daily Calorie Calculator', desc: 'Discover your personalized daily calorie needs based on age, weight, height, and activity level using the Mifflin-St Jeor equation.', color: 'from-cyan-400 to-blue-500', shadowColor: 'shadow-cyan-500/40' },
        { id: 'water', icon: <Droplet className="w-8 h-8" />, title: 'Water Intake Calculator', desc: 'Calculate your optimal daily water intake based on weight, activity, and climate. Stay hydrated with science-backed recommendations.', color: 'from-blue-400 to-indigo-500', shadowColor: 'shadow-blue-500/40' },
        { id: 'ideal-weight', icon: <Scale className="w-8 h-8" />, title: 'Ideal Weight Calculator', desc: 'Find your healthy weight range using medical formulas (Robinson, Miller, Devine). Get personalized weight range goals.', color: 'from-teal-400 to-emerald-500', shadowColor: 'shadow-teal-500/40' },
        { id: 'sleep', icon: <Moon className="w-8 h-8" />, title: 'Sleep Calculator', desc: 'Optimize your sleep schedule based on 90-minute sleep cycles. Wake up refreshed with our free sleep calculator.', color: 'from-indigo-400 to-violet-500', shadowColor: 'shadow-indigo-500/40' },
        { id: 'body-fat', icon: <Percent className="w-8 h-8" />, title: 'Body Fat Calculator', desc: 'Estimate your body fat percentage using Navy Method or BMI-based formulas. Track body composition beyond weight.', color: 'from-fuchsia-400 to-pink-500', shadowColor: 'shadow-fuchsia-500/40' },
        { id: 'bmr', icon: <Zap className="w-8 h-8" />, title: 'BMR Calculator', desc: 'Calculate your Basal Metabolic Rate - the calories you burn at rest. Essential for weight loss and muscle gain planning.', color: 'from-amber-400 to-orange-500', shadowColor: 'shadow-amber-500/40' },
        { id: 'macro', icon: <Utensils className="w-8 h-8" />, title: 'Macro Calculator', desc: 'Determine your optimal macronutrient split (protein, carbs, fats) for weight loss, muscle gain, or maintenance goals.', color: 'from-rose-400 to-red-500', shadowColor: 'shadow-rose-500/40' },
        { id: '1rm', icon: <Dumbbell className="w-8 h-8" />, title: '1RM Calculator', desc: 'Estimate your one-rep max strength for any exercise. Plan progressive overload and track strength gains safely.', color: 'from-slate-600 to-gray-800', shadowColor: 'shadow-slate-600/40' },
        { id: 'fasting', icon: <Clock className="w-8 h-8" />, title: 'Fasting Schedule', desc: 'Create your perfect intermittent fasting schedule. Calculate exact eating and fasting windows.', color: 'from-violet-400 to-purple-600', shadowColor: 'shadow-violet-500/40' }
    ];

    return (
        <div className="pt-20 pb-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                {/* Premium Hero Section - Global SaaS Style */}
                <div className="relative mb-24 lg:mb-32">
                    {/* Ambient Glows replacing the heavy box card */}
                    <div className="absolute top-[-10%] right-[-5%] w-[30rem] md:w-[40rem] h-[30rem] md:h-[40rem] bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full blur-[100px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] md:w-[40rem] h-[30rem] md:h-[40rem] bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full blur-[100px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center pt-8 sm:pt-16 z-10 w-full">
                        {/* Left Content */}
                        <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-10">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold shadow-sm mb-8 hover:scale-105 transition-transform cursor-pointer">
                                <Sparkles className="w-4 h-4 text-emerald-500" />
                                <span>Free Professional Health Tools</span>
                            </div>
                            
                            <h1 className="text-[3.5rem] sm:text-7xl lg:text-[5.5rem] font-black text-slate-900 dark:text-white mb-6 tracking-[-0.04em] leading-[1.05]">
                                Science-Backed<br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 via-teal-400 to-cyan-500">
                                    Health Insights
                                </span>
                            </h1>
                            
                            <p className="text-lg sm:text-xlg lg:text-2xl text-slate-600 dark:text-slate-400 max-w-xl font-medium leading-relaxed mb-10">
                                Access 9+ medically-validated calculators for BMI, calories, and nutrition. Get instant data to drive your wellness journey.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button
                                    onClick={() => {
                                        const el = document.getElementById('tools-grid');
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                                >
                                    {t.explore_tools}
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage('meal-planner')}
                                    className="px-8 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shadow-sm"
                                >
                                    {t.meal_planner_title}
                                </button>
                            </div>
                        </div>

                        {/* Right Image - Floating Premium Frame */}
                        <div className="relative w-full max-w-xl lg:max-w-2xl mx-auto lg:ml-auto z-10 pt-10 lg:pt-0">
                            {/* Decorative Floating Elements */}
                            <div className="absolute -top-6 -left-4 sm:-left-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-[bounce_8s_infinite] z-20 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Metabolism</div>
                                    <div className="text-base font-black text-slate-900 dark:text-white">Optimized</div>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-10 -right-4 sm:-right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-[bounce_10s_infinite_reverse] z-20 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                                    <Scale className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ideal BMI</div>
                                    <div className="text-base font-black text-slate-900 dark:text-white leading-tight">22.4 <span className="text-emerald-500 text-sm ml-1">Perfect</span></div>
                                </div>
                            </div>

                            {/* Main Image Container */}
                            <div className="p-2 sm:p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] border border-white/60 dark:border-slate-700/50 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-all duration-700 hover:scale-[1.02] group">
                                <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-inner bg-slate-100 dark:bg-slate-900">
                                    <img
                                        src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=1200"
                                        alt="Modern smartwatch displaying health and fitness activity metrics"
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                                        loading="eager"
                                    />
                                    {/* Subtle Overlay for contrast */}
                                    <div className="absolute inset-0 bg-linear-to-tr from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="mb-20 lg:mb-32 px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            How <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-cyan-500">WellTools</span> Works
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                            Get personalized health insights instantly without any friction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-1 bg-linear-to-r from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 rounded-full"></div>

                        {/* Step 1 */}
                        <div className="relative group text-center">
                            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl border border-emerald-100 dark:border-emerald-500/20 group-hover:-translate-y-2 group-hover:shadow-emerald-500/20 transition-all duration-300 relative z-10">
                                <span className="bg-linear-to-br from-emerald-400 to-teal-500 text-transparent bg-clip-text">1</span>
                                <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-emerald-400 transition-colors"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-emerald-500 transition-colors">
                                Choose Your Tool
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Select from 9+ free health calculators: BMI, calories, macros, water intake, sleep, and more.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative group text-center">
                            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl border border-cyan-100 dark:border-cyan-500/20 group-hover:-translate-y-2 group-hover:shadow-cyan-500/20 transition-all duration-300 relative z-10">
                                <span className="bg-linear-to-br from-cyan-400 to-blue-500 text-transparent bg-clip-text">2</span>
                                <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-cyan-400 transition-colors"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-cyan-500 transition-colors">
                                Enter Your Data
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Input your height, weight, age, and activity level. All calculations happen instantly in your browser.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative group text-center">
                            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl border border-indigo-100 dark:border-indigo-500/20 group-hover:-translate-y-2 group-hover:shadow-indigo-500/20 transition-all duration-300 relative z-10">
                                <span className="bg-linear-to-br from-indigo-400 to-purple-500 text-transparent bg-clip-text">3</span>
                                <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-indigo-400 transition-colors"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-500 transition-colors">
                                Get Instant Insights
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Receive personalized health metrics, medical interpretations, and actionable recommendations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose WellTools Feature Cards */}
                <div className="mb-20 lg:mb-32">
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            The <span className="text-emerald-500">WellTools</span> Advantage
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                            The most trusted free health calculators online with medical-grade accuracy
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {[
                            {
                                icon: <ShieldCheck className="w-8 h-8" />,
                                title: "Medical Accuracy",
                                desc: "Validated formulas like Mifflin-St Jeor and Katch-McArdle.",
                                comparison: "vs. outdated tools",
                                color: "emerald"
                            },
                            {
                                icon: <Heart className="w-8 h-8" />,
                                title: "No Ads Overload",
                                desc: "Clean interface without intrusive ads. Your health data stays safe.",
                                comparison: "vs. ad-heavy competitors",
                                color: "cyan"
                            },
                            {
                                icon: <BookOpen className="w-8 h-8" />,
                                title: "Medical References",
                                desc: "Every calculation backed by peer-reviewed research (PubMed, WHO).",
                                comparison: "vs. unsourced calculators",
                                color: "indigo"
                            },
                            {
                                icon: <Activity className="w-8 h-8" />,
                                title: "Free Forever",
                                desc: "All 9+ health calculators are completely free. No paywalls.",
                                comparison: "vs. premium apps",
                                color: "fuchsia"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group relative p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden z-10">
                                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${feature.color}-500/10 rounded-full blur-2xl group-hover:bg-${feature.color}-500/20 transition-colors duration-500`}></div>
                                
                                <div className={`w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-${feature.color}-500 mb-8 shadow-sm border border-${feature.color}-100 dark:border-${feature.color}-900 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className={`text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-${feature.color}-500 transition-colors`}>{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 leading-relaxed">
                                    {feature.desc}
                                </p>
                                <div className={`inline-flex items-center text-sm font-bold text-${feature.color}-600 dark:text-${feature.color}-400 bg-${feature.color}-50 dark:bg-${feature.color}-500/10 px-3 py-1.5 rounded-lg`}>
                                    ✓ {feature.comparison}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium Impact Stats Section */}
                <div className="mb-20 lg:mb-32 px-4 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(79,70,229,0.4)] overflow-hidden relative group border border-white/10">
                            {/* Glowing Background Overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-60"></div>

                            <div className="p-10 md:p-16 relative overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white relative z-10">
                                    <div className="text-center transform flex flex-col items-center">
                                        <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-emerald-300 to-emerald-600 mb-4 drop-shadow-sm">9+</div>
                                        <p className="text-lg text-emerald-100 font-bold uppercase tracking-widest">Medical Calculators</p>
                                    </div>
                                    <div className="text-center transform flex flex-col items-center md:border-x border-white/10 px-4">
                                        <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-cyan-300 to-cyan-600 mb-4 drop-shadow-sm">100%</div>
                                        <p className="text-lg text-cyan-100 font-bold uppercase tracking-widest">Science-Backed</p>
                                    </div>
                                    <div className="text-center transform flex flex-col items-center">
                                        <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-indigo-300 to-indigo-600 mb-4 drop-shadow-sm">Free</div>
                                        <p className="text-lg text-indigo-100 font-bold uppercase tracking-widest">Forever Access</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tools Grid (Glassmorphism) */}
                <div id="tools-grid" className="mb-20 lg:mb-32">
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Explore Our Free Health Calculators
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
                            Track BMI, daily calories, macronutrients, hydration, and overall wellness. Each tool uses medical-grade formulas to deliver instant, personalized results.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
                        {tools.map((tool) => (
                            <a
                                key={tool.id}
                                href={`/${tool.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.history.pushState({}, '', `/${tool.id}`);
                                    window.dispatchEvent(new Event('popstate'));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="group cursor-pointer bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 relative overflow-hidden flex flex-col h-full block transform hover:-translate-y-2 hover:scale-[1.02]"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tool.color}"></div>
                                
                                <div className={`w-16 h-16 bg-linear-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg ${tool.shadowColor} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                                    {React.cloneElement(tool.icon, { className: "w-8 h-8 text-white relative z-10" })}
                                </div>
                                <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-emerald-500 group-hover:to-cyan-500 transition-colors tracking-tight">{tool.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed grow mb-8">{tool.desc}</p>
                                <div className="flex items-center text-slate-900 dark:text-white font-bold group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                                    {t.explore_tool} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <TestimonialsSection />

                {/* Email Capture Section */}
                <div className="mb-20 lg:mb-32 px-4">
                    <EmailCaptureForm position="inline" />
                </div>

                {/* Latest Blog Posts Feature */}
                {currentLangPosts && currentLangPosts.length > 0 && (
                    <div className="mb-20 lg:mb-32 px-4">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-3 mb-4">
                                    <BookOpen className="w-8 h-8 text-emerald-500" />
                                    {t.latest_blog_title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl text-lg">
                                    Science-based health tips, meal plans, and daily wellness guidance.
                                </p>
                            </div>
                            <button
                                onClick={() => setCurrentPage('blog')}
                                className="hidden md:flex items-center gap-2 text-white bg-slate-900 dark:bg-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all"
                            >
                                {t.nav_blog} <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                        className="group cursor-pointer bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row"
                                    >
                                        {post.image && (
                                            <div className="relative h-56 sm:h-auto sm:w-2/5 overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt={post.imageAlt || post.title}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t sm:bg-linear-to-r from-black/50 to-transparent"></div>
                                            </div>
                                        )}

                                        <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                                            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">{post.category || 'Health'}</div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors line-clamp-2 md:line-clamp-3">{post.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center text-slate-900 dark:text-white font-bold group-hover:text-emerald-500 transition-colors mt-auto">
                                                {t.read_article} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                        <button
                            onClick={() => setCurrentPage('blog')}
                            className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-white bg-slate-900 dark:bg-white dark:text-slate-900 px-6 py-4 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                            {t.nav_blog} <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
