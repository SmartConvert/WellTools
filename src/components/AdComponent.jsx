import React, { useEffect } from 'react';

const AdComponent = ({ slot }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    return (
        <div className="my-8 w-full flex justify-center overflow-hidden min-h-[140px] md:min-h-[280px] bg-gray-800/20 rounded-2xl border border-dashed border-gray-700 flex-col items-center justify-center p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Advertisement</p>
            {/* AdSense Unit Code */}
            <ins className="adsbygoogle"
                style={{ display: 'block', width: '100%', textAlign: 'center', minHeight: '90px' }}
                data-ad-client="ca-pub-4160895122812433"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdComponent;
