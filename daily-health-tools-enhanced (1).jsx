import React, { useState, useEffect } from 'react';
import { Calculator, Heart, Droplet, Moon, Scale, Apple, TrendingDown, Activity, Utensils, ChevronRight, Menu, X, Percent, TrendingUp, Calendar, BarChart3, LineChart as LineChartIcon, Plus, Trash2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const DailyHealthTools = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-600'; }
    else if (bmi < 25) { category = 'Normal weight'; color = 'text-green-600'; }
    else if (bmi < 30) { category = 'Overweight'; color = 'text-yellow-600'; }
    else { category = 'Obese'; color = 'text-red-600'; }
    
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
    
    if (age < 1) hours = '14-17 hours';
    else if (age < 2) hours = '11-14 hours';
    else if (age < 5) hours = '10-13 hours';
    else if (age < 13) hours = '9-11 hours';
    else if (age < 18) hours = '8-10 hours';
    else if (age < 65) hours = '7-9 hours';
    else hours = '7-8 hours';
    
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
      if (bodyFat < 6) { category = 'Essential Fat'; color = 'text-blue-600'; }
      else if (bodyFat < 14) { category = 'Athletes'; color = 'text-green-600'; }
      else if (bodyFat < 18) { category = 'Fitness'; color = 'text-emerald-600'; }
      else if (bodyFat < 25) { category = 'Average'; color = 'text-yellow-600'; }
      else { category = 'Obese'; color = 'text-red-600'; }
    } else {
      if (bodyFat < 14) { category = 'Essential Fat'; color = 'text-blue-600'; }
      else if (bodyFat < 21) { category = 'Athletes'; color = 'text-green-600'; }
      else if (bodyFat < 25) { category = 'Fitness'; color = 'text-emerald-600'; }
      else if (bodyFat < 32) { category = 'Average'; color = 'text-yellow-600'; }
      else { category = 'Obese'; color = 'text-red-600'; }
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

  // Meal Data
  const mealCategories = {
    weightLoss: {
      title: 'Weight Loss Meals',
      icon: TrendingDown,
      color: 'from-emerald-400 to-teal-500',
      meals: [
        { name: 'Grilled Chicken Salad', calories: 350, protein: '35g', carbs: '20g', fat: '12g' },
        { name: 'Veggie Stir-Fry with Tofu', calories: 280, protein: '18g', carbs: '32g', fat: '8g' },
        { name: 'Baked Salmon with Broccoli', calories: 400, protein: '38g', carbs: '15g', fat: '20g' },
        { name: 'Greek Yogurt Bowl with Berries', calories: 220, protein: '15g', carbs: '28g', fat: '5g' },
        { name: 'Quinoa & Black Bean Bowl', calories: 320, protein: '14g', carbs: '48g', fat: '7g' }
      ]
    },
    diabetes: {
      title: 'Diabetes-Friendly Meals',
      icon: Activity,
      color: 'from-blue-400 to-indigo-500',
      meals: [
        { name: 'Lentil Soup with Vegetables', calories: 250, protein: '14g', carbs: '38g', fat: '4g', gi: 'Low' },
        { name: 'Grilled Fish with Asparagus', calories: 320, protein: '35g', carbs: '12g', fat: '15g', gi: 'Low' },
        { name: 'Chicken & Cauliflower Rice', calories: 290, protein: '32g', carbs: '18g', fat: '10g', gi: 'Low' },
        { name: 'Egg White Omelet with Spinach', calories: 180, protein: '20g', carbs: '8g', fat: '7g', gi: 'Low' },
        { name: 'Turkey Lettuce Wraps', calories: 240, protein: '28g', carbs: '10g', fat: '9g', gi: 'Low' }
      ]
    },
    bloodPressure: {
      title: 'Blood Pressure-Friendly Meals',
      icon: Heart,
      color: 'from-rose-400 to-pink-500',
      meals: [
        { name: 'Oatmeal with Banana & Walnuts', calories: 320, protein: '10g', sodium: '5mg', potassium: 'High' },
        { name: 'Baked Chicken with Sweet Potato', calories: 380, protein: '35g', sodium: '80mg', potassium: 'High' },
        { name: 'Spinach & Avocado Salad', calories: 240, protein: '8g', sodium: '40mg', potassium: 'High' },
        { name: 'Grilled Salmon with Kale', calories: 410, protein: '38g', sodium: '95mg', potassium: 'High' },
        { name: 'Bean & Vegetable Stew', calories: 280, protein: '15g', sodium: '120mg', potassium: 'High' }
      ]
    },
    healthy: {
      title: 'General Healthy Meals',
      icon: Apple,
      color: 'from-amber-400 to-orange-500',
      meals: [
        { name: 'Mediterranean Bowl', calories: 450, protein: '22g', carbs: '52g', fat: '18g' },
        { name: 'Chicken Breast with Brown Rice', calories: 420, protein: '40g', carbs: '45g', fat: '8g' },
        { name: 'Veggie Pasta Primavera', calories: 380, protein: '14g', carbs: '58g', fat: '12g' },
        { name: 'Smoothie Bowl with Granola', calories: 340, protein: '12g', carbs: '54g', fat: '10g' },
        { name: 'Tuna Salad Sandwich', calories: 360, protein: '28g', carbs: '38g', fat: '10g' }
      ]
    },
    weightGain: {
      title: 'Weight Gain Meals',
      icon: Scale,
      color: 'from-violet-400 to-purple-500',
      meals: [
        { name: 'Protein Pancakes with Peanut Butter', calories: 620, protein: '35g', carbs: '65g', fat: '22g' },
        { name: 'Beef & Rice Bowl', calories: 780, protein: '45g', carbs: '82g', fat: '28g' },
        { name: 'Pasta with Meat Sauce', calories: 720, protein: '38g', carbs: '88g', fat: '24g' },
        { name: 'Chicken Avocado Wrap', calories: 680, protein: '42g', carbs: '54g', fat: '32g' },
        { name: 'Mass Gainer Smoothie', calories: 850, protein: '40g', carbs: '98g', fat: '30g' }
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

  const NavBar = () => (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Daily Health Tools
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Home
            </button>
            <button onClick={() => setCurrentPage('calculators')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Calculators
            </button>
            <button onClick={() => setCurrentPage('tracking')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Daily Tracking
            </button>
            <button onClick={() => setCurrentPage('meals')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Meal Plans
            </button>
            <button onClick={() => setCurrentPage('about')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              About
            </button>
          </div>
          
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors">
              Home
            </button>
            <button onClick={() => { setCurrentPage('calculators'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors">
              Calculators
            </button>
            <button onClick={() => { setCurrentPage('tracking'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors">
              Daily Tracking
            </button>
            <button onClick={() => { setCurrentPage('meals'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors">
              Meal Plans
            </button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors">
              About
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Your Daily Health
              <br />
              Companion
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Free health calculators, daily tracking, and personalized meal suggestions to help you live healthier
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('calculators')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Try Calculators
              </button>
              <button 
                onClick={() => setCurrentPage('tracking')}
                className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-emerald-200"
              >
                Start Tracking
              </button>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Health Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    onClick={() => setCurrentPage(tool.id)}
                    className="group cursor-pointer bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                      Calculate now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Tracking Teaser */}
          <div className="mb-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl p-8 md:p-12 border-2 border-violet-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Daily Tracking</h2>
                <p className="text-gray-600 text-lg">Monitor your progress with beautiful charts</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Track your weight, water intake, and sleep patterns daily. Visualize your progress with interactive charts and achieve your health goals!
            </p>
            <button
              onClick={() => setCurrentPage('tracking')}
              className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Tracking Now
            </button>
          </div>

          {/* Meal Categories Preview */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              What Should I Eat Today?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(mealCategories).slice(0, 3).map(([key, category], index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={key}
                    onClick={() => { setSelectedMealCategory(key); setCurrentPage('meals'); }}
                    className="group cursor-pointer bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">
                      {category.meals.length} healthy meal options
                    </p>
                    <div className="mt-4 flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                      View meals <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-2xl shadow-md">
            <p className="text-amber-800 font-medium">
              <strong>Medical Disclaimer:</strong> This website provides general health information and does not replace professional medical advice. Always consult with a healthcare provider for medical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const BodyFatCalculatorPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Body Fat Calculator</h1>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Calculate your body fat percentage using the US Navy method. You'll need to measure your neck, waist, and (for women) hips.
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={bfWeight}
                  onChange={(e) => setBfWeight(e.target.value)}
                  placeholder="Your weight"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={bfHeight}
                  onChange={(e) => setBfHeight(e.target.value)}
                  placeholder="Your height"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Age</label>
                <input
                  type="number"
                  value={bfAge}
                  onChange={(e) => setBfAge(e.target.value)}
                  placeholder="Your age"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                <select
                  value={bfGender}
                  onChange={(e) => setBfGender(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors text-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Body Measurements (in cm)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Neck Circumference</label>
                  <input
                    type="number"
                    value={bfNeck}
                    onChange={(e) => setBfNeck(e.target.value)}
                    placeholder="Measure around your neck"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Waist Circumference</label>
                  <input
                    type="number"
                    value={bfWaist}
                    onChange={(e) => setBfWaist(e.target.value)}
                    placeholder="Measure at belly button level"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg"
                  />
                </div>
                
                {bfGender === 'female' && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Hip Circumference</label>
                    <input
                      type="number"
                      value={bfHip}
                      onChange={(e) => setBfHip(e.target.value)}
                      placeholder="Measure at widest point"
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={calculateBodyFat}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Calculate Body Fat
            </button>
          </div>
          
          {bfResult && (
            <div className="mt-8 p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Results:</h3>
              <div className="space-y-4">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-600 mb-2 font-semibold">Body Fat Percentage</p>
                  <p className="text-5xl font-black text-orange-600">{bfResult.bodyFat}%</p>
                  <p className={`text-2xl font-bold ${bfResult.color} mt-2`}>{bfResult.category}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-600 mb-2 font-semibold">Lean Mass</p>
                    <p className="text-2xl font-bold text-green-600">{bfResult.leanMass} kg</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-600 mb-2 font-semibold">Fat Mass</p>
                    <p className="text-2xl font-bold text-red-600">{bfResult.fatMass} kg</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-orange-200">
                  <p className="text-gray-600 font-medium mb-3">Body Fat Categories ({bfGender === 'male' ? 'Men' : 'Women'}):</p>
                  <ul className="space-y-2 text-gray-700">
                    {bfGender === 'male' ? (
                      <>
                        <li>• Essential Fat: 2-5%</li>
                        <li>• Athletes: 6-13%</li>
                        <li>• Fitness: 14-17%</li>
                        <li>• Average: 18-24%</li>
                        <li>• Obese: 25%+</li>
                      </>
                    ) : (
                      <>
                        <li>• Essential Fat: 10-13%</li>
                        <li>• Athletes: 14-20%</li>
                        <li>• Fitness: 21-24%</li>
                        <li>• Average: 25-31%</li>
                        <li>• Obese: 32%+</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const DailyTrackingPage = () => {
    const [activeTab, setActiveTab] = useState('weight');
    
    // Prepare chart data
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
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Daily Tracking</h1>
            </div>
            <p className="text-gray-600 text-lg">Track your health metrics and visualize your progress</p>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('weight')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'weight'
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Scale className="w-5 h-5 inline mr-2" />
              Weight
            </button>
            <button
              onClick={() => setActiveTab('water')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'water'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Droplet className="w-5 h-5 inline mr-2" />
              Water
            </button>
            <button
              onClick={() => setActiveTab('sleep')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'sleep'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Moon className="w-5 h-5 inline mr-2" />
              Sleep
            </button>
          </div>
          
          {/* Weight Tracking */}
          {activeTab === 'weight' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Scale className="w-8 h-8 text-violet-600" />
                  Weight Tracking
                </h2>
                
                <div className="flex gap-4 mb-6">
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="Enter weight (kg)"
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors text-lg"
                  />
                  <button
                    onClick={addWeightEntry}
                    className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Add
                  </button>
                </div>
                
                {weightChartData.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Weight Progress Chart</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={weightChartData}>
                        <defs>
                          <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '2px solid #8b5cf6',
                            borderRadius: '12px',
                            padding: '12px'
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
                  <h3 className="text-lg font-semibold text-gray-700">Recent Entries</h3>
                  {trackingData.weight.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No entries yet. Start tracking your weight!</p>
                  ) : (
                    <div className="space-y-2">
                      {[...trackingData.weight].reverse().slice(0, 10).map((entry, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                          <div>
                            <p className="font-semibold text-gray-800">{entry.value} kg</p>
                            <p className="text-sm text-gray-600">{entry.date}</p>
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
          
          {/* Water Tracking */}
          {activeTab === 'water' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Droplet className="w-8 h-8 text-blue-600" />
                  Water Intake Tracking
                </h2>
                
                <div className="flex gap-4 mb-6">
                  <input
                    type="number"
                    value={newWater}
                    onChange={(e) => setNewWater(e.target.value)}
                    placeholder="Enter liters"
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg"
                  />
                  <button
                    onClick={addWaterEntry}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Add
                  </button>
                </div>
                
                {waterChartData.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Water Intake Chart</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={waterChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '2px solid #3b82f6',
                            borderRadius: '12px',
                            padding: '12px'
                          }}
                        />
                        <Bar dataKey="liters" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700">Recent Entries</h3>
                  {trackingData.water.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No entries yet. Start tracking your water intake!</p>
                  ) : (
                    <div className="space-y-2">
                      {[...trackingData.water].reverse().slice(0, 10).map((entry, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                          <div>
                            <p className="font-semibold text-gray-800">{entry.value} L</p>
                            <p className="text-sm text-gray-600">{entry.date}</p>
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
          
          {/* Sleep Tracking */}
          {activeTab === 'sleep' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Moon className="w-8 h-8 text-indigo-600" />
                  Sleep Duration Tracking
                </h2>
                
                <div className="flex gap-4 mb-6">
                  <input
                    type="number"
                    value={newSleep}
                    onChange={(e) => setNewSleep(e.target.value)}
                    placeholder="Enter hours"
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-lg"
                  />
                  <button
                    onClick={addSleepEntry}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Add
                  </button>
                </div>
                
                {sleepChartData.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Sleep Duration Chart</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={sleepChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '2px solid #6366f1',
                            borderRadius: '12px',
                            padding: '12px'
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
                  <h3 className="text-lg font-semibold text-gray-700">Recent Entries</h3>
                  {trackingData.sleep.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No entries yet. Start tracking your sleep!</p>
                  ) : (
                    <div className="space-y-2">
                      {[...trackingData.sleep].reverse().slice(0, 10).map((entry, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                          <div>
                            <p className="font-semibold text-gray-800">{entry.value} hours</p>
                            <p className="text-sm text-gray-600">{entry.date}</p>
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
            className="mt-8 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  };

  // Keep all the original calculator pages (BMI, Calories, Water, Ideal Weight, Sleep)
  const BMICalculatorPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">BMI Calculator</h1>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Body Mass Index (BMI) is a simple calculation using your height and weight to estimate body fat. It helps determine if you're in a healthy weight range.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
              <input
                type="number"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
                placeholder="Enter your weight"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Height (cm)</label>
              <input
                type="number"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
                placeholder="Enter your height"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            
            <button
              onClick={calculateBMI}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Calculate BMI
            </button>
          </div>
          
          {bmiResult && (
            <div className="mt-8 p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Results:</h3>
              <div className="space-y-3">
                <p className="text-4xl font-black text-cyan-600">{bmiResult.bmi}</p>
                <p className={`text-2xl font-bold ${bmiResult.color}`}>{bmiResult.category}</p>
                <div className="mt-6 pt-6 border-t border-cyan-200">
                  <p className="text-gray-600 font-medium">BMI Categories:</p>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li>• Below 18.5 = Underweight</li>
                    <li>• 18.5 - 24.9 = Normal weight</li>
                    <li>• 25.0 - 29.9 = Overweight</li>
                    <li>• 30.0 and above = Obese</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const CaloriesCalculatorPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Daily Calories Calculator</h1>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Calculate your Total Daily Energy Expenditure (TDEE) to know how many calories you need to maintain, lose, or gain weight.
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={calWeight}
                  onChange={(e) => setCalWeight(e.target.value)}
                  placeholder="Your weight"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={calHeight}
                  onChange={(e) => setCalHeight(e.target.value)}
                  placeholder="Your height"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Age</label>
                <input
                  type="number"
                  value={calAge}
                  onChange={(e) => setCalAge(e.target.value)}
                  placeholder="Your age"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                <select
                  value={calGender}
                  onChange={(e) => setCalGender(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Activity Level</label>
              <select
                value={calActivity}
                onChange={(e) => setCalActivity(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="veryActive">Very Active (intense exercise daily)</option>
              </select>
            </div>
            
            <button
              onClick={calculateCalories}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Calculate Calories
            </button>
          </div>
          
          {calResult && (
            <div className="mt-8 p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-emerald-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Daily Calorie Needs:</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-700">Maintain Weight:</span>
                  <span className="text-2xl font-bold text-emerald-600">{calResult.maintain} cal</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-700">Weight Loss:</span>
                  <span className="text-2xl font-bold text-blue-600">{calResult.loss} cal</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-700">Weight Gain:</span>
                  <span className="text-2xl font-bold text-purple-600">{calResult.gain} cal</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const WaterCalculatorPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Droplet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Water Intake Calculator</h1>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Staying hydrated is essential for health. Calculate how much water you should drink daily based on your weight and activity level.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
              <input
                type="number"
                value={waterWeight}
                onChange={(e) => setWaterWeight(e.target.value)}
                placeholder="Enter your weight"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Activity Level</label>
              <select
                value={waterActivity}
                onChange={(e) => setWaterActivity(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:outline-none transition-colors text-lg"
              >
                <option value="low">Low (minimal exercise)</option>
                <option value="moderate">Moderate (regular exercise)</option>
                <option value="high">High (intense daily exercise)</option>
              </select>
            </div>
            
            <button
              onClick={calculateWater}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Calculate Water Intake
            </button>
          </div>
          
          {waterResult && (
            <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-cyan-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Recommended Daily Water Intake:</h3>
              <div className="flex items-center gap-4 mb-6">
                <Droplet className="w-12 h-12 text-cyan-500" fill="currentColor" />
                <p className="text-5xl font-black text-cyan-600">{waterResult} L</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                That's approximately {Math.round(parseFloat(waterResult) * 4)} cups (250ml each) of water per day. Remember to drink more during hot weather or intense physical activity.
              </p>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const IdealWeightPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Ideal Weight Calculator</h1>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Calculate your ideal body weight range based on your height and gender using the Devine formula.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Height (cm)</label>
              <input
                type="number"
                value={idealHeight}
                onChange={(e) => setIdealHeight(e.target.value)}
                placeholder="Enter your height"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Gender</label>
              <select
                value={idealGender}
                onChange={(e) => setIdealGender(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-lg"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <button
              onClick={calculateIdealWeight}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Calculate Ideal Weight
            </button>
          </div>
          
          {idealResult && (
            <div className="mt-8 p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Ideal Weight Range:</h3>
              <div className="space-y-4">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-600 mb-2 font-semibold">Ideal Weight</p>
                  <p className="text-5xl font-black text-purple-600">{idealResult.ideal} kg</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-600 mb-2 font-semibold">Minimum</p>
                    <p className="text-2xl font-bold text-pink-600">{idealResult.min} kg</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-600 mb-2 font-semibold">Maximum</p>
                    <p className="text-2xl font-bold text-pink-600">{idealResult.max} kg</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const SleepCalculatorPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Moon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Sleep Duration Calculator</h1>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Find out how much sleep you need based on your age. Quality sleep is crucial for physical and mental health.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Age</label>
              <input
                type="number"
                value={sleepAge}
                onChange={(e) => setSleepAge(e.target.value)}
                placeholder="Enter your age"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            
            <button
              onClick={calculateSleep}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Calculate Sleep Duration
            </button>
          </div>
          
          {sleepResult && (
            <div className="mt-8 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Recommended Sleep Duration:</h3>
              <div className="flex items-center gap-4 mb-6">
                <Moon className="w-12 h-12 text-indigo-500" />
                <p className="text-4xl font-black text-indigo-600">{sleepResult}</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Consistent, quality sleep helps improve memory, concentration, immune function, and overall well-being. Try to maintain a regular sleep schedule.
              </p>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const MealsPage = () => {
    const selectedCategory = selectedMealCategory ? mealCategories[selectedMealCategory] : null;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            What Should I Eat Today?
          </h1>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Discover healthy meal ideas tailored to your health goals
          </p>
          
          {!selectedCategory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(mealCategories).map(([key, category]) => {
                const Icon = category.icon;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedMealCategory(key)}
                    className="group cursor-pointer bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.meals.length} delicious and healthy options
                    </p>
                    <div className="flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                      View meals <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedMealCategory(null)}
                className="mb-8 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                ← Back to Categories
              </button>
              
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {React.createElement(selectedCategory.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {selectedCategory.title}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCategory.meals.map((meal, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <Utensils className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                        <h3 className="text-xl font-bold text-gray-800">{meal.name}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Calories</p>
                          <p className="text-lg font-bold text-emerald-600">{meal.calories}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Protein</p>
                          <p className="text-lg font-bold text-blue-600">{meal.protein}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Carbs</p>
                          <p className="text-lg font-bold text-orange-600">{meal.carbs}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Fat</p>
                          <p className="text-lg font-bold text-purple-600">{meal.fat}</p>
                        </div>
                        {meal.gi && (
                          <div className="col-span-2 bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Glycemic Index</p>
                            <p className="text-lg font-bold text-green-600">{meal.gi}</p>
                          </div>
                        )}
                        {meal.sodium && (
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Sodium</p>
                            <p className="text-lg font-bold text-rose-600">{meal.sodium}</p>
                          </div>
                        )}
                        {meal.potassium && (
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Potassium</p>
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
          
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-2xl shadow-md mt-8">
            <p className="text-amber-800 font-medium">
              <strong>Note:</strong> These are general meal suggestions. Always consult with a healthcare provider or registered dietitian for personalized nutrition advice.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">About Daily Health Tools</h1>
          
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Welcome to Daily Health Tools, your free companion for everyday health and wellness. We provide simple, easy-to-use calculators, daily tracking tools, and meal suggestions to help you make informed decisions about your health.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that everyone deserves access to basic health information and tools. Our goal is to make health tracking simple, accessible, and free for everyone.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">What We Offer</h2>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span><strong>Free Health Calculators:</strong> BMI, daily calories, water intake, ideal weight, sleep duration, and body fat percentage calculators</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span><strong>Daily Tracking:</strong> Monitor your weight, water intake, and sleep patterns with beautiful interactive charts</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span><strong>Meal Suggestions:</strong> Healthy meal ideas for weight loss, diabetes management, blood pressure control, and general wellness</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span><strong>Easy to Use:</strong> Simple, user-friendly tools that anyone can use</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span><strong>No Registration Required:</strong> Access all tools instantly without creating an account</span>
              </li>
            </ul>
            
            <div className="bg-rose-50 border-l-4 border-rose-400 p-6 rounded-2xl mt-8">
              <h3 className="text-xl font-bold text-rose-800 mb-3">Important Medical Disclaimer</h3>
              <p className="text-rose-700 leading-relaxed">
                This website provides general health information and educational tools only. It is not intended to diagnose, treat, cure, or prevent any disease or medical condition. The calculators and meal suggestions are for informational purposes and should not replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of information you read on this website.
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentPage('home')}
          className="mt-8 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
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
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #06b6d4);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0891b2);
        }
      `}</style>
      
      <NavBar />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'bmi' && <BMICalculatorPage />}
      {currentPage === 'calories' && <CaloriesCalculatorPage />}
      {currentPage === 'water' && <WaterCalculatorPage />}
      {currentPage === 'ideal-weight' && <IdealWeightPage />}
      {currentPage === 'sleep' && <SleepCalculatorPage />}
      {currentPage === 'body-fat' && <BodyFatCalculatorPage />}
      {currentPage === 'tracking' && <DailyTrackingPage />}
      {currentPage === 'meals' && <MealsPage />}
      {currentPage === 'about' && <AboutPage />}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold">Daily Health Tools</span>
          </div>
          <p className="text-gray-400 mb-8">Your free companion for everyday health and wellness.</p>
          <p className="text-gray-500 text-sm">© 2024 Daily Health Tools. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">This website provides general health information and does not replace professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default DailyHealthTools;