import React from 'react';
import { Percent } from 'lucide-react';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';
import TrustBadge from './TrustBadge';
import PostResultCTA from './PostResultCTA';
import AffiliateBlock from './AffiliateBlock';
import { calculatorContent } from '../data/seoContent';

const BodyFatCalculatorPage = ({ bfWeight, setBfWeight, bfHeight, setBfHeight, bfAge, setBfAge, bfGender, setBfGender, bfNeck, setBfNeck, bfWaist, setBfWaist, bfHip, setBfHip, calculateBodyFat, bfResult, bfError, setCurrentPage, t }) => {
    // Get SEO content for H2
    const content = calculatorContent['body-fat']?.['en'];

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <ToolHero toolId="body-fat" />

                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-4xl p-8 text-white shadow-xl relative overflow-hidden group">
                                <Percent className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                {content?.h2_title || t.body_fat_calc}
                            </h2>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                            {t.body_fat_desc}
                        </p>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
                                    <input
                                        type="number"
                                        value={bfWeight}
                                        onChange={(e) => setBfWeight(e.target.value)}
                                        placeholder="70"
                                        aria-label={`${t.weight} (${t.unit_kg})`}
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
                                    <input
                                        type="number"
                                        value={bfHeight}
                                        onChange={(e) => setBfHeight(e.target.value)}
                                        placeholder="175"
                                        aria-label={`${t.height} (${t.unit_cm})`}
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
                                    <input
                                        type="number"
                                        value={bfAge}
                                        onChange={(e) => setBfAge(e.target.value)}
                                        placeholder="25"
                                        aria-label={t.age}
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
                                    <select
                                        value={bfGender}
                                        onChange={(e) => setBfGender(e.target.value)}
                                        aria-label={t.gender}
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                                    >
                                        <option value="male">{t.male}</option>
                                        <option value="female">{t.female}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-teal-50 dark:bg-teal-900/10 border-2 border-teal-200 dark:border-teal-800 rounded-2xl p-6">
                                <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">{t.measurements} ({t.unit_cm})</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.neck}</label>
                                        <input
                                            type="number"
                                            value={bfNeck}
                                            onChange={(e) => setBfNeck(e.target.value)}
                                            aria-label={t.neck}
                                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.waist}</label>
                                        <input
                                            type="number"
                                            value={bfWaist}
                                            onChange={(e) => setBfWaist(e.target.value)}
                                            aria-label={t.waist}
                                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    {bfGender === 'female' && (
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.hip}</label>
                                            <input
                                                type="number"
                                                value={bfHip}
                                                onChange={(e) => setBfHip(e.target.value)}
                                                aria-label={t.hip}
                                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={calculateBodyFat}
                                className="w-full py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                            >
                                {t.calculate}
                            </button>
                            {bfError && (
                                <p className="text-sm text-rose-600 dark:text-rose-400 text-center">{bfError}</p>
                            )}
                        </div>

                        {bfResult && (
                            <div className="mt-8 space-y-4">
                                <div className="p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2.5rem] border-2 border-emerald-100 dark:border-emerald-900/30 text-center animate-in zoom-in duration-500">
                                    <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">{t.res_your_body_fat}</div>
                                    <div className="text-6xl font-black text-gray-900 dark:text-white mb-4">
                                        {bfResult.bodyFat}<span className="text-3xl ml-1">%</span>
                                    </div>
                                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-lg font-black ${bfResult.color} bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none`}>
                                        <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
                                        {bfResult.category}
                                    </div>
                                </div>

                                <PostResultCTA toolId="body-fat" setCurrentPage={setCurrentPage} />
                                <AffiliateBlock toolId="body-fat" />
                            </div>
                        )}

                        <TrustBadge setCurrentPage={setCurrentPage} />
                        <MedicalDisclaimer setCurrentPage={setCurrentPage} />
                        <ToolInfoSection toolId="body-fat" />
                    </div>

                    <RelatedTools currentToolId="body-fat" setCurrentPage={setCurrentPage} />

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
};

export default BodyFatCalculatorPage;
