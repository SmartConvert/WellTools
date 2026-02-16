import React from 'react';
import { Activity, ArrowRightCircle, Sparkles, Lightbulb, HelpCircle } from 'lucide-react';
import { calculatorContent } from '../data/seoContent';
import SchemaMarkup from './SchemaMarkup';

const ToolInfoSection = ({ toolId }) => {
    const content = calculatorContent[toolId]?.['en'];
    if (!content) return null;

    return (
        <div className="mt-16 space-y-12 animate-fade-in pb-12">
            <SchemaMarkup toolId={toolId} content={content} />
            {/* What is it? */}
            <section className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    {content.seo_what_title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic">
                    {content.seo_what_content}
                </p>
            </section>

            {/* Formula Explanation (NEW) */}
            {content.formula_title && (
                <section className="bg-blue-50 dark:bg-blue-900/10 p-8 md:p-12 rounded-[2.5rem] border border-blue-200 dark:border-blue-800">
                    <h2 className="text-3xl font-black text-blue-900 dark:text-blue-100 mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                        {content.formula_title}
                    </h2>
                    <p className="text-lg text-blue-800 dark:text-blue-200 leading-relaxed mb-6">
                        {content.formula_explanation}
                    </p>
                    <div className="bg-white dark:bg-blue-950/50 p-6 rounded-2xl border border-blue-300 dark:border-blue-700 mb-4">
                        <p className="text-2xl font-mono font-bold text-center text-gray-900 dark:text-white">
                            {content.formula_text}
                        </p>
                    </div>
                    <p className="text-blue-700 dark:text-blue-300 italic">
                        {content.formula_example}
                    </p>
                    {content.formula_accuracy && (
                        <p className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                            ✓ {content.formula_accuracy}
                        </p>
                    )}
                </section>
            )}

            {/* Step-by-Step Examples (NEW) */}
            {content.examples && content.examples.length > 0 && (
                <section className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                        {content.example_title}
                    </h2>
                    <div className="space-y-6">
                        {content.examples.map((example, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{example.name}</h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-2"><strong>Stats:</strong> {example.stats}</p>
                                <p className="text-gray-600 dark:text-gray-400 mb-2 font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">{example.calculation}</p>
                                <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-2">{example.result}</p>
                                <p className="text-gray-700 dark:text-gray-300 italic">{example.interpretation}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Comparison Table (NEW) */}
            {content.bmi_ranges && content.bmi_ranges.length > 0 && (
                <section className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                        {content.comparison_table_title}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-900">
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Category</th>
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">BMI Range</th>
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Health Risks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.bmi_ranges.map((range, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                                        <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{range.category}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{range.range}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{range.risk}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Activity Levels Table (for Calorie/TDEE calculators) */}
            {content.activity_levels && content.activity_levels.length > 0 && (
                <section className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                        {content.comparison_table_title}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-900">
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Activity Level</th>
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Multiplier</th>
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.activity_levels.map((level, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                                        <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{level.level}</td>
                                        <td className="p-4 text-emerald-600 dark:text-emerald-400 font-mono font-bold">{level.multiplier}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{level.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Macro Ratios Table */}
            {content.macro_ratios && content.macro_ratios.length > 0 && (
                <section className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                        {content.comparison_table_title}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-900">
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Goal</th>
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">P/C/F Split</th>
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.macro_ratios.map((ratio, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                                        <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{ratio.goal}</td>
                                        <td className="p-4 text-emerald-600 dark:text-emerald-400 font-mono font-bold">{ratio.split}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{ratio.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Ideal Weight Table */}
            {content.ideal_weight_table && content.ideal_weight_table.length > 0 && (
                <section className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                        {content.comparison_table_title}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-900">
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Formula</th>
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Result</th>
                                    <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-600">Context</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.ideal_weight_table.map((row, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                                        <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{row.formula}</td>
                                        <td className="p-4 text-amber-600 dark:text-amber-400 font-bold">{row.result}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{row.context}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Why use it? */}
                <section className="bg-emerald-50 dark:bg-emerald-900/20 p-8 md:p-10 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800/50">
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-6 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-emerald-600" />
                        {content.seo_why_title}
                    </h3>
                    <p className="text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed font-medium">
                        {content.seo_why_content}
                    </p>
                </section>

                {/* How to use */}
                <section className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <ArrowRightCircle className="w-6 h-6 text-emerald-500" />
                        {content.seo_how_title}
                    </h3>
                    <ul className="space-y-4">
                        {content.seo_how_steps?.map((step, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                                <span className="mt-1 w-5 h-5 shrink-0 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </span>
                                {step}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Tips */}
            <section className="bg-linear-to-br from-gray-900 to-slate-900 p-8 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Lightbulb className="w-32 h-32" />
                </div>
                <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-amber-400" />
                    {content.seo_tips_title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {content.seo_tips?.map((tip, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <p className="text-gray-200 leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Additional Info Sections (NEW) */}
            {content.additional_info && content.additional_info.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.additional_info.map((section, idx) => (
                        <section key={idx} className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-amber-500" />
                                {section.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>
            )}

            {/* Related Tools - Internal Linking Strategy */}
            {content.related_tools?.length > 0 && (
                <section className="bg-gray-50 dark:bg-gray-900/50 p-8 md:p-12 rounded-[2.5rem] border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-emerald-500" />
                        Related Health Tools
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {content.related_tools.map((tool, i) => (
                            <a
                                key={i}
                                href={`/?page=${tool.id}`}
                                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                    <ArrowRightCircle className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {tool.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQs */}
            {content.seo_faqs?.length > 0 && (
                <section className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-gray-50 dark:border-gray-700">
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-10 text-center">
                        Frequently Asked Questions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {content.seo_faqs.map((faq, i) => (
                            <div key={i} className="group">
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3 group-hover:text-emerald-500 transition-colors">
                                    <HelpCircle className="w-6 h-6 text-emerald-500" />
                                    {faq.question}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-9 border-l-2 border-transparent group-hover:border-emerald-500 transition-all">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Medical Sources (NEW) */}
            {content.medical_sources && content.medical_sources.length > 0 && (
                <section className="bg-gray-50 dark:bg-gray-900/30 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
                        Medical References & Sources
                    </h4>
                    <ul className="space-y-2">
                        {content.medical_sources.map((source, i) => (
                            <li key={i} className="text-xs text-gray-500 dark:text-gray-500 flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                {source}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default ToolInfoSection;
