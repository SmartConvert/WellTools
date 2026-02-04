import React from 'react';
import { Activity, Utensils } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';

const CaloriesCalculatorPage = ({ calWeight, setCalWeight, calHeight, setCalHeight, calAge, setCalAge, calGender, setCalGender, calActivity, setCalActivity, calculateCalories, calResult, setCurrentPage, t, lang }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
            <ToolHero toolId="calories" lang={lang} />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-linear-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Activity className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.calories_calc}</h1>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
                                <input
                                    type="number"
                                    value={calWeight}
                                    onChange={(e) => setCalWeight(e.target.value)}
                                    placeholder="70"
                                    aria-label={`${t.weight} (${t.unit_kg})`}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
                                <input
                                    type="number"
                                    value={calHeight}
                                    onChange={(e) => setCalHeight(e.target.value)}
                                    placeholder="175"
                                    aria-label={`${t.height} (${t.unit_cm})`}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
                                <input
                                    type="number"
                                    value={calAge}
                                    onChange={(e) => setCalAge(e.target.value)}
                                    placeholder="25"
                                    aria-label={t.age}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
                                <select
                                    value={calGender}
                                    onChange={(e) => setCalGender(e.target.value)}
                                    aria-label={t.gender}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                                >
                                    <option value="male">{t.male}</option>
                                    <option value="female">{t.female}</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.activity_level}</label>
                            <select
                                value={calActivity}
                                onChange={(e) => setCalActivity(e.target.value)}
                                aria-label={t.activity_level}
                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                            >
                                <option value="sedentary">{t.activity_sedentary}</option>
                                <option value="light">{t.activity_light}</option>
                                <option value="moderate">{t.activity_moderate}</option>
                                <option value="active">{t.activity_active}</option>
                                <option value="veryActive">{t.activity_very_active}</option>
                            </select>
                        </div>

                        <button
                            onClick={calculateCalories}
                            className="w-full py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            {t.calculate}
                        </button>
                    </div>

                    {calResult && (
                        <div id="calories-result" className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-scale-in relative">
                            <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 text-center shadow-lg hover:scale-105 transition-all">
                                <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.maintain_weight}</p>
                                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{calResult.maintain}</p>
                                <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
                            </div>
                            <div className="p-6 bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 text-center shadow-lg hover:scale-105 transition-all">
                                <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.weight_loss}</p>
                                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{calResult.loss}</p>
                                <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
                            </div>
                            <div className="p-6 bg-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 rounded-2xl border-2 border-rose-200 dark:border-rose-800 text-center shadow-lg hover:scale-105 transition-all">
                                <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.weight_gain}</p>
                                <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{calResult.gain}</p>
                                <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
                            </div>

                            <button
                                onClick={() => setCurrentPage('meal-planner')}
                                className="md:col-span-3 mt-4 p-4 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse-slow"
                            >
                                <Utensils className="w-6 h-6" />
                                {t.meal_planner_title}
                            </button>
                        </div>
                    )}

                    <ToolInfoSection toolId="calories" lang={lang} />

                    <AdComponent slot="calories_bottom" />
                </div>

                <button
                    onClick={() => setCurrentPage('home')}
                    className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                >
                    {t.back_to_home}
                </button>
            </div>
        </div>
    </div>
);

export default CaloriesCalculatorPage;
