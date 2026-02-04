import React from 'react';
import { Moon, Clock, Sparkles } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';

const SleepCalculatorPage = ({ sleepAge, setSleepAge, calculateSleep, sleepResult, sleepBedtime, setSleepBedtime, calculateSleepCycles, sleepWakeupTimes, setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
            <ToolHero toolId="sleep" />

            <div className="max-w-3xl mx-auto space-y-8">
                {/* Recommendation by Age */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-linear-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Moon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.sleep_calc}</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
                            <input
                                type="number"
                                value={sleepAge}
                                onChange={(e) => setSleepAge(e.target.value)}
                                placeholder="30"
                                aria-label={t.age}
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
                </div>

                {/* Sleep Cycle Calculator */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-linear-to-br from-indigo-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.sleep_calc_cycles}</h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        {t.sleep_cycles_desc}
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.sleep_bedtime}</label>
                            <input
                                type="time"
                                value={sleepBedtime}
                                onChange={(e) => setSleepBedtime(e.target.value)}
                                aria-label={t.sleep_bedtime}
                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors text-xl font-bold"
                            />
                        </div>

                        <button
                            onClick={calculateSleepCycles}
                            className="w-full py-4 bg-linear-to-r from-indigo-500 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            {t.calculate}
                        </button>
                    </div>

                    {sleepWakeupTimes.length > 0 && (
                        <div className="mt-8 space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">{t.sleep_wake_up}:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {sleepWakeupTimes.map((time, idx) => (
                                    <div key={idx} className="p-6 bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-2xl border-2 border-indigo-100 dark:border-indigo-800 text-center transform hover:scale-105 transition-all">
                                        <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{time.time}</p>
                                        <p className="text-sm font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-wider">{time.hours} {t.hours}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sleep Tips */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.sleep_tips_title}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 items-start">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                                    {num}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                                    {t[`tip_sleep_${num}`]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <ToolInfoSection toolId="sleep" />
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

export default SleepCalculatorPage;
