import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { testimonials, testimonialDisclaimer } from '../data/testimonials';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    // Show 3 testimonials at a time on desktop, 1 on mobile
    const visibleTestimonials = [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
        testimonials[(currentIndex + 2) % testimonials.length]
    ];

    return (
        <div className="mb-20 lg:mb-28">
            <div className="text-center mb-12 px-4">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                    Loved by <span className="text-emerald-500">Thousands</span> of Users
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                    See how WellTools is helping people achieve their health goals every day.
                </p>
                <button
                    onClick={() => setShowDisclaimer(!showDisclaimer)}
                    className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2 mx-auto transition-colors"
                    aria-label="Show testimonials disclaimer"
                >
                    <Info className="w-4 h-4" />
                    Testimonials Disclaimer
                </button>
                {showDisclaimer && (
                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-300 max-w-2xl mx-auto">
                        {testimonialDisclaimer}
                    </div>
                )}
            </div>

            <div className="relative px-4">
                {/* Navigation Buttons */}
                <button
                    onClick={prev}
                    aria-label="Previous testimonials"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white transition-all hover:scale-110"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={next}
                    aria-label="Next testimonials"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white transition-all hover:scale-110"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-12">
                    {visibleTestimonials.map((testimonial, idx) => (
                        <div
                            key={testimonial.id}
                            className={`bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${idx === 1 ? 'md:scale-105 md:z-10' : ''
                                } ${idx !== 0 ? 'hidden md:block' : ''}`}
                        >
                            {/* Avatar & Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-5xl">{testimonial.avatar}</div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{testimonial.location}</p>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                "{testimonial.text}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Indicators */}
                <div className="flex gap-2 justify-center mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to testimonial set ${index + 1}`}
                            className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-300 dark:bg-gray-600'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
