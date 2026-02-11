import React from 'react';
import { ChevronRight, Percent, Calculator, Activity, Droplet, Moon, Scale, Zap, Utensils, Dumbbell } from 'lucide-react';

const tools = [
    { id: 'bmi', name: 'BMI Calculator', icon: <Calculator className="w-5 h-5" />, color: 'text-cyan-500' },
    { id: 'calories', name: 'Calories Calculator', icon: <Activity className="w-5 h-5" />, color: 'text-emerald-500' },
    { id: 'body-fat', name: 'Body Fat %', icon: <Percent className="w-5 h-5" />, color: 'text-orange-500' },
    { id: 'water', name: 'Water Intake', icon: <Droplet className="w-5 h-5" />, color: 'text-blue-500' },
    { id: 'ideal-weight', name: 'Ideal Weight', icon: <Scale className="w-5 h-5" />, color: 'text-rose-500' },
    { id: 'sleep', name: 'Sleep Cycles', icon: <Moon className="w-5 h-5" />, color: 'text-violet-500' },
    { id: 'bmr', name: 'BMR Calculator', icon: <Zap className="w-5 h-5" />, color: 'text-amber-500' },
    { id: 'macro', name: 'Macro Goals', icon: <Utensils className="w-5 h-5" />, color: 'text-green-500' },
    { id: '1rm', name: 'One Rep Max', icon: <Dumbbell className="w-5 h-5" />, color: 'text-slate-500' }
];

const RelatedTools = ({ currentToolId, setCurrentPage }) => {
    // Filter out the current tool and pick 3-4 others
    const related = tools
        .filter(t => t.id !== currentToolId)
        .sort(() => 0.5 - Math.random()) // Randomize for variety
        .slice(0, 3);

    return (
        <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-16">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Related Wellness Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => {
                            setCurrentPage(tool.id);
                            window.scrollTo(0, 0);
                        }}
                        className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm ${tool.color}`}>
                                {tool.icon}
                            </div>
                            <span className="font-bold text-gray-800 dark:text-gray-200">{tool.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RelatedTools;
