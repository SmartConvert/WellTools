import React from 'react';
import { Target, TrendingDown, TrendingUp, Minus, PieChart, Info } from 'lucide-react';

const CalorieResultInterpretation = ({ tdee }) => {
    // Round TDEE for cleaner numbers
    const maintenance = Math.round(tdee);

    // Calculate targets
    const weightLoss = maintenance - 500;
    const extremeWeightLoss = maintenance - 750; // Careful with this
    const mildWeightGain = maintenance + 250;
    const muscleGain = maintenance + 500;

    // Macro distributions (40/30/30 split standard)
    const getMacros = (calories) => ({
        protein: Math.round((calories * 0.30) / 4),
        carbs: Math.round((calories * 0.40) / 4),
        fats: Math.round((calories * 0.30) / 9)
    });

    const maintenanceMacros = getMacros(maintenance);
    const weightLossMacros = getMacros(weightLoss);

    return (
        <div className="mt-8 space-y-8 animate-fade-in">
            {/* Goal Scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Weight Loss */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-t-4 border-emerald-500 hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingDown className="w-24 h-24 text-emerald-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Weight Loss</h3>
                        </div>
                        <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
                            {weightLoss} <span className="text-sm font-medium text-gray-500">kcal</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Sustainable loss of ~0.5kg/week. Deficit of 500 calories.
                        </p>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Daily Macros</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700 dark:text-gray-300">Prot: <strong>{weightLossMacros.protein}g</strong></span>
                                <span className="text-gray-700 dark:text-gray-300">Carb: <strong>{weightLossMacros.carbs}g</strong></span>
                                <span className="text-gray-700 dark:text-gray-300">Fat: <strong>{weightLossMacros.fats}g</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Maintenance */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Minus className="w-24 h-24 text-blue-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <Minus className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Maintain Weight</h3>
                        </div>
                        <p className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                            {maintenance} <span className="text-sm font-medium text-gray-500">kcal</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Your TDEE. Eat this amount to stay at your current weight.
                        </p>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Daily Macros</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700 dark:text-gray-300">Prot: <strong>{maintenanceMacros.protein}g</strong></span>
                                <span className="text-gray-700 dark:text-gray-300">Carb: <strong>{maintenanceMacros.carbs}g</strong></span>
                                <span className="text-gray-700 dark:text-gray-300">Fat: <strong>{maintenanceMacros.fats}g</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Muscle Gain */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-t-4 border-amber-500 hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-24 h-24 text-amber-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Muscle Gain</h3>
                        </div>
                        <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-2">
                            {mildWeightGain} <span className="text-sm font-medium text-gray-500">kcal</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Lean bulk. Surplus of 250 calories to build muscle minimizing fat.
                        </p>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Daily Macros</p>
                            {/* Muscle gain needs more protein, let's adjust slightly visually or keep standard */}
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700 dark:text-gray-300">Prot: <strong>{getMacros(mildWeightGain).protein + 10}g</strong></span>
                                <span className="text-gray-700 dark:text-gray-300">Carb: <strong>{getMacros(mildWeightGain).carbs}g</strong></span>
                                <span className="text-gray-700 dark:text-gray-300">Fat: <strong>{getMacros(mildWeightGain).fats}g</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Tips Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-indigo-500" />
                    How to Succeed
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">🥗 Nutrition Strategy</h4>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-emerald-500 font-bold">✓</span>
                                Focus on <strong>Volume Eating</strong>: Fill up on low-calorie, high-fiber vegetables.
                            </li>
                            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <strong>Protein Priority</strong>: Eat protein at every meal to boost satiety and preserve muscle.
                            </li>
                            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <strong>Hydration</strong>: Drink water before meals to reduce hunger (use our Water Calculator!).
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">⚡ Lifestyle Habits</h4>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-blue-500 font-bold">✓</span>
                                <strong>Track Accurately</strong>: Use a food scale for 2 weeks to understand portion sizes.
                            </li>
                            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-blue-500 font-bold">✓</span>
                                <strong>80/20 Rule</strong>: 80% whole foods, 20% treats. Perfection is the enemy of progress.
                            </li>
                            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-blue-500 font-bold">✓</span>
                                <strong>Sleep</strong>: Poor sleep increases hunger hormones. Aim for 7-9 hours.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Info className="w-5 h-5 shrink-0 text-gray-400" />
                <p>
                    These are estimates based on the Mifflin-St Jeor equation (Gold Standard). Individual metabolism varies. Adjust intake based on progress after 2-3 weeks.
                </p>
            </div>
        </div>
    );
};

export default CalorieResultInterpretation;
