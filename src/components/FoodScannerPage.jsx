import React, { useState, useRef, useEffect } from 'react';

function FoodScannerPage() {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    
    // Camera state and refs
    const [isCameraMode, setIsCameraMode] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Cleanup camera stream on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
            return;
        }
        setError(null);
        setResult(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraMode(false);
    };

    const startCamera = async () => {
        setIsCameraMode(true);
        setError(null);
        setResult(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            streamRef.current = stream;
            // Delay assignment slightly to ensure video element is rendered
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 50);
        } catch (err) {
            console.error("Camera access error:", err);
            setIsCameraMode(false);
            setError("Unable to access camera. Please check your browser permissions.");
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            setImagePreview(dataUrl);
            setImageBase64(dataUrl);
            stopCamera();
            
            // Auto submit captured photo
            handleScan(dataUrl);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleScan = async (imageToScan = null) => {
        const image = typeof imageToScan === 'string' ? imageToScan : imageBase64;
        if (!image) return;
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/scan-meal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageBase64: image
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle missing API key or quota exceeded
                throw new Error(data.error || 'Failed to scan image. Please try again.');
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center bg-slate-900 text-white font-sans pt-28 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-emerald-400 tracking-tight pb-2">
                        AI Meal Scanner
                    </h1>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                        Snap a photo of your plate and let our AI vision engine instantly calculate your macros and calories.
                    </p>
                </div>

                {/* Upload Section */}
                <div 
                    className={`relative w-full border-2 border-dashed rounded-3xl p-8 transition-all duration-300 ${imagePreview ? 'border-teal-500/50 bg-slate-800/50' : 'border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/30'}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleImageChange}
                        id="file-upload"
                    />

                    {isCameraMode ? (
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-black flex items-center justify-center min-h-[240px]">
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                                <button 
                                    onClick={capturePhoto} 
                                    className="flex-1 py-3.5 rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-105 transition-all"
                                >
                                    Snap Photo
                                </button>
                                <button 
                                    onClick={stopCamera} 
                                    className="flex-1 py-3.5 rounded-xl bg-slate-700 text-white font-bold text-lg hover:bg-slate-600 transition-all border border-slate-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : !imagePreview ? (
                        <div className="flex flex-col items-center justify-center space-y-6 py-8">
                            <div className="w-20 h-20 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-medium text-slate-200">Select an option to scan your meal</p>
                                <p className="text-sm text-slate-500 mt-2">JPG, PNG or WEBP from your phone or PC</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mt-4">
                                <button 
                                    onClick={startCamera}
                                    className="flex-1 py-3.5 rounded-xl bg-slate-800 border border-slate-600 text-white font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Take Photo
                                </button>
                                <button 
                                    onClick={() => fileInputRef.current.click()}
                                    className="flex-1 py-3.5 rounded-xl bg-slate-800 border border-slate-600 text-white font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Upload Image
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="relative w-full max-w-sm h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                <img src={imagePreview} alt="Meal Preview" className="w-full h-full object-cover group-hover:opacity-60 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <p className="text-white font-semibold bg-slate-900/80 px-4 py-2 rounded-lg">Change Image</p>
                                </div>

                                {isLoading && (
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                                        <div className="flex flex-col items-center space-y-4 w-full px-8">
                                            {/* Glowing scanning line animation */}
                                            <div className="w-full h-1 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.8)] animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                                            <p className="text-teal-400 font-semibold animate-pulse">AI is scanning ingredients...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <button 
                                onClick={handleScan}
                                disabled={isLoading}
                                className="w-full max-w-sm px-8 py-3.5 rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {isLoading ? 'Extracting Macros...' : 'Analyze Meal'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-center justify-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="font-medium text-sm md:text-base">{error}</p>
                    </div>
                )}

                {/* Results Section */}
                {result && !isLoading && (
                    <div className="bg-slate-800/40 border border-slate-700 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-slate-700/50 pb-6 mb-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white capitalize leading-tight">
                                    {result.foodName || 'Analyzed Meal'}
                                </h2>
                                <div className="flex items-center mt-3">
                                    <span className="flex h-3 w-3 relative mr-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                                    </span>
                                    <p className="text-slate-400 text-sm font-medium">Verified by Gemini Vision</p>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 text-left md:text-right bg-slate-900/50 md:bg-transparent rounded-2xl p-4 md:p-0 border border-slate-700/50 md:border-transparent">
                                <p className="text-5xl font-black bg-clip-text text-transparent bg-linear-to-br from-teal-400 to-emerald-400">
                                    {result.calories}
                                </p>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Total Calories</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                            {/* Protein */}
                            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Protein</p>
                                <p className="text-4xl font-black text-white">{result.protein}<span className="text-xl text-slate-500 font-medium">g</span></p>
                            </div>
                            {/* Carbs */}
                            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
                                <p className="text-sm font-semibold text-yellow-500 uppercase tracking-wider mb-2">Carbs</p>
                                <p className="text-4xl font-black text-white">{result.carbs}<span className="text-xl text-slate-500 font-medium">g</span></p>
                            </div>
                            {/* Fats */}
                            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
                                <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">Fats</p>
                                <p className="text-4xl font-black text-white">{result.fats}<span className="text-xl text-slate-500 font-medium">g</span></p>
                            </div>
                        </div>

                        {result.ingredients && result.ingredients.length > 0 && (
                            <div className="bg-slate-900/30 rounded-2xl p-6 border border-slate-700/30">
                                <h3 className="text-sm uppercase tracking-wider font-bold mb-4 text-slate-400">Detected Ingredients</h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.ingredients.map((ingredient, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-slate-800 text-slate-200 shadow-sm border border-slate-600 rounded-full text-sm font-medium">
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* SEO Content: How AI Works */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 md:p-10 shadow-lg mt-8 mb-4 hover:border-teal-500/30 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        How Does <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-400">AI</span> Calculate Calories?
                    </h2>
                    <div className="space-y-4 text-slate-300 text-lg leading-relaxed font-medium">
                        <p>
                            Our <strong>Food Scanner</strong> relies on the latest <strong>Artificial Intelligence</strong> and Computer Vision technologies to analyze meal photos with extreme precision. The moment you snap a photo of your food, the system performs a visual scan to recognize the various ingredients within the dish, identify the food type, and estimate portion sizes based on visual dimensions.
                        </p>
                        <p>
                            Once the ingredients are identified, the system cross-references this data with massive and comprehensive nutritional databases to extract the precise <strong>nutritional value</strong> for each component. It calculates total <strong>calories</strong>, as well as the breakdown of essential macronutrients: <strong>Protein</strong>, <strong>Carbohydrates</strong>, and <strong>Fats</strong>.
                        </p>
                        <p>
                            This advanced technology guarantees instant and reliable results, making it incredibly simple to <strong>track your diet</strong>, manage your daily caloric intake, and achieve your health objectives—whether that's weight loss, maintaining fitness, or building muscle—efficiently and without the hassle of manually entering ingredients.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodScannerPage;
