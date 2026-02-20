import React, { useEffect } from 'react';
import { ArrowLeft, Scale, Info, Target, AlertCircle, CheckCircle2, Zap, Layout } from 'lucide-react';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';
import BackToTop from './BackToTop';

const BMIGuidePage = ({ setCurrentPage, t }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { range: "< 18.5", label: "Underweight", color: "text-blue-500", desc: "May indicate malnutrition or underlying health issues." },
        { range: "18.5 - 24.9", label: "Normal Weight", color: "text-emerald-500", desc: "Associated with the lowest risk of chronic diseases." },
        { range: "25.0 - 29.9", label: "Overweight", color: "text-amber-500", desc: "Increased risk for heart disease and type 2 diabetes." },
        { range: "30.0+", label: "Obese", color: "text-rose-500", desc: "Significant risk for multiple health complications." }
    ];

    return (
        <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
            <button
                onClick={() => setCurrentPage('bmi')}
                className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Calculator
            </button>

            <header className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-black mb-6 uppercase tracking-wider">
                    <Layout className="w-4 h-4" />
                    Pillar Guide
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                    The Definitive Guide to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">BMI</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium capitalize">
                    Understanding Body Mass Index, its limitations, and how to use it as a screening tool for your health journey.
                </p>
            </header>

            <div className="aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl relative">
                <img
                    src="https://image.pollinations.ai/prompt/minimalist%20medical%20illustration%20of%20body%20mass%20index%20chart%2C%20clean%20modern%20colors%2C%20white%20background%2C%20professional%20healthcare%20aesthetic?width=1200&height=675&nologo=true"
                    alt="BMI Guide Header"
                    className="w-full h-full object-cover"
                />
            </div>

            <section className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                    <Info className="text-emerald-500" />
                    What is BMI?
                </h2>
                <p className="mb-12 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Body Mass Index (BMI) is a simple numerical value derived from your height and weight. It is used by healthcare professionals worldwide as a screening tool to categorize weight status and identify potential health risks associated with being underweight, overweight, or obese.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg">
                            <div className={`text-sm font-black uppercase tracking-widest mb-1 ${cat.color}`}>{cat.label}</div>
                            <div className="text-2xl font-black mb-2 dark:text-white">{cat.range}</div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {cat.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                    <AlertCircle className="text-amber-500" />
                    The Limitations of BMI
                </h2>
                <p className="mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                    While BMI is a useful population-level screening tool, it has significant limitations for individuals:
                </p>
                <ul className="space-y-4 mb-16">
                    <li className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">1</div>
                        <p className="text-gray-600 dark:text-gray-400"><span className="font-bold text-gray-900 dark:text-white">Muscle Mass:</span> BMI doesn't distinguish between muscle and fat. Athletes may be classified as 'overweight' despite having very low body fat.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">2</div>
                        <p className="text-gray-600 dark:text-gray-400"><span className="font-bold text-gray-900 dark:text-white">Fat Distribution:</span> It doesn't show where fat is stored. Abdominal (visceral) fat is more dangerous than fat stored elsewhere.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">3</div>
                        <p className="text-gray-600 dark:text-gray-400"><span className="font-bold text-gray-900 dark:text-white">Age & Ethnicity:</span> Healthy BMI ranges may vary slightly by age and ethnic background.</p>
                    </li>
                </ul>
            </section>

            <MedicalDisclaimer setCurrentPage={setCurrentPage} />

            <section className="mt-16 p-8 bg-blue-600 rounded-[3rem] text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4">Check Your BMI Today</h3>
                    <p className="text-blue-100 mb-8 max-w-xl mx-auto font-medium leading-relaxed">
                        Use our accurate calculator to see where you stand and get personalized tips for your health category.
                    </p>
                    <button
                        onClick={() => setCurrentPage('bmi')}
                        className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        Go to BMI Calculator
                    </button>
                </div>
            </section>

            <RelatedTools currentToolId="bmi-guide" setCurrentPage={setCurrentPage} />
            <BackToTop />
        </div>
    );
};

export default BMIGuidePage;
