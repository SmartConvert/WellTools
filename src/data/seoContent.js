// SEO-rich content for all calculator pages in 3 languages
export const calculatorContent = {
    bmi: {
        en: {
            hero_title: 'BMI Calculator for Women & Men',
            h1_title: 'Unlocking Your Health Metrics: The Ultimate BMI Calculator Guide',
            h2_title: 'Calculate Body Mass Index & Understand Your Health Risks',
            meta_title: 'BMI Calculator: Accurate Body Mass Index for Men, Women & Kids (WHO Standards)',
            meta_description: 'Calculate your Body Mass Index (BMI) instantly. Our scientifically accurate tool provides health insights for men, women, and children based on WHO guidelines. Understand your ideal weight range today.',
            hero_subtitle: 'Discover your healthy weight range with our precise, medically-calibrated BMI calculator.',
            hero_emoji: '⚖️',
            hero_color: 'from-lime-400 to-green-500',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'bmr', name: 'BMR Calculator' },
                { id: 'ideal-weight', name: 'Ideal Weight Calculator' }
            ],

            // Formula Explanation Section
            formula_title: 'The Science Behind BMI: The Adolphe Quetelet Formula',
            formula_explanation: 'The Body Mass Index (BMI), originally known as the "Quetelet Index," was developed in 1832 by Belgian statistician Adolphe Quetelet. It remains the global gold standard for initial health screening because it provides a reliable correlation with body fat percentage for the vast majority of the population. By standardizing weight against height, BMI offers a risk assessment tool used by the World Health Organization (WHO), CDC, and healthcare providers worldwide to identify potential health risks associated with underweight, overweight, and obesity.',
            formula_text: 'BMI = Weight (kg) / Height (m)²',
            formula_example: 'Case Study: Justina (34, Female). Weight: 68 kg. Height: 1.65 m. \nCalculation: 68 / (1.65 × 1.65) = 68 / 2.7225 = 24.97.\nResult: Justina represents the upper limit of the "Normal Weight" category.',
            formula_accuracy: 'Clinical Accuracy: For general populations, BMI has a 0.82 correlation with body fat density. However, it does not distinguish between lean muscle mass and adipose tissue.',

            // Step-by-Step Example
            example_title: 'Step-by-Step BMI Calculation Scenarios',
            examples: [
                {
                    name: 'Scenario A: The Sedentary Office Worker',
                    stats: 'Mark, 42 years old. Weight: 95 kg. Height: 180 cm.',
                    calculation: '95 / (1.80)² = 29.3 BMI',
                    result: 'Result: Overweight (Borderline Obese)',
                    interpretation: 'Mark\'s BMI indicates he is carrying excess weight relative to his height. Without significant muscle mass from weightlifting, this likely represents excess body fat, increasing his risk for Type 2 Diabetes and hypertension.'
                },
                {
                    name: 'Scenario B: The High-Performance Athlete',
                    stats: 'Sarah, 26 years old Crossfit Athlete. Weight: 75 kg. Height: 168 cm.',
                    calculation: '75 / (1.68)² = 26.6 BMI',
                    result: 'Result: Overweight',
                    interpretation: 'Sarah classifies as "Overweight" on the BMI scale. However, given her high activity level and strength training, this "excess" weight is likely lean muscle mass. Her health risks are low, demonstrating why athletes should pair BMI with Body Fat Percentage measurements.'
                }
            ],

            // Comparison Tables
            comparison_table_title: 'Detailed BMI Categories & Health Implications',
            bmi_ranges: [
                { category: 'Severe Thinness', range: '< 16.0', risk: 'Critical: Heart failure, osteoporosis, immune compromise' },
                { category: 'Moderate Thinness', range: '16.0 - 17.0', risk: 'High: Hormonal imbalances, anemia, fatigue' },
                { category: 'Mild Thinness', range: '17.0 - 18.5', risk: 'Moderate: Nutrient deficiency, irregular cycles' },
                { category: 'Normal Weight', range: '18.5 - 25.0', risk: 'Lowest Risk: Optimal life expectancy range' },
                { category: 'Overweight', range: '25.0 - 30.0', risk: 'Increased: Pre-diabetes, joint pressure, slight BP elevation' },
                { category: 'Obese Class I', range: '30.0 - 35.0', risk: 'High: Sleep apnea, Type 2 Diabetes, hypertension' },
                { category: 'Obese Class II', range: '35.0 - 40.0', risk: 'Very High: Cardiovascular disease, liver disease' },
                { category: 'Obese Class III', range: '> 40.0', risk: 'Critical: Significant reduction in life expectancy' }
            ],

            seo_what_title: 'What Actually Is Body Mass Index (BMI)?',
            seo_what_content: 'Body Mass Index (BMI) is not a diagnosis; it is a screening tool. It answers a fundamental physiological question: "Is your weight appropriate for your structural frame (height)?" While it cannot "see" your body composition (how much of you is muscle vs. fat), decades of epidemiological research involving millions of people have shown that as BMI rises above 25 or falls below 18.5, the statistical probability of chronic illness rises sharply. It serves as the "Check Engine Light" for your metabolic health.',

            seo_why_title: 'Why Should You Care About Your BMI?',
            seo_why_content: 'Ignoring BMI is like driving without a speedometer. While it\'s not the whole story, it provides critical data. A high BMI is the single strongest predictor for Type 2 Diabetes, heart disease, and stroke. Conversely, a low BMI can be a silent signal of malnutrition, hormonal thyroid issues, or malabsorption diseases. Tracking your BMI over time provides a trendline of your health trajectory, allowing you to intervene with lifestyle changes before clinical disease sets in.',

            seo_how_title: 'How to Use This Professional BMI Tool',
            seo_how_steps: [
                '**Accurate Measurement**: Weigh yourself in the morning, after using the restroom, before eating, and without clothes for the most precise "True Weight".',
                '**Height Check**: Stand against a wall, heels touching the baseboard, and look straight ahead. Have someone else measure to the crown of your head.',
                '**Data Entry**: Input these metrics into the calculator above.',
                '**Contextualize**: Don\'t just look at the number. Read the specific "Health Tips" generated for your category.',
                '**Secondary Metrics**: If your BMI is 25-30 but you are active, measure your Waist Circumference. If it\'s < 40 inches (men) or < 35 inches (women), your risk is lower.'
            ],

            seo_tips_title: 'Medical & Lifestyle Recommendations',
            seo_tips: [
                '📉 **For Weight Loss (BMI > 25)**: Aim for a modest 5-10% weight reduction. Clinical trials show this specific amount significantly lowers blood pressure and blood sugar, even if you don\'t reach "Normal" BMI.',
                '📈 **For Weight Gain (BMI < 18.5)**: Focus on caloric density. Add healthy fats (avocado, nuts, olive oil) and prioritize strength training to add mass as muscle, not just fat.',
                '🧬 **Ethnic Adjustments**: Asian populations (Chinese, Indian, Japanese) experience health risks at lower BMI thresholds. The cutoff for "Overweight" is often lowered to 23.0 for these genetic groups.',
                '🤰 **Pregnancy**: Do NOT use standard BMI during pregnancy. Use pre-pregnancy BMI to determine healthy gestational weight gain guidelines (typically 25-35 lbs for normal weight).',
                '👴 **The "Elderly Paradox"**: After age 65, a slightly higher BMI (25-27) is protective against mortality from falls, infections, and chronic disease. "Bone density" protection outweighs "fat risk" in this demographic.'
            ],

            seo_faqs: [
                {
                    question: 'Why is BMI called "outdated" or "flawed"?',
                    answer: 'BMI is criticized because it treats 1 kg of muscle the same as 1 kg of fat. A bodybuilder may have a BMI of 30 ("Obese") but 8% body fat. However, for 95% of the non-athlete population, high BMI correlates directly with high body fat. It is flawed at the individual level for outliers but highly accurate for general population health screening.'
                },
                {
                    question: 'What is the "New BMI" vs. "Old BMI"?',
                    answer: 'The standard formula (Weight/Height²) assumes people scale 2-dimensionally. A proposed "New BMI" (1.3 × Weight / Height^2.5) attempts to correct for taller people who are naturally heavier without being fatter. Our calculator uses the standard WHO ISO formula for medical consistency, but keeps this nuance in mind.'
                },
                {
                    question: 'Does BMI measure visceral fat?',
                    answer: 'No. BMI measures total mass. Visceral fat (toxic belly fat around organs) is the dangerous type. You can have a "Normal" BMI but high visceral fat ("Skinny Fat"). This is why measuring Waist Circumference alongside BMI is the gold standard for home assessment.'
                },
                {
                    question: 'How quickly should I change my BMI?',
                    answer: 'Rapid shifts are dangerous. A safe rate of change is 1-2 BMI points per year. Losing weight too fast (> 2 lbs/week) often results in muscle loss, which lowers your metabolism and makes regaining the weight inevitable (the "Yo-Yo Effect").'
                },
                {
                    question: 'Is BMI valid for children?',
                    answer: 'No. Children grow at different rates. For ages 2-19, "BMI percentile" is used (comparing them to peers of the same age/sex). A 10-year-old with a BMI of 23 might be Obese, while an adult is Normal. Always use a specialized Pediatric Growth Chart.'
                }
            ],

            additional_info: [
                {
                    title: 'The "Obesity Paradox": When is Fat Protective?',
                    content: 'In certain clinical situations, such as end-stage renal disease or heart failure, patients with higher BMIs actually have better survival rates. This phenomenon is known as the "Obesity Paradox." It is believed that the extra energy reserves provide a buffer against the catabolic (wasting) state of severe illness. This is why medical advice must always be personalized.'
                },
                {
                    title: 'BMI vs. Body Fat Percentage vs. Waist-to-Hip Ratio',
                    content: 'BMI is a proxy. Body Fat % is the truth. Waist-to-Hip Ratio is the risk predictor. Use BMI for a quick check. If you are "Overweight," buy a cheap caliper or smart scale to check Body Fat %. If your Body Fat is < 20% (Men) or < 28% (Women), ignore the BMI "Overweight" label. If your waist is wider than your hips (Ratio > 1.0), prioritize weight loss immediately, regardless of BMI.'
                }
            ],

            medical_sources: [
                'World Health Organization. "Body Mass Index - BMI". Global Health Observatory (GHO).',
                'Centers for Disease Control and Prevention (CDC). "About Adult BMI".',
                'National Institutes of Health (NIH). "Clinical Guidelines on the Identification, Evaluation, and Treatment of Overweight and Obesity in Adults".',
                'Harvard T.H. Chan School of Public Health. "The Obesity Prevention Source".',
                'Journal of the American Medical Association (JAMA). "Use of Body Mass Index for Health Assessment".'
            ]
        }
    },

    // I'll add all other calculators in the same format...
    calories: {
        en: {
            hero_title: 'Calorie Calculator (TDEE)',
            h1_title: 'The Ultimate Calorie Calculator: Master Your Metabolism (TDEE)',
            h2_title: 'Calculate Optimal Daily Calories for Weight Loss, Maintenance & Gain',
            meta_title: 'Calorie Calculator: Precision TDEE & Weight Loss Planner (Science-Based)',
            meta_description: 'Scientifically accurate Calorie Calculator using the Mifflin-St Jeor equation. Determine your Total Daily Energy Expenditure (TDEE) and get personalized macro plans for weight loss or muscle gain.',
            hero_subtitle: 'Unlock your metabolic potential with the industry-standard Mifflin-St Jeor methodology.',
            hero_emoji: '🔥',
            hero_color: 'from-orange-400 to-red-500',
            related_tools: [
                { id: 'macro', name: 'Macro Calculator' },
                { id: 'bmi', name: 'BMI Calculator' },
                { id: 'bmr', name: 'BMR Calculator' }
            ],

            // Formula Explanation
            formula_title: 'The Science of Energy: Mifflin-St Jeor Equation',
            formula_explanation: 'Your daily energy needs are calculated in two steps. First, we determine your Basal Metabolic Rate (BMR)—the energy your body burns at complete rest for vital functions like breathing and circulation. We use the Mifflin-St Jeor equation, which the American Dietetic Association considers the most accurate standard for healthy individuals (within 5% accuracy). Second, we apply your Total Daily Energy Expenditure (TDEE) multiplier based on your physical activity level to find your true maintenance calories.',
            formula_text: 'Men: (10 × weight) + (6.25 × height) - (5 × age) + 5\nWomen: (10 × weight) + (6.25 × height) - (5 × age) - 161',
            formula_example: 'Case Study: David (30, Male). Weight: 80 kg. Height: 180 cm. Activity: Moderate.\nBMR Calculation: 800 + 1125 - 150 + 5 = 1780 kcal.\nTDEE Calculation: 1780 × 1.55 (Moderate Activity) = 2,759 kcal/day to maintain weight.',
            formula_accuracy: 'This formula is clinically validated to be within ±10% of indirect calorimetry (breathing tests) for non-obese individuals.',

            // Step-by-Step Example
            example_title: 'How We Calculate Your Personal Plan',
            examples: [
                {
                    name: 'Goal: Aggressive Weight Loss',
                    stats: 'Lisa, TDEE: 2,200 kcal/day.',
                    calculation: 'Deficit: -25% (approx 550 kcal)',
                    result: 'Target: 1,650 kcal',
                    interpretation: 'This creates a deficit of ~3,850 kcal/week, leading to approximately 1.1 lbs (0.5 kg) of pure fat loss per week, without triggering severe metabolic adaptation.'
                },
                {
                    name: 'Goal: Lean Muscle Gain',
                    stats: 'Tom, TDEE: 2,800 kcal/day.',
                    calculation: 'Surplus: +10% (approx 280 kcal)',
                    result: 'Target: 3,080 kcal',
                    interpretation: 'A small surplus ensures weight gain is primarily muscle tissue rather than fat. This "Lean Bulk" approach minimizes the need for aggressive cutting phases later.'
                }
            ],

            // Activity Levels Table
            comparison_table_title: 'Understanding Activity Factor Multipliers',
            activity_levels: [
                { level: 'Sedentary', multiplier: '1.2', description: 'Desk job, little to no exercise. Most office workers fall here.' },
                { level: 'Lightly Active', multiplier: '1.375', description: 'Light exercise/sports 1-3 days/week. E.g., walking 30 mins.' },
                { level: 'Moderately Active', multiplier: '1.55', description: 'Moderate exercise/sports 3-5 days/week. Gym classes, jogging.' },
                { level: 'Very Active', multiplier: '1.725', description: 'Hard exercise/sports 6-7 days/week. Construction work + gym.' },
                { level: 'Extra Active', multiplier: '1.9', description: 'Very hard exercise, physical job, or 2x training/day.' }
            ],

            seo_what_title: 'What Are Calories & TDEE?',
            seo_what_content: 'A calorie is simply a unit of energy. Specifically, it is the amount of heat energy needed to raise the temperature of one gram of water by one degree Celsius. In nutrition, we use "kilocalories" (kcal). Your body is a biological machine that requires fuel (calories) to function. TDEE (Total Daily Energy Expenditure) is the sum of all calories you burn in 24 hours: BMR (Coma calories) + TEF (Digestion energy) + NEAT (Fidgeting/Movement) + EAT (Exercise). Understanding this number is the "Master Key" to weight control.',

            seo_why_title: 'Why Most Diets Fail (And Math Works)',
            seo_why_content: 'Fad diets fail because they rely on restriction rules ("No Carbs", "No Fat") rather than energy balance. The First Law of Thermodynamics dictates that energy cannot be created or destroyed. If you consume fewer calories than your TDEE, you MUST lose mass. If you consume more, you MUST gain mass. Tracking calories removes the guesswork and "magic" from nutrition, putting you in complete control of your body composition.',

            seo_how_title: 'How to Use Calorie Counting Effectively',
            seo_how_steps: [
                '**Find Your Baseline**: Use the calculator above to find your maintenance calories.',
                '**Choose a Sustainable Goal**: Select "Weight Loss" (-500 kcal) rather than "Extreme Weight Loss" unless medically supervised.',
                '**Track Honestly**: Use an app (like MyFitnessPal or Cronometer) or a notebook. Studies show we underestimate intake by up to 50%.',
                '**Weigh & Measure**: Food scales are more accurate than measuring cups ("1 cup of nuts" can vary by 200 kcal).',
                '**Adjust Monthly**: As you lose weight, your BMR drops (you are a smaller engine). Recalculate your TDEE every 5-10 lbs lost.'
            ],

            seo_tips_title: 'Metabolic Health & Nutrition Tips',
            seo_tips: [
                '🔥 **Protein is King**: Protein has the highest TEF (Thermic Effect of Food). Your body burns 20-30% of protein calories just digesting them! It also preserves muscle during weight loss.',
                '🚶 **NEAT Matters**: Non-Exercise Activity Thermogenesis (walking, fidgeting, standing) burns more calories for most people than gym sessions. Aim for 8,000+ steps daily.',
                '📉 **The "Starvation Mode" Myth**: Your metabolism slows down as you get lighter (Adaptive Thermogenesis), but it does not "shut down." You will not stop losing weight if you are truly in a deficit.',
                '😴 **Sleep & Cravings**: Poor sleep increases Ghrelin (hunger hormone) and decreases Leptin (fullness hormone). 7-9 hours of sleep is a non-negotiable weight loss tool.',
                '🥤 **Liquid Calories**: Alcohol and sugary drinks provide "empty energy" without satiety. Eliminating them is often the easiest way to create a 500 kcal deficit.'
            ],

            seo_faqs: [
                {
                    question: 'Should I eat back my exercise calories?',
                    answer: 'Generally, no. Fitness trackers often overestimate calorie burn by 20-30%. If you eat back all 500 calories your watch says you burned, you likely erase your deficit. Think of exercise calories as a "bonus" for speedier results.'
                },
                {
                    question: 'Is 1200 calories safe?',
                    answer: 'For most adults, 1200 is the absolute floor for micronutrient sufficiency. Going below this often leads to nutrient deficiencies, hair loss, gallstones, and binge eating cycles. Toddlers need ~1200 calories. You likely need more.'
                },
                {
                    question: 'What is a "Zig-Zag" calorie cycle?',
                    answer: 'Calorie cycling involves eating lower calories on some days and higher on others (e.g., higher on training days), while averaging your weekly target. This can help with psychological adherence and may prevent metabolic downregulation.'
                },
                {
                    question: 'Why am I not losing weight on a deficit?',
                    answer: '95% of the time, this is due to "hidden calories" (oils, sauces, tasting food), overestimating activity levels, or water retention masking fat loss (especially in women due to hormonal cycles). If weight is stable for 4 weeks, you are eating at maintenance, regardless of what the calculation says.'
                }
            ],

            additional_info: [
                {
                    title: 'The Role of Macronutrients (Macros)',
                    content: 'While calories determine weight direction (up/down), macros determine body composition (fat/muscle). 2000 calories of Doritos vs. 2000 calories of Chicken & Rice will result in the same weight, but vastly different physiques and blood panels. Prioritize Protein (building blocks), then Fat (hormonal health), then Carbs (energy).'
                },
                {
                    title: 'Metabolic Adaptation Explained',
                    content: 'As you lose weight, your body fights back to prevent starvation. It becomes more efficient at movement (burning less per step) and downregulates non-essential functions (fidgeting, heat production). This is why weight loss gets harder over time. Periodic "Diet Breaks" (eating at maintenance for 1-2 weeks) can help reverse these adaptations.'
                }
            ],

            medical_sources: [
                'American Journal of Clinical Nutrition.',
                'Academy of Nutrition and Dietetics.',
                'Journal of the American Dietetic Association.'
            ]
        }
    },
    water: {
        en: {
            hero_title: 'Water Intake Calculator',
            h1_title: 'Water Intake Calculator: How Much Water Should You Drink?',
            h2_title: 'Calculate Personalized Hydration Needs for Health & Performance',
            meta_title: 'Water Intake Calculator: Daily Hydration Needs by Weight & Activity | WellTools',
            meta_description: 'Calculate exactly how much water you should drink daily based on your weight, activity level, and climate. Don\'t rely on the "8 glasses" myth. Get your personalized hydration plan.',
            hero_subtitle: 'Stop guessing. Hydrate based on your unique biology and lifestyle.',
            hero_emoji: '💧',
            hero_color: 'from-blue-400 to-cyan-500',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'sleep', name: 'Sleep Calculator' },
                { id: 'bmi', name: 'BMI Calculator' }
            ],

            // Formula Explanation
            formula_title: 'Hydration Science: Beyond "8 Glasses a Day"',
            formula_explanation: 'The old "8x8 rule" (eight 8-ounce glasses) is a myth from 1945. Modern science shows hydration needs vary wildly. Our calculator uses the medical standard of 30-35ml per kg of body weight, then adds fluid requirements for exercise intensity (based on sweat rate estimates) to give you a precise target.',
            formula_text: 'Base Hydration = Weight (kg) × 33ml\n+ Exercise Adjustments (12ml per minute of moderate activity)',
            formula_example: 'Case Study: Sarah (60kg). Base need: 60 × 33 = 1,980ml.\nShe runs for 30 mins: +360ml.\nTotal Target: 2,340ml (approx 2.3 Liters).',
            formula_accuracy: 'This formula aligns with valid intake recommendations from the U.S. National Academies of Sciences, Engineering, and Medicine.',

            // Step-by-Step Example
            example_title: 'Hydration Scenarios: Who Needs What?',
            examples: [
                {
                    name: 'The Office Worker',
                    stats: 'John, 85kg, Sedentary.',
                    calculation: 'Base: 2.8L',
                    result: 'Target: 2.8 Liters',
                    interpretation: 'Even without exercise, a larger body requires more fluid for metabolic processes. 2.8L keeps his kidney function and cognitive focus optimal.'
                },
                {
                    name: 'The Athlete',
                    stats: 'Maria, 65kg, High Intensity Training (90 mins).',
                    calculation: 'Base: 2.1L + Exercise Loss: 1.2L',
                    result: 'Target: 3.3 Liters',
                    interpretation: 'Exercising muscles generate heat. Detailed hydration prevents a performance drop—dehydration of just 2% causes a significant decline in strength and endurance.'
                }
            ],

            // Urine Chart (Text description)
            comparison_table_title: 'The "Pee Test": Are You Hydrated?',
            activity_levels: [
                { level: 'Clear / Pale Straw', multiplier: 'Optimal', description: '✅ You are perfectly hydrated. Keep doing what you are doing.' },
                { level: 'Transparent Yellow', multiplier: 'Good', description: '✓ Normal. Drink water when thirsty.' },
                { level: 'Dark Yellow', multiplier: 'Mild Dehydration', description: '⚠️ Drink a glass of water now. Your kidneys are concentrating urine to save water.' },
                { level: 'Amber / Honey', multiplier: 'Severe', description: '🚨 You are significantly dehydrated. Drink excessively immediately.' },
                { level: 'Brown / Cola', multiplier: 'Medical Emergency', description: '🚑 Could indicate Rhabdomyolysis or severe liver issues. See a doctor.' }
            ],

            seo_what_title: 'Why Does Water Matter So Much?',
            seo_what_content: 'Water is 60% of you. It is not just "drink." It is a vital nutrient that acts as a solvent for biochemical reactions, a transporter for nutrients, a lubricant for joints (synovial fluid), and a coolant (sweat). Your brain is 73% water; even mild hypohydration impairs attention, memory, and psychomotor skills.',

            seo_why_title: 'Signs of Dehydration (Besides Thirst)',
            seo_why_content: 'By the time you feel thirsty, you are already ~1-2% dehydrated. Look for these silent signs: \n1. **Brain Fog**: Difficulty focusing or "sluggish" thinking.\n2. **Headaches**: Often the first sign of fluid lack.\n3. **False Hunger**: We often mistake thirst for sugar cravings.\n4. **Dry Skin/Lips**: Turgor test (pinching skin) can reveal hydration status.',

            seo_how_title: 'How to Reach Your Daily Goal',
            seo_how_steps: [
                '**Morning Bolus**: Drink 500ml immediately upon waking. You lose ~1L of water continuously while sleeping (breathing/sweat).',
                '**Eat Your Water**: Cucumber, watermelon, zucchini, and strawberries are >90% water.',
                '**Flavor Hack**: If you hate plain water, use zero-calorie electrolytes or lemon slices. Sugary sodas do NOT count positively (sugar draws water into the gut).',
                '**Bottle Strategy**: Keep a marked bottle at your desk. Visual cues trigger drinking habits.'
            ],

            seo_tips_title: 'Advanced Hydration Tips',
            seo_tips: [
                '⚡ **Electrolytes vs. Water**: If you exercise >1 hour or sweat heavily, plain water can dilute your blood sodium (Hyponatremia). Add a pinch of salt or electrolytes.',
                '☕ **Coffee Myth**: Coffee is a mild diuretic, but you retain ~95% of the fluid. It DOES count toward hydration, just don\'t rely on it 100%.',
                '🌡️ **Temperature**: Cold water absorbs slightly faster and cools core temp. Warm water can soothe digestion. Drink whichever temperature keeps you drinking.',
                '🤰 **Pregnancy/Breastfeeding**: Needs increase dramatically. Breast milk is 87% water; nursing mothers need roughly 700-1000ml EXTRA daily.'
            ],

            seo_faqs: [
                {
                    question: 'Can I drink too much water?',
                    answer: 'Yes. Water Intoxication (Hyponatremia) happens when you drink liquid faster than kidneys can process it (~1L/hour), diluting blood sodium. This causes cells to swell and can be fatal. Stick to your calculated limit and pace yourself.'
                },
                {
                    question: 'Does sparkling water count?',
                    answer: 'Absolutely. It is just water with CO2. Unless you have severe acid reflux, it is just as hydrating as still water.'
                },
                {
                    question: 'How do I know if I need electrolytes?',
                    answer: 'If your sweat stings your eyes (salty), leaves white chalky marks on clothes, or you get muscle cramps, you are a "salty sweater" and need sodium, magnesium, and potassium, not just water.'
                },
                {
                    question: 'Does losing weight increase water needs?',
                    answer: 'Actually, metabolic waste from burning fat requires water to be flushed out by kidneys. High protein diets (often used for weight loss) also require MORE water to process urea.'
                }
            ],

            medical_sources: [
                'National Academies of Sciences, Engineering, and Medicine - "Dietary Reference Intakes for Water".',
                'European Food Safety Authority (EFSA) - Scientific Opinion on Dietary Reference Values for water.',
                'Journal of Physiology - "Dehydration and cognitive performance".'
            ]
        }
    },
    'ideal-weight': {
        en: {
            hero_title: 'Ideal Weight Calculator by Height',
            h1_title: 'Ideal Weight Calculator: What is Your Healthy Weight?',
            h2_title: 'Find Your Medically Recommended Range for Longevity',
            meta_title: 'Ideal Weight Calculator - Medically Recommended Healthy Range | WellTools',
            meta_description: 'Find your medically recommended ideal weight range based on height, age, and sex using clinical formulas (Devine, Miller). Set realistic health goals.',
            hero_subtitle: 'Discover your healthy target weight range using scientific health metrics.',
            hero_emoji: '⚖️',
            hero_color: 'from-orange-400 to-amber-500',
            related_tools: [
                { id: 'bmi', name: 'BMI Calculator' },
                { id: 'body-fat', name: 'Body Fat Calculator' },
                { id: 'calories', name: 'Calorie Calculator' }
            ],

            // Formula Explanation
            formula_title: 'Clinical Formulas: Devine, Miller, and Robinson',
            formula_explanation: 'Ideal Body Weight (IBW) is not a single number but a range based on clinical formulas used by medical professionals for drug dosing and health assessment. These formulas use your height and biological sex to establish a weight that typically correlates with the lowest mortality and disease risk.',
            formula_text: 'Devine Formula (Men): 50kg + 2.3kg for every inch over 5ft\nDevine Formula (Women): 45.5kg + 2.3kg for every inch over 5ft',
            formula_example: 'Example: A 5\'10" man (10 inches over 5ft) = 50 + (10 × 2.3) = 73kg.',
            formula_accuracy: 'IBW formulas provide a research-backed baseline. However, they do not account for muscle mass—bodybuilders will often weigh more than their "ideal" due to dense muscle tissue.',

            // Examples
            example_title: 'Real-World Health Ranges',
            examples: [
                {
                    name: 'Michael, 6\'2" Tall',
                    stats: 'Height: 188cm',
                    calculation: 'Devine IBW: 82.2kg. Healthy BMI Range: 65kg - 88kg.',
                    result: 'Strategic Goal: 80-85kg',
                    interpretation: 'For Michael\'s height, maintaining a weight in the low 80s supports joint health and cardiovascular efficiency without requiring extreme leanness.'
                },
                {
                    name: 'Emma, 5\'4" Tall',
                    stats: 'Height: 162cm',
                    calculation: 'Devine IBW: 54.7kg. Healthy BMI Range: 48kg - 65kg.',
                    result: 'Strategic Goal: 54-58kg',
                    interpretation: 'Emma\'s "ideal" isn\'t just one number. A range of 54-58kg allows for normal fluctuations (water weight, hormonal cycles) while keeping her metabolic markers healthy.'
                }
            ],

            // Comparison Table
            comparison_table_title: 'Why Do Formulas Differ?',
            activity_levels: [
                { level: 'Devine (1974)', multiplier: 'Standard', description: 'The most widely used medical standard. Originally for drug dosing.' },
                { level: 'Robinson (1983)', multiplier: 'Higher', description: 'Often preferred for taller men; slightly higher targets than Devine.' },
                { level: 'Miller (1983)', multiplier: 'Lower', description: 'Tends to suggest lower weights; considered by some to be outdated for modern body types.' },
                { level: 'Hamwi (1964)', multiplier: 'Classic', description: 'Simple "Rule of Thumb": 100 lbs for 5ft + 5 lbs/inch.' },
                { level: 'Healthy BMI', multiplier: 'Flexible', description: 'The World Health Organization standard. Offers the widest, most realistic range.' }
            ],

            seo_what_title: 'What is Ideal Body Weight?',
            seo_what_content: 'Ideal Body Weight (IBW) is a concept that aims to identify the weight at which an individual is likely to live the longest, healthiest life. While "ideal" is subjective, medical IBW is calculated using established clinical formulas (Devine, Robinson, Miller) that factor in height and sex. It provides a healthy baseline target that correlates with lower risks of heart disease, diabetes, and joint problems.',

            seo_why_title: 'Why Aim for an Ideal Weight?',
            seo_why_content: 'Maintaining a weight within your ideal range is one of the most effective ways to prevent chronic illness. Being overweight puts strain on the heart, lungs, and joints, while being severely underweight can lead to nutrient deficiencies and weakened immunity. Calculating your IBW gives you a "North Star" for your fitness journey, helping you set realistic, science-based goals rather than chasing aesthetic trends.',

            seo_how_title: 'How to Determine Your Goal',
            seo_how_steps: [
                'Measure your height accurately without shoes',
                'Select your biological sex (formulas differ for bone density)',
                'Input your measurements',
                'Look at the "Range" rather than one specific number',
                'If you are muscular, aim for the upper end or slightly above'
            ],

            seo_tips_title: 'Tips for Sustainable Weight Management',
            seo_tips: [
                '🏋️ **Muscle vs. Fat**: Muscle is denser than fat. If you lift weights, ignore the scale and look at the mirror or body fat percentage.',
                '🍎 **Nutrient Density**: 2000 calories of vegetables and lean meat affects your body differently than 2000 calories of soda.',
                '🚶 **NEAT**: Non-Exercise Activity Thermogenesis (walking, standing, fidgeting) burns more calories daily than a 1-hour gym session.',
                '😴 **Sleep & Stress**: High cortisol (stress) and lack of sleep directly equate to belly fat retention. Rest is part of the work.',
                '🦷 **Small Habits**: Don\'t diet. Change your lifestyle. Drink water before meals and walk 10 minutes after eating.'
            ],

            seo_faqs: [
                {
                    question: 'Is the Ideal Weight the same for everyone of the same height?',
                    answer: 'No. While formulas give a baseline, your true ideal weight depends on muscle mass, bone density (frame size), and age.'
                },
                {
                    question: 'Can I be healthy if I\'m 10lbs over my ideal weight?',
                    answer: 'Absolutely. If your blood pressure, cholesterol, and blood sugar are healthy, being slightly outside the calculated range is often perfectly fine.'
                },
                {
                    question: 'Why do men and women have different ideal weights?',
                    answer: 'Men typically have higher bone density and muscle mass, leading to higher medically-recommended targets for the same height.'
                },
                {
                    question: 'What is the most accurate formula?',
                    answer: 'The Devine formula is the medical gold standard, but the "Healthy BMI Range" is often more practical for real life.'
                }
            ],

            medical_sources: [
                'American Journal of Clinical Nutrition ("Ideal Body Weight Formulas").',
                'World Health Organization (BMI Standards).',
                'National Institutes of Health (NIH).'
            ]
        },
    },
    sleep: {
        en: {
            hero_title: 'Sleep Cycle Calculator',
            h1_title: 'Sleep Calculator: Wake Up Refreshed Every Time',
            h2_title: 'Master Your Circadian Rhythm with the 90-Minute Sleep Rule',
            meta_title: 'Sleep Calculator - Optimal Bedtime & Wake Up Time | WellTools',
            meta_description: 'Wake up feeling energized by timing your sleep cycles. Calculate the perfect bedtime or wake-up time based on 90-minute REM cycles. Goodbye morning grogginess.',
            hero_subtitle: 'Stop waking up tired. Align your alarm with your biological clock.',
            hero_emoji: '😴',
            hero_color: 'from-indigo-500 to-purple-600',
            related_tools: [
                { id: 'water', name: 'Water Intake Calculator' },
                { id: 'calories', name: 'Calorie Calculator' }
            ],

            // Formula Explanation
            formula_title: 'The Science of Sleep Cycles',
            formula_explanation: 'Your brain doesn\'t just "shut off" when you sleep. It cycles through distinct stages: Light Sleep, Deep Sleep (Physical Repair), and REM (Mental Repair). Each full cycle lasts approximately 90 minutes. If your alarm goes off in the middle of Deep Sleep, you experience "Sleep Inertia"—a state of severe grogginess and cognitive impairment that can last for hours.',
            formula_text: 'Optimal Wake Time = Bedtime + (90 mins × Cycles) + 15 mins (Time to Fall Asleep)',
            formula_example: 'Scenario: You need to wake up at 7:00 AM.\nCounting back 5 cycles (7.5 hours) + 15 mins to fall asleep = Bedtime 11:15 PM.',
            formula_accuracy: '90 minutes is the population average. Cycles can range from 70-110 minutes depending on age and genetics.',

            // Step-by-Step Examples
            example_title: 'Sleep Strategies for Different Lifestyles',
            examples: [
                {
                    name: 'The Productivity Hacker (5 Cycles)',
                    stats: 'Goal: 7.5 Hours of Sleep',
                    calculation: 'Bedtime: 11:00 PM -> Wake Up: 6:30 AM',
                    result: 'Result: High Energy',
                    interpretation: '5 cycles is the "sweet spot" for most adults. It provides enough Deep Sleep for physical recovery and enough REM for memory consolidation.'
                },
                {
                    name: 'The Athlete (6 Cycles)',
                    stats: 'Goal: 9.0 Hours of Sleep',
                    calculation: 'Bedtime: 10:00 PM -> Wake Up: 7:00 AM',
                    result: 'Result: Max Recovery',
                    interpretation: 'Athletes release maximal Growth Hormone during deep sleep stages. 6 full cycles ensures complete physical repair and reduces injury risk.'
                }
            ],

            seo_what_title: 'What is a Sleep Cycle?',
            seo_what_content: 'A sleep cycle is a progression through the four stages of sleep: NREM 1 (falling asleep), NREM 2 (light sleep), NREM 3 (deep slow-wave sleep), and REM (dreaming). Waking up at the end of a REM phase usually makes you feel alert and happy, whereas waking up during NREM 3 leaves you feeling like you have a "hangover" despite not drinking drinking alcohol.',

            seo_why_title: 'Why Timing Matters More Than Duration',
            seo_why_content: 'It sounds counterintuitive, but sleeping 7.5 hours can actually leave you feeling BETTER than sleeping 8 hours. Why? Because at 7.5 hours, you are likely finishing a 5th cycle. At 8 hours, you are 30 minutes into a NEW cycle—likely deep sleep. Interrupting this process shocks the nervous system.',

            seo_how_title: 'How to Use the Calculator',
            seo_how_steps: [
                'Choose "I want to wake up at..." if you have a set work schedule',
                'Choose "I am going to bed now..." if you are ready to sleep',
                'Account for the average 15 minutes it takes for the average person to fall asleep (included in our calculation)',
                'Pick a time that gives you 5 or 6 cycles (7.5 or 9 hours)'
            ],

            seo_tips_title: 'The Pillars of Sleep Hygiene',
            seo_tips: [
                '🌡️ **Temperature**: The room must be cool (18°C / 65°F). Your core body temperature needs to drop to initiate sleep.',
                '🚫 **Blue Light**: Use "Night Shift" mode or glasses. Blue light from screens tricks your brain into thinking it\'s noon, suppressing melatonin.',
                '☕ **Caffeine Half-Life**: Caffeine stays in your system for 6-8 hours. A 4 PM coffee is still 50% active in your brain at 10 PM.',
                '☀️ **Morning Sunlight**: View bright light within 30 minutes of waking up. This "sets" your circadian clock for the night.',
                '🧘 **NSDR**: Non-Sleep Deep Rest (or Yoga Nidra) can help you fall asleep faster if you are anxious.'
            ],

            seo_faqs: [
                {
                    question: 'What if I wake up in the middle of the night?',
                    answer: 'Don\'t panic. Keep the lights off. Do not check your phone. Anxiety about not sleeping is the #1 cause of insomnia. Try "4-7-8 breathing" to lower your heart rate.'
                },
                {
                    question: 'Is 6 hours enough?',
                    answer: 'For >95% of the population, no. 6 hours (4 cycles) usually leads to chronic sleep deprivation, increasing risks of Alzheimer\'s and heart disease long-term.'
                },
                {
                    question: 'Can I catch up on sleep on weekends?',
                    answer: 'Only partially. You can pay back "sleep debt," but consistent irregular schedules ("Social Jetlag") disrupt your metabolism almost as much as lack of sleep.'
                },
                {
                    question: 'What is the best position to sleep in?',
                    answer: 'Side sleeping is generally best for spinal alignment and reducing snoring/apnea. Back sleeping is good for avoiding facial wrinkles but can worsen snoring.'
                }
            ],

            medical_sources: [
                'National Sleep Foundation.',
                'Journal of Clinical Sleep Medicine.',
                'Stanford Center for Sleep Sciences.'
            ]
        },
    },
    bmr: {
        en: {
            hero_title: 'BMR Calculator (Mifflin-St Jeor)',
            h1_title: 'BMR Calculator: Discover Your Body\'s Baseline Energy Needs',
            h2_title: 'Calculate Your Basal Metabolic Rate with Clinical Precision',
            meta_title: 'BMR Calculator - Calculate Your Basal Metabolic Rate | WellTools',
            meta_description: 'Find your Basal Metabolic Rate (BMR) using the accurate Mifflin-St Jeor equation. Discover how many calories your body burns at rest for better health tracking.',
            hero_subtitle: 'Discover your body’s baseline calorie needs with our precision BMR tool.',
            hero_emoji: '⚡',
            hero_color: 'from-amber-400 to-orange-500',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'macro', name: 'Macro Calculator' },
                { id: 'bmi', name: 'BMI Calculator' }
            ],

            // Formula Explanation Section
            formula_title: 'Mifflin-St Jeor Formula: The Science of BMR',
            formula_explanation: 'Your Basal Metabolic Rate (BMR) represents the minimum amount of energy (calories) your body needs to maintain vital functions while at rest. This includes breathing, heart rate, cell production, and nutrient processing. We use the Mifflin-St Jeor equation, which is widely considered the most accurate BMR formula for the general population.',
            formula_text: 'Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5\nWomen: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161',
            formula_example: 'Example: A 30-year-old male, 180cm tall and weighing 80kg, has a BMR of: (10 × 80) + (6.25 × 180) - (5 × 30) + 5 = 1780 kcal.',
            formula_accuracy: 'This formula is clinically proven to be accurate within ±10% for most adults. It replaced the older Harris-Benedict formula as the industry standard.',

            // Step-by-Step Example
            example_title: 'Real-World BMR Examples',
            examples: [
                {
                    name: 'Sarah, Active Professional',
                    stats: 'Age: 25, Weight: 55kg, Height: 160cm',
                    calculation: 'BMR = (10 × 55) + (6.25 × 160) - (5 × 25) - 161 = 1264 kcal',
                    result: 'BMR: 1264 kcal/day',
                    interpretation: 'Sarah burns 1264 calories just by existing. This number is her "metabolic floor"—she should never eat below this amount without medical supervision.'
                },
                {
                    name: 'Tom, Powerlifter',
                    stats: 'Age: 40, Weight: 100kg, Height: 185cm',
                    calculation: 'BMR = (10 × 100) + (6.25 × 185) - (5 × 40) + 5 = 1961 kcal',
                    result: 'BMR: 1961 kcal/day',
                    interpretation: 'Tom\'s high weight and height give him a high BMR. Because he has more muscle mass (which is metabolically active), his actual BMR might even be 5-10% higher than this estimate.'
                }
            ],

            seo_what_title: 'What is BMR?',
            seo_what_content: 'Basal Metabolic Rate (BMR) is the number of calories your body burns while at complete rest to maintain vital functions like heart rate, brain activity, and breathing. Think of it as the energy your body requires to function in a "coma-like" state. Understanding your BMR is the absolute first step in building a personalized nutrition plan, as it establishes the baseline energy your body needs before adding exercise or daily movement.',

            seo_why_title: 'Why Calculate BMR?',
            seo_why_content: 'Calculating your BMR is essential for anyone serious about weight loss, muscle gain, or overall health optimization. It provides the "mathematical base" for your Total Daily Energy Expenditure (TDEE). Without knowing your BMR, you are guessing your calorie needs. Knowing this number prevents you from eating too little (which triggers starvation mode) or eating too much (leading to unintended fat gain).',

            seo_how_title: 'How to Use This BMR Calculator',
            seo_how_steps: [
                'Select your biological sex (Men and women have different metabolic rates due to body composition)',
                'Enter your current weight in kilograms',
                'Enter your height in centimeters',
                'Input your age in years',
                'Click "Calculate" to view your BMR results immediately'
            ],

            seo_tips_title: 'Facts to Boost Your BMR',
            seo_tips: [
                '💪 **Build Muscle**: Muscle tissue is 3x more metabolically active than fat. Strength training is the best way to increase your BMR.',
                '🥩 **Eat Protein**: Digesting protein requires more energy (Thermic Effect of Food) than fats or carbs, temporarily boosting metabolism.',
                '💧 **Stay Hydrated**: Even slight dehydration can slow down your metabolic rate.',
                '🥗 **Avoid Starvation Diets**: Eating significantly below your BMR can cause your body to slow its metabolism to conserve energy (adaptive thermogenesis).',
                '⚡ **Sleep Quality**: Lack of sleep disrupts hormones like leptin and ghrelin, which can negatively impact your metabolic efficiency.'
            ],

            seo_faqs: [
                {
                    question: 'Does BMR change with age?',
                    answer: 'Yes, BMR generally decreases by 2-3% every decade after age 25. This is primarily due to the loss of lean muscle mass (sarcopenia). However, you can offset this by engaging in regular resistance training.'
                },
                {
                    question: 'Is BMR the same as TDEE?',
                    answer: 'No. BMR is the calories you burn at rest. TDEE (Total Daily Energy Expenditure) is your BMR plus the calories burned through exercise, walking, working, and digesting food. TDEE is usually 20-50% higher than BMR.'
                },
                {
                    question: 'Can I eat less than my BMR?',
                    answer: 'Eating below your BMR for extended periods is generally discouraged. It can lead to nutrient deficiencies, fatigue, and a "crashed" metabolism where your body burns fewer calories than normal to survive. Always consult a nutritionist before extreme calorie restriction.'
                },
                {
                    question: 'How do I increase my BMR?',
                    answer: 'The most effective way to increase BMR is to build muscle mass through strength training. Having more muscle increases your "resting" calorie burn. Improving sleep, staying hydrated, and optimizing thyroid health can also help.'
                },
                {
                    question: 'How accurate is this BMR calculator?',
                    answer: 'The Mifflin-St Jeor equation used here is accurate for about 82% of the population. However, it don\'t account for body fat percentage. If you have very high muscle mass or very high body fat, the result may be slightly off.'
                },
                {
                    question: 'Is BMR higher for men or women?',
                    answer: 'Men generally have a higher BMR than women because they tend to have more lean muscle mass and larger internal organs. However, a muscular woman can have a higher BMR than a sedentary man of the same weight.'
                },
                {
                    question: 'What is a "normal" BMR?',
                    answer: 'There is no single "normal" BMR, as it depends entirely on your size and age. However, for most adults, BMR ranges between 1,200 and 2,200 calories per day.'
                }
            ],

            medical_sources: [
                'American Journal of Clinical Nutrition.',
                'Academy of Nutrition and Dietetics.',
                'Journal of the American Dietetic Association.'
            ]
        }
    },
    macro: {
        en: {
            hero_title: 'Macro Calculator',
            h1_title: 'Macro Calculator: Optimize Your Protein, Carbs, and Fats',
            h2_title: 'Customized Macronutrient Ratios for Muscle Gain and Fat Loss',
            meta_title: 'Macro Calculator - Optimal Protein, Carbs, & Fat Ratios | WellTools',
            meta_description: 'Calculate your optimal macronutrient split (Protein, Carbs, Fats) for weight loss, muscle gain, or maintenance. Tailored macro ratios for every fitness goal.',
            hero_subtitle: 'Get your personalized daily targets for protein, carbs, and fats.',
            hero_emoji: '🥗',
            hero_color: 'from-green-400 to-emerald-600',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'bmr', name: 'BMR Calculator' },
                { id: 'bmi', name: 'BMI Calculator' }
            ],

            // Formula Explanation Section
            formula_title: 'The Science of Macronutrients',
            formula_explanation: 'Calories determine weight change, but macronutrients determine body composition. "Macros" are the three substrates of energy: Protein (4 kcal/g), Carbohydrates (4 kcal/g), and Fats (9 kcal/g). Your optimal ratio depends on your activity level, insulin sensitivity, and primary fitness goal.',
            formula_text: 'TDEE is split into percentages. Example (Zone Diet): 40% Carbs, 30% Protein, 30% Fat.',
            formula_example: 'For a 2000 kcal diet: 40% Carbs = 800 kcal (200g), 30% Protein = 600 kcal (150g), 30% Fat = 600 kcal (67g).',
            formula_accuracy: 'Our calculator adjusts for "Protein Sparing" needs in a deficit, ensuring you don\'t lose muscle while dieting.',

            // Step-by-Step Example
            example_title: 'Macro Strategy Examples',
            examples: [
                {
                    name: 'The Bodybuilder (Bulking)',
                    stats: 'High Carb / High Protein',
                    calculation: 'Split: 50% Carbs / 30% Protein / 20% Fat',
                    result: 'Focus: Performance',
                    interpretation: 'High carbohydrates are essential for replenishing muscle glycogen during intense training. Moderate fats prevent excessive calorie surplus.'
                },
                {
                    name: 'The Keto Dieter (Fat Loss)',
                    stats: 'High Fat / Low Carb',
                    calculation: 'Split: 5% Carbs / 25% Protein / 70% Fat',
                    result: 'Focus: Ketosis',
                    interpretation: 'By drastically reducing carbs, the body shifts to burning Ketones (fat) for fuel. Protein is kept moderate to prevent gluconeogenesis.'
                }
            ],

            // Comparison Table
            comparison_table_title: 'Popular Macro Splits',
            macro_ratios: [
                { goal: 'Maintenance', split: '40/30/30', description: 'The "Zone" split. Good for hormonal balance and steady energy.' },
                { goal: 'Muscle Gain', split: '50/30/20', description: 'Carbs fuel training; Protein builds tissue.' },
                { goal: 'Fat Loss', split: '35/40/25', description: 'Higher protein curbs hunger and spares muscle in a deficit.' },
                { goal: 'Endurance', split: '60/20/20', description: 'Marathon runners need massive carbohydrate availability.' }
            ],

            seo_what_title: 'What are Macros?',
            seo_what_content: 'Macronutrients are the nutrients your body needs in large amounts to function. \n\n**Protein**: The building block of muscle, enzymes, and hormones. Essential for repair.\n**Carbohydrates**: The body\'s preferred fuel source for high-intensity activity and brain function.\n**Fats**: Crucial for hormone production (testosterone/estrogen), brain health, and vitamin absorption (A, D, E, K).',

            seo_why_title: 'Why Count Macros vs. Calories?',
            seo_why_content: 'Counting only calories tells you *how much* weight you will lose. Counting macros tells you *what kind* of weight you will lose. If you eat 1500 calories of cookies, you will lose weight but feel terrible and lose muscle ("skinny fat"). If you eat 1500 calories of chicken, rice, and avocado, you will lose fat and keep muscle.',

            seo_how_title: 'How to Use This Tool',
            seo_how_steps: [
                'Calculate your TDEE (Total Daily Energy Expenditure) first',
                'Choose your goal (Cut, Bulk, Maintain)',
                'Select a preference (Balanced, Low Carb, High Protein)',
                'The tool calculates the exact grams you need to hit your daily calorie target'
            ],

            seo_tips_title: 'Pro Tips for Hitting Your Macros',
            seo_tips: [
                '🧩 **Protein First**: Plan your protein for every meal first, then fill the rest with carbs and fats.',
                '📉 **Fiber is Key**: Don\'t forget fiber! Aim for 14g per 1000 calories. It counts as a carb but regulates blood sugar.',
                '⚖️ **Use a Scale**: "Eyeballing" food portions is notoriously inaccurate. A kitchen scale is your best friend.',
                '🔄 **Meal Prep**: Cooking in bulk ensures you always have a macro-friendly meal ready, preventing panic eating.'
            ],

            seo_faqs: [
                { question: 'Should I track veggies?', answer: 'Starchy veggies (potatoes, corn) YES. Leafy greens (spinach, lettuce) usually NO, unless you eat huge amounts.' },
                { question: 'What about alcohol?', answer: 'Alcohol is effectively the 4th macro (7 kcal/g). It pauses fat burning. Track it as "Carbs" or "Fats" in your app to stay accountable.' },
                { question: 'Is higher protein always better?', answer: 'Up to a point (2.2g/kg). Beyond that, extra protein offers no additional muscle-building benefit and is just expensive calories.' }
            ],

            medical_sources: [
                'Journal of the International Society of Sports Nutrition.',
                'Harvard T.H. Chan School of Public Health.',
                'National Institutes of Health (NIH).'
            ]
        },
    },
    'body-fat': {
        en: {
            hero_title: 'Body Fat Calculator (US Navy Method)',
            h1_title: 'Body Fat Calculator: Measure Your True Fitness Level',
            h2_title: 'Accurate Body Composition Analysis Without the Lab',
            meta_title: 'Body Fat Calculator - Accurate Body Fat Percentage | WellTools',
            meta_description: 'Estimate your body fat percentage accurately using the U.S. Navy Method. Track your body composition changes and fitness progress efficiently.',
            hero_subtitle: 'Calculate your body fat percentage with clinical accuracy using simple measurements.',
            hero_emoji: '🍊',
            hero_color: 'from-orange-400 to-orange-600',
            related_tools: [
                { id: 'bmi', name: 'BMI Calculator' },
                { id: 'ideal-weight', name: 'Ideal Weight Calculator' },
                { id: 'calories', name: 'Calorie Calculator' }
            ],

            // Formula Explanation
            formula_title: 'U.S. Navy Method: Scientific Body Composition',
            formula_explanation: 'This calculator uses the U.S. Navy Method, which estimates body fat percentage using circumference measurements. Research has shown this method to be the most reliable non-clinical way to predict body composition, often coming within 3-4% of expensive DEXA scans.',
            formula_text: 'Males: 495 / (1.0324 - 0.19077 × log10(waist-neck) + 0.15456 × log10(height)) - 450',
            formula_example: 'Example: A man with a 90cm waist, 40cm neck, and 180cm height has ~18.5% body fat.',
            formula_accuracy: 'Accurate within ±3-4% compared to DEXA gold-standard testing. Best used to track trends over time rather than absolute values.',

            // Step-by-Step Example
            example_title: 'Body Fat Goal Examples',
            examples: [
                {
                    name: 'The Athlete (Male)',
                    stats: 'Visible Abs Goal',
                    calculation: 'Current: 15% -> Target: 8-10%',
                    result: 'Action Plan: Calorie Deficit + High Protein',
                    interpretation: 'At 8-10%, abdominal definition is sharp and vascularity increases. Achieving this requires strict dietary adherence.'
                },
                {
                    name: 'The Fitness Enthusiast (Female)',
                    stats: 'Lean & Toned Goal',
                    calculation: 'Current: 26% -> Target: 20%',
                    result: 'Action Plan: Strength Training + Moderate Cardio',
                    interpretation: 'At 20%, a woman will have clear muscle tone while maintaining hormonal balance. Going below 18% can sometimes disrupt menstrual cycles.'
                }
            ],

            seo_what_title: 'Understanding Body Fat Percentage',
            seo_what_content: 'Body fat percentage is the total mass of fat divided by total body mass. It is a far superior indicator of health than weight alone. A 100kg bodybuilder and a 100kg sedentary person have the same BMI, but vastly different body fat percentages. Health risks like diabetes and heart disease are linked to *fat mass*, not total weight.',

            seo_why_title: 'Why Measure Body Fat?',
            seo_why_content: 'Tracking body fat is essential during weight loss. If you lose 5kg but your body fat percentage stays the same, you likely lost muscle, which slows your metabolism. By tracking body fat, you ensure that your weight loss is actually *fat loss*. This distinction is critical for long-term weight management and aesthetics.',

            seo_how_title: 'How to Get Accurate Measurements',
            seo_how_steps: [
                'Use a flexible measuring tape (fiberglass is best to avoid stretching)',
                'Measure your neck: Just below the larynx (Adam\'s apple)',
                'Measure your waist: At the navel for men; at the narrowest point for women',
                'Measure your hips: At the widest point of the glutes (Women only)',
                'Keep the tape snug against the skin but do not compress the soft tissue'
            ],

            seo_tips_title: 'Tips for Lowering Body Fat',
            seo_tips: [
                '💪 **Lift Heavy**: Resistance training preserves muscle while you lose fat. More muscle = higher resting metabolism.',
                '🥗 **Calorie Deficit**: You cannot out-train a bad diet. A moderate calorie deficit (300-500 kcal) is key.',
                '🚶 **NEAT**: Non-Exercise Activity Thermogenesis (walking, standing) burns more calories daily than a 1-hour gym session.',
                '💧 **Sleep & Stress**: High cortisol (stress hormone) from lack of sleep encourages belly fat storage.'
            ],

            seo_faqs: [
                { question: 'What is a "good" body fat %?', answer: 'Men: 14-17% (Fitness), 6-13% (Athlete). Women: 21-24% (Fitness), 14-20% (Athlete).' },
                { question: 'How often should I measure?', answer: 'Once every 2 weeks. Body fat changes slower than weight. Measuring daily will just show water weight fluctuations.' },
                { question: 'Is the Navy Method accurate?', answer: 'Yes, studies show it\'s very consistent. While not as precise as an autopsy, it\'s excellent for tracking your personal progress over time.' }
            ],

            medical_sources: [
                'Naval Health Research Center.',
                'Journal of Strength and Conditioning Research.',
                'American Council on Exercise (ACE).'
            ]
        }
    },
    '1rm': {
        en: {
            hero_title: 'One-Rep Max (1RM) Calculator',
            h1_title: '1RM Calculator: Maximize Your Lifting Potential',
            h2_title: 'Predict Your True Strength Safely and Accurately',
            meta_title: 'One Rep Max Calculator - Find Your Max Lift Safely | WellTools',
            meta_description: 'Calculate your estimated 1RM for bench press, squat, and deadlift. Use our strength calculator to plan your training percentages and gain muscle.',
            hero_subtitle: 'Predict your maximum lifting capacity and optimize your strength training.',
            hero_emoji: '🏋️',
            hero_color: 'from-gray-700 to-gray-900',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'body-fat', name: 'Body Fat Calculator' },
                { id: 'macro', name: 'Macro Calculator' }
            ],

            // Formula Explanation
            formula_title: 'The Brzycki Formula: Predicting Strength',
            formula_explanation: 'Calculating your One-Rep Max (1RM) allows you to determine your absolute strength without the risk of injury that comes with actually lifting your maximum possible weight. Our calculator primarily uses the Brzycki Formula, which is highly accurate for repetitions under 10.',
            formula_text: '1RM = Weight / (1.0278 - (0.0278 × Reps))',
            formula_example: 'Example: If you bench press 100kg for 5 reps: 100 / (1.0278 - (0.0278 × 5)) = 112.5kg.',
            formula_accuracy: 'Predictions are most accurate between 2 and 8 repetitions. If you can perform more than 12 reps, the formula accuracy decreases significantly.',

            // Examples
            example_title: 'Strength Training Examples',
            examples: [
                {
                    name: 'Alex, Powerlifter',
                    stats: 'Current Lift: 140kg Squat for 3 reps',
                    calculation: '1RM = 140 / (1.0278 - (0.0278 × 3)) = 150.5kg',
                    result: 'Estimated 1RM: 151kg',
                    interpretation: 'Alex can use this 151kg target to calculate his training percentages (e.g., 80% for 5x5 work is 120kg).'
                },
                {
                    name: 'Sarah, Fitness Beginner',
                    stats: 'Current Lift: 40kg Overhead Press for 8 reps',
                    calculation: '1RM = 40 / (1.0278 - (0.0278 × 8)) = 49.3kg',
                    result: 'Estimated 1RM: 49kg',
                    interpretation: 'Sarah knows her absolute limit is nearly 50kg. She should aim for 35-40kg sets to build a solid foundation safely.'
                }
            ],

            // Percentage Table
            comparison_table_title: 'Training Load Percentages',
            strength_percentages: [
                { percentage: '100%', repetitions: '1', focus: 'Absolute Strength' },
                { percentage: '95%', repetitions: '2', focus: 'Power / Strength' },
                { percentage: '90%', repetitions: '3-4', focus: 'Strength Base' },
                { percentage: '85%', repetitions: '5-6', focus: 'Hypertrophy / Strength' },
                { percentage: '80%', repetitions: '7-8', focus: 'Muscle Growth' },
                { percentage: '75%', repetitions: '10-12', focus: 'Endurance / Hypertrophy' }
            ],

            seo_what_title: 'What is a One-Rep Max Calculator?',
            seo_what_content: 'A One-Rep Max (1RM) Calculator is a mathematical tool used by athletes and fitness enthusiasts to estimate the maximum weight they can lift for a single repetition of a given exercise. Instead of attempting a "True 1RM"—which can be dangerous and taxing on the Central Nervous System—you input a weight you can lift for multiple reps, and the calculator predicts your top-end strength with scientific precision.',

            seo_why_title: 'Why Calculate Your 1RM?',
            seo_why_content: 'Most structured strength programs (like 5/3/1, Starting Strength, or PPL) are based on percentages of your 1RM. Knowing your 1RM is essential for tracking progress over months and years. It allows you to "auto-regulate" your training—ensuring you aren\'t lifting too light to make progress or too heavy to recover. Furthermore, seeing your estimated 1RM increase is a powerful psychological motivator.',

            seo_how_title: 'How to Use This Calculator Safely',
            seo_how_steps: [
                'Perform a thorough warm-up (dynamic stretching + light sets)',
                'Choose a weight you can lift for 3 to 8 repetitions with perfect form',
                'Perform the set until you have 1 rep left in the tank (RPE 9)',
                'Enter the weight and the number of reps achieved',
                'Use the predicted 1RM to set your future training percentages'
            ],

            seo_tips_title: 'Maximizing Strength Gains',
            seo_tips: [
                '📉 **Don\'t Test Too Often**: True 1RM tests should only happen every 8-12 weeks. Use this calculator for monthly check-ins.',
                '🧘 **Focus on Form**: A prediction based on "cheat reps" is useless and leads to injury.',
                '🔋 **Rest Between Sets**: If you are trying to hit a rep PR, rest at least 3-5 minutes to allow ATP stores to recover.',
                '🗒️ **Log Everything**: Strength is a long game. Small increases in your estimated 1RM over time mean your program is working.',
                '🧠 **CNS Recovery**: Heavy lifting isn\'t just about muscles; it\'s about your nervous system. Prioritize sleep and hydration.'
            ],

            seo_faqs: [
                { question: 'What is the most accurate 1RM formula?', answer: 'The Brzycki and Epley formulas are the gold standards. Brzycki is slightly better for heavy sets (1-6 reps), while Epley is better for higher reps (6-12).' },
                { question: 'Is 1RM testing dangerous?', answer: 'Attempting a physical 1RM lift is high-risk. Using a calculator to predict it from an 8-rep set is much safer and provides nearly identical data for program design.' },
                { question: 'How do I use these percentages?', answer: 'If your 1RM is 100kg and your program asks for "3x8 @ 75%", you should lift 75kg for 3 sets of 8 reps.' },
                { question: 'Does 1RM apply to isolation moves?', answer: 'Strictly speaking, yes, but 1RM is best used for compound lifts (Squat, Bench, Deadlift, Press). Testing 1RM on a bicep curl or tricep extension is generally not recommended due to joint stress.' }
            ],

            medical_sources: [
                'National Strength and Conditioning Association (NSCA).',
                'Journal of Sports Sciences.',
                'American College of Sports Medicine (ACSM).'
            ]
        }
    },
    'meal-planner': {
        en: { meta_title: 'Meal Planner - Personalized Diet Plans | WellTools', meta_description: 'Create a custom meal plan based on your calories and macros. Healthy, delicious recipes tailored to your weight loss or muscle gain goals.' }
    },
    'daily-tracking': {
        en: { meta_title: 'Daily Tracking - Monitor Your Fitness Progress | WellTools', meta_description: 'Track your daily weight, water intake, and calories. Visualize your progress with interactive charts and stay motivated.' }
    },
    home: {
        en: {
            meta_title: 'WellTools - Free Health Calculators, Meal Plans & Wellness Tracking',
            meta_description: 'Achieve your fitness goals with our free, science-backed health calculators (BMI, TDEE, Macros), personalized meal planner, and daily progress tracking tools.'
        }
    },
    about: {
        en: {
            meta_title: 'About WellTools - Our Mission & Health Experts',
            meta_description: 'Learn about WellTools mission to provide accessible, accurate health tools. Meet our team of fitness experts and medical advisors.'
        }
    },
    contact: {
        en: {
            meta_title: 'Contact Us - WellTools Support',
            meta_description: 'Have questions or feedback? Contact the WellTools team for support with our calculators or meal planning tools.'
        }
    },
    privacy: {
        en: { meta_title: 'Privacy Policy - WellTools', meta_description: 'Read our privacy policy to understand how we protect your personal health data.' }
    },
    terms: {
        en: { meta_title: 'Terms of Service - WellTools', meta_description: 'Terms and conditions for using WellTools services.' }
    },
    disclaimer: {
        en: { meta_title: 'Medical Disclaimer - WellTools', meta_description: 'Important medical disclaimer regarding the use of our health calculators and content.' }
    },
    'how-it-works': {
        en: { meta_title: 'How It Works - Science Behind WellTools', meta_description: 'Understand the science and formulas behind our health calculators.' }
    },
    experts: {
        en: { meta_title: 'Our Experts - WellTools Medical Advisory Board', meta_description: 'Meet the certified nutritionists, doctors, and trainers who review our content.' }
    },
    blog: {
        en: { meta_title: 'Health & Fitness Blog - WellTools', meta_description: 'Latest articles on nutrition, fitness, and wellness from our experts.' }
    }
};
