import React, { useState } from 'react';
import { Utensils, TrendingDown, Activity, Scale, Info, Plus } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';
import { mealCategories } from '../data/meals';

const MealPlannerPage = ({ t, setCurrentPage, calResult }) => {
    const [goal, setGoal] = useState(calResult ? (calResult.goal || 'maintain') : 'maintain');

    // Professional Food Recommendations based on Goal
    const getFoodRecommendations = (targetGoal) => {
        switch (targetGoal) {
            case 'lose':
                return {
                    title: t.food_recommendations_loss || "Foods for Weight Loss",
                    protein: ["Chicken Breast", "Egg Whites", "White Fish", "Tofu", "Greek Yogurt"],
                    carbs: ["Quinoa", "Oats", "Berries", "Leafy Greens", "Cauliflower"],
                    fats: ["Avocado (limited)", "Almonds (measured)", "Olive Oil (teaspoon)"],
                    avoid: ["Sugary Drinks", "Processed Snacks", "White Bread", "Fried Foods"]
                };
            case 'gain':
                return {
                    title: t.food_recommendations_gain || "Foods for Muscle Gain",
                    protein: ["Steak", "Whole Eggs", "Salmon", "Chicken Thighs", "Protein Shakes"],
                    carbs: ["Rice", "Potatoes", "Pasta", "Bananas", "Whole Wheat Bread"],
                    fats: ["Peanut Butter", "Whole Milk", "Cheese", "Nuts", "Avocado"],
                    avoid: ["Empty Calories", "Excessive Junk Food", "Alcohol"]
                };
            default: // maintain
                return {
                    title: t.food_recommendations_maintain || "Balanced Diet Foods",
                    protein: ["Lean Meats", "Fish", "Beans", "Eggs", "Dairy"],
                    carbs: ["Fruits", "Vegetables", "Whole Grains", "Legumes"],
                    fats: ["Olive Oil", "Nuts", "Seeds", "Fatty Fish"],
                    avoid: ["Excessive Sugar", "Trans Fats", "Highly Processed Foods"]
                };
        }
    };

    const foodRecs = getFoodRecommendations(goal);

    const getMealPlan = () => {
        // Basic logic to simulate "AI" selection based on target categories
        const plans = {
            lose: {
                total: 1500,
                items: [
                    { type: t.breakfast, name: 'bowl_oatmeal_berries', calories: 350 },
                    { type: t.lunch, name: 'grilled_chicken_salad', calories: 450 },
                    { type: t.dinner, name: 'steamed_fish_veggies', calories: 400 },
                    { type: t.snack, name: 'handful_almonds', calories: 150 }
                ]
            },
            maintain: {
                total: 2000,
                items: [
                    { type: t.breakfast, name: 'avocado_toast_eggs', calories: 450 },
                    { type: t.lunch, name: 'turkey_quinoa_bowl', calories: 550 },
                    { type: t.dinner, name: 'beef_stir_fry_rice', calories: 600 },
                    { type: t.snack, name: 'greek_yogurt_honey', calories: 250 }
                ]
            },
            gain: {
                total: 2800,
                items: [
                    { type: t.breakfast, name: 'protein_pancakes_banana', calories: 700 },
                    { type: t.lunch, name: 'steak_sweet_potato', calories: 850 },
                    { type: t.dinner, name: 'pasta_bolognese_extra_cheese', calories: 800 },
                    { type: t.snack, name: 'peanut_butter_smoothie', calories: 450 }
                ]
            }
        };
        return plans[goal] || plans['maintain'];
    };

    const currentPlan = getMealPlan();

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl">
                            <Utensils className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        {t.meal_planner_title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t.meal_planner_desc}
                    </p>
                </div>

                {/* Goal Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {[
                        { id: 'lose', label: t.goal_lose, icon: TrendingDown, color: 'emerald' },
                        { id: 'maintain', label: t.goal_maintain, icon: Activity, color: 'blue' },
                        { id: 'gain', label: t.goal_gain, icon: Scale, color: 'violet' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setGoal(item.id)}
                            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${goal === item.id ? (item.id === 'lose' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : item.id === 'maintain' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-violet-500 bg-violet-50 dark:bg-violet-900/20') : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-400'}`}
                        >
                            <item.icon className={`w-8 h-8 ${goal === item.id ? (item.id === 'lose' ? 'text-emerald-500' : item.id === 'maintain' ? 'text-blue-500' : 'text-violet-500') : ''}`} />
                            <span className={`font-bold ${goal === item.id ? 'text-gray-900 dark:text-white' : ''}`}>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Professional Usage: Food Recommendations */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{foodRecs.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Protein Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-rose-500 mb-4">
                                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-sm">🥩</div>
                                Proteins
                            </h3>
                            <ul className="space-y-2">
                                {foodRecs.protein.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Carbs Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-amber-500 mb-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-sm">🌾</div>
                                Carbs
                            </h3>
                            <ul className="space-y-2">
                                {foodRecs.carbs.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Fats Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-500 mb-4">
                                <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm">🥑</div>
                                Healthy Fats
                            </h3>
                            <ul className="space-y-2">
                                {foodRecs.fats.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Avoid Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm hover:shadow-md transition-all">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-red-500 mb-4">
                                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-sm">🚫</div>
                                Limit / Avoid
                            </h3>
                            <ul className="space-y-2">
                                {foodRecs.avoid.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Suggested Menu Card */}
                <div id="meal-plan-result" className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700 mb-12 animate-fade-in group hover:border-emerald-500/30 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{t.today_menu}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 text-sm font-medium">{t.calories_goal}:</span>
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full font-black text-sm">
                                    {currentPlan.total} kcal
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all font-bold group/btn shadow-lg">
                                <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" />
                                {t.generate_new}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {currentPlan.items.map((meal, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group/item">
                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-lg shadow-sm group-hover/item:scale-110 transition-transform">
                                    {index === 0 ? '🍳' : index === 1 ? '🥗' : index === 2 ? '🍽️' : '🍎'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{t[meal.name] || meal.name.replace(/_/g, ' ')}</h4>
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                                            {meal.calories} kcal
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wide opacity-80">{meal.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ToolInfoSection toolId="meal_planner" t={t} />

                <AdComponent slot="meal_planner_bottom" />
            </div>
        </div>
    );
};

export default MealPlannerPage;
