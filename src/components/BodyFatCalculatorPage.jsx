import React from 'react';
import { Percent } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';

const BodyFatCalculatorPage = ({ bfWeight, setBfWeight, bfHeight, setBfHeight, bfAge, setBfAge, bfGender, setBfGender, bfNeck, setBfNeck, bfWaist, setBfWaist, bfHip, setBfHip, calculateBodyFat, bfResult, setCurrentPage, t, lang }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
            <ToolHero toolId="body-fat" lang={lang} />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Percent className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.body_fat_calc}</h1>
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
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
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
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
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
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
                                <select
                                    value={bfGender}
                                    onChange={(e) => setBfGender(e.target.value)}
                                    aria-label={t.gender}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
                                >
                                    <option value="male">{t.male}</option>
                                    <option value="female">{t.female}</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">{t.measurements} ({t.unit_cm})</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.neck}</label>
                                    <input
                                        type="number"
                                        value={bfNeck}
                                        onChange={(e) => setBfNeck(e.target.value)}
                                        aria-label={t.neck}
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.waist}</label>
                                    <input
                                        type="number"
                                        value={bfWaist}
                                        onChange={(e) => setBfWaist(e.target.value)}
                                        aria-label={t.waist}
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
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
                                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={calculateBodyFat}
                            className="w-full py-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            {t.calculate}
                        </button>
                    </div>

                    {bfResult && (
                        <div id="body-fat-result" className="mt-8 p-8 bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border-2 border-orange-200 dark:border-orange-800 animate-scale-in">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{t.result}:</h3>
                            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <p className="text-5xl font-black text-orange-600 dark:text-orange-400">{bfResult.bodyFat}%</p>
                                <p className={`text-2xl font-bold ${bfResult.color} mt-2`}>{bfResult.category}</p>
                            </div>
                        </div>
                    )}

                    <ToolInfoSection toolId="body-fat" lang={lang} />

                    <AdComponent slot="body_fat_bottom" />
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

export default BodyFatCalculatorPage;
