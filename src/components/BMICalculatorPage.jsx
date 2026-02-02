import React from 'react';
import { Calculator, Info } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';

const BMICalculatorPage = ({ bmiWeight, setBmiWeight, bmiHeight, setBmiHeight, calculateBMI, bmiResult, setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-linear-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.bmi_calc}</h1>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                    {t.bmi_desc}
                </p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
                        <input
                            type="number"
                            value={bmiWeight}
                            onChange={(e) => setBmiWeight(e.target.value)}
                            placeholder="70"
                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
                        <input
                            type="number"
                            value={bmiHeight}
                            onChange={(e) => setBmiHeight(e.target.value)}
                            placeholder="175"
                            className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors text-lg"
                        />
                    </div>

                    <button
                        onClick={calculateBMI}
                        className="w-full py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        {t.calculate}
                    </button>
                </div>

                {bmiResult && (
                    <div id="bmi-result" className="mt-8 p-8 bg-linear-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800 animate-scale-in">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{t.result}:</h3>
                        <div className="space-y-6 text-center">
                            <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-cyan-100 dark:border-cyan-900">
                                <p className="text-5xl font-black text-cyan-600 dark:text-cyan-400">{bmiResult.bmi}</p>
                                <p className={`text-2xl font-bold ${bmiResult.color} mt-2`}>{t[bmiResult.category]}</p>
                            </div>

                            <div className="pt-6 border-t border-cyan-100 dark:border-cyan-900/50">
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center justify-center gap-2">
                                    <Info className="w-5 h-5 text-cyan-500" />
                                    {t.bmi_advice_title}
                                </h4>
                                <p className={`text-lg font-semibold mb-4 ${bmiResult.suitable ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                    {bmiResult.suitable ? t.bmi_status_suitable : t.bmi_status_not_suitable}
                                </p>
                                <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl text-gray-700 dark:text-gray-300 leading-relaxed shadow-sm">
                                    {bmiResult.tip}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <ToolInfoSection toolId="bmi" t={t} />

                <AdComponent slot="bmi_bottom" />
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

export default BMICalculatorPage;
