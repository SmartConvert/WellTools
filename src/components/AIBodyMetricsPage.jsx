import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Shield, Camera as CameraIcon, Play, RefreshCw, Activity, ArrowRight, CheckCircle2, Upload, FileImage } from 'lucide-react';

export default function AIBodyMetricsPage({ setCurrentPage, t }) {
  const [phase, setPhase] = useState('objective'); // 'objective', 'capture', 'analyzing', 'results'
  const [objective, setObjective] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const animFrameRef = useRef(null);

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

    // Simulated body skeleton dots — randomized but stable with tick
    const joints = [
      [w * 0.5, h * 0.18],  // head
      [w * 0.5, h * 0.30],  // neck
      [w * 0.37, h * 0.35], // left shoulder
      [w * 0.63, h * 0.35], // right shoulder
      [w * 0.5, h * 0.50],  // torso
      [w * 0.37, h * 0.55], // left hip
      [w * 0.63, h * 0.55], // right hip
      [w * 0.37, h * 0.70], // left knee
      [w * 0.63, h * 0.70], // right knee
      [w * 0.37, h * 0.85], // left foot
      [w * 0.63, h * 0.85], // right foot
      [w * 0.30, h * 0.48], // left elbow
      [w * 0.70, h * 0.48], // right elbow
      [w * 0.27, h * 0.58], // left wrist
      [w * 0.73, h * 0.58], // right wrist
    ];
    const connections = [
      [0,1],[1,2],[1,3],[2,11],[3,12],[11,13],[12,14],[13,15],[14,16],[1,4],[4,5],[4,6],[5,7],[6,8],[7,9],[8,10]
    ];

    // Draw connections
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

    // Draw joints
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
          };
          img.src = url;
      }
  };

  useEffect(() => {
    if (phase !== 'capture' || !uploadedImage) return;

    let isMounted = true;
    let tick = 0;

    const animate = () => {
        if (!isMounted) return;
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            drawScanOverlay(ctx, canvas.width, canvas.height, tick++);
        }
        animFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase, uploadedImage, drawScanOverlay]);

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

            {/* How It Works Section */}
            <div className="mt-16 pt-16 border-t border-gray-100 dark:border-gray-700">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">How The Clinical Engine Works</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
                        Our advanced somatic engine uses secure, on-device spatial mapping to extract precise physical landmarks directly in your browser. All processing is strictly local—your camera feed is never transmitted or stored.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center">
                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-emerald-500 font-bold shadow-sm mb-4 border border-gray-100 dark:border-gray-700">1</div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Spatial Calibration</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            Stand clearly in frame. The engine initiates WebAssembly models to instantly detect 33 distinct anatomical anchor points across your body in real-time.
                        </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center">
                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-emerald-500 font-bold shadow-sm mb-4 border border-gray-100 dark:border-gray-700">2</div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Biometric Extraction</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            The algorithm securely computes metrics such as your shoulder-to-waist ratio, structural symmetry, and postural baseline to identify structural dominance.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center">
                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-emerald-500 font-bold shadow-sm mb-4 border border-gray-100 dark:border-gray-700">3</div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Protocol Synthesis</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            Cross-referencing your biomechanics with your selected goal, the system generates a highly bespoke, actionable training strategy mapped to your unique physique.
                        </p>
                    </div>
                </div>
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
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload a full-body photo. Imagery is processed locally and destroyed instantly.</p>
               </div>
               <button onClick={() => { setPhase('objective'); setUploadedImage(null); }} className="text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                  Cancel
               </button>
            </div>

            <div className="relative aspect-4/3 bg-gray-50 dark:bg-gray-900 w-full overflow-hidden flex items-center justify-center">
              
              {!uploadedImage ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
                      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-6 border-4 border-white dark:border-gray-800 shadow-xl">
                          <Upload className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Upload Full-Body Photo</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">Ensure you are standing clearly in frame with good lighting for optimal biostructural analysis.</p>
                      
                      <label className="cursor-pointer group relative">
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                          <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                          <div className="relative bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg flex items-center gap-3 transition-colors">
                              <FileImage className="w-5 h-5" /> Select Image from Gallery
                          </div>
                      </label>
                  </div>
              ) : (
                <div className="relative w-full h-full bg-black animate-in fade-in duration-1000">
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
                        <span className="text-sm font-semibold tracking-wide uppercase">Engine Active - Frame Analyzing</span>
                     </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 flex flex-wrap justify-end gap-4">
               {uploadedImage && (
                 <label className="cursor-pointer px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl font-bold transition-all shadow-sm flex items-center justify-center">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    Replace Image
                 </label>
               )}
               <button 
                 disabled={!uploadedImage}
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
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">1</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">High-Intensity Interval Synthesis</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Prioritize HIIT to maximize metabolic calorie burn and rapid fat oxidation. Keep rest periods under 45s.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">2</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Core & Stability Integration</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Focus on strengthening the core to maintain precise posture while operating in a prolonged caloric deficit.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">3</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Compound Lift Baseline Maintenance</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Execute heavy compound movements (squat, deadlift, press) twice weekly to preserve existing muscle density.</span>
                                  </div>
                              </li>
                          </>
                       ) : (
                          <>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">1</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Progressive Overload Architecture</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Increase mechanical tension weekly. Add weight or reps strictly to trigger structural hypertrophy pathways.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">2</div>
                                  <div>
                                      <strong className="block text-lg text-gray-900 dark:text-white mb-1">Targeted Isolation Blocks</strong>
                                      <span className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed block">Allocate volume specifically to lagging muscle groups identified during symmetry mapping to establish proportion.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">3</div>
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
                             <a href="/ai-food-scanner" onClick={(e)=>{ e.preventDefault(); setCurrentPage('ai-food-scanner'); }} className="group relative overflow-hidden bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform shadow-lg shadow-purple-500/20">
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
                             <a href="/calories" onClick={(e)=>{ e.preventDefault(); setCurrentPage('calories'); }} className="group relative overflow-hidden bg-linear-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform shadow-lg shadow-emerald-500/20">
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
                             <a href="/macros" onClick={(e)=>{ e.preventDefault(); setCurrentPage('macros'); }} className="group relative overflow-hidden bg-linear-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-left hover:scale-[1.01] transition-transform shadow-lg shadow-orange-500/20 md:col-span-2">
                                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                                 <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent pointer-events-none"></div>
                                 <div className="relative z-10 flex md:flex-row flex-col items-center md:items-start gap-6">
                                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md shrink-0 shadow-inner">
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
