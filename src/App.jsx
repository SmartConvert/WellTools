import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Heart, Menu, X, Moon, Sun } from 'lucide-react';
import { translations } from './translations';
import postsData from './data/posts.json';
import AdComponent from './components/AdComponent';

// Helper to handle ChunkLoadError (when a new version is deployed while user has the site open)
const lazyWithRetry = (componentImport) => {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      // Check if we already tried to reload in this session to avoid infinite loops
      const hasReloaded = window.sessionStorage.getItem('chunk-reload-tried');
      if (!hasReloaded) {
        window.sessionStorage.setItem('chunk-reload-tried', 'true');
        window.location.reload();
        return { default: () => null }; // Placeholder
      }
      throw error; // If it still fails after reload, let ErrorBoundary or Suspense handle it
    }
  });
};

// Lazy load all page components for code splitting
const HomePage = lazyWithRetry(() => import('./components/HomePage'));
const BMICalculatorPage = lazyWithRetry(() => import('./components/BMICalculatorPage'));
const CaloriesCalculatorPage = lazyWithRetry(() => import('./components/CaloriesCalculatorPage'));
const WaterCalculatorPage = lazyWithRetry(() => import('./components/WaterCalculatorPage'));
const IdealWeightPage = lazyWithRetry(() => import('./components/IdealWeightPage'));
const SleepCalculatorPage = lazyWithRetry(() => import('./components/SleepCalculatorPage'));
const BodyFatCalculatorPage = lazyWithRetry(() => import('./components/BodyFatCalculatorPage'));
const BMRCalculatorPage = lazyWithRetry(() => import('./components/BMRCalculatorPage'));
const MacroCalculatorPage = lazyWithRetry(() => import('./components/MacroCalculatorPage'));
const OneRepMaxCalculatorPage = lazyWithRetry(() => import('./components/OneRepMaxCalculatorPage'));
const MealPlannerPage = lazyWithRetry(() => import('./components/MealPlannerPage'));
const BlogPage = lazyWithRetry(() => import('./components/BlogPage'));
const BlogPostPage = lazyWithRetry(() => import('./components/BlogPostPage'));
const DailyTrackingPage = lazyWithRetry(() => import('./components/DailyTrackingPage'));
const HowItWorksPage = lazyWithRetry(() => import('./components/HowItWorksPage'));
const AboutPage = lazyWithRetry(() => import('./components/AboutPage'));
const ExpertPage = lazyWithRetry(() => import('./components/ExpertPage'));
const ContactPage = lazyWithRetry(() => import('./components/ContactPage'));

// Correct way to lazy load multiple exports in React 18
const TermsOfUsePage = lazyWithRetry(() => import('./components/LegalPages').then(m => ({ default: m.TermsOfUsePage })));
const DisclaimerPage = lazyWithRetry(() => import('./components/LegalPages').then(m => ({ default: m.DisclaimerPage })));
const PrivacyPolicyPage = lazyWithRetry(() => import('./components/LegalPages').then(m => ({ default: m.PrivacyPolicyPage })));

const NavBar = ({ setCurrentPage, setMobileMenuOpen, mobileMenuOpen, t, theme, setTheme }) => (
  <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center gap-8">
          <div onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-teal-500 transition-all">
              WellTools
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <button onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
              {t.nav_home}
            </button>
            <button onClick={() => { setCurrentPage('tracking'); window.scrollTo(0, 0); }} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
              {t.daily_tracking}
            </button>
            <button onClick={() => { setCurrentPage('meal-planner'); window.scrollTo(0, 0); }} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
              {t.meal_planner_title}
            </button>
            <button onClick={() => { setCurrentPage('blog'); window.scrollTo(0, 0); }} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
              {t.nav_blog}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
            aria-label={theme === 'dark' ? t.light_mode : t.dark_mode}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            className="lg:hidden p-2 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t.aria_menu_toggle}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

    {mobileMenuOpen && (
      <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg animate-in slide-in-from-top duration-300">
        <div className="px-4 py-6 space-y-4">
          <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); window.scrollTo(0, 0); }} className="flex items-center gap-3 w-full text-start px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-2xl transition-all font-bold">
            <Heart className="w-5 h-5 text-emerald-500" />
            {t.nav_home}
          </button>
          <button onClick={() => { setCurrentPage('tracking'); setMobileMenuOpen(false); window.scrollTo(0, 0); }} className="flex items-center gap-3 w-full text-start px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-2xl transition-all font-bold">
            <Heart className="w-5 h-5 text-emerald-500" />
            {t.daily_tracking}
          </button>
          <button onClick={() => { setCurrentPage('meal-planner'); setMobileMenuOpen(false); window.scrollTo(0, 0); }} className="flex items-center gap-3 w-full text-start px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-2xl transition-all font-bold">
            <Heart className="w-5 h-5 text-emerald-500" />
            {t.meal_planner_title}
          </button>
          <button onClick={() => { setCurrentPage('blog'); setMobileMenuOpen(false); window.scrollTo(0, 0); }} className="flex items-center gap-3 w-full text-start px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-2xl transition-all font-bold">
            <Heart className="w-5 h-5 text-emerald-500" />
            {t.nav_blog}
          </button>


          <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-bold text-gray-500">{t.dark_mode}</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-700 dark:text-gray-200 transition-all active:scale-95"
              >
                {theme === 'dark' ? <Sun className="w-6 h-6 text-amber-500" /> : <Moon className="w-6 h-6 text-blue-500" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </nav>
);

const Footer = ({ setCurrentPage, t }) => (
  <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-8 h-8 text-emerald-500" />
            <span className="text-2xl font-black text-gray-900 dark:text-white">WellTools</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm text-lg leading-relaxed">
            Your comprehensive health companion. Verified calculators and scientifically backed meal plans to help you reach your peak potential.
          </p>
        </div>
        <div>
          <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-sm">{t.explore_tools}</h4>
          <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-semibold">
            <li><button onClick={() => { setCurrentPage('bmi'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors uppercase text-sm tracking-tighter">BMI Calculator</button></li>
            <li><button onClick={() => { setCurrentPage('calories'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors uppercase text-sm tracking-tighter">Calorie Tracker</button></li>
            <li><button onClick={() => { setCurrentPage('meal-planner'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors uppercase text-sm tracking-tighter">Meal Planner</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-sm">{t.nav_about}</h4>
          <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-semibold">
            <li><button onClick={() => { setCurrentPage('about'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors uppercase text-sm tracking-tighter">{t.nav_about}</button></li>
            <li><button onClick={() => { setCurrentPage('experts'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors uppercase text-sm tracking-tighter">{t.our_experts}</button></li>
            <li><button onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors uppercase text-sm tracking-tighter">{t.nav_contact}</button></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-100 dark:border-gray-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 dark:text-gray-400 font-medium">© 2026 WellTools. Built for better health.</p>
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
          <button onClick={() => { setCurrentPage('privacy'); window.scrollTo(0, 0); }} className="text-sm text-gray-400 hover:text-emerald-500 transition-colors font-bold uppercase tracking-widest">{t.privacy}</button>
          <button onClick={() => { setCurrentPage('terms'); window.scrollTo(0, 0); }} className="text-sm text-gray-400 hover:text-emerald-500 transition-colors font-bold uppercase tracking-widest">{t.terms}</button>
          <button onClick={() => { setCurrentPage('disclaimer'); window.scrollTo(0, 0); }} className="text-sm text-gray-400 hover:text-emerald-500 transition-colors font-bold uppercase tracking-widest">{t.disclaimer}</button>
        </div>
      </div>
    </div>
  </footer>
);

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-emerald-500/20 rounded-full animate-ping"></div>
      <div className="absolute inset-0 w-16 h-16 border-t-4 border-emerald-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

const DailyHealthTools = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState('weight');

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const t = translations.en;

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
    // Success! Clear the reload flag when the app mounts successfully
    window.sessionStorage.removeItem('chunk-reload-tried');
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');
    const pageId = params.get('page');

    if (postId) {
      const allPosts = [...(postsData.en || []), ...(postsData.ar || []), ...(postsData.fr || [])];
      const foundPost = allPosts.find(p => p.id === postId);
      if (foundPost) {
        setSelectedPost(foundPost);
        setCurrentPage('blog-post');
      }
    } else if (pageId) {
      setCurrentPage(pageId);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Sync post ID
    if (selectedPost) params.set('post', selectedPost.id);
    else params.delete('post');

    // Sync page ID (if not on blog-post)
    if (currentPage !== 'blog-post' && currentPage !== 'home') params.set('page', currentPage);
    else params.delete('page');

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);

    // SEO: Update Meta Title based on currentPage
    import('./data/seoContent').then(module => {
      const content = module.calculatorContent[currentPage]?.['en'];
      if (content) {
        document.title = `${content.hero_title} - WellTools`;
      } else if (currentPage === 'home') {
        document.title = 'WellTools - Free Online Health Calculators';
      }
    });
  }, [selectedPost, currentPage]);

  // Calculator States
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  const [calWeight, setCalWeight] = useState('');
  const [calHeight, setCalHeight] = useState('');
  const [calAge, setCalAge] = useState('');
  const [calGender, setCalGender] = useState('male');
  const [calActivity, setCalActivity] = useState('sedentary');
  const [calResult, setCalResult] = useState(null);

  const [waterWeight, setWaterWeight] = useState('');
  const [waterActivity, setWaterActivity] = useState('low');
  const [waterResult, setWaterResult] = useState(null);

  const [idealHeight, setIdealHeight] = useState('');
  const [idealGender, setIdealGender] = useState('male');
  const [idealResult, setIdealResult] = useState(null);

  const [sleepAge, setSleepAge] = useState('');
  const [sleepBedtime, setSleepBedtime] = useState('22:00');
  const [sleepWakeupTimes, setSleepWakeupTimes] = useState([]);
  const [sleepResult, setSleepResult] = useState(null);

  const [bfWeight, setBfWeight] = useState('');
  const [bfHeight, setBfHeight] = useState('');
  const [bfAge, setBfAge] = useState('');
  const [bfGender, setBfGender] = useState('male');
  const [bfNeck, setBfNeck] = useState('');
  const [bfWaist, setBfWaist] = useState('');
  const [bfHip, setBfHip] = useState('');
  const [bfResult, setBfResult] = useState(null);

  const [bmrWeight, setBmrWeight] = useState('');
  const [bmrHeight, setBmrHeight] = useState('');
  const [bmrAge, setBmrAge] = useState('');
  const [bmrGender, setBmrGender] = useState('male');
  const [bmrResult, setBmrResult] = useState(null);

  const [macroCalories, setMacroCalories] = useState('');
  const [macroDiet, setMacroDiet] = useState('balanced');
  const [macroResult, setMacroResult] = useState(null);

  const [ormWeight, setOrmWeight] = useState('');
  const [ormReps, setOrmReps] = useState('');
  const [ormResult, setOrmResult] = useState(null);

  // Tracking State
  const [trackingData, setTrackingData] = useState({ weight: [], water: [], sleep: [] });
  const [newWeight, setNewWeight] = useState('');
  const [newWater, setNewWater] = useState('');
  const [newSleep, setNewSleep] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('healthTracking');
    if (saved) setTrackingData(JSON.parse(saved));
  }, []);

  const saveTrackingData = (data) => {
    setTrackingData(data);
    localStorage.setItem('healthTracking', JSON.stringify(data));
  };

  const calculateBMI = () => {
    const weight = parseFloat(bmiWeight);
    const height = parseFloat(bmiHeight) / 100;
    const bmi = (weight / (height * height)).toFixed(1);
    let category = bmi < 18.5 ? 'cat_underweight' : bmi < 25 ? 'cat_normal' : bmi < 30 ? 'cat_overweight' : 'cat_obese';
    let color = bmi < 18.5 ? 'text-blue-600' : bmi < 25 ? 'text-green-600' : bmi < 30 ? 'text-yellow-600' : 'text-red-600';
    setBmiResult({ bmi, category, color });
  };

  const calculateCalories = () => {
    const weight = parseFloat(calWeight);
    const height = parseFloat(calHeight);
    const age = parseInt(calAge);
    const bmr = calGender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
    const tdee = Math.round(bmr * multipliers[calActivity]);
    setCalResult({ maintain: tdee, loss: Math.round(tdee - 500), gain: Math.round(tdee + 500) });
  };

  const calculateWater = () => {
    const weight = parseFloat(waterWeight);
    let intake = weight * 0.033;
    if (waterActivity === 'moderate') intake += 0.5;
    if (waterActivity === 'high') intake += 1;
    setWaterResult(intake.toFixed(1));
  };

  const calculateIdealWeight = () => {
    const height = parseFloat(idealHeight);
    const ideal = idealGender === 'male' ? 50 + 0.91 * (height - 152.4) : 45.5 + 0.91 * (height - 152.4);
    setIdealResult({ ideal: ideal.toFixed(1), min: (ideal * 0.9).toFixed(1), max: (ideal * 1.1).toFixed(1) });
  };

  const calculateSleep = () => {
    const age = parseInt(sleepAge);
    let hours = age < 1 ? '14-17' : age < 2 ? '11-14' : age < 5 ? '10-13' : age < 13 ? '9-11' : age < 18 ? '8-10' : age < 65 ? '7-9' : '7-8';
    setSleepResult(`${hours} ${t.hours}`);
  };

  const calculateSleepCycles = () => {
    const [h, m] = sleepBedtime.split(':').map(Number);
    const start = new Date(); start.setHours(h, m + 15, 0);
    const times = [4, 5, 6].map(c => {
      const time = new Date(start.getTime() + c * 90 * 60000);
      return { time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), hours: (c * 90) / 60 };
    });
    setSleepWakeupTimes(times);
  };

  const calculateBodyFat = () => {
    const height = parseFloat(bfHeight);
    const neck = parseFloat(bfNeck);
    const waist = parseFloat(bfWaist);
    const hip = parseFloat(bfHip);
    let bf = bfGender === 'male'
      ? 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
      : 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    bf = bf.toFixed(1);
    let category = bfGender === 'male'
      ? bf < 6 ? t.cat_essential : bf < 14 ? t.cat_athletes : bf < 18 ? t.cat_fitness : bf < 25 ? t.cat_average : t.cat_obese
      : bf < 14 ? t.cat_essential : bf < 21 ? t.cat_athletes : bf < 25 ? t.cat_fitness : bf < 32 ? t.cat_average : t.cat_obese;
    setBfResult({ bodyFat: bf, category, color: bf < 25 ? 'text-emerald-500' : 'text-orange-500' });
  };

  const calculateBMR = () => {
    const w = parseFloat(bmrWeight);
    const h = parseFloat(bmrHeight);
    const a = parseFloat(bmrAge);
    if (!w || !h || !a) return;
    // Mifflin-St Jeor
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr += bmrGender === 'male' ? 5 : -161;
    setBmrResult({ bmr: Math.round(bmr) });
  };

  const calculateMacros = () => {
    const cal = parseFloat(macroCalories);
    if (!cal) return;
    let p, c, f;
    // Simple splits: 
    // Balanced: 30% P, 40% C, 30% F
    // Low Carb: 40% P, 20% C, 40% F
    // High Protein: 35% P, 35% C, 30% F
    switch (macroDiet) {
      case 'low-carb': p = 0.4; c = 0.2; f = 0.4; break;
      case 'high-protein': p = 0.35; c = 0.35; f = 0.3; break;
      case 'balanced': default: p = 0.3; c = 0.4; f = 0.3; break;
    }
    setMacroResult({
      protein: Math.round((cal * p) / 4),
      carbs: Math.round((cal * c) / 4),
      fats: Math.round((cal * f) / 9)
    });
  };

  const calculateORM = () => {
    const w = parseFloat(ormWeight);
    const r = parseFloat(ormReps);
    if (!w || !r) return;
    // Epley Formula: 1RM = w * (1 + r/30)
    const max = w * (1 + r / 30);
    setOrmResult({ max: Math.round(max) });
  };

  const addWeightEntry = () => {
    if (!newWeight) return;
    const updated = { ...trackingData, weight: [...trackingData.weight, { date: new Date().toISOString().split('T')[0], value: parseFloat(newWeight) }].slice(-30) };
    saveTrackingData(updated); setNewWeight('');
  };

  const addWaterEntry = () => {
    if (!newWater) return;
    const updated = { ...trackingData, water: [...trackingData.water, { date: new Date().toISOString().split('T')[0], value: parseFloat(newWater) }].slice(-30) };
    saveTrackingData(updated); setNewWater('');
  };

  const addSleepEntry = () => {
    if (!newSleep) return;
    const updated = { ...trackingData, sleep: [...trackingData.sleep, { date: new Date().toISOString().split('T')[0], value: parseFloat(newSleep) }].slice(-30) };
    saveTrackingData(updated); setNewSleep('');
  };

  const deleteEntry = (type, index) => {
    const updated = { ...trackingData, [type]: trackingData[type].filter((_, i) => i !== index) };
    saveTrackingData(updated);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} setSelectedMealCategory={(c) => { setActiveTab(c); setCurrentPage('meal-planner'); }} setSelectedPost={setSelectedPost} t={t} />;
      case 'bmi': return <BMICalculatorPage bmiWeight={bmiWeight} setBmiWeight={setBmiWeight} bmiHeight={bmiHeight} setBmiHeight={setBmiHeight} calculateBMI={calculateBMI} bmiResult={bmiResult} setCurrentPage={setCurrentPage} t={t} />;
      case 'calories': return <CaloriesCalculatorPage calWeight={calWeight} setCalWeight={setCalWeight} calHeight={calHeight} setCalHeight={setCalHeight} calAge={calAge} setCalAge={setCalAge} calGender={calGender} setCalGender={setCalGender} calActivity={calActivity} setCalActivity={setCalActivity} calculateCalories={calculateCalories} calResult={calResult} setCurrentPage={setCurrentPage} t={t} />;
      case 'water': return <WaterCalculatorPage waterWeight={waterWeight} setWaterWeight={setWaterWeight} waterActivity={waterActivity} setWaterActivity={setWaterActivity} calculateWater={calculateWater} waterResult={waterResult} setCurrentPage={setCurrentPage} t={t} />;
      case 'ideal-weight': return <IdealWeightPage idealHeight={idealHeight} setIdealHeight={setIdealHeight} idealGender={idealGender} setIdealGender={setIdealGender} calculateIdealWeight={calculateIdealWeight} idealResult={idealResult} setCurrentPage={setCurrentPage} t={t} />;
      case 'sleep': return <SleepCalculatorPage sleepAge={sleepAge} setSleepAge={setSleepAge} calculateSleep={calculateSleep} sleepResult={sleepResult} sleepBedtime={sleepBedtime} setSleepBedtime={setSleepBedtime} calculateSleepCycles={calculateSleepCycles} sleepWakeupTimes={sleepWakeupTimes} setCurrentPage={setCurrentPage} t={t} />;
      case 'body-fat': return <BodyFatCalculatorPage bfWeight={bfWeight} setBfWeight={setBfWeight} bfHeight={bfHeight} setBfHeight={setBfHeight} bfAge={bfAge} setBfAge={setBfAge} bfGender={bfGender} setBfGender={setBfGender} bfNeck={bfNeck} setBfNeck={setBfNeck} bfWaist={bfWaist} setBfWaist={setBfWaist} bfHip={bfHip} setBfHip={setBfHip} calculateBodyFat={calculateBodyFat} bfResult={bfResult} setCurrentPage={setCurrentPage} t={t} />;
      case 'bmr': return <BMRCalculatorPage bmrWeight={bmrWeight} setBmrWeight={setBmrWeight} bmrHeight={bmrHeight} setBmrHeight={setBmrHeight} bmrAge={bmrAge} setBmrAge={setBmrAge} bmrGender={bmrGender} setBmrGender={setBmrGender} calculateBMR={calculateBMR} bmrResult={bmrResult} setCurrentPage={setCurrentPage} t={t} />;
      case 'macro': return <MacroCalculatorPage macroCalories={macroCalories} setMacroCalories={setMacroCalories} macroDiet={macroDiet} setMacroDiet={setMacroDiet} calculateMacros={calculateMacros} macroResult={macroResult} setCurrentPage={setCurrentPage} t={t} />;
      case '1rm': return <OneRepMaxCalculatorPage ormWeight={ormWeight} setOrmWeight={setOrmWeight} ormReps={ormReps} setOrmReps={setOrmReps} calculateORM={calculateORM} ormResult={ormResult} setCurrentPage={setCurrentPage} t={t} />;
      case 'meal-planner': return <MealPlannerPage selectedMealCategory={activeTab} setSelectedMealCategory={setActiveTab} t={t} />;
      case 'blog': return <BlogPage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} t={t} />;
      case 'blog-post': return <BlogPostPage post={selectedPost} setCurrentPage={setCurrentPage} t={t} />;
      case 'tracking': return <DailyTrackingPage activeTab={activeTab} setActiveTab={setActiveTab} trackingData={trackingData} newWeight={newWeight} setNewWeight={setNewWeight} addWeightEntry={addWeightEntry} newWater={newWater} setNewWater={setNewWater} addWaterEntry={addWaterEntry} newSleep={newSleep} setNewSleep={setNewSleep} addSleepEntry={addSleepEntry} deleteEntry={deleteEntry} setCurrentPage={setCurrentPage} t={t} />;
      case 'about': return <AboutPage setCurrentPage={setCurrentPage} t={t} />;
      case 'how-it-works': return <HowItWorksPage setCurrentPage={setCurrentPage} />;
      case 'experts': return <ExpertPage setCurrentPage={setCurrentPage} t={t} />;
      case 'contact': return <ContactPage setCurrentPage={setCurrentPage} t={t} />;
      case 'privacy': return <PrivacyPolicyPage setCurrentPage={setCurrentPage} t={t} />;
      case 'terms': return <TermsOfUsePage setCurrentPage={setCurrentPage} t={t} />;
      case 'disclaimer': return <DisclaimerPage setCurrentPage={setCurrentPage} t={t} />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <NavBar setCurrentPage={setCurrentPage} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} t={t} theme={theme} setTheme={setTheme} />
      <main className="min-h-[calc(100-80px)]">
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer setCurrentPage={setCurrentPage} t={t} />
    </div>
  );
};

export default DailyHealthTools;
