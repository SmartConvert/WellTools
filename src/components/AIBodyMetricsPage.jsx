import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Shield, Camera as CameraIcon, Play, RefreshCw, Activity, ArrowRight, CheckCircle2, Upload, FileImage, Sparkles, Zap, Dumbbell, Flame, TrendingUp, Info } from 'lucide-react';
// NOTE: @mediapipe/pose and @mediapipe/drawing_utils are loaded via <script> CDN tags
// in index.html to avoid Vite CommonJS bundler issues ("Pose is not a constructor").
// They are accessed here as window globals: window.Pose, window.POSE_CONNECTIONS,
// window.drawConnectors, window.drawLandmarks.

/**
 * AIBodyMetricsPage - Unified UX/UI Refactor
 * 1. Removed initial objective selection cards.
 * 2. Unified Input UI with 100% Client-Side Privacy emphasis.
 * 3. Dual-Pathway Results Engine (Weight Loss vs. Hypertrophy).
 */
export default function AIBodyMetricsPage({ setCurrentPage, t }) {
  const [phase, setPhase] = useState('input'); // 'input', 'analyzing', 'results'
  const [analysisData, setAnalysisData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanError, setScanError] = useState('');
  const [isScanningActive, setIsScanningActive] = useState(false);
  
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const animFrameRef = useRef(null);
  const analysisCanvasRef = useRef(null);
  const poseRef = useRef(null);

  // Draw futuristic scanning overlay on canvas
  const drawScanOverlay = useCallback((ctx, w, h, tick) => {
    ctx.clearRect(0, 0, w, h);

    // Draw dimmed uploaded image
    if (imageRef.current && imageRef.current.complete) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      
      const imgAspect = imageRef.current.width / imageRef.current.height;
      const canvasAspect = w / h;
      let drawW = w;
      let drawH = h;
      let offsetX = 0;
      let offsetY = 0;
      
      if (imgAspect > canvasAspect) {
        drawW = h * imgAspect;
        offsetX = -(drawW - w) / 2;
      } else {
        drawH = w / imgAspect;
        offsetY = -(drawH - h) / 2;
      }
      
      ctx.drawImage(imageRef.current, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    }

    // Scanning line animation
    const scanY = ((tick * 2) % (h + 40)) - 20;
    const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    gradient.addColorStop(0, 'rgba(16,185,129,0)');
    gradient.addColorStop(0.5, 'rgba(16,185,129,0.6)');
    gradient.addColorStop(1, 'rgba(16,185,129,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY - 30, w, 60);

    // Corner brackets
    const bSize = 30;
    const margin = 40;
    ctx.strokeStyle = 'rgba(16,185,129,0.9)';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#10b981';
    [[margin, margin], [w - margin, margin], [margin, h - margin], [w - margin, h - margin]].forEach(([cx, cy]) => {
      const hDir = cx < w / 2 ? 1 : -1;
      const vDir = cy < h / 2 ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(cx, cy + vDir * bSize);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx + hDir * bSize, cy);
      ctx.stroke();
    });
    ctx.shadowBlur = 0;

    // Simulated skeleton dots
    const joints = [
      [w * 0.5, h * 0.18], [w * 0.5, h * 0.30], [w * 0.37, h * 0.35], [w * 0.63, h * 0.35],
      [w * 0.5, h * 0.50], [w * 0.37, h * 0.55], [w * 0.63, h * 0.55], [w * 0.37, h * 0.70],
      [w * 0.63, h * 0.70], [w * 0.37, h * 0.85], [w * 0.63, h * 0.85], [w * 0.30, h * 0.48],
      [w * 0.70, h * 0.48], [w * 0.27, h * 0.58], [w * 0.73, h * 0.58]
    ];
    const connections = [
      [0,1],[1,2],[1,3],[2,11],[3,12],[11,13],[12,14],[1,4],[4,5],[4,6],[5,7],[6,8],[7,9],[8,10]
    ];

    ctx.strokeStyle = 'rgba(16,185,129,0.65)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#10b981';
    connections.forEach(([a, b]) => {
      if (joints[a] && joints[b]) {
        ctx.beginPath();
        ctx.moveTo(joints[a][0], joints[a][1]);
        ctx.lineTo(joints[b][0], joints[b][1]);
        ctx.stroke();
      }
    });

    joints.forEach(([jx, jy]) => {
      ctx.beginPath();
      ctx.arc(jx, jy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#10b981';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    ctx.shadowBlur = 0;
  }, []);

  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          const url = URL.createObjectURL(file);
          const img = new Image();
          img.onload = () => {
              imageRef.current = img;
              setUploadedImage(url);
              startAnalysis(); // Trigger analysis immediately after upload
          };
          img.src = url;
      }
  };

  const startAnalysis = async () => {
      setPhase('analyzing');
      setScanError('');
      setIsScanningActive(true);

      try {
          // Guard: ensure the CDN <script> tags have loaded window.Pose.
          // This handles the race condition where the user uploads a photo
          // faster than the CDN scripts finish loading.
          const PoseConstructor = window.Pose;
          if (typeof PoseConstructor !== 'function') {
              throw new Error(
                'MediaPipe CDN scripts have not finished loading yet. ' +
                'Please wait a moment and try again.'
              );
          }

          // --- FIX 1: Lazy-init the Pose model only on first user interaction ---
          if (!poseRef.current) {
              // FIX 2: Pin to a specific version so mobile browsers get a
              // consistent, cache-friendly CDN URL (avoids 404s on CDN edge nodes).
              const MEDIAPIPE_POSE_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/';

              const pose = new PoseConstructor({
                locateFile: (file) => `${MEDIAPIPE_POSE_CDN}${file}`
              });

              // FIX 3: Use modelComplexity 1 (not 2) on initial load.
              // Complexity 2 downloads ~20 MB of WASM and reliably OOMs on
              // low-RAM Android devices. Complexity 1 is still high-quality.
              pose.setOptions({
                modelComplexity: 1,
                smoothLandmarks: true,
                enableSegmentation: false,
                smoothSegmentation: false,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
              });

              pose.onResults(onResults);

              // FIX 4: Await explicit initialization so the WASM binary is
              // fully loaded BEFORE we call send(). Without this, send() fires
              // before the runtime is ready, causing a silent internal crash on
              // mobile that never reaches the outer catch block.
              await pose.initialize();

              poseRef.current = pose;
          }

          // Small delay to let the scanning UI render before the heavy send()
          setTimeout(async () => {
              try {
                  await poseRef.current.send({ image: imageRef.current });
              } catch (e) {
                  // FIX 5: Log the ACTUAL error object so we can diagnose
                  // camera permission errors vs. model load errors vs. OOM.
                  console.error('[AIBodyMetrics] pose.send() failed:', e);
                  setScanError(
                    e?.message
                      ? `Analysis failed: ${e.message}`
                      : 'Failed to process image locally. Check your internet connection and try again.'
                  );
                  setIsScanningActive(false);
              }
          }, 500);

      } catch (err) {
          // Log the full error so Sentry / DevTools shows exactly what failed
          // (WASM fetch 404, out-of-memory, CSP violation, etc.)
          console.error('[AIBodyMetrics] Initialization failed:', err);
          setScanError(
            err?.message
              ? `AI system initialization failed: ${err.message}`
              : 'AI system initialization failed. Please check your internet connection.'
          );
          setIsScanningActive(false);
      }
  };

  const onResults = useCallback((results) => {
      setIsScanningActive(false);
      
      if (!analysisCanvasRef.current || !imageRef.current) return;
      const canvas = analysisCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;
      
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.4;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;

      if (results.poseLandmarks && results.poseLandmarks.length > 0) {
          const lms = results.poseLandmarks;
          
          // Use window globals (loaded from CDN <script> tags)
          const { drawConnectors, drawLandmarks, POSE_CONNECTIONS } = window;

          ctx.shadowBlur = 10;
          ctx.shadowColor = '#10b981';
          if (drawConnectors && POSE_CONNECTIONS) {
            drawConnectors(ctx, lms, POSE_CONNECTIONS, { color: 'rgba(16, 185, 129, 0.7)', lineWidth: 4 });
          }
          if (drawLandmarks) {
            drawLandmarks(ctx, lms, { color: '#ffffff', fillColor: '#10b981', lineWidth: 2, radius: 5 });
          }
          
          const leftShoulder = lms[11];
          const rightShoulder = lms[12];
          const leftHip = lms[23];
          const rightHip = lms[24];
          
          const shoulderWidth = Math.sqrt(Math.pow(leftShoulder.x - rightShoulder.x, 2) + Math.pow(leftShoulder.y - rightShoulder.y, 2));
          const hipWidth = Math.sqrt(Math.pow(leftHip.x - rightHip.x, 2) + Math.pow(leftHip.y - rightHip.y, 2));
          
          if(shoulderWidth === 0 || hipWidth === 0) {
              setScanError("Could not fully detect human biomechanics. Please upload a clear photo.");
              return;
          }
          
          const rawRatio = shoulderWidth / hipWidth;
          const finalRatio = rawRatio.toFixed(2);
          const activeShape = rawRatio >= 1.45 ? "Exceptional V-Taper Architecture" : 
                              rawRatio >= 1.25 ? "Strong Upper-Body Dominance" : 
                              rawRatio >= 1.0 ? "Balanced Biostructural Baseline" : 
                              "Lower-Body Dominance Structure";

          setAnalysisData({
             postureQuality: "Successfully Extracted",
             ratio: finalRatio,
             shape: activeShape
          });
          
          setTimeout(() => {
              setPhase('results');
          }, 3500);

      } else {
          setScanError("No distinct human biomechanics detected. Please upload a clear, front-facing, full-body photo.");
      }
      
      ctx.restore();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/10 rounded-3xl mb-6 shadow-sm">
            <Activity className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-[Outfit] font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            AI Body Metrics <span className="bg-linear-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Advisor</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
             Instant biometric extraction using advanced computer vision. 
             Optimized for your unique anatomical structure.
          </p>
        </div>

        {/* Phase 1: Unified Input UI */}
        {phase === 'input' && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="group relative bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 p-12 md:p-16 text-center overflow-hidden">
               {/* Decorative background elements */}
               <div className="absolute top-0 right-0 -mr-24 -mt-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
               <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 bg-linear-to-br from-emerald-500 to-teal-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
                      <CameraIcon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">Start Your Instant Analysis</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-sm leading-relaxed">
                      Upload a full-body photo to reveal your biometrical blueprint and dual-pathway roadmap.
                  </p>

                  <div className="w-full max-w-sm mx-auto">
                      <label className="w-full cursor-pointer group/btn relative block">
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                          <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-lg opacity-25 group-hover/btn:opacity-40 transition-opacity"></div>
                          <div className="relative bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white px-8 py-5 rounded-2xl font-black shadow-lg flex items-center justify-center gap-3 transition-all">
                              <Upload className="w-6 h-6" /> Upload Body Photo
                          </div>
                      </label>
                  </div>

                  {/* Privacy & How it Works Section */}
                  <div className="mt-12 w-full pt-10 border-t border-gray-100 dark:border-gray-700/50">
                      <div className="flex flex-col md:flex-row items-start gap-10 text-left">
                          <div className="flex-1 space-y-6">
                              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                  <Info className="w-5 h-5 text-emerald-500" /> How to Use
                              </h3>
                              <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                  <li className="flex gap-3">
                                      <span className="flex-none w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black">1</span>
                                      <span>Upload a clear, front-facing photo of your full body. For best results, wear form-fitting clothing.</span>
                                  </li>
                                  <li className="flex gap-3">
                                      <span className="flex-none w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black">2</span>
                                      <span>Our built-in AI will detect 33 anatomical landmarks and calculate your skeletal proportions.</span>
                                  </li>
                                  <li className="flex gap-3">
                                      <span className="flex-none w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black">3</span>
                                      <span>Receive a dual-pathway report for both weight loss and muscle building tailored to your body type.</span>
                                  </li>
                              </ul>
                          </div>

                          <div className="flex-1 p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100/50 dark:border-emerald-700/20">
                              <h3 className="text-xl font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-4">
                                  <Shield className="w-5 h-5" /> Privacy Assurance
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-4">
                                  We prioritize your privacy above all. All image processing is performed <strong>100% locally</strong> on your own device.
                              </p>
                              <div className="flex items-center gap-3 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                                  <CheckCircle2 className="w-4 h-4" /> No Cloud Uploads
                                  <CheckCircle2 className="w-4 h-4 ml-2" /> No Data Stored
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 w-full pt-8 border-t border-gray-50 dark:border-gray-700/50">
                      <div className="flex flex-col items-center gap-1.5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                          <Activity className="w-6 h-6 mb-1 text-emerald-500" />
                          <span className="text-[10px] uppercase tracking-widest font-black text-gray-500 dark:text-gray-400">Skeleton Map</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                          <CheckCircle2 className="w-6 h-6 mb-1 text-emerald-500" />
                          <span className="text-[10px] uppercase tracking-widest font-black text-gray-500 dark:text-gray-400">Posture Fix</span>
                      </div>
                      <div className="hidden md:flex flex-col items-center gap-1.5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                          <Sparkles className="w-6 h-6 mb-1 text-emerald-500" />
                          <span className="text-[10px] uppercase tracking-widest font-black text-gray-500 dark:text-gray-400">Goal Synthesis</span>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Phase 2: Analyzing */}
        {phase === 'analyzing' && (
           <div className="max-w-2xl mx-auto animate-in fade-in duration-500 mt-8">
               <div className="bg-black rounded-[3rem] overflow-hidden shadow-2xl relative border border-gray-800 aspect-3/4 md:aspect-[4/3] flex flex-col items-center justify-center min-h-[500px]">
                   
                   {/* Terminal Stats Overlay */}
                   <div className="absolute top-8 left-8 z-30 font-mono text-xs text-emerald-400 space-y-2 bg-black/60 p-5 rounded-2xl backdrop-blur-md border border-emerald-500/20 shadow-2xl">
                      <p className="opacity-70">&gt; INITIALIZING_LOCAL_AI_CORE...</p>
                      <p>&gt; MAPPING_JOINT_COORD: <span className="text-white font-bold">{isScanningActive ? 'SEARCHING...' : 'DONE'}</span></p>
                      <p>&gt; BIOMETRIC_FIDELITY: <span className="text-emerald-500 font-bold">98.9%</span></p>
                      <div className="w-32 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-emerald-500 animate-[loading_2s_ease-in-out_infinite]"></div>
                      </div>
                   </div>
                   
                   {/* The actual analysis drawing canvas */}
                   <canvas ref={analysisCanvasRef} className="w-full h-full object-contain absolute inset-0 z-20"></canvas>

                   {/* Scanning Laser Animation */}
                   {isScanningActive && (
                      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                          <div className="w-full h-[3px] bg-emerald-500 shadow-[0_0_30px_10px_rgba(16,185,129,0.8)] absolute top-0 left-0 animate-[scan_2s_ease-in-out_infinite]"></div>
                      </div>
                   )}

                   {scanError ? (
                      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gray-900/95 p-12 text-center backdrop-blur-xl">
                          <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-lg"><Activity className="w-10 h-10" /></div>
                          <h3 className="text-3xl font-black text-white mb-4">Topology Error</h3>
                          <p className="text-gray-400 mb-10 max-w-sm leading-relaxed text-lg">{scanError}</p>
                          <button onClick={() => { setPhase('input'); setScanError(''); setUploadedImage(null); }} className="px-10 py-5 bg-white text-gray-900 rounded-[1.5rem] font-black hover:bg-gray-100 transition-all shadow-xl active:scale-95">Try Fresh Scan</button>
                      </div>
                   ) : !isScanningActive && analysisData ? (
                      <div className="absolute bottom-8 inset-x-8 z-30 flex flex-col sm:flex-row items-center justify-between bg-emerald-900/80 backdrop-blur-xl border border-emerald-500/40 p-6 rounded-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-[0_20px_50px_-20px_rgba(16,185,129,0.5)] gap-4">
                          <div className="flex items-center gap-4">
                             <div className="bg-emerald-500 rounded-full p-1.5 shadow-lg shadow-emerald-500/50"><CheckCircle2 className="w-6 h-6 text-emerald-900" /></div>
                             <span className="font-black text-white tracking-wide text-xl">Symmetry Calibrated</span>
                          </div>
                          <span className="text-emerald-100 text-sm font-black uppercase tracking-widest animate-pulse border border-emerald-500/20 px-5 py-2.5 rounded-2xl bg-emerald-800/40">Synthesizing Pathways...</span>
                      </div>
                   ) : null}
               </div>
           </div>
        )}
        
        {/* Phase 3: Results (Dual Pathways) */}
        {phase === 'results' && analysisData && (
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
               {/* Body Type Analysis Summary */}
               <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 p-10 md:p-14 mb-8 text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full -ml-16 -mt-16 blur-3xl"></div>
                   <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-xl">
                      <Sparkles className="w-10 h-10 text-white" />
                   </div>
                   <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Structure Analysis Complete</h2>
                   <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                     Biometric modeling suggests an <span className="font-black text-emerald-600 dark:text-emerald-400">{analysisData.shape}</span>. 
                     Based on your shoulder-to-waist ratio of <span className="font-bold text-gray-900 dark:text-white">{analysisData.ratio}</span>, we've developed two distinct evolutionary pathways.
                   </p>
               </div>

               {/* Dual Pathways Grid */}
               <div className="grid lg:grid-cols-2 gap-8 mb-12">
                   
                   {/* Pathway A: Weight Loss */}
                   <div className="group bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border-t-8 border-rose-500 p-10 flex flex-col relative overflow-hidden transition-all hover:shadow-rose-500/10 hover:-translate-y-1">
                       <div className="flex items-center gap-4 mb-10">
                           <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center shadow-inner">
                               <Flame className="w-8 h-8 text-rose-500" />
                           </div>
                           <div>
                               <span className="text-xs font-black text-rose-500 uppercase tracking-widest mb-1 block">Goal Strategy A</span>
                               <h3 className="text-3xl font-black text-gray-900 dark:text-white">Lose Body Fat</h3>
                           </div>
                       </div>
                       
                       <div className="space-y-6 mb-12 flex-1">
                           <div className="p-6 bg-rose-50/50 dark:bg-rose-900/10 rounded-2xl border border-rose-100/50 dark:border-rose-900/20">
                               <h4 className="font-black text-rose-700 dark:text-rose-400 mb-2 flex items-center gap-2">
                                  <TrendingUp className="w-4 h-4" /> Metabolic Synthesis
                               </h4>
                               <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                  Your detected {analysisData.shape} responds best to high-volume HIIT sessions targeting lower-limb fat oxidation first.
                               </p>
                           </div>
                           
                           <ul className="space-y-4">
                               <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold">
                                   <Zap className="w-5 h-5 text-rose-500" /> 20min Morning HIIT Cardio
                               </li>
                               <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold">
                                   <Zap className="w-5 h-5 text-rose-500" /> Caloric Deficit Focus (25%)
                               </li>
                               <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold">
                                   <Zap className="w-5 h-5 text-rose-500" /> Daily Activity Multiplier
                               </li>
                           </ul>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                           <button onClick={() => setCurrentPage('calories')} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group/link text-center">
                               <Flame className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                               <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest block">Deficit Calculator</span>
                           </button>
                           <button onClick={() => setCurrentPage('food-scanner')} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group/link text-center">
                               <CameraIcon className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                               <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest block">AI Food Scanner</span>
                           </button>
                       </div>
                   </div>

                   {/* Pathway B: Gain Weight/Muscle */}
                   <div className="group bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border-t-8 border-indigo-500 p-10 flex flex-col relative overflow-hidden transition-all hover:shadow-indigo-500/10 hover:-translate-y-1">
                       <div className="flex items-center gap-4 mb-10">
                           <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center shadow-inner">
                               <Dumbbell className="w-8 h-8 text-indigo-500" />
                           </div>
                           <div>
                               <span className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1 block">Goal Strategy B</span>
                               <h3 className="text-3xl font-black text-gray-900 dark:text-white">Build Muscle Mass</h3>
                           </div>
                       </div>
                       
                       <div className="space-y-6 mb-12 flex-1">
                           <div className="p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/20">
                               <h4 className="font-black text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4" /> Hypertrophy Focus
                               </h4>
                               <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                  Establish a muscular anchor in your mid-back to accentuate the {analysisData.ratio} structural ratio. Focus on heavy compound lifts.
                               </p>
                           </div>
                           
                           <ul className="space-y-4">
                               <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold">
                                   <Zap className="w-5 h-5 text-indigo-500" /> Progressive Overload Protocol
                               </li>
                               <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold">
                                   <Zap className="w-5 h-5 text-indigo-500" /> Targeted Isolation Training
                               </li>
                               <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold">
                                   <Zap className="w-5 h-5 text-indigo-500" /> High Protein Partitioning
                               </li>
                           </ul>
                       </div>

                       <button onClick={() => setCurrentPage('macro')} className="w-full bg-linear-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-3xl p-6 flex flex-col items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30 active:scale-95 group/btn">
                           <TrendingUp className="w-8 h-8 text-white/50 group-hover/btn:scale-110 transition-transform" />
                           <div>
                              <span className="text-xl font-black block tracking-tight">Open Macro Engine</span>
                              <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Calculate Hypertrophy Needs</span>
                           </div>
                       </button>
                   </div>

               </div>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                   <button onClick={() => { setPhase('input'); setUploadedImage(null); }} className="px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-black shadow-xl hover:scale-105 transition-all flex items-center gap-3 active:scale-95">
                       <RefreshCw className="w-6 h-6" /> Re-Scan Anatomy
                   </button>
                   
                   <div className="p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur rounded-[1.5rem] border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                       <Info className="w-5 h-5 text-emerald-500" />
                       <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Scan data is destroyed locally. Session private.</p>
                   </div>
               </div>
           </div>
        )}

      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0.2; }
          50% { top: 98%; opacity: 1; }
          100% { top: 0%; opacity: 0.2; }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .aspect-4\/3 {
          aspect-ratio: 4 / 3;
        }
        .aspect-3\/4 {
          aspect-ratio: 3 / 4;
        }
      `}</style>
    </div>
  );
}
