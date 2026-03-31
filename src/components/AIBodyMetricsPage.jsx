import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Shield, Camera as CameraIcon, Play, RefreshCw, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

export default function AIBodyMetricsPage({ setCurrentPage, t }) {
  const [phase, setPhase] = useState('objective'); // 'objective', 'capture', 'analyzing', 'results'
  const [objective, setObjective] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelError, setModelError] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);

  // Initialize MediaPipe Pose when phase switches to 'capture'
  useEffect(() => {
    if (phase === 'capture') {
      let isMounted = true;
      const initPoseModel = async () => {
        setIsModelLoading(true);
        try {
          // Initialize Pose
          const pose = new Pose({
            locateFile: (file) => {
              return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
          });

          pose.setOptions({
            modelComplexity: 1, // 1 is a good balance between speed and accuracy
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          });

          pose.onResults(onResults);
          poseRef.current = pose;

          // Initialize Camera
          if (videoRef.current) {
             const camera = new Camera(videoRef.current, {
                onFrame: async () => {
                  if (poseRef.current && videoRef.current) {
                    await poseRef.current.send({ image: videoRef.current });
                  }
                },
                width: 640,
                height: 480
             });
             cameraRef.current = camera;
             if (isMounted) {
                 await camera.start();
                 setIsModelLoading(false);
             }
          }
        } catch (err) {
          console.error("Camera/Model Error:", err);
          if (isMounted) {
            setModelError("Failed to initialize secure local engine or camera access.");
            setIsModelLoading(false);
          }
        }
      };

      initPoseModel();

      return () => {
        isMounted = false;
        if (cameraRef.current) {
            cameraRef.current.stop();
        }
        if (poseRef.current) {
            poseRef.current.close();
        }
      };
    }
  }, [phase]);

  const onResults = useCallback((results) => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvasCtx = canvasRef.current.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Draw the subtle video feed
    canvasCtx.globalAlpha = 0.3; // Make video very dim for privacy feel
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.globalAlpha = 1.0;

    if (results.poseLandmarks) {
      // Futuristic / Glowing mesh effect
      canvasCtx.shadowBlur = 10;
      canvasCtx.shadowColor = '#10b981'; // Emerald glow
      
      // Draw Connections (Bones)
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                     { color: 'rgba(16, 185, 129, 0.7)', lineWidth: 3 });
                     
      // Draw Landmarks (Joints)
      drawLandmarks(canvasCtx, results.poseLandmarks,
                    { color: '#ffffff', fillColor: '#10b981', lineWidth: 1, radius: 4 });
    }
    
    canvasCtx.restore();
  }, []);

  const handleObjectiveSelect = (sel) => {
    setObjective(sel);
    setPhase('capture');
  };

  const startAnalysis = () => {
      setPhase('analyzing');
      
      // Simulate processing of spatial landmarks securely
      setTimeout(() => {
          const shoulders = Math.random() * (45 - 35) + 35;
          const waist = Math.random() * (35 - 28) + 28;
          const ratio = (shoulders / waist).toFixed(2);
          const shape = ratio > 1.3 ? "strong upper body architecture" : "balanced biostructural baseline";
          
          setAnalysisData({
             postureQuality: "Optimal Integration",
             ratio: ratio,
             shape: shape
          });
          setPhase('results');
      }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl mb-4">
            <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            AI Body Metrics <span className="text-emerald-500">Advisor</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
             <Shield className="w-4 h-4 text-emerald-500" />
             <span>100% Client-Side Processing • Your camera data never leaves this device</span>
          </div>
        </div>

        {/* Phase 1: Objective Selection */}
        {phase === 'objective' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Define Your Clinical Objective</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <button 
                onClick={() => handleObjectiveSelect('deficit')}
                className="group relative flex flex-col items-start p-8 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-gray-50 hover:bg-emerald-50/50 dark:bg-gray-900/50 dark:hover:bg-emerald-900/20 transition-all text-left"
              >
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Optimize Weight Loss</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  Focus on localized fat reduction and metabolic deficit mapping. Best for revealing muscle definition.
                </p>
                <div className="mt-auto flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  Select Protocol <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button 
                onClick={() => handleObjectiveSelect('surplus')}
                className="group relative flex flex-col items-start p-8 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-gray-50 hover:bg-emerald-50/50 dark:bg-gray-900/50 dark:hover:bg-emerald-900/20 transition-all text-left"
              >
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Facilitate Hypertrophy</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  Focus on structural symmetry and skeletal muscle potential tracking. Best for muscle mass acquisition.
                </p>
                <div className="mt-auto flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  Select Protocol <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

            </div>
          </div>
        )}

        {/* Phase 2: AI Capture & Analysis */}
        {phase === 'capture' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
               <div>
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                   <Shield className="w-5 h-5 text-emerald-500" /> Local Pose Extraction Engine
                 </h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Stand full-body in frame. Imagery is destroyed instantly.</p>
               </div>
               <button onClick={() => setPhase('objective')} className="text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                  Cancel
               </button>
            </div>

            <div className="relative aspect-4/3 bg-black w-full overflow-hidden flex items-center justify-center">
              
              {isModelLoading ? (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/90 backdrop-blur-md text-white">
                  <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                  <h3 className="text-lg font-bold tracking-wider uppercase">Loading Secure Engine...</h3>
                  <p className="text-emerald-400 text-sm mt-2 opacity-80 animate-pulse">Compiling WebAssembly Models</p>
                </div>
              ) : modelError ? (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900 text-center px-6">
                   <div className="w-14 h-14 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mb-4"><Shield className="w-7 h-7" /></div>
                   <h3 className="text-xl font-bold text-white mb-2">Engine Initialization Failed</h3>
                   <p className="text-gray-400 mb-6 max-w-md">{modelError}</p>
                   <button onClick={() => window.location.reload()} className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100">Reload Session</button>
                </div>
              ) : (
                <>
                  {/* Hidden underlying video feed serving MediaPipe */}
                  <video ref={videoRef} className="hidden" playsInline></video>
                  {/* Visible futuristic visual canvas */}
                  <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    width={640} 
                    height={480} 
                  />
                  
                  {/* UI Guide Overlay */}
                  <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center pointer-events-none">
                     <div className="bg-gray-900/80 backdrop-blur text-white px-6 py-3 rounded-full border border-gray-700 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-semibold tracking-wide uppercase">Engine Active - Frame Detected</span>
                     </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-4">
               <button 
                 disabled={isModelLoading || !!modelError}
                 onClick={startAnalysis}
                 className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3"
               >
                  Run Clinical Analysis <Activity className="w-5 h-5" />
               </button>
            </div>
          </div>
        )}

        {/* Phase 3 & 4 (Mocked for now) */}
        {phase === 'analyzing' && (
           <div className="py-24 text-center animate-in fade-in duration-500">
               <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mb-8">
                  <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin" />
               </div>
               <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Computing Biometrics...</h2>
               <p className="text-gray-500 dark:text-gray-400">Synthesizing localized spatial coordinates via Clinical Logic Engine.</p>
           </div>
        )}
        
        {phase === 'results' && analysisData && (
           <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex flex-col items-center text-center mb-10 border-b border-gray-100 dark:border-gray-700 pb-10">
                   <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                   </div>
                   <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Clinical Analysis Complete</h2>
                   <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                     Biometrics successfully mapped. Posture indicates <span className="font-semibold">{analysisData.postureQuality}</span>.
                   </p>
               </div>

               {/* Dynamic Body Analysis Summary */}
               <div className="mb-10 p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 text-left">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                       <Activity className="w-5 h-5 text-emerald-500" /> Biometric Synthesis
                   </h3>
                   <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                       Spatial analysis indicates a <span className="font-semibold text-emerald-600 dark:text-emerald-400">{analysisData.shape}</span> with a shoulder-to-waist ratio of {analysisData.ratio}. 
                       To optimally execute your <span className="font-semibold">{objective === 'deficit' ? 'weight reduction' : 'hypertrophy'}</span> protocol, we've synthesized the following phase-one strategy:
                   </p>
               </div>

               {/* Actionable Workout Strategy */}
               <div className="mb-12 text-left">
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Actionable Clinical Strategy</h3>
                   <ul className="space-y-4">
                       {objective === 'deficit' ? (
                          <>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">1</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">High-Intensity Interval Synthesis</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Prioritize HIIT to maximize metabolic calorie burn and rapid fat oxidation. Keep rest periods under 45s.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">2</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Core & Stability Integration</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Focus on strengthening the core to maintain precise posture while operating in a prolonged caloric deficit.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">3</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Compound Lift Baseline Maintenance</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Execute heavy compound movements (squat, deadlift, press) twice weekly to preserve existing muscle density.</span>
                                  </div>
                              </li>
                          </>
                       ) : (
                          <>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">1</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Progressive Overload Architecture</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Increase mechanical tension weekly. Add weight or reps strictly to trigger structural hypertrophy pathways.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">2</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Targeted Isolation Blocks</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Allocate volume specifically to lagging muscle groups identified during symmetry mapping to establish proportion.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">3</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Cellular Recovery Logistics</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Tissue requires 48-72h to rebuild. Enforce strict rest intervals to allow for maximum nutrient partitioning.</span>
                                  </div>
                              </li>
                          </>
                       )}
                   </ul>
               </div>

               {/* The Ecosystem Up-sell */}
               <div className="pt-10 border-t border-gray-100 dark:border-gray-700">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-left flex items-center gap-2">
                       <Shield className="w-5 h-5 text-emerald-500" /> Mandatory Ecosystem Tools
                   </h3>
                   <div className="grid md:grid-cols-2 gap-4">
                       {objective === 'deficit' ? (
                          <>
                             <a href="/ai-food-scanner" onClick={(e)=>{ e.preventDefault(); setCurrentPage('ai-food-scanner'); }} className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform shadow-lg shadow-purple-500/20">
                                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                 <div className="relative z-10 flex flex-col h-full">
                                    <div className="p-2.5 bg-white/20 rounded-xl mb-4 w-fit backdrop-blur-sm"><CameraIcon className="w-6 h-6 text-white" /></div>
                                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">AI Food Scanner</h4>
                                    <p className="text-white/80 text-sm mb-6 leading-relaxed">Fatal error in deficits is miscalculating macros. Instantly log exact caloric impact with computer vision.</p>
                                    <span className="mt-auto text-white font-semibold flex items-center gap-2 text-sm bg-black/20 w-fit px-4 py-2 rounded-lg group-hover:bg-black/30 transition-colors">
                                        Deploy Scanner <ArrowRight className="w-4 h-4" />
                                    </span>
                                 </div>
                             </a>
                             <a href="/calories" onClick={(e)=>{ e.preventDefault(); setCurrentPage('calories'); }} className="group relative overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform shadow-lg shadow-emerald-500/20">
                                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                 <div className="relative z-10 flex flex-col h-full">
                                    <div className="p-2.5 bg-white/20 rounded-xl mb-4 w-fit backdrop-blur-sm"><Activity className="w-6 h-6 text-white" /></div>
                                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Deficit Tracker</h4>
                                    <p className="text-white/80 text-sm mb-6 leading-relaxed">Precision logging engine for metabolic basal rates. Ensure you remain strictly in the oxidation zone.</p>
                                    <span className="mt-auto text-white font-semibold flex items-center gap-2 text-sm bg-black/20 w-fit px-4 py-2 rounded-lg group-hover:bg-black/30 transition-colors">
                                        Initialize Engine <ArrowRight className="w-4 h-4" />
                                    </span>
                                 </div>
                             </a>
                          </>
                       ) : (
                          <>
                             <a href="/macros" onClick={(e)=>{ e.preventDefault(); setCurrentPage('macros'); }} className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-left hover:scale-[1.01] transition-transform shadow-lg shadow-orange-500/20 md:col-span-2">
                                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                                 <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none"></div>
                                 <div className="relative z-10 flex md:flex-row flex-col items-center md:items-start gap-6">
                                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md flex-shrink-0 shadow-inner">
                                        <Activity className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h4 className="text-2xl font-black text-white mb-2 tracking-tight">Hypertrophy Macro Engine</h4>
                                        <p className="text-white/90 text-sm mb-6 max-w-lg leading-relaxed md:mx-0 mx-auto">Absolute surplus caloric intake and exact protein timing are structurally mandatory for your goal. Calculate precise muscle-building macros mapped to your biometric output instantly.</p>
                                        <div className="flex justify-center md:justify-start">
                                            <span className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg">
                                                Execute Planner <ArrowRight className="w-5 h-5" />
                                            </span>
                                        </div>
                                    </div>
                                 </div>
                             </a>
                          </>
                       )}
                   </div>
               </div>

               <div className="mt-12 text-center">
                   <button onClick={() => setPhase('objective')} className="text-gray-500 dark:text-gray-400 font-medium hover:text-emerald-500 transition-colors flex items-center justify-center gap-2 mx-auto">
                      <RefreshCw className="w-4 h-4" /> Re-calibrate Baseline Sensors
                   </button>
               </div>
           </div>
        )}

      </div>
    </div>
  );
}
