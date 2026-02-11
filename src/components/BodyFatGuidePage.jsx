import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Target, Zap, Waves, Activity, Info, CheckCircle2 } from 'lucide-react';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';

const BodyFatGuidePage = ({ setCurrentPage, t }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            title: "Understanding Body Fat Types",
            content: "Body fat isn't just one thing. There are two main types: Subcutaneous fat (the fat you can pinch under your skin) and Visceral fat (the hidden fat around your organs). While subcutaneous fat is what most people focus on for aesthetics, visceral fat is the one most closely linked to chronic diseases like diabetes and heart disease.",
            icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />
        },
        {
            title: "The Navy Method: Accurate & Accessible",
            content: "The method used in our calculator is the 'U.S. Navy Method'. It uses your height and measurements of your neck, waist, and hips (for women) to estimate body fat with a surprisingly high degree of accuracy—often within 3-4% of a DEXA scan, without the high cost.",
            icon: <Target className="w-8 h-8 text-blue-500" />
        },
        {
            title: "Healthy Body Fat Ranges",
            content: "What is 'healthy' varies by gender and age. For men, a healthy range is typically 14-24%. For women, it's 21-31%. Athletes often maintain lower levels (6-13% for men, 14-20% for women), but extremely low body fat can be dangerous and impact hormonal health.",
            icon: <Activity className="w-8 h-8 text-rose-500" />
        }
    ];

    return (
        <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
            <button
                onClick={() => setCurrentPage('body-fat')}
                className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Calculator
            </button>

            <header className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-black mb-6 uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    Pillar Guide
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                    The Ultimate Guide to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Body Fat Percentage</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium capitalize">
                    Everything you need to know about measuring, managing, and optimizing your body composition for long-term health.
                </p>
            </header>

            <div className="aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl relative">
                <img
                    src="https://image.pollinations.ai/prompt/professional%20infographic%20style%20photo%20of%20fitness%20and%20health%20metrics%2C%20measuring%20tape%2C%20healthy%20body%20composition%2C%20modern%20minimalist%20aesthetic?width=1200&height=675&nologo=true"
                    alt="Body Fat Composition Guide"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>

            <section className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                    <Activity className="text-emerald-500" />
                    Why Body Fat Matters More Than Weight
                </h2>
                <p className="mb-12 text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium">
                    The scale doesn't tell the whole story. Two people can weigh 200 lbs, but one may have 10% body fat while the other has 35%. One is an athlete, the other is at high risk for cardiovascular disease. This is why tracking your **body fat percentage** is the single most important metric for your fitness journey.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {sections.map((section, idx) => (
                        <div key={idx} className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            <div className="mb-6">{section.icon}</div>
                            <h3 className="text-xl font-black mb-4 dark:text-white">{section.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                    <Waves className="text-blue-500" />
                    Three Science-Backed Ways to Lower Body Fat
                </h2>
                <div className="space-y-6 mb-16">
                    {[
                        { title: "Prioritize Protein", desc: "Protein has a high thermic effect, meaning your body burns more calories digesting it than fats or carbs." },
                        { title: "Strength Training", desc: "Muscle burns more calories at rest than fat. Building lean mass turns your body into a 24/7 metabolic furnace." },
                        { title: "Sleep is Non-Negotiable", desc: "Lack of sleep spikes cortisol and grehlin, making your body cling to fat and increasing hunger." }
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-emerald-50/50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <MedicalDisclaimer setCurrentPage={setCurrentPage} />

            <section className="mt-16 p-8 bg-gray-900 rounded-[3rem] text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4">Calculate Your Body Fat Now</h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Use our free, science-backed Navy Method calculator to get your estimate in less than 30 seconds.
                    </p>
                    <button
                        onClick={() => setCurrentPage('body-fat')}
                        className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                    >
                        Go to Calculator
                    </button>
                </div>
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            </section>

            <RelatedTools currentToolId="body-fat-guide" setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default BodyFatGuidePage;
