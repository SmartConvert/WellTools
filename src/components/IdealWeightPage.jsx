import React from 'react';
import { Scale as ScaleIcon } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';

const IdealWeightPage = ({ idealHeight, setIdealHeight, idealGender, setIdealGender, calculateIdealWeight, idealResult, setCurrentPage, t, lang }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
            <ToolHero toolId="ideal-weight" lang={lang} />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <ScaleIcon className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.ideal_weight}</h1>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
                                <input
                                    type="number"
                                    value={idealHeight}
                                    onChange={(e) => setIdealHeight(e.target.value)}
                                    placeholder="175"
                                    aria-label={`${t.height} (${t.unit_cm})`}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 focus:outline-none transition-colors text-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
                                <select
                                    value={idealGender}
                                    onChange={(e) => setIdealGender(e.target.value)}
                                    aria-label={t.gender}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 focus:outline-none transition-colors text-lg"
                                >
                                    <option value="male">{t.male}</option>
                                    <option value="female">{t.female}</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={calculateIdealWeight}
                            className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            {t.calculate}
                        </button>
                    </div>

                    {idealResult && (
                        <div id="ideal-weight-result" className="mt-8 p-8 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-rose-200 dark:border-rose-800 animate-scale-in">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{t.result}:</h3>
                            <div className="space-y-4">
                                <p className="text-5xl font-black text-rose-600 dark:text-rose-400 text-center">{idealResult.ideal} <span className="text-2xl">{t.unit_kg}</span></p>
                                <div className="flex gap-4">
                                    <div className="flex-1 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Min</p>
                                        <p className="text-xl font-bold text-gray-700 dark:text-gray-200">{idealResult.min} {t.unit_kg}</p>
                                    </div>
                                    <div className="flex-1 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Max</p>
                                        <p className="text-xl font-bold text-gray-700 dark:text-gray-200">{idealResult.max} {t.unit_kg}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <ToolInfoSection toolId="ideal-weight" lang={lang} />

                    <AdComponent slot="ideal_weight_bottom" />
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

export default IdealWeightPage;
