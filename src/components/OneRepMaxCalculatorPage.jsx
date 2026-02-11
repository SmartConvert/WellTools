import React from 'react';
import { Dumbbell, Info, Trophy } from 'lucide-react';
import AdComponent from './AdComponent';
import ToolInfoSection from './ToolInfoSection';
import ToolHero from './ToolHero';
import MedicalDisclaimer from './MedicalDisclaimer';
import RelatedTools from './RelatedTools';

const OneRepMaxCalculatorPage = ({ ormWeight, setOrmWeight, ormReps, setOrmReps, calculateORM, ormResult, ormError, setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
            <ToolHero toolId="1rm" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-linear-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                            <Dumbbell className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">One Rep Max Calculator</h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                        Estimate the maximum weight you can lift for a single repetition based on your submaximal lifts.
                    </p>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Weight Lifted (kg)</label>
                                <input
                                    type="number"
                                    value={ormWeight}
                                    onChange={(e) => setOrmWeight(e.target.value)}
                                    placeholder="100"
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-slate-500 focus:outline-none transition-colors text-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Repetitions Performed</label>
                                <input
                                    type="number"
                                    value={ormReps}
                                    onChange={(e) => setOrmReps(e.target.value)}
                                    placeholder="5"
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-slate-500 focus:outline-none transition-colors text-lg"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateORM}
                            className="w-full py-4 bg-linear-to-r from-slate-700 to-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Calculate 1RM
                        </button>
                        {ormError && (
                            <p className="text-sm text-rose-600 dark:text-rose-400 text-center">{ormError}</p>
                        )}
                    </div>

                    {ormResult && (
                        <div id="orm-result" className="mt-8 p-8 bg-linear-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-2xl border-2 border-slate-200 dark:border-slate-800 animate-scale-in">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">Estimated Max:</h3>
                            <div className="text-center">
                                <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-900 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Trophy className="w-24 h-24 text-slate-900 dark:text-white" />
                                    </div>
                                    <p className="text-6xl font-black text-slate-800 dark:text-slate-100 relative z-10">{ormResult.max} kg</p>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[95, 90, 85, 80, 75, 70, 65, 60].map((pct) => (
                                    <div key={pct} className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-bold text-gray-500 uppercase">{pct}% of 1RM</p>
                                        <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{Math.round((ormResult.max * pct) / 100)} kg</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <MedicalDisclaimer setCurrentPage={setCurrentPage} />
                    <ToolInfoSection toolId="1rm" />

                    <AdComponent slot="orm_bottom" />
                </div>

                <RelatedTools currentToolId="1rm" setCurrentPage={setCurrentPage} />

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

export default OneRepMaxCalculatorPage;
