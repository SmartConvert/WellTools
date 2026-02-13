import React from 'react';
import { AlertTriangle } from 'lucide-react';

const MedicalDisclaimer = ({ setCurrentPage }) => {
    return (
        <div className="mt-12 p-8 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border-2 border-amber-200/50 dark:border-amber-900/30 shadow-sm">
            <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">Important Medical Disclaimer</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        The results provided by WellTools are mathematical estimates for informational purposes only. They <strong>do not replace professional medical advice</strong>, diagnosis, or treatment by a licensed healthcare provider.
                    </p>
                    <button
                        onClick={() => { setCurrentPage('disclaimer'); window.scrollTo(0, 0); }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 text-sm"
                    >
                        Read Full Disclaimer
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicalDisclaimer;
