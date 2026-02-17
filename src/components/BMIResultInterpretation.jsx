import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

const BMIResultInterpretation = ({ bmi, age, gender }) => {
    const getCategory = (bmi) => {
        if (bmi < 18.5) return 'underweight';
        if (bmi < 25) return 'normal';
        if (bmi < 30) return 'overweight';
        return 'obese';
    };

    const category = getCategory(bmi);

    const interpretations = {
        underweight: {
            title: "Underweight",
            color: "blue",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-blue-500",
            textColor: "text-blue-900 dark:text-blue-100",
            listColor: "text-blue-800 dark:text-blue-200",
            iconColor: "text-blue-500",
            risks: [
                "Weakened immune system and increased susceptibility to infections",
                "Nutritional deficiencies (vitamins, minerals, protein)",
                "Osteoporosis and bone density loss",
                "Fertility issues and hormonal imbalances",
                "Fatigue and decreased energy levels"
            ],
            recommendations: [
                "Consult a doctor or registered dietitian for personalized guidance",
                "Increase calorie intake gradually with nutrient-dense foods",
                "Focus on protein-rich foods, healthy fats, and complex carbs",
                "Consider strength training to build muscle mass",
                "Track progress with our Calorie Calculator and Macro Calculator"
            ]
        },
        normal: {
            title: "Healthy Weight",
            color: "green",
            bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
            borderColor: "border-emerald-500",
            textColor: "text-emerald-900 dark:text-emerald-100",
            listColor: "text-emerald-800 dark:text-emerald-200",
            iconColor: "text-emerald-500",
            risks: [],
            recommendations: [
                "Maintain current healthy habits and balanced nutrition",
                "Continue regular physical activity (150 minutes/week)",
                "Monitor weight quarterly to catch changes early",
                "Stay hydrated using our Water Intake Calculator",
                "Optimize sleep with our Sleep Calculator",
                "Consider body composition tracking with our Body Fat Calculator"
            ]
        },
        overweight: {
            title: "Overweight",
            color: "yellow",
            bgColor: "bg-amber-50 dark:bg-amber-900/20",
            borderColor: "border-amber-500",
            textColor: "text-amber-900 dark:text-amber-100",
            listColor: "text-amber-800 dark:text-amber-200",
            iconColor: "text-amber-500",
            risks: [
                "Increased heart disease risk (2x higher than normal weight)",
                "Type 2 diabetes risk (3x higher)",
                "High blood pressure and cholesterol",
                "Joint problems and osteoarthritis",
                "Sleep apnea and breathing difficulties"
            ],
            recommendations: [
                "Aim for 5-10% weight loss (proven to reduce health risks)",
                "Create a calorie deficit of 500 calories/day for 1 lb/week loss",
                "Exercise 30 minutes daily (cardio + strength training)",
                "Track daily calories with our Calorie Calculator",
                "Optimize macros with our Macro Calculator",
                "Consult a healthcare provider before starting any program"
            ]
        },
        obese: {
            title: "Obese",
            color: "red",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            borderColor: "border-red-500",
            textColor: "text-red-900 dark:text-red-100",
            listColor: "text-red-800 dark:text-red-200",
            iconColor: "text-red-500",
            risks: [
                "High cardiovascular disease risk (4x higher)",
                "Type 2 diabetes (40% increased risk)",
                "Certain cancers (breast, colon, kidney)",
                "Severe sleep apnea",
                "Fatty liver disease",
                "Reduced life expectancy (8-10 years)"
            ],
            recommendations: [
                "Consult healthcare provider immediately for medical evaluation",
                "Set realistic weight loss goals (1-2 lbs/week is safe)",
                "Consider medical weight loss programs or bariatric surgery",
                "Start with low-impact exercise (walking, swimming)",
                "Use our Calorie Calculator to determine daily needs",
                "Track macros with our Macro Calculator for balanced nutrition",
                "Join a support group or work with a dietitian"
            ]
        }
    };

    const data = interpretations[category];

    return (
        <div className="mt-8 space-y-6">
            {/* Category Badge */}
            <div className={`${data.bgColor} border-l-4 ${data.borderColor} p-6 rounded-lg`}>
                <div className="flex items-center gap-3 mb-2">
                    <Info className={`w-6 h-6 ${data.iconColor}`} />
                    <h3 className={`text-2xl font-bold ${data.textColor}`}>
                        BMI Category: {data.title}
                    </h3>
                </div>
                <p className={`${data.listColor} text-lg`}>
                    Your BMI of <strong>{bmi.toFixed(1)}</strong> falls in the <strong>{data.title}</strong> category.
                </p>
            </div>

            {/* Health Risks Assessment */}
            {data.risks.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6" />
                        Health Risks Associated with {data.title}
                    </h3>
                    <ul className="space-y-2">
                        {data.risks.map((risk, i) => (
                            <li key={i} className="text-red-800 dark:text-red-200 flex items-start gap-2">
                                <span className="text-red-500 mt-1 font-bold">•</span>
                                <span>{risk}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Personalized Recommendations */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Personalized Recommendations
                </h3>
                <ul className="space-y-2">
                    {data.recommendations.map((rec, i) => (
                        <li key={i} className="text-emerald-800 dark:text-emerald-200 flex items-start gap-2">
                            <span className="text-emerald-500 mt-1 font-bold">✓</span>
                            <span>{rec}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-gray-200">Medical Note:</strong> BMI is a screening tool, not a diagnostic tool. It doesn't account for muscle mass, bone density, or body composition. Athletes and muscular individuals may have high BMI despite being healthy. Consult a healthcare provider for personalized medical advice.
                </p>
            </div>
        </div>
    );
};

export default BMIResultInterpretation;
