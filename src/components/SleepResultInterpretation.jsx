import React from 'react';
import { Moon, Sun, Battery, Brain, Sparkles, Clock, AlertCircle } from 'lucide-react';

const SleepResultInterpretation = ({ wakeupTimes, bedtime }) => {
    // If we have wakeup times, user entered a bedtime. If we have bedtime, user entered a wakeup time.
    const isWakingUp = wakeupTimes && wakeupTimes.length > 0;

    return (
        <div className="mt-12 space-y-8 animate-fade-in">
            {/* The Science of Cycles */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-indigo-100 dark:border-indigo-900">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Brain className="w-8 h-8 text-indigo-500" />
                    Understanding Your Sleep Cycles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Humans sleep in <strong>90-minute cycles</strong>. To wake up feeling refreshed and energetic, you should aim to wake up at the <strong>end</strong> of a cycle rather than in the middle of one.
                        </p>
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-2xl text-sm text-indigo-800 dark:text-indigo-200">
                            💡 Waking up during deep sleep (the middle of a cycle) causes <strong>Sleep Inertia</strong>—that groggy, tired feeling that can last for hours.
                        </div>
                    </div>
                    <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex gap-4 items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <Battery className="w-10 h-10 text-emerald-500" />
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">5-6 Cycles (7.5 - 9 hrs)</p>
                                <p>Optimal for cognitive function, fat loss, and muscle repair.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <Battery className="w-10 h-10 text-amber-500" />
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">4 Cycles (6 hrs)</p>
                                <p>Minimum for basic health, but may cause long-term fatigue.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personalized Advice */}
            <div className="bg-linear-to-br from-indigo-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Moon className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-yellow-300" />
                        Live Tips for Better Sleep
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold flex items-center gap-2">
                                <Sun className="w-5 h-5" /> Morning Routine
                            </h4>
                            <ul className="space-y-2 opacity-90 text-sm">
                                <li>• Get <strong>direct sunlight</strong> for 10 mins within 1 hour of waking.</li>
                                <li>• Try to wake up within the same 30-min window every day.</li>
                                <li>• Avoid caffeine for at least 90 mins after waking.</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold flex items-center gap-2">
                                <Moon className="w-5 h-5" /> Evening Routine
                            </h4>
                            <ul className="space-y-2 opacity-90 text-sm">
                                <li>• Dim the lights 1 hour before your target bedtime.</li>
                                <li>• Keep your bedroom cool (around 18°C / 65°F).</li>
                                <li>• No screens or blue light 45 mins before sleep.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Consistency Warning */}
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-200 dark:border-amber-800/30 flex gap-4">
                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-1 text-base">The Consistency Key</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                        Choosing the "best" time won't help if your schedule changes daily. Social Jetlag (shifting sleep by 2+ hours on weekends) disrupts your metabolism as much as physical jetlag.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SleepResultInterpretation;
