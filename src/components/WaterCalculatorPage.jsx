import React from 'react';
import { Droplet } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';

const WaterCalculatorPage = ({ waterWeight, setWaterWeight, waterActivity, setWaterActivity, calculateWater, waterResult, waterError, setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
            <ToolHero toolId="water" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Droplet className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.water_calc}</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
                            <input
                                type="number"
                                value={waterWeight}
                                onChange={(e) => setWaterWeight(e.target.value)}
                                placeholder="70"
                                aria-label={`${t.weight} (${t.unit_kg})`}
                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.activity_level}</label>
                            <select
                                value={waterActivity}
                                onChange={(e) => setWaterActivity(e.target.value)}
                                aria-label={t.activity_level}
                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
                            >
                                <option value="low">{t.activity_low}</option>
                                <option value="moderate">{t.activity_moderate}</option>
                                <option value="high">{t.activity_high}</option>
                            </select>
                        </div>

                        <button
                            onClick={calculateWater}
                            className="w-full py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            {t.calculate}
                        </button>
                        {waterError && (
                            <p className="text-sm text-rose-600 dark:text-rose-400 text-center">{waterError}</p>
                        )}
                    </div>

                    {waterResult && (
                        <div id="water-result" className="mt-8 p-8 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 animate-scale-in">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{t.result}:</h3>
                            <div className="flex items-center justify-center gap-4">
                                <Droplet className="w-12 h-12 text-blue-500" fill="currentColor" />
                                <p className="text-5xl font-black text-blue-600 dark:text-blue-400">{waterResult} {t.unit_liter}</p>
                            </div>
                        </div>
                    )}

                    <MedicalDisclaimer setCurrentPage={setCurrentPage} />
                    <ToolInfoSection toolId="water" />

                    <AdComponent slot="water_bottom" />
                </div>

                <RelatedTools currentToolId="water" setCurrentPage={setCurrentPage} />

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

export default WaterCalculatorPage;
