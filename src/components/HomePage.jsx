import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Activity, Percent, Scale, Droplet, Moon, Clock, Heart, Apple, TrendingDown, Calendar, BarChart3, LineChart as LineChartIcon, Utensils, Zap, Dumbbell } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';
import EmailCaptureForm from './EmailCaptureForm';

// Import hero image with vite-imagetools directives
// Generate WebP and AVIF, and resize for responsiveness
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
        { id: 'bmi', icon: <Scale className="w-8 h-8" />, title: 'BMI Calculator Free', desc: 'Calculate your Body Mass Index instantly with our free BMI calculator. Get health risk assessments and personalized weight recommendations.', color: 'from-emerald-400 to-teal-500' },
        { id: 'calories', icon: <Activity className="w-8 h-8" />, title: 'Daily Calorie Calculator', desc: 'Discover your personalized daily calorie needs based on age, weight, height, and activity level using the Mifflin-St Jeor equation.', color: 'from-emerald-400 to-teal-500' },
        { id: 'water', icon: <Droplet className="w-8 h-8" />, title: 'Water Intake Calculator', desc: 'Calculate your optimal daily water intake based on weight, activity, and climate. Stay hydrated with science-backed recommendations.', color: 'from-emerald-400 to-teal-500' },
        { id: 'ideal-weight', icon: <Scale className="w-8 h-8" />, title: 'Ideal Weight Calculator', desc: 'Find your healthy weight range using medical formulas (Robinson, Miller, Devine). Get personalized weight range goals.', color: 'from-emerald-400 to-teal-500' },
        { id: 'sleep', icon: <Moon className="w-8 h-8" />, title: 'Sleep Calculator', desc: 'Optimize your sleep schedule based on 90-minute sleep cycles. Wake up refreshed with our free sleep calculator.', color: 'from-emerald-400 to-teal-500' },
        { id: 'body-fat', icon: <Percent className="w-8 h-8" />, title: 'Body Fat Calculator', desc: 'Estimate your body fat percentage using Navy Method or BMI-based formulas. Track body composition beyond weight.', color: 'from-emerald-400 to-teal-500' },
        { id: 'bmr', icon: <Zap className="w-8 h-8" />, title: 'BMR Calculator', desc: 'Calculate your Basal Metabolic Rate - the calories you burn at rest. Essential for weight loss and muscle gain planning.', color: 'from-emerald-400 to-teal-500' },
        { id: 'macro', icon: <Utensils className="w-8 h-8" />, title: 'Macro Calculator', desc: 'Determine your optimal macronutrient split (protein, carbs, fats) for weight loss, muscle gain, or maintenance goals.', color: 'from-emerald-400 to-teal-500' },
        { id: '1rm', icon: <Dumbbell className="w-8 h-8" />, title: '1RM Calculator', desc: 'Estimate your one-rep max strength for any exercise. Plan progressive overload and track strength gains safely.', color: 'from-emerald-400 to-teal-500' }
    ];

    return (
        <div className="pt-20 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Premium Hero Section */}
                <div className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden mb-12 lg:mb-20 shadow-2xl border border-white/5">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-16 lg:p-20">
                        {/* Left Content */}
                        <div className="z-10 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold mb-6 animate-fade-in">
                                <Zap className="w-4 h-4" />
                                <span>Free Professional Health Tools</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                                Science-Backed <br />
                                <span className="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                    Health Insights
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 font-medium">
                                Access 9+ medically-validated calculators for BMI, calories, and nutrition. Get instant data to drive your wellness journey.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => {
                                        const el = document.getElementById('tools-grid');
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                                >
                                    {t.explore_tools}
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage('meal-planner')}
                                    className="px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {t.meal_planner_title}
                                </button>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative group lg:block">
                            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-teal-500/20 rounded-[2rem] md:rounded-[3rem] blur-2xl group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 aspect-4/3 lg:aspect-square">
                                <img
                                    src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1200"
                                    alt="Healthy Nutrition - Fresh Salmon and Lemon"
                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 to-transparent"></div>
                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <Heart className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Join 50,000+ Users</p>
                                        <p className="text-emerald-400 text-xs font-medium tracking-wide uppercase">Community Verified</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="mb-16 lg:mb-24 px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tight">
                            How <span className="text-emerald-500">WellTools</span> Works
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg md:text-xl">
                            Get personalized health insights in 3 simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl">
                                    1
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Choose Your Tool
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                    Select from 9+ free health calculators: BMI, calories, macros, water intake, sleep, and more.
                                </p>
                            </div>
                            {/* Connector Arrow (hidden on mobile) */}
                            <div className="hidden md:block absolute top-10 -right-4 text-emerald-500">
                                <ChevronRight className="w-8 h-8" />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl">
                                    2
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Enter Your Data
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                    Input your height, weight, age, and activity level. All calculations happen instantly in your browser.
                                </p>
                            </div>
                            <div className="hidden md:block absolute top-10 -right-4 text-teal-500">
                                <ChevronRight className="w-8 h-8" />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Get Instant Insights
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                Receive personalized health metrics, medical interpretations, and actionable recommendations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose WellTools Over Others */}
                <div className="mb-16 lg:mb-24">
                    <div className="text-center mb-12 md:mb-16 px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tight">
                            Why Choose <span className="text-emerald-500">WellTools</span> Over Others?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-medium">
                            The most trusted free health calculators online with medical-grade accuracy
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
                        {[
                            {
                                icon: <Activity className="w-8 h-8" />,
                                title: "Medical Accuracy",
                                desc: "Our free health calculators use validated formulas like Mifflin-St Jeor (BMR) and Katch-McArdle (body fat).",
                                comparison: "vs. outdated formulas on other sites",
                                color: "emerald"
                            },
                            {
                                icon: <Heart className="w-8 h-8" />,
                                title: "No Ads Overload",
                                desc: "Clean, fast interface without intrusive ads. Your health data stays private and secure.",
                                comparison: "vs. ad-heavy competitors",
                                color: "blue"
                            },
                            {
                                icon: <TrendingDown className="w-8 h-8" />,
                                title: "Medical References",
                                desc: "Every calculation backed by peer-reviewed research from PubMed, Mayo Clinic, and WHO.",
                                comparison: "vs. unsourced calculators",
                                color: "violet"
                            },
                            {
                                icon: <Scale className="w-8 h-8" />,
                                title: "Free Forever",
                                desc: "All 9+ health calculators online are completely free. No subscriptions, no paywalls, ever.",
                                comparison: "vs. premium-only features",
                                color: "amber"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-6 sm:p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl md:rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className={`w-16 h-16 bg-${feature.color}-500/10 rounded-2xl flex items-center justify-center text-${feature.color}-500 mb-8 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-500 transition-colors">{feature.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold mb-4">
                                    {feature.desc}
                                </p>
                                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                                    ✓ {feature.comparison}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <TestimonialsSection />

                {/* Founder Story / Human Element */}
                <div className="mb-20 lg:mb-28 px-4">
                    <div className="max-w-4xl mx-auto bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 rounded-[3rem] p-8 md:p-12 border border-emerald-200 dark:border-emerald-800 shadow-xl">
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">👨‍💻</div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
                                Why I Built <span className="text-emerald-600 dark:text-emerald-400">WellTools</span>
                            </h2>
                        </div>
                        <div className="prose prose-lg dark:prose-invert mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
                            <p className="text-lg md:text-xl font-medium mb-6">
                                After years of struggling with my own health journey, I realized something was broken.
                            </p>
                            <p className="mb-6">
                                Most health calculators are either <strong>buried behind paywalls</strong>, loaded with ads, or simply too complicated for everyday people. I wanted to change that.
                            </p>
                            <p className="mb-6">
                                <strong>WellTools was born from a simple mission:</strong> Make accurate, science-backed health tools accessible to everyone—completely free, forever.
                            </p>
                            <p className="mb-6">
                                Whether you're trying to lose weight, build muscle, or just understand your health better, you deserve tools that <em>actually work</em> without the BS.
                            </p>
                            <div className="mt-8 pt-6 border-t border-emerald-200 dark:border-emerald-800 text-center">
                                <p className="font-bold text-xl text-emerald-700 dark:text-emerald-400">
                                    Let's make health simple together 💚
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    — The WellTools Team
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Capture Section */}
                <div className="mb-20 lg:mb-28 px-4">
                    <EmailCaptureForm position="inline" />
                </div>

                {/* Latest Blog Posts Feature */}
                {currentLangPosts && currentLangPosts.length > 0 && (
                    <div className="mb-16 lg:mb-24 animate-fade-in">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-4">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-3 mb-4">
                                    <BookOpen className="w-8 h-8 text-emerald-500" />
                                    {t.latest_blog_title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 font-bold max-w-2xl text-lg">
                                    Our blog provides science-based health tips, meal plans, and daily wellness guidance to support your lifestyle.
                                </p>
                            </div>
                            <button
                                onClick={() => setCurrentPage('blog')}
                                className="hidden md:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:gap-3 transition-all pb-1"
                            >
                                {t.nav_blog} <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            {(() => {
                                const featuredIds = ['bmi-athlete-truth', 'increase-bmr-naturally'];
                                const featuredPosts = currentLangPosts.filter(p => featuredIds.includes(p.id));
                                // Sort to match the order in featuredIds
                                featuredPosts.sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));

                                // Fallback to first 2 posts if requested ones aren't found
                                const displayPosts = featuredPosts.length > 0 ? featuredPosts : currentLangPosts.slice(0, 2);

                                return displayPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        onClick={() => {
                                            setSelectedPost(post);
                                            setCurrentPage('blog-post');
                                            window.scrollTo(0, 0);
                                        }}
                                        className="group cursor-pointer relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
                                    >
                                        {/* Blog Post Image */}
                                        {post.image && (
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt={post.imageAlt || post.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            </div>
                                        )}

                                        <div className="p-6 md:p-8">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors line-clamp-1">{post.title}</h3>
                                            <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base line-clamp-2 font-bold mb-4">{post.excerpt}</p>
                                            <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                                                {t.read_article} <ChevronRight className="w-4 h-4 ms-1 group-hover:ms-2 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                )}

                {/* Tools Grid */}
                <div id="tools-grid" className="mb-16 lg:mb-24">
                    <div className="text-center mb-10 md:mb-16 px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tight">
                            Explore Our Free Health Calculators Online
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed mb-4 md:mb-6 font-medium">
                            Our <strong>free health calculators online</strong> help you track BMI, daily calories, macronutrients, hydration, sleep quality, and overall wellness. Each <strong>nutrition calculator</strong> uses medical-grade formulas to deliver instant, personalized results.
                        </p>
                        <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-bold grow mb-6">{tool.desc}</p>
                                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold group-hover:gap-2 transition-all">
                                    {t.explore_tool} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-20 lg:mb-28 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
                                Everything you need to know about our free health calculators online
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    q: "Are these health calculators medically accurate?",
                                    a: "Yes, all our free health calculators online use validated medical formulas. Our BMI calculator uses WHO standards, calorie calculator uses Mifflin-St Jeor equation, and body fat calculator uses Katch-McArdle formula. Each tool is backed by peer-reviewed research from PubMed, Mayo Clinic, and WHO."
                                },
                                {
                                    q: "Are all the health tools completely free?",
                                    a: "Absolutely! All 9+ health calculators are 100% free forever. No subscriptions, no hidden fees, no paywalls. We believe everyone deserves access to accurate health tools without barriers."
                                },
                                {
                                    q: "Can I use these calculators on mobile?",
                                    a: "Yes, all our free health calculators online are fully responsive and work perfectly on smartphones, tablets, and desktops. Your data is calculated instantly in your browser with no app download required."
                                },
                                {
                                    q: "Do you store my health data?",
                                    a: "No, we prioritize your privacy. All calculations happen locally in your browser. We don't store, sell, or share your personal health information. Your data stays completely private and secure."
                                },
                                {
                                    q: "Which health calculator should I start with?",
                                    a: "Start with our free BMI calculator to assess your current weight status, then use the calorie calculator to determine your daily energy needs. For detailed nutrition planning, try our macro calculator to optimize your protein, carbs, and fat intake."
                                },
                                {
                                    q: "How often should I use these calculators?",
                                    a: "Use our BMI and body fat calculators monthly to track progress. Daily calorie and water calculators can be used anytime you adjust your diet or activity level. Sleep calculator is helpful when optimizing your sleep schedule."
                                },
                                {
                                    q: "What makes WellTools different from other health calculator websites?",
                                    a: "Unlike ad-heavy sites, we offer clean, fast, medically-accurate calculators with detailed interpretations. Every result includes health risk assessments, personalized recommendations, and links to scientific sources. Plus, we're 100% free with no premium upsells."
                                }
                            ].map((faq, i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        {faq.q}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
