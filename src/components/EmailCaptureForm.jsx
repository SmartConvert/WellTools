import React, { useState } from 'react';
import { Mail, CheckCircle, X } from 'lucide-react';

const EmailCaptureForm = ({ position = 'modal' }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            // Using FormSubmit.co for simple form handling
            const response = await fetch('https://formsubmit.co/ajax/Badissbouchakour@hotmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    _subject: 'New WellTools Health Report Request',
                    _template: 'table'
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
                setEmail('');
                // Auto-hide after 3 seconds
                setTimeout(() => setIsVisible(false), 3000);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    if (!isVisible) return null;

    if (isSubmitted) {
        return (
            <div className={`${position === 'banner' ? 'fixed bottom-0 left-0 right-0 z-50' : ''} bg-emerald-500 p-4 md:p-6 shadow-2xl border-t-4 border-emerald-600 animate-slide-up`}>
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <CheckCircle className="w-8 h-8 text-white shrink-0" />
                        <div>
                            <h3 className="text-white font-bold text-xl">Thanks! Check your inbox!</h3>
                            <p className="text-emerald-100 text-sm">Your personalized health report is on the way 🎉</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-white hover:bg-emerald-600 p-2 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>
        );
    }

    if (position === 'banner') {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-linear-to-r from-emerald-600 to-teal-600 p-4 md:p-6 shadow-2xl border-t-4 border-emerald-700 animate-slide-up">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 text-white hover:bg-emerald-700 p-2 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-white">
                            <h3 className="font-bold text-xl md:text-2xl mb-1">Get Your Free Personalized Health Report</h3>
                            <p className="text-emerald-100 text-sm md:text-base">Join 10,000+ users taking control of their health</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-xl text-gray-900 flex-1 md:w-64 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-gray-100 transition-all whitespace-nowrap"
                            >
                                Get Report
                            </button>
                        </form>
                    </div>
                    {error && <p className="text-red-200 text-sm mt-2">{error}</p>}
                </div>
            </div>
        );
    }

    // Inline section variant
    return (
        <div className="bg-linear-to-br from-emerald-500 to-teal-600 p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-emerald-600">
            <div className="max-w-2xl mx-auto text-center">
                <Mail className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                    Get Your Free Personalized Health Report
                </h2>
                <p className="text-emerald-100 text-lg md:text-xl mb-8">
                    Receive custom insights, meal plans, and expert tips delivered straight to your inbox. No spam, ever.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="px-6 py-4 rounded-2xl text-gray-900 flex-1 focus:outline-none focus:ring-4 focus:ring-white text-lg"
                    />
                    <button
                        type="submit"
                        className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        Get My Report
                    </button>
                </form>
                {error && <p className="text-red-200 text-sm mt-4">{error}</p>}
                <p className="text-emerald-100 text-xs mt-4">
                    💚 Trusted by 10,000+ health enthusiasts. Unsubscribe anytime.
                </p>
            </div>
        </div>
    );
};

export default EmailCaptureForm;
