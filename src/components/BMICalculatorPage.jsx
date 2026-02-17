import React from 'react';
import { Calculator, Info, Zap } from 'lucide-react';
import PostResultCTA from './PostResultCTA';
import AffiliateBlock from './AffiliateBlock';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';
import BMIResultInterpretation from './BMIResultInterpretation';

const BMICalculatorPage = ({ bmiWeight, setBmiWeight, bmiHeight, setBmiHeight, calculateBMI, bmiResult, bmiError, setCurrentPage, t }) => (
    <div className="pt-20 md:pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
            <ToolHero toolId="bmi" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                            <Calculator className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.bmi_calc}</h2>
                    </div>

                    {/* Collapsible or short description on mobile to save space */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-base md:text-lg leading-relaxed hidden md:block">
                        {t.bmi_desc}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:hidden">
                        Calculate your Body Mass Index (BMI) instantly.
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
                        {bmiError && (
                            <p className="text-sm text-rose-600 dark:text-rose-400 text-center">{bmiError}</p>
                        )}
                    </div>

                    {bmiResult && (
                        <div id="bmi-result" className="mt-8 space-y-4 animate-in zoom-in duration-500">
                            <div className="p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2.5rem] border-2 border-emerald-100 dark:border-emerald-900/30 text-center relative overflow-hidden">
                                <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">{t.res_your_bmi}</div>
                                <div className="text-6xl font-black text-gray-900 dark:text-white mb-4">
                                    {bmiResult.bmi}
                                </div>
                                <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-lg font-black ${bmiResult.color} bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none mb-6`}>
                                    <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
                                    {t[bmiResult.category]}
                                </div>

                                <div className="pt-6 border-t border-emerald-100 dark:border-emerald-900/50">
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center justify-center gap-2">
                                        <Info className="w-5 h-5 text-emerald-500" />
                                        {t.bmi_advice_title}
                                    </h4>
                                    <p className={`text-lg font-semibold mb-4 ${bmiResult.suitable ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                        {bmiResult.suitable ? t.bmi_status_suitable : t.bmi_status_not_suitable}
                                    </p>
                                    <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl text-gray-700 dark:text-gray-300 leading-relaxed shadow-sm text-sm">
                                        {bmiResult.tip}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => { setCurrentPage('bmi-guide'); window.scrollTo(0, 0); }}
                                className="w-full p-6 bg-linear-to-r from-gray-900 to-gray-800 text-white rounded-4xl font-black text-xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 group"
                            >
                                <Zap className="w-6 h-6 text-emerald-400 group-hover:animate-pulse" />
                                Read The Definitive BMI Guide
                            </button>

                            {/* Medical Interpretation Component */}
                            <BMIResultInterpretation
                                bmi={parseFloat(bmiResult.bmi)}
                                age={null}
                                gender={null}
                            />
                        </div>
                    )}

                    <PostResultCTA toolId="bmi" setCurrentPage={setCurrentPage} />
                    <AffiliateBlock toolId="bmi" />

                    <MedicalDisclaimer setCurrentPage={setCurrentPage} />
                    <ToolInfoSection toolId="bmi" />
                </div>

                <RelatedTools currentToolId="bmi" setCurrentPage={setCurrentPage} />

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

export default BMICalculatorPage;
