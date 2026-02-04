import React from 'react';
import { BookOpen, Activity, Shield, Award, CheckCircle, ExternalLink } from 'lucide-react';

const HowItWorksPage = ({ setCurrentPage }) => {
    const formulas = [
        {
            name: "Mifflin-St Jeor Equation",
            use: "BMR Calculator",
            formula: "Men: BMR = 10×weight(kg) + 6.25×height(cm) - 5×age(y) + 5\nWomen: BMR = 10×weight(kg) + 6.25×height(cm) - 5×age(y) - 161",
            accuracy: "±10% for most individuals",
            source: "Mifflin et al. (1990), American Journal of Clinical Nutrition"
        },
        {
            name: "Harris-Benedict Formula",
            use: "Calorie Calculator (TDEE)",
            formula: "TDEE = BMR × Activity Multiplier",
            accuracy: "Validated across diverse populations",
            source: "Harris & Benedict (1918), revised by Roza & Shizgal (1984)"
        },
        {
            name: "U.S. Navy Body Fat Method",
            use: "Body Fat Percentage Calculator",
            formula: "Uses neck, waist, height measurements for males; adds hip for females",
            accuracy: "±3-4% compared to DEXA scans",
            source: "Hodgdon & Beckett (1984), Naval Health Research Center"
        },
        {
            name: "Epley Formula",
            use: "One Rep Max (1RM) Calculator",
            formula: "1RM = weight × (1 + reps/30)",
            accuracy: "Most accurate for 2-10 rep ranges",
            source: "Epley, Boyd (1985)"
        },
        {
            name: "BMI Formula",
            use: "BMI Calculator",
            formula: "BMI = weight(kg) / height(m)²",
            accuracy: "Screening tool, not diagnostic",
            source: "Quetelet (1832), WHO classification (1995)"
        }
    ];

    const qualityStandards = [
        { icon: <CheckCircle className="w-6 h-6" />, title: "Peer-Reviewed Sources", desc: "Every formula is backed by published scientific research" },
        { icon: <CheckCircle className="w-6 h-6" />, title: "Double-Checked Calculations", desc: "All algorithms tested against medical standards" },
        { icon: <CheckCircle className="w-6 h-6" />, title: "Regular Updates", desc: "We monitor new research and update formulas accordingly" },
        { icon: <CheckCircle className="w-6 h-6" />, title: "Transparent Limitations", desc: "We clearly state what each calculator can and cannot do" }
    ];

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                        How Our Calculators Are Built
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Transparency, accuracy, and science are at the heart of everything we do. Here's exactly how WellTools delivers reliable health insights.
                    </p>
                </div>

                {/* Scientific Formulas Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Scientific Formulas We Use</h2>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                        Every calculator on WellTools uses <strong>medically-accepted, peer-reviewed formulas</strong>. We don't guess, and we don't use proprietary "black box" algorithms. Here's exactly what powers each tool:
                    </p>

                    <div className="space-y-6">
                        {formulas.map((formula, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{formula.name}</h3>
                                        <p className="text-emerald-600 dark:text-emerald-400 font-semibold">Used in: {formula.use}</p>
                                    </div>
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-xl text-sm text-emerald-700 dark:text-emerald-300 font-semibold whitespace-nowrap">
                                        {formula.accuracy}
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl mb-4">
                                    <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">{formula.formula}</pre>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    <strong>Source:</strong> {formula.source}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why These Formulas */}
                <section className="mb-20 bg-blue-50 dark:bg-blue-900/10 p-8 md:p-12 rounded-3xl border border-blue-200 dark:border-blue-800">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why These Formulas?</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We chose these formulas based on three criteria:
                        </p>
                        <ol className="text-gray-700 dark:text-gray-300 space-y-3">
                            <li><strong>Scientific Validation:</strong> Each formula has been validated through peer-reviewed research and is widely accepted in medical and nutrition communities.</li>
                            <li><strong>Practical Accuracy:</strong> While no calculator is perfect, these formulas provide the best balance of accuracy and usability for general populations.</li>
                            <li><strong>Transparency:</strong> We use established, public formulas—not proprietary "secret sauce"—so you can verify our calculations independently.</li>
                        </ol>
                        <p className="text-gray-700 dark:text-gray-300 mt-6">
                            <strong>Important:</strong> All health calculators have limitations. BMI, for example, doesn't account for muscle mass. Body fat estimates vary by ±3-4%. These tools are <em>screening tools</em>, not diagnostic instruments.
                        </p>
                    </div>
                </section>

                {/* Quality Standards */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Quality Standards</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {qualityStandards.map((standard, idx) => (
                            <div key={idx} className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <div className="text-emerald-600 dark:text-emerald-400 shrink-0">{standard.icon}</div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{standard.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{standard.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Medical Disclaimer */}
                <section className="mb-12 bg-amber-50 dark:bg-amber-900/10 p-8 md:p-12 rounded-3xl border-2 border-amber-300 dark:border-amber-700">
                    <div className="flex gap-4 mb-6">
                        <Shield className="w-10 h-10 text-amber-600 dark:text-amber-400 shrink-0" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Medical Disclaimer</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        <p className="mb-4">
                            <strong>⚠️ For Educational Purposes Only</strong>
                        </p>
                        <p className="mb-4">
                            The calculators and information provided on WellTools are for <strong>educational and informational purposes only</strong>. They are not intended to diagnose, treat, cure, or prevent any disease or health condition.
                        </p>
                        <p className="mb-4">
                            <strong>Always consult with a qualified healthcare professional</strong> before making any decisions related to your health, diet, exercise, or medical treatment. Individual results may vary, and what works for one person may not work for another.
                        </p>
                        <p>
                            WellTools does not provide medical advice. If you have specific health concerns or questions, please seek the guidance of a licensed physician, registered dietitian, or other healthcare provider.
                        </p>
                    </div>
                </section>

                {/* About the Team */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About the WellTools Team</h2>
                    <div className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-3xl border border-emerald-200 dark:border-emerald-800">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            WellTools was created by health enthusiasts who were frustrated by inaccurate, ad-heavy, and paywall-locked calculators. Our mission is simple: <strong>make accurate, science-backed health tools accessible to everyone, completely free.</strong>
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            We're committed to transparency, accuracy, and continuous improvement. If you have feedback or spot an error, please let us know—we're always learning and evolving.
                        </p>
                    </div>
                </section>

                {/* Back Button */}
                <button
                    onClick={() => setCurrentPage('home')}
                    className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default HowItWorksPage;
