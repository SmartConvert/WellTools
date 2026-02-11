import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Users } from 'lucide-react';

const EditorialPolicyPage = ({ setCurrentPage, t }) => {
    return (
        <div className="bg-white dark:bg-gray-900 pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
                        Editorial Policy
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Our commitment to accuracy, transparency, and trustworthy health information
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Last Updated: February 2026
                    </p>
                </header>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {/* Mission */}
                    <section className="mb-12 p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-start gap-4 mb-4">
                            <Users className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Our Mission</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    WellTools is dedicated to providing free, accurate, and accessible health calculators and wellness information. We believe everyone deserves access to reliable health tools without barriers or hidden costs.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Content Standards */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Content Standards</h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Evidence-Based Information</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            All health information is backed by peer-reviewed research, medical guidelines, and authoritative health organizations. We cite sources from reputable institutions including WHO, CDC, NIH, and published medical journals.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Expert Review Process</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            Our content is created by health and wellness professionals with backgrounds in nutrition, exercise science, and public health. All calculators use validated formulas from established medical research.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Regular Updates</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            We review and update our content regularly to reflect the latest scientific consensus and medical guidelines. All articles display "Last Updated" dates for transparency.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Fact-Checking Process */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Fact-Checking Process</h2>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                            <ol className="space-y-4 text-gray-700 dark:text-gray-300">
                                <li className="flex gap-3">
                                    <span className="font-bold text-emerald-600 shrink-0">1.</span>
                                    <span><strong>Source Verification:</strong> All claims are cross-referenced with at least 2-3 authoritative sources</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-emerald-600 shrink-0">2.</span>
                                    <span><strong>Formula Validation:</strong> Calculator formulas are verified against published medical literature</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-emerald-600 shrink-0">3.</span>
                                    <span><strong>Peer Review:</strong> Content is reviewed by team members with relevant health expertise</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-emerald-600 shrink-0">4.</span>
                                    <span><strong>User Testing:</strong> Calculators are tested for accuracy and usability before publication</span>
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Medical Disclaimer */}
                    <section className="mb-12">
                        <div className="p-8 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border-2 border-amber-200 dark:border-amber-900/30">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Medical Disclaimer</h2>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                        WellTools provides educational health information and calculators for informational purposes only. Our tools and content are <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>.
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Always consult with a qualified healthcare provider before making any health decisions, starting new exercise programs, or changing your diet. Never disregard professional medical advice or delay seeking it because of information from WellTools.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Corrections Policy */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Corrections Policy</h2>
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                We are committed to accuracy and transparency. If you identify an error in our content:
                            </p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>Contact us immediately at <a href="mailto:contact@welltools.online" className="text-emerald-600 hover:underline font-semibold">contact@welltools.online</a></span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>We will investigate and correct verified errors within 48 hours</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>Significant corrections will be noted at the top of the affected article</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Transparency */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Transparency & Conflicts of Interest</h2>
                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <p className="leading-relaxed">
                                <strong>Advertising:</strong> We display contextual advertisements to support our free services. Ads are clearly labeled and do not influence our editorial content.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Affiliate Links:</strong> Some product recommendations may include affiliate links. We only recommend products we believe provide value, and affiliate relationships never compromise our editorial integrity.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Independence:</strong> WellTools maintains editorial independence. No external party influences our content, calculator formulas, or health recommendations.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="p-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white">
                        <h2 className="text-2xl font-black mb-4">Questions About Our Editorial Policy?</h2>
                        <p className="text-emerald-50 mb-6">
                            We welcome feedback and questions about our content standards and editorial practices.
                        </p>
                        <button
                            onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }}
                            className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-gray-100 transition-all"
                        >
                            Contact Us
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default EditorialPolicyPage;
