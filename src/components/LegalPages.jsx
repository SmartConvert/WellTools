import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const TermsOfUsePage = ({ setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.terms}</h1>
                <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    <p>{t.terms_intro}</p>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_usage_title}</h2>
                    <p>{t.terms_usage_desc}</p>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_intellectual_title}</h2>
                    <p>{t.terms_intellectual_desc}</p>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_liability_title}</h2>
                    <p>{t.terms_liability_desc}</p>
                </div>
            </div>
            <button
                onClick={() => setCurrentPage('home')}
                className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
                {t.back_to_home}
            </button>
        </div>
    </div>
);

export const DisclaimerPage = ({ setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.disclaimer}</h1>
                <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    <div className="bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-400 p-6 rounded-2xl mb-8">
                        <p className="text-rose-800 dark:text-rose-400 font-bold mb-4">{t.disclaimer_title}</p>
                        <p className="text-rose-700 dark:text-rose-300">{t.disclaimer_desc}</p>
                    </div>
                    <p>{t.medical_disclaimer_intro}</p>
                </div>
            </div>
            <button
                onClick={() => setCurrentPage('home')}
                className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
                {t.back_to_home}
            </button>
        </div>
    </div>
);

export const PrivacyPolicyPage = ({ setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.privacy}</h1>
                <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    <p>{t.privacy_intro}</p>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.privacy_collection_title}</h2>
                    <p>{t.privacy_collection_desc}</p>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.privacy_storage_title}</h2>
                    <p>{t.privacy_storage_desc}</p>
                </div>
            </div>
            <button
                onClick={() => setCurrentPage('home')}
                className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
                {t.back_to_home}
            </button>
        </div>
    </div>
);
