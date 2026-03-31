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
      // Transition to actual calculation logic (Phase 3)
      setPhase('analyzing');
      // Mock analyzing delay before showing results
      setTimeout(() => setPhase('results'), 3000);
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
        
        {phase === 'results' && (
           <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
               </div>
               <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Analysis Complete</h2>
               <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                 We have securely processed your somatic biometrics. Your clinical plan is ready.
               </p>
               <button onClick={() => setPhase('objective')} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold mx-auto transition-all shadow-xl shadow-emerald-500/20">
                  Reset Demo
               </button>
           </div>
        )}

      </div>
    </div>
  );
}
