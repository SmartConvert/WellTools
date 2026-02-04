import React, { useEffect, useRef, useState } from 'react';

const AdComponent = ({ slot, minHeight = '250px' }) => {
    const adRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [adLoaded, setAdLoaded] = useState(false);

    useEffect(() => {
        // Lazy load ads using Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true);
                    }
                });
            },
            { rootMargin: '200px' } // Load ads 200px before they come into view
        );

        if (adRef.current) {
            observer.observe(adRef.current);
        }

        return () => {
            if (adRef.current) {
                observer.unobserve(adRef.current);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (isVisible && !adLoaded) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setAdLoaded(true);
            } catch (e) {
                // Silently fail in production
            }
        }
    }, [isVisible, adLoaded]);

    return (
        <div
            ref={adRef}
            className="my-8 w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-4 overflow-hidden"
            style={{ minHeight }}
            role="complementary"
            aria-label="Advertisement"
        >
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Advertisement</p>
            {isVisible && (
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', textAlign: 'center', minHeight: '90px' }}
                    data-ad-client="ca-pub-4160895122812433"
                    data-ad-slot={slot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
            )}
        </div>
    );
};

export default AdComponent;

