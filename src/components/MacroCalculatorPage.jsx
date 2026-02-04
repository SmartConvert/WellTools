import React from 'react';
import { Utensils, Info, PieChart } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';

const MacroCalculatorPage = ({ macroCalories, setMacroCalories, macroDiet, setMacroDiet, calculateMacros, macroResult, setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
            <ToolHero toolId="macro" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Utensils className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Macro Calculator</h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                        Determine your optimal macronutrient split (Protein, Carbs, Fats) based on your daily calorie goal and diet preference.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Daily Calorie Goal</label>
                            <input
                                type="number"
                                value={macroCalories}
                                onChange={(e) => setMacroCalories(e.target.value)}
                                placeholder="2000"
                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-green-500 focus:outline-none transition-colors text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Diet Type</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {['balanced', 'low-carb', 'high-protein'].map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => setMacroDiet(d)}
                                        className={`py-3 rounded-xl text-sm font-bold capitalize transition-all border-2 ${macroDiet === d ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'border-transparent bg-gray-100 dark:bg-gray-900 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                                    >
                                        {d.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={calculateMacros}
                            className="w-full py-4 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Calculate Macros
                        </button>
                    </div>

                    {macroResult && (
                        <div id="macro-result" className="mt-8 p-8 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800 animate-scale-in">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">Your Daily Targets:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/50">
                                    <p className="text-3xl font-black text-red-500">{macroResult.protein}g</p>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Protein</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/50">
                                    <p className="text-3xl font-black text-blue-500">{macroResult.carbs}g</p>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Carbs</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-900/50">
                                    <p className="text-3xl font-black text-yellow-500">{macroResult.fats}g</p>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Fats</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <ToolInfoSection toolId="macro" />

                    <AdComponent slot="macro_bottom" />
                </div>

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

export default MacroCalculatorPage;
