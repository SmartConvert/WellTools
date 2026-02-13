import React from 'react';
import { Shield, Lock, FileText, AlertCircle, Scale, Globe, Mail, CheckCircle } from 'lucide-react';

const LegalHeader = ({ title, icon: Icon, color }) => (
    <div className="mb-12 text-center animate-fade-in">
        <div className={`w-20 h-20 bg-linear-to-br ${color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
            <Icon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            {title}
        </h1>
        <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
    </div>
);

const LegalSection = ({ title, children, icon: Icon }) => (
    <section className="mb-12 bg-white dark:bg-gray-800 p-8 rounded-4xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
            {Icon && <Icon className="w-6 h-6 text-emerald-500" />}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {children}
        </div>
    </section>
);

export const TermsOfUsePage = ({ setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-4xl mx-auto">
            <LegalHeader title="Terms of Use" icon={FileText} color="from-blue-500 to-indigo-600" />

            <div className="space-y-8">
                <LegalSection title="1. Acceptance of Terms">
                    <p>By accessing and using WellTools (welltools.online), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                </LegalSection>

                <LegalSection title="2. Use of Calculators & Content" icon={Scale}>
                    <p>The calculators and information provided on WellTools are for <strong>educational and informational purposes only</strong>. They do not constitute professional advice.</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Mathematical estimates should never replace clinical judgment.</li>
                        <li>You agree to use these tools at your own risk.</li>
                        <li>Commercial use of our formulas or logic without attribution is prohibited.</li>
                    </ul>
                </LegalSection>

                <LegalSection title="3. Intellectual Property">
                    <p>All content, including tools, calculators, graphics, and text, is the property of WellTools unless otherwise stated. You may not reproduce, distribute, or create derivative works without explicit written permission.</p>
                </LegalSection>

                <LegalSection title="4. Limitation of Liability">
                    <p>WellTools and its developers shall not be held liable for any damages arising out of the use or inability to use the tools on this website. This includes, but is not limited to, physical injury, data loss, or emotional distress resulting from health estimates.</p>
                </LegalSection>

                <LegalSection title="5. Governing Law">
                    <p>These terms are governed by and construed in accordance with international digital commerce laws, and you irrevocably submit to the exclusive jurisdiction of the courts in your applicable territory.</p>
                </LegalSection>
            </div>

            <button
                onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
                className="mt-12 px-10 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 flex items-center gap-2 mx-auto"
            >
                Return to Homepage
            </button>
        </div>
    </div>
);

export const DisclaimerPage = ({ setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-4xl mx-auto">
            <LegalHeader title="Medical Disclaimer" icon={AlertCircle} color="from-amber-400 to-orange-600" />

            <div className="bg-rose-50 dark:bg-rose-900/10 border-l-8 border-rose-500 p-8 rounded-4xl mb-12 shadow-sm animate-pulse-slow">
                <h2 className="text-2xl font-black text-rose-800 dark:text-rose-400 mb-4 flex items-center gap-3">
                    <AlertCircle className="w-8 h-8" />
                    CRITICAL: NOT MEDICAL ADVICE
                </h2>
                <p className="text-xl text-rose-700 dark:text-rose-300 leading-relaxed font-bold">
                    WellTools is a mathematical estimation platform. We are NOT healthcare professionals. The results from our calculators are statistical approximations and should NOT be used for self-diagnosis or as a basis for medical treatment.
                </p>
            </div>

            <div className="space-y-8">
                <LegalSection title="Mathematical Estimates vs. Clinical Diagnosis">
                    <p>Calculators like BMI, BMR, and Body Fat rely on generalized formulas (such as Mifflin-St Jeor or the Navy Method). These formulas are designed for population-level statistics and do not account for individual muscle mass, bone density, or metabolic nuances.</p>
                </LegalSection>

                <LegalSection title="Professional Consultation Requirement">
                    <p>Always consult with a licensed physician or registered dietitian before:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Starting a new caloric deficit or surplus.</li>
                        <li>Implementing intensive exercise programs.</li>
                        <li>Making significant changes to your cardiovascular habits based on our calculators.</li>
                    </ul>
                </LegalSection>

                <LegalSection title="No Doctor-Patient Relationship">
                    <p>Use of this website does not create a doctor-patient relationship. Communications with WellTools via email or lead forms are for informational support only and are not protected by HIPAA or medical confidentiality laws.</p>
                </LegalSection>

                <LegalSection title="Accuracy and Reliability">
                    <p>While we strive for 100% accuracy in our implementations, we cannot guarantee the absence of software bugs or formula misinterpretations. WellTools is provided "as-is."</p>
                </LegalSection>
            </div>

            <button
                onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
                className="mt-12 px-10 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 flex items-center gap-2 mx-auto"
            >
                Return to Homepage
            </button>
        </div>
    </div>
);

export const PrivacyPolicyPage = ({ setCurrentPage, t }) => (
    <div className="pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-4xl mx-auto">
            <LegalHeader title="Privacy Policy" icon={Shield} color="from-emerald-500 to-teal-600" />

            <div className="space-y-8">
                <LegalSection title="1. Information We Collect" icon={CheckCircle}>
                    <p>We prioritize your privacy. WellTools collects minimal data to provide a better user experience:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Calculator Inputs:</strong> Data entered into calculators (weight, height, etc.) is processed locally and via GTM for aggregate analytics. </li>
                        <li><strong>Email Subscriptions:</strong> If you sign up for our newsletter, we store your email address securely via FormSubmit.</li>
                        <li><strong>Automated Data:</strong> IP addresses, browser types, and usage patterns are collected via Google Analytics 4.</li>
                    </ul>
                </LegalSection>

                <LegalSection title="2. Cookies & Advertising" icon={Globe}>
                    <p>WellTools uses cookies to enhance functionality and serve ads:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Google AdSense:</strong> Uses cookies to serve ads based on your previous visits. You can opt-out via Google Ad Settings.</li>
                        <li><strong>Google Analytics:</strong> Helps us understand site traffic and popular tools.</li>
                        <li><strong>Session Storage:</strong> Used to temporarily store your progress in health tracking tools locally on your device.</li>
                    </ul>
                </LegalSection>

                <LegalSection title="3. GDPR & CCPA Compliance">
                    <p>Depending on your location, you have rights regarding your personal data:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>The right to access the data we hold about you.</li>
                        <li>The right to request deletion of your data (e.g., email list removal).</li>
                        <li>The right to opt-out of personalized advertising.</li>
                    </ul>
                </LegalSection>

                <LegalSection title="4. Data Security" icon={Lock}>
                    <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure. We encourage you to use the site over HTTPS (which is enforced).</p>
                </LegalSection>

                <LegalSection title="5. Contact Us" icon={Mail}>
                    <p>For any questions regarding this Privacy Policy, please contact us at:</p>
                    <p className="font-bold text-emerald-600">contact@welltools.online</p>
                </LegalSection>
            </div>

            <button
                onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
                className="mt-12 px-10 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 flex items-center gap-2 mx-auto"
            >
                Return to Homepage
            </button>
        </div>
    </div>
);
