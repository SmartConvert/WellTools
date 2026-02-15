import React from 'react';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage = ({ setCurrentPage, t }) => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full mb-6">
                <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                404
            </h1>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6">
                Page Not Found
            </h2>
            <p className="max-w-md text-gray-600 dark:text-gray-400 mb-8 text-lg">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button
                onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
                className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20"
            >
                <Home className="w-5 h-5" />
                Go Back Home
            </button>
        </div>
    );
};

export default NotFoundPage;
