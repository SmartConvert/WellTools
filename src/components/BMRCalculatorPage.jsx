import React from 'react';
import { Calculator, Info, Zap } from 'lucide-react';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';
import TrustBadge from './TrustBadge';
import PostResultCTA from './PostResultCTA';
import AffiliateBlock from './AffiliateBlock';
import { calculatorContent } from '../data/seoContent';

const BMRCalculatorPage = ({ bmrWeight, setBmrWeight, bmrHeight, setBmrHeight, bmrAge, setBmrAge, bmrGender, setBmrGender, calculateBMR, bmrResult, bmrError, setCurrentPage, t }) => {
    // Get SEO content for H2
    const content = calculatorContent['bmr']?.['en'];

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <ToolHero toolId="bmr" />

                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                {content?.h2_title || "BMR Calculator"}
                            </h2>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                            Calculate your Basal Metabolic Rate (BMR) to understand how many calories your body needs at rest.
                        </p>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Gender</label>
                                    <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
                                        {['male', 'female'].map((g) => (
                                            <button
                                                key={g}
                                                onClick={() => setBmrGender(g)}
                                                className={`flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all ${bmrGender === g ? 'bg-white dark:bg-gray-800 text-amber-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Age</label>
                                    <input
                                        type="number"
                                        value={bmrAge}
                                        onChange={(e) => setBmrAge(e.target.value)}
                                        placeholder="25"
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors text-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={bmrWeight}
                                        onChange={(e) => setBmrWeight(e.target.value)}
                                        placeholder="70"
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors text-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Height (cm)</label>
                                    <input
                                        type="number"
                                        value={bmrHeight}
                                        onChange={(e) => setBmrHeight(e.target.value)}
                                        placeholder="175"
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors text-lg"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={calculateBMR}
                                className="w-full py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Calculate BMR
                            </button>
                            {bmrError && (
                                <p className="text-sm text-rose-600 dark:text-rose-400 text-center">{bmrError}</p>
                            )}
                        </div>

                        {bmrResult && (
                            <div id="bmr-result" className="mt-8 animate-scale-in space-y-6">
                                <div className="p-8 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800">
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">Result:</h3>
                                    <div className="space-y-6 text-center">
                                        <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-amber-100 dark:border-amber-900">
                                            <p className="text-5xl font-black text-amber-600 dark:text-amber-400">{bmrResult.bmr}</p>
                                            <p className="text-lg font-bold text-gray-500 mt-2">Calories / Day</p>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            You burn this amount doing absolutely nothing.
                                        </p>
                                    </div>
                                </div>
                                <PostResultCTA toolId="bmr" setCurrentPage={setCurrentPage} />
                                <AffiliateBlock toolId="bmr" />
                            </div>
                        )}

                        <TrustBadge />
                        <MedicalDisclaimer setCurrentPage={setCurrentPage} />
                        <ToolInfoSection toolId="bmr" />
                    </div>

                    <RelatedTools currentToolId="bmr" setCurrentPage={setCurrentPage} />

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
};

export default BMRCalculatorPage;
