import React from 'react';
import { AlertTriangle } from 'lucide-react';

const MedicalDisclaimer = ({ setCurrentPage }) => {
    return (
        <div className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 underline decoration-amber-500/30">Medical Disclaimer</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        The results provided by this calculator are for informational and educational purposes only. They are not a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                    <button
                        onClick={() => { setCurrentPage('disclaimer'); window.scrollTo(0, 0); }}
                        className="text-sm font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
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
