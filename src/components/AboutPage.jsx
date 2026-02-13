import React from 'react';
import { Shield, CheckCircle, Users, Award, BookOpen, Heart } from 'lucide-react';

const AboutPage = ({ setCurrentPage, t }) => (
    <div className="bg-white dark:bg-gray-900 pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <header className="mb-20 text-center">
                <div className="w-24 h-24 bg-linear-to-br from-emerald-500 to-teal-600 rounded-4xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <Heart className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                    Making Health <span className="text-emerald-500">Accessible</span> for Everyone
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    WellTools is a premier health authority providing scientifically-validated calculators, evidence-based wellness insights, and personalized nutrition tools.
                </p>
            </header>

            {/* Mission & Trust Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-10 md:p-12 rounded-5xl border border-emerald-100 dark:border-emerald-800/30">
                    <Award className="w-12 h-12 text-emerald-600 mb-6" />
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        We are on a mission to democratize health data. By providing free, professional-grade diagnostic tools and research-backed content, we empower individuals to take control of their physical and mental well-being.
                    </p>
                    <div className="space-y-4 font-bold text-gray-900 dark:text-white">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span>100% Free Resources</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span>No Account Needed</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span>Privacy-First Design</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Why Thousands Trust WellTools</h2>
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="shrink-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center font-black text-emerald-600 text-xl">1</div>
                            <div>
                                <h3 className="text-xl font-black mb-2 dark:text-white">Scientific Accuracy</h3>
                                <p className="text-gray-600 dark:text-gray-400">Our calculators use the same formulas used by the WHO, CDC, and National Institutes of Health.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center font-black text-emerald-600 text-xl">2</div>
                            <div>
                                <h3 className="text-xl font-black mb-2 dark:text-white">Expert Oversite</h3>
                                <p className="text-gray-600 dark:text-gray-400">Content is developed in collaboration with fitness specialists, nutritionists, and holistic health coaches.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center font-black text-emerald-600 text-xl">3</div>
                            <div>
                                <h3 className="text-xl font-black mb-2 dark:text-white">Editorial Integrity</h3>
                                <p className="text-gray-600 dark:text-gray-400">Every article follows a rigorous fact-checking process and is cited with primary medical sources.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="mb-24 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                    <div className="relative rounded-5xl overflow-hidden shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-700">
                        {/* Placeholder for a team/story image - using a gradient for now */}
                        <div className="aspect-square bg-linear-to-br from-gray-900 to-emerald-900 flex items-center justify-center p-12 text-center">
                            <p className="text-emerald-100/50 font-black text-3xl">Where Wellness Meets Data</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">Our Story</h2>
                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        <p>
                            It started with a simple frustration: <strong className="text-emerald-600 dark:text-emerald-400">confusion.</strong>
                        </p>
                        <p>
                            In 2024, our founder Mark was trying to optimize his own health but found himself drowning in contradictory advice, paywalled calculators, and overly complex medical journals. He realized that while the science existed, it wasn't accessible to the people who needed it most.
                        </p>
                        <p>
                            WellTools was born from a desire to bridge that gap. We assembled a team of developers, nutritionists, and doctors to build tools that aren't just accurate, but <em>intuitive</em>.
                        </p>
                        <p>
                            Today, we serve thousands of users daily, proving that when you give people the right tools, they can achieve incredible things.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="mb-24">
                <div className="text-center mb-16">
                    <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">The WellTools Health Team</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Combining technology with medical science for better wellness outcomes.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Mark Stevens',
                            role: 'Founder & Fitness Architect',
                            bio: 'Certified strength specialist with 15+ years experience in biomechanics.',
                            icon: < Award className="w-6 h-6 text-emerald-500" />
                        },
                        {
                            name: 'Dr. Sarah Johnson',
                            role: 'Head of Nutrition',
                            bio: 'Registered Dietitian (RD) specializing in metabolism and weight management.',
                            icon: < BookOpen className="w-6 h-6 text-emerald-500" />
                        },
                        {
                            name: 'Elena Rodriguez',
                            role: 'Health Editor',
                            bio: 'Holistic health coach focused on making medical research easy to understand.',
                            icon: < Shield className="w-6 h-6 text-emerald-500" />
                        }
                    ].map((member, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-4xl shadow-xl border border-gray-50 dark:border-gray-700 text-center">
                            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                {member.icon}
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{member.name}</h3>
                            <p className="text-emerald-600 font-black text-sm uppercase tracking-widest mb-4">{member.role}</p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Editorial Standard Cta */}
            <section className="bg-gray-900 dark:bg-emerald-900/10 rounded-5xl p-12 md:p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <h2 className="text-4xl font-black mb-6">Our Commitment to Transparency</h2>
                <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                    We believe in full transparency regarding how we source information, who writes our content, and how we keep our calculators 100% accurate.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                        onClick={() => { setCurrentPage('editorial-policy'); window.scrollTo(0, 0); }}
                        className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-lg shadow-xl transition-all"
                    >
                        View Editorial Policy
                    </button>
                    <button
                        onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }}
                        className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-lg backdrop-blur-md border border-white/20 transition-all"
                    >
                        Contact Health Team
                    </button>
                </div>
            </section>

            <button
                onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
                className="mt-20 text-gray-500 hover:text-emerald-600 font-black flex items-center gap-2 mx-auto transition-all group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>
        </div>
    </div>
);

const ChevronLeft = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
);

export default AboutPage;
