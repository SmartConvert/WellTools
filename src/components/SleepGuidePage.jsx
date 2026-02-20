import React, { useEffect } from 'react';
import { ArrowLeft, Moon, ShieldCheck, Zap, Info, CheckCircle2, CloudMoon } from 'lucide-react';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';
import BackToTop from './BackToTop';

const SleepGuidePage = ({ setCurrentPage, t }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sleepCycles = [
        { title: "Stage 1 (N1)", desc: "Light sleep where you drift in and out. Muscles relax and brain waves slow." },
        { title: "Stage 2 (N2)", desc: "Deeper sleep. Heart rate slows and body temperature drops. Most of our sleep is here." },
        { title: "Stage 3 (N3)", desc: "Deep sleep. Crucial for physical recovery and tissue growth. Very hard to wake up from." },
        { title: "REM Sleep", desc: "Rapid Eye Movement. Brain is active, dreaming occurs. Vital for memory consolidation." }
    ];

    return (
        <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
            <button
                onClick={() => setCurrentPage('sleep')}
                className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Calculator
            </button>

            <header className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-black mb-6 uppercase tracking-wider">
                    <CloudMoon className="w-4 h-4" />
                    Pillar Guide
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                    The Sleep <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">Optimization Handbook</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium capitalize">
                    Master your circadian rhythm, understand sleep cycles, and transform your nighttime routine for peak daytime performance.
                </p>
            </header>

            <div className="aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl relative">
                <img
                    src="https://image.pollinations.ai/prompt/dreamy%20minimalist%20artwork%20of%20a%20night%20sky%2C%20stars%2C%20moon%2C%20soft%20lavender%20and%20deep%20blue%20colors%2C%20clean%20aesthetic?width=1200&height=675&nologo=true"
                    alt="Sleep Optimization Guide Header"
                    className="w-full h-full object-cover"
                />
            </div>

            <section className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                    <ShieldCheck className="text-emerald-500" />
                    Why Quality Sleep is Your Superpower
                </h2>
                <p className="mb-12 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Sleep isn't just "off time." It's an active metabolic state where your brain washes out toxins and your muscles repair. Chronic sleep deprivation is linked to weight gain, cognitive decline, and reduced immune function.
                </p>

                <h3 className="text-2xl font-black mb-6">Understanding 90-Minute Cycles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {sleepCycles.map((cycle, idx) => (
                        <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-emerald-50 dark:border-emerald-900/40 shadow-xl shadow-emerald-100/50 dark:shadow-none">
                            <h4 className="font-black text-emerald-600 dark:text-emerald-400 mb-2">{cycle.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {cycle.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                    <Zap className="text-amber-500" />
                    The 10-3-2-1-0 Rule for Better Sleep
                </h2>
                <div className="space-y-6 mb-16">
                    {[
                        { time: "10 Hours", desc: "No more caffeine before bed." },
                        { time: "3 Hours", desc: "No more food or alcohol before bed." },
                        { time: "2 Hours", desc: "No more work tasks." },
                        { time: "1 Hour", desc: "No more blue light (screens)." },
                        { time: "0 Times", desc: "The number of times you should hit the snooze button." }
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center bg-emerald-50/50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                            <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-black shrink-0">{item.time}</div>
                            <p className="text-gray-900 dark:text-white font-bold">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <MedicalDisclaimer setCurrentPage={setCurrentPage} />

            <section className="mt-16 p-8 bg-indigo-900 rounded-[3rem] text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4">Calculate Your Ideal Wake-up Time</h3>
                    <p className="text-indigo-400 mb-8 max-w-xl mx-auto font-medium">
                        Use our sleep cycle calculator to find the perfect time to wake up feeling refreshed, not groggy.
                    </p>
                    <button
                        onClick={() => setCurrentPage('sleep')}
                        className="px-10 py-5 bg-indigo-500 text-white rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        Go to Sleep Calculator
                    </button>
                </div>
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            </section>

            <RelatedTools currentToolId="sleep-guide" setCurrentPage={setCurrentPage} />
            <BackToTop />
        </div>
    );
};

export default SleepGuidePage;
