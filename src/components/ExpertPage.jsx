import React from 'react';
import { Utensils, Activity, Heart, ArrowLeft } from 'lucide-react';

const ExpertPage = ({ setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
            {/* Experts Section */}
            <div className="mb-20">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">{t.our_experts}</h1>
                    <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium">Science-backed tools verified by global wellness professionals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { id: 'nutrition', title: t.expert_nutrition_title, role: t.expert_nutrition_role, bio: t.expert_nutrition_bio, color: 'emerald' },
                        { id: 'fitness', title: t.expert_fitness_title, role: t.expert_fitness_role, bio: t.expert_fitness_bio, color: 'blue' },
                        { id: 'mental', title: t.expert_mental_title, role: t.expert_mental_role, bio: t.expert_mental_bio, color: 'violet' }
                    ].map((expert) => (
                        <div key={expert.id} className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700 hover:shadow-2xl transition-all group hover:-translate-y-2 duration-300">
                            <div className={`w-20 h-20 bg-${expert.color === 'emerald' ? 'emerald' : expert.color === 'blue' ? 'blue' : 'violet'}-500/10 rounded-3xl mb-8 flex items-center justify-center text-${expert.color === 'emerald' ? 'emerald' : expert.color === 'blue' ? 'blue' : 'violet'}-500 shadow-inner`}>
                                {expert.id === 'nutrition' && <Utensils className="w-10 h-10" />}
                                {expert.id === 'fitness' && <Activity className="w-10 h-10" />}
                                {expert.id === 'mental' && <Heart className="w-10 h-10" />}
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-emerald-500 transition-colors">{expert.title}</h3>
                            <p className={`text-xs font-black uppercase tracking-widest text-${expert.color === 'emerald' ? 'emerald' : expert.color === 'blue' ? 'blue' : 'violet'}-500 mb-6 py-1 px-3 bg-${expert.color === 'emerald' ? 'emerald' : expert.color === 'blue' ? 'blue' : 'violet'}-500/10 rounded-lg inline-block`}>
                                {expert.role}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{expert.bio}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Quote / CTA */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[3rem] p-8 md:p-16 text-center text-white shadow-2xl mb-16 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-6 tracking-tight">Built on Precision. Designed for Health.</h2>
                    <p className="max-w-2xl mx-auto text-emerald-50 text-lg md:text-xl font-medium mb-10 leading-relaxed opacity-90">
                        Join thousands of users who trust WellTools for their daily health tracking and wellness journey. Free, forever, and secure.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={() => setCurrentPage('home')} className="px-10 py-5 bg-white text-emerald-700 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95">
                            Start Tracking Now
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setCurrentPage('home')}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 flex items-center gap-2 mx-auto md:mx-0"
            >
                <ArrowLeft className="w-5 h-5" />
                {t.back_to_home}
            </button>
        </div>
    </div>
);

export default ExpertPage;
