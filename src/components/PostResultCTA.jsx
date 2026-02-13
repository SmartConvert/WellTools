import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const PostResultCTA = ({ toolId, setCurrentPage }) => {
    const guides = {
        bmi: {
            title: "Understand Your Body Composition",
            desc: "Don't just stop at BMI. Learn how body composition affects your health.",
            btn: "Read Complete BMI Guide",
            link: "bmi-guide"
        },
        calories: {
            title: "Master Your Metabolism",
            desc: "Learn the secrets of TDEE and how to adjust calories for sustainable results.",
            btn: "Read Metabolism Guide",
            link: "calories-guide"
        },
        water: {
            title: "The Science of Hydration",
            desc: "Why water is the #1 fat burner and how to optimize your intake.",
            btn: "Read Hydration Guide",
            link: "water-guide"
        },
        sleep: {
            title: "Sleep & Recovery Secrets",
            desc: "How to use sleep cycles to wake up 100% refreshed every day.",
            btn: "Read Sleep Guide",
            link: "sleep-guide"
        }
    };

    const content = guides[toolId] || guides.bmi;

    return (
        <div className="mt-8 p-1 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-transform">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                        <BookOpen className="w-6 h-6 text-emerald-500" />
                        {content.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        {content.desc}
                    </p>
                </div>
                <button
                    onClick={() => {
                        window.scrollTo(0, 0);
                        // If it's a guide page, navigate there, else go to blog
                        setCurrentPage(content.link.includes('guide') ? content.link : 'blog');
                    }}
                    className="whitespace-nowrap px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
                >
                    {content.btn}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default PostResultCTA;
