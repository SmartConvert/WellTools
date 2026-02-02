import React, { useState, useEffect } from 'react';
import { Calculator, Heart, Droplet, Globe, Scale, Apple, TrendingDown, Activity, Utensils, ChevronRight, Menu, X, Percent, TrendingUp, Calendar, BarChart3, LineChart as LineChartIcon, Plus, Trash2, BookOpen, ArrowLeft, ExternalLink, Moon } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import postsData from './data/posts.json';
import { translations } from './translations';

// Meal Data
const mealCategories = {
  weightLoss: {
    title: 'about_meals_title',
    icon: TrendingDown,
    color: 'from-emerald-400 to-teal-500',
    meals: [
      { name: 'meal_chicken_salad', calories: 350, protein: '35g', carbs: '20g', fat: '12g' },
      { name: 'meal_veggie_stir_fry', calories: 280, protein: '18g', carbs: '32g', fat: '8g' },
      { name: 'meal_baked_salmon', calories: 400, protein: '38g', carbs: '15g', fat: '20g' },
      { name: 'meal_yogurt_bowl', calories: 220, protein: '15g', carbs: '28g', fat: '5g' },
      { name: 'meal_quinoa_bowl', calories: 320, protein: '14g', carbs: '48g', fat: '7g' }
    ]
  },
  diabetes: {
    title: 'diabetes_friendly_meals',
    icon: Activity,
    color: 'from-blue-400 to-indigo-500',
    meals: [
      { name: 'meal_lentil_soup', calories: 250, protein: '14g', carbs: '38g', fat: '4g', gi: 'Low' },
      { name: 'meal_grilled_fish', calories: 320, protein: '35g', carbs: '12g', fat: '15g', gi: 'Low' },
      { name: 'meal_chicken_cauliflower', calories: 290, protein: '32g', carbs: '18g', fat: '10g', gi: 'Low' },
      { name: 'meal_egg_white_omelet', calories: 180, protein: '20g', carbs: '8g', fat: '7g', gi: 'Low' },
      { name: 'meal_turkey_wraps', calories: 240, protein: '28g', carbs: '10g', fat: '9g', gi: 'Low' }
    ]
  },
  bloodPressure: {
    title: 'blood_pressure_friendly_meals',
    icon: Heart,
    color: 'from-rose-400 to-pink-500',
    meals: [
      { name: 'meal_oatmeal_banana', calories: 320, protein: '10g', sodium: '5mg', potassium: 'High' },
      { name: 'meal_baked_chicken_potato', calories: 380, protein: '35g', sodium: '80mg', potassium: 'High' },
      { name: 'meal_spinach_avocado', calories: 240, protein: '8g', sodium: '40mg', potassium: 'High' },
      { name: 'meal_grilled_salmon_kale', calories: 410, protein: '38g', sodium: '95mg', potassium: 'High' },
      { name: 'meal_bean_stew', calories: 280, protein: '15g', sodium: '120mg', potassium: 'High' }
    ]
  },
  healthy: {
    title: 'general_healthy_meals',
    icon: Apple,
    color: 'from-amber-400 to-orange-500',
    meals: [
      { name: 'meal_mediterranean_bowl', calories: 450, protein: '22g', carbs: '52g', fat: '18g' },
      { name: 'meal_chicken_brown_rice', calories: 420, protein: '400g', carbs: '45g', fat: '8g' },
      { name: 'meal_veggie_pasta', calories: 380, protein: '14g', carbs: '58g', fat: '12g' },
      { name: 'meal_smoothie_bowl', calories: 340, protein: '12g', carbs: '54g', fat: '10g' },
      { name: 'meal_tuna_sandwich', calories: 360, protein: '28g', carbs: '38g', fat: '10g' }
    ]
  },
  weightGain: {
    title: 'weight_gain_meals',
    icon: Scale,
    color: 'from-violet-400 to-purple-500',
    meals: [
      { name: 'meal_protein_pancakes', calories: 620, protein: '35g', carbs: '65g', fat: '22g' },
      { name: 'meal_beef_rice_bowl', calories: 780, protein: '45g', carbs: '82g', fat: '28g' },
      { name: 'meal_pasta_meat_sauce', calories: 720, protein: '38g', carbs: '88g', fat: '24g' },
      { name: 'meal_chicken_avocado_wrap', calories: 680, protein: '42g', carbs: '54g', fat: '32g' },
      { name: 'meal_mass_gainer', calories: 850, protein: '40g', carbs: '98g', fat: '30g' }
    ]
  }
};

const tools = [
  { id: 'bmi', name: 'BMI Calculator', icon: Calculator, color: 'from-cyan-400 to-blue-500', description: 'Calculate your Body Mass Index' },
  { id: 'calories', name: 'Calories Calculator', icon: Activity, color: 'from-green-400 to-emerald-500', description: 'Find your daily calorie needs' },
  { id: 'water', name: 'Water Intake', icon: Droplet, color: 'from-blue-400 to-cyan-500', description: 'How much water should you drink?' },
  { id: 'ideal-weight', name: 'Ideal Weight', icon: Scale, color: 'from-purple-400 to-pink-500', description: 'Calculate your ideal body weight' },
  { id: 'sleep', name: 'Sleep Duration', icon: Moon, color: 'from-indigo-400 to-purple-500', description: 'Recommended sleep hours by age' },
  { id: 'body-fat', name: 'Body Fat %', icon: Percent, color: 'from-orange-400 to-red-500', description: 'Calculate body fat percentage' }
];

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

const NavBar = ({ setCurrentPage, setMobileMenuOpen, mobileMenuOpen, lang, setLang, t }) => (
  <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-2xl font-black bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
            WellTools
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <button onClick={() => setCurrentPage('home')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.nav_home}
          </button>
          <button onClick={() => setCurrentPage('calculators')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.nav_apps}
          </button>
          <button onClick={() => setCurrentPage('tracking')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.daily_tracking}
          </button>
          <button onClick={() => setCurrentPage('meals')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.meal_suggestions}
          </button>
          <button onClick={() => setCurrentPage('blog')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.nav_blog}
          </button>
          <button onClick={() => setCurrentPage('about')} className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold">
            {t.nav_about}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative group">
            <button
              aria-label="Change Language"
              className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-bold uppercase">{lang}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              {['en', 'ar', 'fr', 'de', 'es'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-between ${lang === l ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  <span className="uppercase font-bold">{l}</span>
                  {lang === l && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>

          <button className="lg:hidden p-2 text-gray-600 dark:text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

    {mobileMenuOpen && (
      <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="px-4 py-4 space-y-3">
          <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.nav_home}
          </button>
          <button onClick={() => { setCurrentPage('calculators'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.nav_apps}
          </button>
          <button onClick={() => { setCurrentPage('tracking'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.daily_tracking}
          </button>
          <button onClick={() => { setCurrentPage('meals'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.meal_suggestions}
          </button>
          <button onClick={() => { setCurrentPage('blog'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
            {t.nav_blog}
          </button>
          <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors font-semibold">
            {t.nav_about}
          </button>

          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{t.language}</p>
            <div className="grid grid-cols-5 gap-2 px-4">
              {['en', 'ar', 'fr', 'de', 'es'].map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setMobileMenuOpen(false); }}
                  className={`py-2 rounded-xl text-xs font-black uppercase transition-all border ${lang === l ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </nav>
);
const HomePage = ({ setCurrentPage, setSelectedMealCategory, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 lg:mb-20 animate-fade-in">
        <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
          {t.hero_title} <br className="md:hidden" /><span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t.hero_title_accent}</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          {t.hero_subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('tools-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            {t.explore_tools}
          </button>
          <button
            onClick={() => setCurrentPage('blog')}
            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-100 dark:border-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
          >
            {t.nav_blog}
          </button>
        </div>
      </div>

      <AdComponent slot="home_top" />

      {/* Tools Grid */}
      <div id="tools-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-20">
        {[
          { id: 'bmi', name: t.bmi_calc, icon: Calculator, color: 'from-cyan-400 to-blue-500', description: t.bmi_desc },
          { id: 'calories', name: t.calories_calc, icon: Activity, color: 'from-emerald-400 to-teal-500', description: t.calories_desc },
          { id: 'water', name: t.water_calc, icon: Droplet, color: 'from-blue-400 to-indigo-500', description: t.water_desc },
          { id: 'ideal-weight', name: t.ideal_weight, icon: Scale, color: 'from-rose-400 to-pink-500', description: t.ideal_weight_desc },
          { id: 'sleep', name: t.sleep_calc, icon: Moon, color: 'from-violet-400 to-purple-500', description: t.sleep_desc },
          { id: 'body-fat', name: t.body_fat_calc, icon: Percent, color: 'from-orange-400 to-red-500', description: t.body_fat_desc }
        ].map((tool) => (
          <div
            key={tool.id}
            onClick={() => setCurrentPage(tool.id)}
            className="group bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-50 dark:border-gray-700 hover:-translate-y-2"
          >
            <div className={`w-16 h-16 bg-linear-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <tool.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{tool.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{tool.description}</p>
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold gap-2">
              {t.explore_tool} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Daily Tracking & Meals Feature Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-20">
        <div
          onClick={() => setCurrentPage('tracking')}
          className="group relative bg-linear-to-br from-gray-900 to-slate-900 p-10 rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl hover:-translate-y-1 transition-all"
        >
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t.daily_tracking}</h3>
            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md">{t.daily_tracking_desc}</p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors">
              {t.open_dashboard} <ChevronRight className="w-5 h-5" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] -mr-32 -mt-32"></div>
        </div>

        <div
          onClick={() => setCurrentPage('meals')}
          className="group relative bg-linear-to-br from-emerald-600 to-teal-700 p-10 rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl hover:-translate-y-1 transition-all"
        >
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
              <Apple className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t.meal_suggestions}</h3>
            <p className="text-emerald-100 text-base md:text-lg mb-8 max-w-md">{t.meal_suggestions_desc}</p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
              {t.view_meal_plans} <ChevronRight className="w-5 h-5" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  </div>
);

const BMICalculatorPage = ({ bmiWeight, setBmiWeight, bmiHeight, setBmiHeight, calculateBMI, bmiResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.bmi_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.bmi_desc}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
            <input
              type="number"
              value={bmiWeight}
              onChange={(e) => setBmiWeight(e.target.value)}
              placeholder="70"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors text-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
            <input
              type="number"
              value={bmiHeight}
              onChange={(e) => setBmiHeight(e.target.value)}
              placeholder="175"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors text-lg"
            />
          </div>

          <button
            onClick={calculateBMI}
            className="w-full py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {t.calculate}
          </button>
        </div>

        {bmiResult && (
          <div className="mt-8 p-8 bg-linear-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">{t.result}:</h3>
            <div className="space-y-3 text-center">
              <p className="text-5xl font-black text-cyan-600 dark:text-cyan-400">{bmiResult.bmi}</p>
              <p className={`text-2xl font-bold ${bmiResult.color}`}>{t[bmiResult.category]}</p>
            </div>
          </div>
        )}

        {/* SEO Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-500" />
            {t.nav_about} {t.bmi_calc}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {t.bmi_how_it_works}
          </p>
        </div>

        <AdComponent slot="bmi_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const CaloriesCalculatorPage = ({ calWeight, setCalWeight, calHeight, setCalHeight, calAge, setCalAge, calGender, setCalGender, calActivity, setCalActivity, calculateCalories, calResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.calories_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.calories_desc}
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
              <input
                type="number"
                value={calWeight}
                onChange={(e) => setCalWeight(e.target.value)}
                placeholder="70"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
              <input
                type="number"
                value={calHeight}
                onChange={(e) => setCalHeight(e.target.value)}
                placeholder="175"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
              <input
                type="number"
                value={calAge}
                onChange={(e) => setCalAge(e.target.value)}
                placeholder="25"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
              <select
                value={calGender}
                onChange={(e) => setCalGender(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              >
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.activity_level}</label>
            <select
              value={calActivity}
              onChange={(e) => setCalActivity(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
            >
              <option value="sedentary">{t.activity_sedentary}</option>
              <option value="light">{t.activity_light}</option>
              <option value="moderate">{t.activity_moderate}</option>
              <option value="active">{t.activity_active}</option>
              <option value="veryActive">{t.activity_very_active}</option>
            </select>
          </div>

          <button
            onClick={calculateCalories}
            className="w-full py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {t.calculate}
          </button>
        </div>

        {calResult && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-scale-in">
            <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 text-center shadow-lg hover:scale-105 transition-all">
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.maintain_weight}</p>
              <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{calResult.maintain}</p>
              <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
            </div>
            <div className="p-6 bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 text-center shadow-lg hover:scale-105 transition-all">
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.weight_loss}</p>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{calResult.loss}</p>
              <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
            </div>
            <div className="p-6 bg-linear-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 rounded-2xl border-2 border-rose-200 dark:border-rose-800 text-center shadow-lg hover:scale-105 transition-all">
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{t.weight_gain}</p>
              <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{calResult.gain}</p>
              <p className="text-sm font-semibold text-gray-500">{t.calories_day}</p>
            </div>
          </div>
        )}

        {/* SEO Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            {t.nav_about} {t.calories_calc}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {t.calories_how_it_works}
          </p>
        </div>

        <AdComponent slot="calories_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const WaterCalculatorPage = ({ waterWeight, setWaterWeight, waterActivity, setWaterActivity, calculateWater, waterResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Droplet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.water_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.water_desc}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
            <input
              type="number"
              value={waterWeight}
              onChange={(e) => setWaterWeight(e.target.value)}
              placeholder="70"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.activity_level}</label>
            <select
              value={waterActivity}
              onChange={(e) => setWaterActivity(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
            >
              <option value="low">{t.activity_low}</option>
              <option value="moderate">{t.activity_moderate}</option>
              <option value="high">{t.activity_high}</option>
            </select>
          </div>

          <button
            onClick={calculateWater}
            className="w-full py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t.calculate}
          </button>
        </div>

        {waterResult && (
          <div className="mt-8 p-8 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t.result}:</h3>
            <div className="flex items-center gap-4">
              <Droplet className="w-12 h-12 text-blue-500" fill="currentColor" />
              <p className="text-5xl font-black text-blue-600 dark:text-blue-400">{waterResult} {t.unit_liter}</p>
            </div>
          </div>
        )}

        {/* SEO Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            {t.nav_about} {t.water_calc}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {t.water_how_it_works}
          </p>
        </div>

        <AdComponent slot="water_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const IdealWeightPage = ({ idealHeight, setIdealHeight, idealGender, setIdealGender, calculateIdealWeight, idealResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.ideal_weight}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.ideal_weight_desc}
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
              <input
                type="number"
                value={idealHeight}
                onChange={(e) => setIdealHeight(e.target.value)}
                placeholder="175"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
              <select
                value={idealGender}
                onChange={(e) => setIdealGender(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 focus:outline-none transition-colors text-lg"
              >
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateIdealWeight}
            className="w-full py-4 bg-linear-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t.calculate}
          </button>
        </div>

        {idealResult && (
          <div className="mt-8 p-8 bg-linear-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-rose-200 dark:border-rose-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t.result}:</h3>
            <div className="space-y-4">
              <p className="text-5xl font-black text-rose-600 dark:text-rose-400">{idealResult.ideal} <span className="text-2xl">{t.unit_kg}</span></p>
              <div className="flex gap-4">
                <div className="flex-1 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Min</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-200">{idealResult.min} {t.unit_kg}</p>
                </div>
                <div className="flex-1 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Max</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-200">{idealResult.max} {t.unit_kg}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-rose-500" />
            {t.nav_about} {t.ideal_weight}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {t.ideal_weight_how_it_works}
          </p>
        </div>

        <AdComponent slot="ideal_weight_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const SleepCalculatorPage = ({ sleepAge, setSleepAge, calculateSleep, sleepResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Moon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.sleep_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.sleep_desc}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
            <input
              type="number"
              value={sleepAge}
              onChange={(e) => setSleepAge(e.target.value)}
              placeholder="30"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none transition-colors text-lg"
            />
          </div>

          <button
            onClick={calculateSleep}
            className="w-full py-4 bg-linear-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t.calculate}
          </button>
        </div>

        {sleepResult && (
          <div className="mt-8 p-8 bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-violet-200 dark:border-violet-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t.result}:</h3>
            <p className="text-4xl font-black text-violet-600 dark:text-violet-400">{sleepResult}</p>
          </div>
        )}

        {/* SEO Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-violet-500" />
            {t.nav_about} {t.sleep_calc}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {t.sleep_how_it_works}
          </p>
        </div>

        <AdComponent slot="sleep_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const BodyFatCalculatorPage = ({ bfWeight, setBfWeight, bfHeight, setBfHeight, bfAge, setBfAge, bfGender, setBfGender, bfNeck, setBfNeck, bfWaist, setBfWaist, bfHip, setBfHip, calculateBodyFat, bfResult, setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Percent className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.body_fat_calc}</h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          {t.body_fat_desc}
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.weight} ({t.unit_kg})</label>
              <input
                type="number"
                value={bfWeight}
                onChange={(e) => setBfWeight(e.target.value)}
                placeholder="70"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.height} ({t.unit_cm})</label>
              <input
                type="number"
                value={bfHeight}
                onChange={(e) => setBfHeight(e.target.value)}
                placeholder="175"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.age}</label>
              <input
                type="number"
                value={bfAge}
                onChange={(e) => setBfAge(e.target.value)}
                placeholder="25"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.gender}</label>
              <select
                value={bfGender}
                onChange={(e) => setBfGender(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">{t.measurements} ({t.unit_cm})</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.neck}</label>
                <input
                  type="number"
                  value={bfNeck}
                  onChange={(e) => setBfNeck(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.waist}</label>
                <input
                  type="number"
                  value={bfWaist}
                  onChange={(e) => setBfWaist(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              {bfGender === 'female' && (
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{t.hip}</label>
                  <input
                    type="number"
                    value={bfHip}
                    onChange={(e) => setBfHip(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={calculateBodyFat}
            className="w-full py-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t.calculate}
          </button>
        </div>

        {bfResult && (
          <div className="mt-8 p-8 bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border-2 border-orange-200 dark:border-orange-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.result}:</h3>
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-5xl font-black text-orange-600 dark:text-orange-400">{bfResult.bodyFat}%</p>
              <p className={`text-2xl font-bold ${bfResult.color} mt-2`}>{bfResult.category}</p>
            </div>
          </div>
        )}

        {/* SEO Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-orange-500" />
            {t.nav_about} {t.body_fat_calc}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {t.body_fat_how_it_works}
          </p>
        </div>

        <AdComponent slot="body_fat_bottom" />
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const DailyTrackingPage = ({ trackingData, newWeight, setNewWeight, addWeightEntry, newWater, setNewWater, addWaterEntry, newSleep, setNewSleep, addSleepEntry, deleteEntry, setCurrentPage, t }) => {
  const [activeTab, setActiveTab] = useState('weight');

  const weightChartData = trackingData.weight.map(entry => ({
    date: entry.date,
    weight: entry.value
  }));

  const waterChartData = trackingData.water.map(entry => ({
    date: entry.date,
    liters: entry.value
  }));

  const sleepChartData = trackingData.sleep.map(entry => ({
    date: entry.date,
    hours: entry.value
  }));

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">{t.daily_tracking}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{t.tracking_subtitle}</p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setCurrentPage('calculators')}
            className="px-6 py-3 rounded-xl font-semibold transition-all bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
          >
            <Calculator className="w-5 h-5 inline mr-2" />
            {t.nav_apps}
          </button>
          <button
            onClick={() => setActiveTab('weight')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'weight'
              ? 'bg-linear-to-r from-violet-500 to-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
              }`}
          >
            <Scale className="w-5 h-5 inline mr-2" />
            {t.weight}
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'water'
              ? 'bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
              }`}
          >
            <Droplet className="w-5 h-5 inline mr-2" />
            {t.water_calc}
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'sleep'
              ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
              }`}
          >
            <Moon className="w-5 h-5 inline mr-2" />
            {t.sleep_calc}
          </button>
        </div>

        {activeTab === 'weight' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <Scale className="w-8 h-8 text-violet-600" />
                {t.weight} {t.history}
              </h2>

              <div className="flex gap-4 mb-6">
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder={`${t.weight} (${t.unit_kg})`}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none transition-colors text-lg"
                />
                <button
                  onClick={addWeightEntry}
                  className="px-8 py-4 bg-linear-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  {t.add_entry}
                </button>
              </div>

              {weightChartData.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={weightChartData}>
                      <defs>
                        <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '2px solid #8b5cf6',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="weight"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fill="url(#weightGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                {trackingData.weight.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">{t.no_entries}</p>
                ) : (
                  <div className="space-y-2">
                    {[...trackingData.weight].reverse().slice(0, 10).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-linear-to-r from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 rounded-xl border border-violet-100 dark:border-violet-900/30">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.unit_kg}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                        </div>
                        <button
                          onClick={() => deleteEntry('weight', trackingData.weight.length - 1 - index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'water' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <Droplet className="w-8 h-8 text-blue-600" />
                {t.water_calc} {t.history}
              </h2>

              <div className="flex gap-4 mb-6">
                <input
                  type="number"
                  value={newWater}
                  onChange={(e) => setNewWater(e.target.value)}
                  placeholder={t.liters}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
                />
                <button
                  onClick={addWaterEntry}
                  className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  {t.add_entry}
                </button>
              </div>

              {waterChartData.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={waterChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '2px solid #3b82f6',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Bar dataKey="liters" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                {trackingData.water.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">{t.no_entries}</p>
                ) : (
                  <div className="space-y-2">
                    {[...trackingData.water].reverse().slice(0, 10).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.liters}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                        </div>
                        <button
                          onClick={() => deleteEntry('water', trackingData.water.length - 1 - index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sleep' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <Moon className="w-8 h-8 text-indigo-600" />
                {t.sleep_calc} {t.history}
              </h2>

              <div className="flex gap-4 mb-6">
                <input
                  type="number"
                  value={newSleep}
                  onChange={(e) => setNewSleep(e.target.value)}
                  placeholder={t.hours}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors text-lg"
                />
                <button
                  onClick={addSleepEntry}
                  className="px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  {t.add_entry}
                </button>
              </div>

              {sleepChartData.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sleepChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '2px solid #6366f1',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ fill: '#6366f1', r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                {trackingData.sleep.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">{t.no_entries}</p>
                ) : (
                  <div className="space-y-2">
                    {[...trackingData.sleep].reverse().slice(0, 10).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.hours}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                        </div>
                        <button
                          onClick={() => deleteEntry('sleep', trackingData.sleep.length - 1 - index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
        >
          {t.back_to_home}
        </button>
      </div>
    </div>
  );
};

const MealsPage = ({ selectedMealCategory, setSelectedMealCategory, t }) => {
  const selectedCategory = selectedMealCategory ? mealCategories[selectedMealCategory] : null;

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          {t.meals_title}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          {t.meals_subtitle}
        </p>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(mealCategories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <div
                  key={key}
                  onClick={() => setSelectedMealCategory(key)}
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className={`w-16 h-16 bg-linear-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    {t[category.title]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {category.meals.length} {t.explore_tool}
                  </p>
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold group-hover:gap-2 transition-all">
                    {t.view_meals} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedMealCategory(null)}
              className="mb-8 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              ← {t.back_to_categories}
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-gray-50 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 bg-linear-to-br ${selectedCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  {React.createElement(selectedCategory.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  {t[selectedCategory.title]}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategory.meals.map((meal, index) => (
                  <div
                    key={index}
                    className="p-6 bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Utensils className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t[meal.name]}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.calories}</p>
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{meal.calories}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.protein}</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{meal.protein}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.carbs}</p>
                        <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{meal.carbs}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.fat}</p>
                        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{meal.fat}</p>
                      </div>
                      {meal.gi && (
                        <div className="col-span-2 bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.gi}</p>
                          <p className="text-lg font-bold text-green-600">{meal.gi}</p>
                        </div>
                      )}
                      {meal.sodium && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.sodium}</p>
                          <p className="text-lg font-bold text-rose-600 dark:text-rose-400">{meal.sodium}</p>
                        </div>
                      )}
                      {meal.potassium && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-50 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.potassium}</p>
                          <p className="text-lg font-bold text-teal-600">{meal.potassium}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-6 rounded-2xl shadow-md mt-8">
          <p className="text-amber-800 dark:text-amber-200 font-medium">
            {t.meals_note}
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.about_title}</h1>

        <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <p>{t.about_desc}</p>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.mission_title}</h2>
          <p>{t.mission_desc}</p>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.what_we_offer}</h2>
          <ul className="space-y-3 ml-6">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <span><strong>{t.about_calculators_title}:</strong> {t.about_calculators_desc}</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <span><strong>{t.about_tracking_title}:</strong> {t.about_tracking_desc}</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <span><strong>{t.about_meals_title}:</strong> {t.about_meals_desc}</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <span><strong>{t.about_easy_title}:</strong> {t.about_easy_desc}</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <span><strong>{t.about_no_reg_title}:</strong> {t.about_no_reg_desc}</span>
            </li>
          </ul>

          <div className="bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-400 p-6 rounded-2xl mt-8">
            <h3 className="text-xl font-bold text-rose-800 dark:text-rose-400 mb-3">{t.disclaimer_title}</h3>
            <p className="text-rose-700 dark:text-rose-300 leading-relaxed text-base">
              {t.disclaimer_desc}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const TermsOfUsePage = ({ setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.terms}</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <p>{t.terms_intro}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_usage_title}</h2>
          <p>{t.terms_usage_desc}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_intellectual_title}</h2>
          <p>{t.terms_intellectual_desc}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.terms_liability_title}</h2>
          <p>{t.terms_liability_desc}</p>
        </div>
      </div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const DisclaimerPage = ({ setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.disclaimer}</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <div className="bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-400 p-6 rounded-2xl mb-8">
            <p className="text-rose-800 dark:text-rose-400 font-bold mb-4">{t.disclaimer_title}</p>
            <p className="text-rose-700 dark:text-rose-300">{t.disclaimer_desc}</p>
          </div>
          <p>{t.medical_disclaimer_intro}</p>
        </div>
      </div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const PrivacyPolicyPage = ({ setCurrentPage, t }) => (
  <div className="pt-24 pb-16 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">{t.privacy}</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <p>{t.privacy_intro}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.privacy_collection_title}</h2>
          <p>{t.privacy_collection_desc}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{t.privacy_storage_title}</h2>
          <p>{t.privacy_storage_desc}</p>
        </div>
      </div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
      >
        {t.back_to_home}
      </button>
    </div>
  </div>
);

const ContactPage = ({ setCurrentPage, t }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('https://formspree.io/f/mykpwodd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, subject, message })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setEmail(''); setSubject(''); setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-50 dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">{t.contact_title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{t.contact_subtitle}</p>
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-400 dark:border-emerald-600 rounded-2xl text-emerald-900 dark:text-emerald-200 animate-fade-in">
              <p className="font-bold text-xl mb-1">{t.msg_sent_success}</p>
              <p>{t.msg_sent_desc}</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-8 p-6 bg-rose-100 dark:bg-rose-900/30 border-2 border-rose-400 dark:border-rose-600 rounded-2xl text-rose-900 dark:text-rose-200 animate-fade-in">
              <p className="font-bold text-xl mb-1">{t.msg_error}</p>
              <p>{t.msg_error_desc}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.your_email}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg" />
            </div>
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.subject}</label>
              <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t.subject} className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg" />
            </div>
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-bold mb-2">{t.message}</label>
              <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.message} rows="5" className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors text-lg resize-none"></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg transform transition-all duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-linear-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:-translate-y-1'}`}>
              {isSubmitting ? t.sending : t.send_message}
            </button>
          </form>
        </div>
        <button onClick={() => setCurrentPage('home')} className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
          {t.back_to_home}
        </button>
      </div>
    </div>
  );
};

const BlogPage = ({ setCurrentPage, setSelectedPost, t, lang }) => {
  // Fallback to English if no posts in current language
  const posts = (postsData[lang] && postsData[lang].length > 0) ? postsData[lang] : (postsData['en'] || []);
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            {t.blog_title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.blog_subtitle}
          </p>
        </div>

        <AdComponent slot="blog_top" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
              {post.image && (
                <div className="relative h-64 overflow-hidden bg-gray-800">
                  <img src={post.image} alt={post.imageAlt || post.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              <div className="p-8 grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">{post.category}</span>
                  <span className="text-gray-400 text-sm">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="p-8 pt-0 mt-auto">
                <button onClick={() => { setSelectedPost(post); setCurrentPage('blog-post'); window.scrollTo(0, 0); }} className="w-full py-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {t.read_article} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">{t.no_posts}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const BlogPostPage = ({ post, setCurrentPage, t }) => {
  if (!post) return null;
  return (
    <div className="bg-white dark:bg-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setCurrentPage('blog')} className="mb-8 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 font-bold transition-all group">
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-emerald-50">
            <ArrowLeft className="w-5 h-5" />
          </div>
          {t.back_to_blog}
        </button>
        <header className="mb-12">
          {post.image && (
            <div className="w-full h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl bg-gray-800">
              <img src={post.image} alt={post.imageAlt || post.title} decoding="async" className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8 tracking-tight">{post.title}</h1>
        </header>
        <article className="prose prose-lg prose-emerald dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-8 leading-relaxed">
          {post.content.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
        </article>
        {post.faq && post.faq.length > 0 && (
          <div className="mt-20 p-8 md:p-12 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] border border-slate-200 dark:border-gray-700">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-8">{t.faq_title}</h2>
            <div className="space-y-6">
              {post.faq.map((item, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{item.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <AdComponent slot="blog_post_bottom" />
      </div>
    </div>
  );
};

const DailyHealthTools = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Safe Language Initialization
  const getInitialLang = () => {
    const saved = localStorage.getItem('lang');
    if (saved && translations[saved]) return saved;
    return 'en';
  };

  const [lang, setLang] = useState(getInitialLang());

  const t = translations[lang] || translations['en']; // Fallback safety

  useEffect(() => {
    localStorage.setItem('lang', lang);
    if (t?.dir) {
      document.documentElement.dir = t.dir;
    }
    document.documentElement.lang = lang;
  }, [lang, t]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // BMI Calculator State
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // Calories Calculator State
  const [calWeight, setCalWeight] = useState('');
  const [calHeight, setCalHeight] = useState('');
  const [calAge, setCalAge] = useState('');
  const [calGender, setCalGender] = useState('male');
  const [calActivity, setCalActivity] = useState('sedentary');
  const [calResult, setCalResult] = useState(null);

  // Water Calculator State
  const [waterWeight, setWaterWeight] = useState('');
  const [waterActivity, setWaterActivity] = useState('low');
  const [waterResult, setWaterResult] = useState(null);

  // Ideal Weight Calculator State
  const [idealHeight, setIdealHeight] = useState('');
  const [idealGender, setIdealGender] = useState('male');
  const [idealResult, setIdealResult] = useState(null);

  // Sleep Calculator State
  const [sleepAge, setSleepAge] = useState('');
  const [sleepResult, setSleepResult] = useState(null);

  // Body Fat Calculator State
  const [bfWeight, setBfWeight] = useState('');
  const [bfHeight, setBfHeight] = useState('');
  const [bfAge, setBfAge] = useState('');
  const [bfGender, setBfGender] = useState('male');
  const [bfNeck, setBfNeck] = useState('');
  const [bfWaist, setBfWaist] = useState('');
  const [bfHip, setBfHip] = useState('');
  const [bfResult, setBfResult] = useState(null);

  // Daily Tracking State
  const [trackingData, setTrackingData] = useState({
    weight: [],
    water: [],
    sleep: []
  });
  const [newWeight, setNewWeight] = useState('');
  const [newWater, setNewWater] = useState('');
  const [newSleep, setNewSleep] = useState('');

  // Selected Meal Category
  const [selectedMealCategory, setSelectedMealCategory] = useState(null);

  // Load tracking data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('healthTracking');
    if (saved) {
      setTrackingData(JSON.parse(saved));
    }
  }, []);

  // Save tracking data to localStorage
  const saveTrackingData = (data) => {
    setTrackingData(data);
    localStorage.setItem('healthTracking', JSON.stringify(data));
  };

  // Calculator Functions
  const calculateBMI = () => {
    const weight = parseFloat(bmiWeight);
    const height = parseFloat(bmiHeight) / 100;
    const bmi = (weight / (height * height)).toFixed(1);

    let category = '';
    let color = '';
    if (bmi < 18.5) { category = t.cat_underweight; color = 'text-blue-600'; }
    else if (bmi < 25) { category = t.cat_normal; color = 'text-green-600'; }
    else if (bmi < 30) { category = t.cat_overweight; color = 'text-yellow-600'; }
    else { category = t.cat_obese; color = 'text-red-600'; }

    setBmiResult({ bmi, category, color });
  };

  const calculateCalories = () => {
    const weight = parseFloat(calWeight);
    const height = parseFloat(calHeight);
    const age = parseInt(calAge);

    let bmr;
    if (calGender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = Math.round(bmr * activityMultipliers[calActivity]);
    const weightLoss = Math.round(tdee - 500);
    const weightGain = Math.round(tdee + 500);

    setCalResult({ maintain: tdee, loss: weightLoss, gain: weightGain });
  };

  const calculateWater = () => {
    const weight = parseFloat(waterWeight);
    let waterIntake = weight * 0.033;

    if (waterActivity === 'moderate') waterIntake += 0.5;
    if (waterActivity === 'high') waterIntake += 1;

    setWaterResult(waterIntake.toFixed(1));
  };

  const calculateIdealWeight = () => {
    const height = parseFloat(idealHeight);
    let ideal;

    if (idealGender === 'male') {
      ideal = 50 + 0.91 * (height - 152.4);
    } else {
      ideal = 45.5 + 0.91 * (height - 152.4);
    }

    const min = (ideal * 0.9).toFixed(1);
    const max = (ideal * 1.1).toFixed(1);

    setIdealResult({ ideal: ideal.toFixed(1), min, max });
  };

  const calculateSleep = () => {
    const age = parseInt(sleepAge);
    let hours = '';

    if (age < 1) hours = `14-17 ${t.hours}`;
    else if (age < 2) hours = `11-14 ${t.hours}`;
    else if (age < 5) hours = `10-13 ${t.hours}`;
    else if (age < 13) hours = `9-11 ${t.hours}`;
    else if (age < 18) hours = `8-10 ${t.hours}`;
    else if (age < 65) hours = `7-9 ${t.hours}`;
    else hours = `7-8 ${t.hours}`;

    setSleepResult(hours);
  };

  const calculateBodyFat = () => {
    const weight = parseFloat(bfWeight);
    const height = parseFloat(bfHeight);
    const age = parseInt(bfAge);
    const neck = parseFloat(bfNeck);
    const waist = parseFloat(bfWaist);
    const hip = parseFloat(bfHip);

    let bodyFat;

    if (bfGender === 'male') {
      // US Navy formula for men
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      // US Navy formula for women
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    bodyFat = bodyFat.toFixed(1);

    let category = '';
    let color = '';

    if (bfGender === 'male') {
      if (bodyFat < 6) { category = t.cat_essential; color = 'text-blue-600'; }
      else if (bodyFat < 14) { category = t.cat_athletes; color = 'text-green-600'; }
      else if (bodyFat < 18) { category = t.cat_fitness; color = 'text-emerald-600'; }
      else if (bodyFat < 25) { category = t.cat_average; color = 'text-yellow-600'; }
      else { category = t.cat_obese; color = 'text-red-600'; }
    } else {
      if (bodyFat < 14) { category = t.cat_essential; color = 'text-blue-600'; }
      else if (bodyFat < 21) { category = t.cat_athletes; color = 'text-green-600'; }
      else if (bodyFat < 25) { category = t.cat_fitness; color = 'text-emerald-600'; }
      else if (bodyFat < 32) { category = t.cat_average; color = 'text-yellow-600'; }
      else { category = t.cat_obese; color = 'text-red-600'; }
    }

    const leanMass = (weight * (1 - bodyFat / 100)).toFixed(1);
    const fatMass = (weight * (bodyFat / 100)).toFixed(1);

    setBfResult({ bodyFat, category, color, leanMass, fatMass });
  };

  // Tracking Functions
  const addWeightEntry = () => {
    if (newWeight) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        value: parseFloat(newWeight),
        timestamp: Date.now()
      };
      const updated = {
        ...trackingData,
        weight: [...trackingData.weight, entry].slice(-30) // Keep last 30 entries
      };
      saveTrackingData(updated);
      setNewWeight('');
    }
  };

  const addWaterEntry = () => {
    if (newWater) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        value: parseFloat(newWater),
        timestamp: Date.now()
      };
      const updated = {
        ...trackingData,
        water: [...trackingData.water, entry].slice(-30)
      };
      saveTrackingData(updated);
      setNewWater('');
    }
  };

  const addSleepEntry = () => {
    if (newSleep) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        value: parseFloat(newSleep),
        timestamp: Date.now()
      };
      const updated = {
        ...trackingData,
        sleep: [...trackingData.sleep, entry].slice(-30)
      };
      saveTrackingData(updated);
      setNewSleep('');
    }
  };

  const deleteEntry = (type, index) => {
    const updated = {
      ...trackingData,
      [type]: trackingData[type].filter((_, i) => i !== index)
    };
    saveTrackingData(updated);
  };














  return (
    <div className="min-h-screen font-sans transition-colors duration-300 dark bg-gray-900 text-white">
      <style>{`
        * {
          font-family: 'Plus Jakarta Sans', 'IBM Plex Sans Arabic', sans-serif;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #06b6d4);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0891b2);
        }
      `}</style>

      <NavBar
        setCurrentPage={setCurrentPage}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      <main className="min-h-[80vh]">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} setSelectedMealCategory={setSelectedMealCategory} t={t} />}
        {currentPage === 'bmi' && <BMICalculatorPage bmiWeight={bmiWeight} setBmiWeight={setBmiWeight} bmiHeight={bmiHeight} setBmiHeight={setBmiHeight} calculateBMI={calculateBMI} bmiResult={bmiResult} setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'calories' && <CaloriesCalculatorPage calWeight={calWeight} setCalWeight={setCalWeight} calHeight={calHeight} setCalHeight={setCalHeight} calAge={calAge} setCalAge={setCalAge} calGender={calGender} setCalGender={setCalGender} calActivity={calActivity} setCalActivity={setCalActivity} calculateCalories={calculateCalories} calResult={calResult} setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'water' && <WaterCalculatorPage waterWeight={waterWeight} setWaterWeight={setWaterWeight} waterActivity={waterActivity} setWaterActivity={setWaterActivity} calculateWater={calculateWater} waterResult={waterResult} setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'ideal-weight' && <IdealWeightPage idealHeight={idealHeight} setIdealHeight={setIdealHeight} idealGender={idealGender} setIdealGender={setIdealGender} calculateIdealWeight={calculateIdealWeight} idealResult={idealResult} setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'sleep' && <SleepCalculatorPage sleepAge={sleepAge} setSleepAge={setSleepAge} calculateSleep={calculateSleep} sleepResult={sleepResult} setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'body-fat' && <BodyFatCalculatorPage bfWeight={bfWeight} setBfWeight={setBfWeight} bfHeight={bfHeight} setBfHeight={setBfHeight} bfAge={bfAge} setBfAge={setBfAge} bfGender={bfGender} setBfGender={setBfGender} bfNeck={bfNeck} setBfNeck={setBfNeck} bfWaist={bfWaist} setBfWaist={setBfWaist} bfHip={bfHip} setBfHip={setBfHip} calculateBodyFat={calculateBodyFat} bfResult={bfResult} setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'tracking' && <DailyTrackingPage trackingData={trackingData} newWeight={newWeight} setNewWeight={setNewWeight} addWeightEntry={addWeightEntry} newWater={newWater} setNewWater={setNewWater} addWaterEntry={addWaterEntry} newSleep={newSleep} setNewSleep={setNewSleep} addSleepEntry={addSleepEntry} deleteEntry={deleteEntry} setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'meals' && <MealsPage selectedMealCategory={selectedMealCategory} setSelectedMealCategory={setSelectedMealCategory} t={t} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'terms-of-use' && <TermsOfUsePage setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'disclaimer' && <DisclaimerPage setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'privacy-policy' && <PrivacyPolicyPage setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} t={t} />}
        {currentPage === 'blog' && <BlogPage setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} t={t} lang={lang} />}
        {currentPage === 'blog-post' && <BlogPostPage post={selectedPost} setCurrentPage={setCurrentPage} t={t} />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold">WellTools</span>
          </div>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">{t.footer_desc}</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            <button onClick={() => setCurrentPage('blog')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.blog}</button>
            <button onClick={() => setCurrentPage('about')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.about}</button>
            <button onClick={() => setCurrentPage('terms-of-use')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.terms}</button>
            <button onClick={() => setCurrentPage('disclaimer')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.disclaimer}</button>
            <button onClick={() => setCurrentPage('privacy-policy')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.privacy}</button>
            <button onClick={() => setCurrentPage('contact')} className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">{t.contact}</button>
          </div>
          <p className="text-gray-400 text-sm font-medium">© {new Date().getFullYear()} WellTools. {t.all_rights}</p>
          <p className="text-gray-400 text-xs mt-2 max-w-2xl mx-auto leading-relaxed opacity-80">{t.footer_medical_disclaimer}</p>
        </div>
      </footer>
    </div>
  );
};

export default DailyHealthTools;
