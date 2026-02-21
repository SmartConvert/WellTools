import React, { useState, useEffect } from 'react';
import { Clock, Info, Download, Loader2, Sun, Moon, Coffee, Utensils, Zap } from 'lucide-react';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';
import TrustBadge from './TrustBadge';
import PostResultCTA from './PostResultCTA';
import AffiliateBlock from './AffiliateBlock';
import { calculatorContent } from '../data/seoContent';
import { exportAsImage } from '../utils/exportUtils';

const PROTOCOLS = [
    { id: '12:12', name: '12:12 Circadian', eat: 12, fast: 12, desc: 'Beginner-friendly gut rest' },
    { id: '14:10', name: '14:10 Method', eat: 10, fast: 14, desc: 'Gentle weight loss' },
    { id: '16:8', name: '16:8 Standard', eat: 8, fast: 16, desc: 'Gold standard for fat loss' },
    { id: '18:6', name: '18:6 Advanced', eat: 6, fast: 18, desc: 'Deeper ketosis and autophagy' },
    { id: '23:1', name: 'OMAD (23:1)', eat: 1, fast: 23, desc: 'One Meal A Day' }
];

const FastingSchedulePage = ({ setCurrentPage, t }) => {
    const [protocol, setProtocol] = useState(PROTOCOLS[2]); // Default 16:8
    const [firstMealTime, setFirstMealTime] = useState('12:00'); // Default start eating at noon
    const [isExporting, setIsExporting] = useState(false);
    const [schedule, setSchedule] = useState(null);

    // Get SEO content for H2
    const content = calculatorContent['fasting']?.['en'];

    const calculateSchedule = () => {
        // Parse the input time
        const [hours, minutes] = firstMealTime.split(':').map(Number);

        // Start eating time
        const startEat = new Date();
        startEat.setHours(hours, minutes, 0, 0);

        // End eating time
        const endEat = new Date(startEat);
        endEat.setHours(startEat.getHours() + protocol.eat);

        // Start fasting time is the same as end eat
        const startFast = endEat;

        // End fasting time is back to start eating next day
        const endFast = new Date(startEat);
        endFast.setDate(endFast.getDate() + 1);

        const formatTime = (date) => {
            return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        };

        setSchedule({
            eatingStart: formatTime(startEat),
            eatingEnd: formatTime(endEat),
            fastingStart: formatTime(startFast),
            fastingEnd: formatTime(startFast > startEat ? endFast : startEat), // Just for display
            eatHours: protocol.eat,
            fastHours: protocol.fast,
        });
    };

    // Calculate immediately on load
    useEffect(() => {
        calculateSchedule();
    }, [protocol, firstMealTime]);

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <ToolHero toolId="fasting" />

                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                {content?.h2_title || "Fasting Schedule"}
                            </h2>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                            Create your personalized intermittent fasting schedule. Choose a protocol and set your first meal to calculate your exact eating and fasting windows.
                        </p>

                        <div className="space-y-8 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                            {/* Protocol Selection */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-4 text-lg">Choose Your Protocol</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {PROTOCOLS.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => setProtocol(p)}
                                            className={`p-4 rounded-xl text-left transition-all border-2 flex flex-col gap-1 ${protocol.id === p.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-transparent bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'}`}
                                        >
                                            <span className={`font-black text-lg ${protocol.id === p.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                                {p.name}
                                            </span>
                                            <span className={`text-xs font-medium ${protocol.id === p.id ? 'text-indigo-600/80 dark:text-indigo-400/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                                {p.desc}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Input */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-4 text-lg">When will you eat your first meal?</label>
                                <div className="relative max-w-xs">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Coffee className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="time"
                                        value={firstMealTime}
                                        onChange={(e) => setFirstMealTime(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors text-xl font-bold"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                    <Info className="w-4 h-4" /> Tip: Many people on 16:8 skip breakfast and start eating at 12:00 PM.
                                </p>
                            </div>
                        </div>

                        {/* Visual Results Section */}
                        {schedule && (
                            <div className="mt-12 animate-scale-in">
                                <div id="fasting-export-node" className="p-1 bg-white dark:bg-gray-800 rounded-3xl">
                                    {/* The visual container we will export */}
                                    <div className="bg-linear-to-b from-slate-900 to-indigo-950 rounded-3xl p-6 md:p-10 shadow-2xl border border-indigo-900/50 text-white relative overflow-hidden">

                                        {/* Background Decoration */}
                                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                                        <div className="text-center mb-10 relative z-10">
                                            <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 text-sm font-bold uppercase tracking-wider rounded-full inline-block mb-4 border border-indigo-500/30">
                                                My Fasting Protocol
                                            </span>
                                            <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{protocol.name}</h3>
                                            <p className="text-indigo-200 font-medium">Daily Schedule Breakdown</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

                                            {/* Eating Window Card */}
                                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-3 bg-emerald-500/20 rounded-xl">
                                                        <Utensils className="w-6 h-6 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold text-emerald-300 uppercase tracking-tight">Eating Window</h4>
                                                        <p className="text-emerald-100/70 text-sm font-medium">{schedule.eatHours} Hours</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                        <span className="text-white/60 text-sm">Start Eating</span>
                                                        <span className="text-2xl font-black text-white">{schedule.eatingStart}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/60 text-sm">Stop Eating</span>
                                                        <span className="text-2xl font-black text-white">{schedule.eatingEnd}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Fasting Window Card */}
                                            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 mt-4 mr-4 text-indigo-500/20">
                                                    <Moon className="w-24 h-24 stroke-1" />
                                                </div>
                                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                                    <div className="p-3 bg-indigo-500/20 rounded-xl">
                                                        <Zap className="w-6 h-6 text-indigo-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold text-indigo-300 uppercase tracking-tight">Fasting Window</h4>
                                                        <p className="text-indigo-100/70 text-sm font-medium">{schedule.fastHours} Hours (Autophagy & Fat Burn)</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 relative z-10">
                                                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                                        <span className="text-white/60 text-sm">Start Fast</span>
                                                        <span className="text-2xl font-black text-white">{schedule.fastingStart}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/60 text-sm">Goal/Breakfast</span>
                                                        <span className="text-2xl font-black text-white">{schedule.eatingStart}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <button
                                        onClick={async () => {
                                            setIsExporting(true);
                                            // Make background dark for export if it's not already handled perfectly by html2canvas
                                            const node = document.getElementById('fasting-export-node');
                                            const originalBg = node.style.backgroundColor;

                                            await exportAsImage('fasting-export-node', `welltools-fasting-${protocol.name.replace(':', '-')}.png`);

                                            node.style.backgroundColor = originalBg;
                                            setIsExporting(false);
                                        }}
                                        disabled={isExporting}
                                        className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 disabled:opacity-70 transform hover:-translate-y-1"
                                    >
                                        {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                                        Save Schedule as Image
                                    </button>
                                </div>
                                <PostResultCTA toolId="fasting" setCurrentPage={setCurrentPage} />
                                <AffiliateBlock toolId="fasting" />
                            </div>
                        )}

                        <TrustBadge setCurrentPage={setCurrentPage} />
                        <MedicalDisclaimer setCurrentPage={setCurrentPage} />
                        <ToolInfoSection toolId="fasting" />
                    </div>

                    <RelatedTools currentToolId="fasting" setCurrentPage={setCurrentPage} />

                    <button
                        onClick={() => setCurrentPage('home')}
                        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FastingSchedulePage;
