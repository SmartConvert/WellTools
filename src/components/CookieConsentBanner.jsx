import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieConsentBanner = ({ setCurrentPage }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-100 p-4 sm:p-6 sm:pb-8 md:p-8 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <button
                    onClick={declineCookies}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
                    aria-label="Close banner"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                    <div className="shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">We Value Your Privacy</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pr-8 md:pr-0">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                            {' '}
                            <button
                                onClick={() => {
                                    setIsVisible(false);
                                    window.scrollTo(0, 0);
                                    setCurrentPage('cookie-policy');
                                }}
                                className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold whitespace-nowrap"
                            >
                                Read Cookie Policy
                            </button>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                        <button
                            onClick={declineCookies}
                            className="px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors w-full sm:w-auto text-center"
                        >
                            Decline
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-lg shadow-emerald-600/20 w-full sm:w-auto text-center"
                        >
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsentBanner;
