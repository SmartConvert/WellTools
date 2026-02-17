import React from 'react';
import { GlassWater, Droplet, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const WaterResultInterpretation = ({ waterResult, activityLevel }) => {
    // Convert liters to glasses (250ml) and bottles (500ml)
    const glasses = Math.round((waterResult * 1000) / 250);
    const bottles = Math.round((waterResult * 1000) / 500);

    // Dynamic tips based on activity
    const getActivityTip = () => {
        switch (activityLevel) {
            case 'high':
                return "Since you're highly active, you lose significantly more water through sweat. Ensure you drink 500ml before and after workouts.";
            case 'moderate':
                return "With moderate activity, aim to sip water consistently throughout the day, especially around your exercise sessions.";
            default:
                return "Even with low activity, hydration is crucial for cognitive function and energy. Keep a water bottle at your desk.";
        }
    };

    return (
        <div className="mt-8 space-y-6 animate-fade-in">
            {/* Visual Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-blue-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <GlassWater className="w-6 h-6 text-blue-500" />
                    Daily Hydration Breakdown
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                        <span className="block text-3xl font-black text-blue-600 dark:text-blue-400">{glasses}</span>
                        <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">Standard Glasses (250ml)</span>
                    </div>
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl text-center">
                        <span className="block text-3xl font-black text-cyan-600 dark:text-cyan-400">{bottles}</span>
                        <span className="text-sm text-cyan-700 dark:text-cyan-300 font-medium">Water Bottles (500ml)</span>
                    </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm italic border-l-4 border-blue-400 pl-3">
                    💡 <strong>Pro Tip:</strong> {getActivityTip()}
                </p>
            </div>

            {/* Hydration Schedule */}
            <div className="bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-indigo-500" />
                    Optimal Drinking Schedule
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded text-xs font-bold mt-1">7:00 AM</span>
                        <span className="text-gray-700 dark:text-gray-300"><strong>2 Glasses (500ml):</strong> Immediately upon waking to flush toxins and jumpstart metabolism.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded text-xs font-bold mt-1">Meals</span>
                        <span className="text-gray-700 dark:text-gray-300"><strong>1 Glass (250ml):</strong> 30 minutes before each meal to aid digestion and control appetite.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded text-xs font-bold mt-1">Evening</span>
                        <span className="text-gray-700 dark:text-gray-300"><strong>1 Glass (250ml):</strong> Sip tea or water, but stop 2 hours before bed to prevent sleep disruption.</span>
                    </li>
                </ul>
            </div>

            {/* Dehydration Signs */}
            <div className="bg-rose-50 dark:bg-rose-900/10 rounded-2xl p-6 border border-rose-100 dark:border-rose-900/30">
                <h3 className="text-xl font-bold text-rose-900 dark:text-rose-200 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-rose-500" />
                    Signs You Need More Water
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Dark yellow urine', 'Persistent headache', 'Dry mouth or skin', 'Fatigue/Brain fog', 'Sugar cravings', 'Muscle cramps'].map((sign, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rose-400" />
                            <span className="text-rose-800 dark:text-rose-300 text-sm">{sign}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Practical Tips */}
            <div className="bg-teal-50 dark:bg-teal-900/10 rounded-2xl p-6 border border-teal-100 dark:border-teal-900/30">
                <h3 className="text-xl font-bold text-teal-900 dark:text-teal-200 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    Easy Ways to Drink More
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                        <span className="text-xl">🍋</span> Add lemon or cucumber for flavor
                    </li>
                    <li className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                        <span className="text-xl">🍉</span> Eat water-rich foods (Watermelon, Cucumber)
                    </li>
                    <li className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                        <span className="text-xl">📱</span> Set phone reminders every hour
                    </li>
                    <li className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                        <span className="text-xl">🚫</span> Replace one soda/juice daily with water
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WaterResultInterpretation;
