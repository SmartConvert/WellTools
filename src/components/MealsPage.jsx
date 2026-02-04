import React from 'react';
import { Utensils, ChevronRight } from 'lucide-react';
import { mealCategories } from '../data/meals';

const MealsPage = ({ selectedMealCategory, setSelectedMealCategory, t }) => {
    const selectedCategory = selectedMealCategory ? mealCategories[selectedMealCategory] : null;

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                    {t.meals_title}
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                    {t.meals_subtitle}
                </p>

                {!selectedCategory ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(mealCategories).map(([key, category]) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={key}
                                    onClick={() => setSelectedMealCategory(key)}
                                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                    role="button"
                                    aria-label={`${t[category.title]} - ${t.view_meals}`}
                                >
                                    <div className={`w-16 h-16 bg-linear-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                                        {t[category.title]}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {category.meals.length} {t.explore_tool}
                                    </p>
                                    <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold group-hover:gap-2 transition-all">
                                        {t.view_meals} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={() => setSelectedMealCategory(null)}
                            className="mb-8 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 flex items-center gap-2"
                            aria-label={t.back_to_categories}
                        >
                            <span>&larr;</span> {t.back_to_categories}
                        </button>

                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-gray-50 dark:border-gray-700">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-16 h-16 bg-linear-to-br ${selectedCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                    {React.createElement(selectedCategory.icon, { className: "w-8 h-8 text-white" })}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                    {t[selectedCategory.title]}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {selectedCategory.meals.map((meal, index) => (
                                    <div
                                        key={index}
                                        className="p-6 bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-3 mb-4">
                                            <Utensils className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t[meal.name]}</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.calories}</p>
                                                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{meal.calories}</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.protein}</p>
                                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{meal.protein}</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.carbs}</p>
                                                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{meal.carbs}</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.fat}</p>
                                                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{meal.fat}</p>
                                            </div>
                                            {meal.gi && (
                                                <div className="col-span-2 bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.gi}</p>
                                                    <p className="text-lg font-bold text-green-600">{meal.gi}</p>
                                                </div>
                                            )}
                                            {meal.sodium && (
                                                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.sodium}</p>
                                                    <p className="text-lg font-bold text-rose-600 dark:text-rose-400">{meal.sodium}</p>
                                                </div>
                                            )}
                                            {meal.potassium && (
                                                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.potassium}</p>
                                                    <p className="text-lg font-bold text-teal-600">{meal.potassium}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-6 rounded-2xl shadow-md mt-8">
                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                        {t.meals_note}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MealsPage;
