import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

const ExitIntentPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        const shown = sessionStorage.getItem('exitIntentShown');
        if (shown) {
            setHasShown(true);
            return;
        }

        const handleMouseLeave = (e) => {
            // Trigger when mouse leaves viewport from top
            if (e.clientY <= 0 && !hasShown && !isVisible) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('exitIntentShown', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasShown, isVisible]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch('https://formsubmit.co/ajax/Badissbouchakour@hotmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    _subject: 'Exit Intent - Free Health Guide Request',
                    _template: 'table'
                })
            });

            setIsSubmitted(true);
            setTimeout(() => setIsVisible(false), 3000);
        } catch (err) {
            console.error('Submission error:', err);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl max-w-lg w-full mx-4 p-8 md:p-12 animate-scale-in">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                {!isSubmitted ? (
                    <>
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Gift className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-4">
                            Wait! Don't Leave Empty-Handed
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 text-center text-lg mb-8">
                            Get your <strong>FREE Complete Health Metrics Guide</strong> with personalized tips, meal plans, and expert advice delivered to your inbox.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none text-lg"
                            />

                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                            >
                                Send Me The Free Guide
                            </button>
                        </form>

                        <p className="text-gray-400 text-xs text-center mt-4">
                            💚 Join 10,000+ health enthusiasts. Unsubscribe anytime.
                        </p>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                            Check Your Inbox!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Your free guide is on the way 🎉
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExitIntentPopup;
