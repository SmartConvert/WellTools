// SEO-rich content for all calculator pages in 3 languages
export const calculatorContent = {
    bmi: {
        en: {
            hero_title: 'BMI Calculator',
            hero_subtitle: 'Calculate your Body Mass Index.',
            hero_emoji: '🥑',
            hero_color: 'from-lime-400 to-green-500',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'bmr', name: 'BMR Calculator' }
            ],

            // Formula Explanation Section (NEW)
            formula_title: 'BMI Formula: How It Works',
            formula_explanation: 'BMI (Body Mass Index) is calculated using the Quetelet Index formula, developed by Belgian mathematician Adolphe Quetelet in 1832. The formula is simple yet powerful for screening weight-related health risks.',
            formula_text: 'BMI = weight (kg) / height (m)²',
            formula_example: 'For example: A person weighing 70 kg with a height of 1.75 m has a BMI of 70 / (1.75 × 1.75) = 22.9',
            formula_accuracy: 'BMI is a screening tool with ±10% accuracy for general populations. It\'s endorsed by WHO and CDC for population-level health assessment.',

            // Step-by-Step Example (NEW)
            example_title: 'Step-by-Step Calculation Example',
            examples: [
                {
                    name: 'Sarah, 30-year-old female',
                    stats: 'Weight: 65 kg, Height: 170 cm (1.70 m)',
                    calculation: 'BMI = 65 / (1.70)² = 65 / 2.89 = 22.5',
                    result: 'BMI: 22.5 (Normal weight)',
                    interpretation: 'Sarah\'s BMI falls in the healthy range (18.5-24.9). She should maintain her current weight through balanced diet and regular exercise.'
                },
                {
                    name: 'John, 45-year-old male athlete',
                    stats: 'Weight: 90 kg, Height: 180 cm (1.80 m)',
                    calculation: 'BMI = 90 / (1.80)² = 90 / 3.24 = 27.8',
                    result: 'BMI: 27.8 (Overweight)',
                    interpretation: 'John\'s BMI suggests overweight, but as an athlete with high muscle mass, his body fat % may be healthy. He should consider body composition analysis.'
                }
            ],

            // Comparison Tables (NEW)
            comparison_table_title: 'BMI Categories and Health Risks',
            bmi_ranges: [
                { category: 'Underweight', range: 'Below 18.5', risk: 'Malnutrition, weakened immunity' },
                { category: 'Normal weight', range: '18.5 - 24.9', risk: 'Minimal health risks' },
                { category: 'Overweight', range: '25.0 - 29.9', risk: 'Increased risk of heart disease' },
                { category: 'Obese (Class I)', range: '30.0 - 34.9', risk: 'High risk: diabetes, hypertension' },
                { category: 'Obese (Class II)', range: '35.0 - 39.9', risk: 'Very high risk' },
                { category: 'Obese (Class III)', range: '40.0+', risk: 'Extremely high risk' }
            ],

            seo_what_title: 'What is BMI Calculator?',
            seo_what_content: 'The BMI Calculator is a free, science-based tool that estimates body fat based on height and weight using the Quetelet Index formula. Developed in 1832 and adopted by WHO in 1995, BMI helps categorize individuals as underweight, normal weight, overweight, or obese. While BMI doesn\'t measure body fat directly, it serves as a reliable screening tool to identify potential weight-related health risks in adults aged 18 and above.',

            seo_why_title: 'Why Use a BMI Calculator?',
            seo_why_content: 'Understanding your BMI is crucial for assessing weight-related health risks. A BMI outside the healthy range (18.5-24.9) correlates with increased risks of cardiovascular disease, type 2 diabetes, hypertension, certain cancers, and reduced life expectancy. Regular BMI monitoring helps track fitness progress, guides weight management goals, and provides a simple, accessible metric for overall health screening—no expensive equipment needed.',

            seo_how_title: 'How to Use This BMI Calculator',
            seo_how_steps: [
                'Enter your weight in kilograms (kg)',
                'Enter your height in centimeters (cm)',
                'Click "Calculate BMI" to instantly see your result',
                'Review your BMI category and personalized health recommendations',
                'Compare your result with the BMI ranges table below',
                'Track your BMI over time for better insights'
            ],

            seo_tips_title: 'BMI Tips & Recommendations',
            seo_tips: [
                '💪 **For Athletes**: BMI may overestimate body fat in muscular individuals. Use body composition analysis or body fat percentage calculators for more accuracy.',
                '📊 **Track Trends**: Monitor your BMI monthly to identify patterns rather than obsessing over single measurements.',
                '🥗 **Combine with Lifestyle**: BMI is just one metric. Consider diet quality, physical activity, sleep, and stress levels for holistic health.',
                '👨‍⚕️ **Consult Professionals**: Always discuss BMI results with healthcare providers for personalized medical advice.',
                '⚖️ **Age Matters**: Older adults (65+) may have healthier outcomes with slightly higher BMI (23-27) due to muscle preservation.',
                '🧬 **Ethnicity Considerations**: Asian populations may have higher health risks at lower BMI levels (WHO recommends different cut-offs).'
            ],

            seo_faqs: [
                {
                    question: 'What is a healthy BMI range?',
                    answer: 'A healthy BMI for adults typically falls between 18.5 and 24.9 according to WHO guidelines. However, ideal ranges vary by age, gender, muscle mass, and ethnicity. Asian populations may benefit from lower thresholds (23-27.5 for overweight), while older adults (65+) may have better health outcomes with BMI of 23-27 to preserve muscle mass.'
                },
                {
                    question: 'Can BMI be inaccurate for athletes?',
                    answer: 'Yes, BMI doesn\'t distinguish between muscle and fat mass. Bodybuilders, athletes, and highly muscular individuals often have "overweight" or "obese" BMI readings despite having low body fat percentages. For these individuals, body composition analysis (DEXA scan, bioelectrical impedance) or waist-to-hip ratio measurements provide more accurate health assessments.'
                },
                {
                    question: 'How often should I check my BMI?',
                    answer: 'For general health monitoring, checking BMI monthly or quarterly is sufficient. If actively managing weight loss or gain, weekly measurements help track progress. However, daily weigh-ins can be misleading due to water retention and hormonal fluctuations.'
                },
                {
                    question: 'Is BMI reliable for children and teens?',
                    answer: 'BMI calculations differ for children and adolescents. Pediatric BMI uses age- and sex-specific percentiles (BMI-for-age charts) rather than fixed categories, as body composition changes rapidly during growth. Consult a pediatrician for accurate interpretation of children\'s BMI results.'
                },
                {
                    question: 'What are the limitations of BMI?',
                    answer: 'BMI has several limitations: (1) Doesn\'t measure body fat directly, (2) Doesn\'t account for muscle mass, bone density, or fat distribution, (3) May misclassify pregnant women, elderly individuals, and athletes, (4) Doesn\'t consider waist circumference (a better predictor of metabolic risk). Despite limitations, BMI remains a useful, quick screening tool when combined with other health metrics.'
                },
                {
                    question: 'Can I use BMI if I\'m pregnant?',
                    answer: 'BMI is not recommended during pregnancy as it doesn\'t account for fetal weight, amniotic fluid, or increased blood volume. Pre-pregnancy BMI is used to determine healthy weight gain ranges during pregnancy. Consult your OB-GYN for personalized guidance.'
                },
                {
                    question: 'How do I improve my BMI?',
                    answer: 'To achieve a healthy BMI: (1) Create a caloric deficit through balanced nutrition (500-750 cal/day deficit for 1-1.5 lbs/week loss), (2) Incorporate strength training to build muscle and boost metabolism, (3) Add 150+ minutes of moderate aerobic exercise weekly, (4) Prioritize sleep (7-9 hours), (5) Manage stress to reduce cortisol-driven weight gain. Sustainable lifestyle changes beat crash diets every time.'
                }
            ]
        },
        ar: {
            hero_title: 'حاسبة مؤشر كتلة الجسم',
            hero_subtitle: 'احسب مؤشر كتلة جسمك فوراً وافهم حالة وزنك الصحية',
            hero_emoji: '🥑',
            hero_color: 'from-lime-400 to-green-500',

            seo_what_title: 'ما هو مؤشر كتلة الجسم (BMI)؟',
            seo_what_content: 'مؤشر كتلة الجسم (BMI) هو مقياس صحي يستخدم على نطاق واسع لتقدير دهون الجسم بناءً على الطول والوزن. يوفر قياساً رقمياً بسيطاً يساعد في تصنيف ما إذا كنت تعاني من نقص الوزن، أو وزن طبيعي، أو زيادة الوزن، أو السمنة. على الرغم من أن مؤشر كتلة الجسم لا يقيس دهون الجسم بشكل مباشر، إلا أنه يعمل كأداة فحص موثوقة للمخاطر الصحية المحتملة المرتبطة بالوزن.',

            seo_why_title: 'لماذا مؤشر كتلة الجسم مهم؟',
            seo_why_content: 'فهم مؤشر كتلة جسمك أمر بالغ الأهمية للحفاظ على الصحة المثلى. قد يشير مؤشر كتلة الجسم خارج النطاق الصحي إلى زيادة خطر الإصابة بحالات مثل أمراض القلب، والسكري، وارتفاع ضغط الدم، وأنواع معينة من السرطان. تساعد مراقبة مؤشر كتلة الجسم بانتظام على تتبع تقدم لياقتك وتوجيه قرارات نمط الحياة المتعلقة بالتغذية والتمارين.',

            seo_how_title: 'كيفية استخدام حاسبة مؤشر كتلة الجسم',
            seo_how_steps: [
                'أدخل وزنك بالكيلوجرام (كجم)',
                'أدخل طولك بالسنتيمتر (سم)',
                'انقر على حساب لرؤية نتيجة مؤشر كتلة جسمك فوراً',
                'راجع فئة مؤشر كتلة جسمك والتوصيات الصحية المخصصة'
            ],

            seo_tips_title: 'نصائح وتوصيات مؤشر كتلة الجسم',
            seo_tips: [
                '💪 **للرياضيين**: قد يبالغ مؤشر كتلة الجسم في تقدير الدهون للأفراد العضليين. فكر في تحليل تكوين الجسم.',
                '📊 **تتبع الاتجاهات**: راقب مؤشر كتلة جسمك بمرور الوقت بدلاً من التركيز على قياس واحد.',
                '🥗 **ادمجه مع نمط الحياة**: استخدم مؤشر كتلة الجسم جنباً إلى جنب مع جودة النظام الغذائي والنشاط البدني ومؤشرات الصحة العامة.',
                '👨‍⚕️ **استشر المتخصصين**: ناقش دائماً نتائج مؤشر كتلة الجسم مع مقدمي الرعاية الصحية للحصول على نصائح مخصصة.'
            ],

            seo_faqs: [
                {
                    question: 'ما هو النطاق الصحي لمؤشر كتلة الجسم؟',
                    answer: 'يتراوح مؤشر كتلة الجسم الصحي للبالغين عادةً بين 18.5 و 24.9. ومع ذلك، قد تختلف النطاقات المثالية بناءً على العمر والجنس وكتلة العضلات والعرق.'
                },
                {
                    question: 'هل يمكن أن يكون مؤشر كتلة الجسم غير دقيق؟',
                    answer: 'نعم، لا يميز مؤشر كتلة الجسم بين كتلة العضلات والدهون. قد يكون لدى الرياضيين والأفراد ذوي الكتلة العضلية العالية مؤشر كتلة جسم مرتفع على الرغم من كونهم أصحاء.'
                },
                {
                    question: 'كم مرة يجب أن أتحقق من مؤشر كتلة جسمي؟',
                    answer: 'للمراقبة الصحية العامة، يكفي التحقق من مؤشر كتلة جسمك شهرياً أو ربع سنوياً ما لم تكن تعمل بنشاط على إدارة الوزن.'
                }
            ]
        },
        fr: {
            hero_title: 'Calculateur d\'IMC',
            hero_subtitle: 'Calculez instantanément votre Indice de Masse Corporelle et comprenez votre statut pondéral',
            hero_emoji: '🥑',
            hero_color: 'from-lime-400 to-green-500',

            seo_what_title: 'Qu\'est-ce que l\'IMC (Indice de Masse Corporelle) ?',
            seo_what_content: 'L\'Indice de Masse Corporelle (IMC) est une mesure de santé largement utilisée qui estime la graisse corporelle en fonction de la taille et du poids. Il fournit une mesure numérique simple qui aide à catégoriser si vous avez un poids insuffisant, normal, en surpoids ou obèse. Bien que l\'IMC ne mesure pas directement la graisse corporelle, il sert d\'outil de dépistage fiable pour les risques sanitaires potentiels associés au poids.',

            seo_why_title: 'Pourquoi l\'IMC est-il important ?',
            seo_why_content: 'Comprendre votre IMC est crucial pour maintenir une santé optimale. Un IMC en dehors de la plage saine peut indiquer un risque accru de conditions telles que les maladies cardiaques, le diabète, l\'hypertension artérielle et certains cancers. La surveillance régulière de l\'IMC aide à suivre vos progrès en matière de forme physique et guide les décisions relatives au mode de vie concernant la nutrition et l\'exercice.',

            seo_how_title: 'Comment utiliser ce calculateur d\'IMC',
            seo_how_steps: [
                'Entrez votre poids en kilogrammes (kg)',
                'Entrez votre taille en centimètres (cm)',
                'Cliquez sur calculer pour voir instantanément votre résultat IMC',
                'Examinez votre catégorie IMC et les recommandations de santé personnalisées'
            ],

            seo_tips_title: 'Conseils et recommandations IMC',
            seo_tips: [
                '💪 **Pour les athlètes** : L\'IMC peut surestimer la graisse corporelle chez les personnes musclées. Envisagez une analyse de composition corporelle.',
                '📊 **Suivre les tendances** : Surveillez votre IMC au fil du temps plutôt que de vous concentrer sur une seule mesure.',
                '🥗 **Combiner avec le mode de vie** : Utilisez l\'IMC avec la qualité de l\'alimentation, l\'activité physique et les marqueurs de santé globaux.',
                '👨‍⚕️ **Consulter des professionnels** : Discutez toujours des résultats de l\'IMC avec des professionnels de la santé pour des conseils personnalisés.'
            ],

            seo_faqs: [
                {
                    question: 'Quelle est la plage IMC saine ?',
                    answer: 'Un IMC sain pour adultes se situe généralement entre 18,5 et 24,9. Cependant, les plages idéales peuvent varier en fonction de l\'âge, du sexe, de la masse musculaire et de l\'ethnicité.'
                },
                {
                    question: 'L\'IMC peut-il être inexact ?',
                    answer: 'Oui, l\'IMC ne distingue pas entre la masse musculaire et la masse grasse. Les athlètes et les individus ayant une masse musculaire élevée peuvent avoir un IMC élevé malgré une bonne santé.'
                },
                {
                    question: 'À quelle fréquence dois-je vérifier mon IMC ?',
                    answer: 'Pour une surveillance générale de la santé, vérifier votre IMC mensuellement ou trimestriellement est suffisant, sauf si vous travaillez activement sur la gestion du poids.'
                }
            ]
        }
    },

    // I'll add all other calculators in the same format...
    calories: {
        en: {
            hero_title: 'Calorie Calculator',
            hero_subtitle: 'Estimate daily calories for weight maintenance, loss, or gain.',
            hero_emoji: '🔥',
            hero_color: 'from-orange-400 to-red-500',
            related_tools: [
                { id: 'bmi', name: 'BMI Calculator' },
                { id: 'macro', name: 'Macro Calculator' },
                { id: 'bmr', name: 'BMR Calculator' }
            ],

            // Formula Explanation Section
            formula_title: 'TDEE Formula: How It Works',
            formula_explanation: 'Total Daily Energy Expenditure (TDEE) is calculated using your Basal Metabolic Rate (BMR) multiplied by an activity factor. We use the Mifflin-St Jeor equation (1990) for BMR, which is more accurate than the older Harris-Benedict formula for modern populations.',
            formula_text: 'TDEE = BMR × Activity Factor',
            formula_example: 'Example: BMR of 1500 kcal × Moderate Activity (1.55) = 2325 kcal/day',
            formula_accuracy: 'TDEE estimates are accurate within ±200 calories for most individuals. Actual needs vary based on metabolism, genetics, and thermogenesis.',

            // Step-by-Step Examples
            example_title: 'Step-by-Step TDEE Calculation Examples',
            examples: [
                {
                    name: 'Jessica, 28-year-old office worker',
                    stats: 'Weight: 60 kg, Height: 165 cm, Age: 28, Activity: Sedentary',
                    calculation: 'BMR = (10 × 60) + (6.25 × 165) - (5 × 28) - 161 = 1331 kcal\nTDEE = 1331 × 1.2 = 1597 kcal/day',
                    result: 'Maintenance: 1597 kcal/day',
                    interpretation: 'Jessica needs ~1600 kcal to maintain weight. For weight loss (0.5 kg/week), she should consume 1350 kcal (-250 kcal deficit).'
                },
                {
                    name: 'Mike, 35-year-old gym enthusiast',
                    stats: 'Weight: 82 kg, Height: 178 cm, Age: 35, Activity: Very Active (gym 5x/week)',
                    calculation: 'BMR = (10 × 82) + (6.25 × 178) - (5 × 35) + 5 = 1777 kcal\nTDEE = 1777 × 1.725 = 3065 kcal/day',
                    result: 'Maintenance: 3065 kcal/day',
                    interpretation: 'Mike burns ~3000 kcal daily. To gain muscle (0.25 kg/week), he should consume 3300 kcal (+250 kcal surplus with high protein).'
                }
            ],

            // Activity Level Comparison Table
            comparison_table_title: 'Activity Level Multipliers',
            activity_levels: [
                { level: 'Sedentary', multiplier: '1.2', description: 'Little to no exercise, desk job' },
                { level: 'Lightly Active', multiplier: '1.375', description: 'Light exercise 1-3 days/week' },
                { level: 'Moderately Active', multiplier: '1.55', description: 'Moderate exercise 3-5 days/week' },
                { level: 'Very Active', multiplier: '1.725', description: 'Hard exercise 6-7 days/week' },
                { level: 'Extremely Active', multiplier: '1.9', description: 'Athlete, physical job + training' }
            ],

            seo_what_title: 'What is a Calorie Calculator?',
            seo_what_content: 'A Calorie Calculator (also known as a TDEE Calculator) estimates the number of calories you need to consume daily to maintain, lose, or gain weight. It works by calculating your Basal Metabolic Rate (BMR)—the calories your body burns at rest—and multiplying it by your activity level. This gives you your Total Daily Energy Expenditure (TDEE), the foundation for any successful weight management strategy.',

            seo_why_title: 'Why Track Your Calorie Needs?',
            seo_why_content: 'Understanding your calorie needs is the cornerstone of effective weight management. Whether you want to lose fat, build muscle, or maintain your current weight, consuming the right number of calories is critical. Eating too few calories slows metabolism and causes muscle loss; eating too many leads to fat gain. Our calculator removes the guesswork by providing personalized daily calorie targets based on your unique physiology and lifestyle.',

            seo_how_title: 'How to Use the Calorie Calculator',
            seo_how_steps: [
                'Enter your weight, height, age, and biological sex',
                'Select your activity level (sedentary to extremely active)',
                'Click "Calculate" to see your TDEE (maintenance calories)',
                'Adjust calories based on your goal: -500 kcal for weight loss, +250 kcal for muscle gain',
                'Track your intake using a food diary or app',
                'Reassess every 4-6 weeks as your weight changes'
            ],

            seo_tips_title: 'Calorie Tracking Tips & Best Practices',
            seo_tips: [
                '📊 **Adjust Over Time**: Recalculate your TDEE every 5-10 lbs of weight change to stay accurate.',
                '🍽️ **Track Consistently**: Use apps like MyFitnessPal or Cronometer for 2-4 weeks to understand portion sizes.',
                '💪 **Protein Priority**: Consume 0.8-1g protein per lb of body weight to preserve muscle during deficits.',
                '⚠️ **Avoid Extremes**: Deficits > 500 kcal/day risk muscle loss; surpluses > 300 kcal/day lead to excessive fat gain.',
                '🔄 **Diet Breaks**: Take 1-2 week maintenance phases every 8-12 weeks to restore metabolic hormones.',
                '🥤 **Thermic Effect**: Protein has the highest thermic effect (20-30%), meaning you burn more calories digesting it.'
            ],

            seo_faqs: [
                {
                    question: 'How many calories should I eat to lose weight?',
                    answer: 'For sustainable weight loss, create a 300-500 calorie deficit from your TDEE. This typically results in 0.5-1 lb (0.25-0.5 kg) of fat loss per week. Avoid deficits larger than 500 kcal unless supervised by a professional, as extreme restriction can slow metabolism and cause muscle loss.'
                },
                {
                    question: 'Is TDEE accurate for everyone?',
                    answer: 'TDEE calculators provide estimates accurate within ±200 calories for most people. Individual metabolism varies due to genetics, muscle mass, hormones (thyroid, insulin), and non-exercise activity thermogenesis (NEAT). Use the calculator as a starting point, then adjust based on 2-4 weeks of tracking your actual weight changes.'
                },
                {
                    question: 'Should I eat back exercise calories?',
                    answer: 'If you selected an appropriate activity level, your TDEE already includes exercise calories—don\'t eat them back. However, if you chose "Sedentary" but exercise 3-5x/week, you may need to eat back 50-75% of estimated exercise calories to avoid excessive deficits.'
                },
                {
                    question: 'Why am I not losing weight in a calorie deficit?',
                    answer: 'Common reasons: (1) Underestimating food intake (use a food scale), (2) Overestimating exercise calories burned, (3) Water retention from high sodium or new exercise, (4) Insufficient time (wait 3-4 weeks for trends), (5) Metabolic adaptation (take a diet break at maintenance for 1-2 weeks).'
                },
                {
                    question: 'How many calories to gain muscle?',
                    answer: 'Aim for a 200-300 calorie surplus above your TDEE. Combine this with strength training 3-5x/week and 0.8-1g protein per lb of body weight. Expect to gain 0.5-1 lb per month as a beginner, slower as an advanced lifter. Larger surpluses lead to excess fat gain, not faster muscle growth.'
                },
                {
                    question: 'Do calories from protein, carbs, and fat matter differently?',
                    answer: 'For weight loss, total calories matter most (thermodynamics). However, macros affect satiety, muscle retention, and performance: Protein preserves muscle and increases satiety; carbs fuel high-intensity exercise; fats support hormones. Prioritize: 0.8-1g protein/lb, 0.3-0.5g fat/lb, fill remaining calories with carbs.'
                },
                {
                    question: 'Can I trust "calories burned" from fitness trackers?',
                    answer: 'Fitness trackers overestimate calorie burn by 20-40% on average. Use them for trends (comparing workouts), not absolute numbers. Your TDEE calculator already accounts for exercise if you selected the right activity level, so don\'t add tracker calories on top unless you\'re losing weight too quickly.'
                }
            ]
        },
        ar: {
            hero_title: 'حاسبة السعرات الحرارية',
            hero_subtitle: 'اكتشف احتياجاتك اليومية من السعرات الحرارية لأهدافك الصحية',
            hero_emoji: '🍎',
            hero_color: 'from-red-400 to-rose-500',

            seo_what_title: 'ما هي السعرات الحرارية والاحتياجات اليومية؟',
            seo_what_content: 'السعرات الحرارية هي وحدات من الطاقة يستخدمها جسمك لجميع الأنشطة، من التنفس إلى ممارسة الرياضة. تعتمد احتياجاتك اليومية من السعرات الحرارية على عوامل مثل العمر والجنس والوزن والطول ومستوى النشاط. فهم متطلباتك من السعرات الحرارية أمر ضروري لإدارة الوزن، سواء كنت ترغب في فقدان الوزن أو اكتسابه أو الحفاظ عليه.',

            seo_why_title: 'لماذا تحسب سعراتك الحرارية اليومية؟',
            seo_why_content: 'معرفة احتياجاتك من السعرات الحرارية تساعدك على إنشاء خطة تغذية فعالة. استهلاك الكثير من السعرات الحرارية يؤدي إلى زيادة الوزن، بينما القليل جداً يمكن أن يبطئ عملية الأيض ويسبب نقص المغذيات. تستخدم حاسبتنا صيغاً مثبتة علمياً مثل معادلة Mifflin-St Jeor لتوفير تقديرات دقيقة للصحة المثلى.',

            seo_how_title: 'كيفية استخدام حاسبة السعرات الحرارية',
            seo_how_steps: [
                'أدخل وزنك وطولك وعمرك',
                'اختر جنسك البيولوجي',
                'حدد مستوى نشاطك (من الخامل إلى النشط جداً)',
                'اطلع على توصياتك الشخصية للسعرات الحرارية اليومية'
            ],

            seo_tips_title: 'نصائح إدارة السعرات الحرارية',
            seo_tips: [
                '🎯 **حدد أهدافاً واقعية**: اهدف إلى عجز 500-750 سعرة حرارية لفقدان وزن تدريجي ومستدام.',
                '🥗 **الجودة مهمة**: ركز على الأطعمة الغنية بالمغذيات بدلاً من السعرات الفارغة.',
                '📝 **تتبع استهلاكك**: استخدم دفاتر الطعام أو التطبيقات لمراقبة الاستهلاك اليومي.',
                '💪 **اضبط للتمارين**: احسب السعرات المحروقة أثناء التمارين.'
            ],

            seo_faqs: [
                {
                    question: 'كم سعرة حرارية يجب أن آكل لفقدان الوزن؟',
                    answer: 'لفقدان وزن صحي، أنشئ عجزاً من 500-750 سعرة حرارية يومياً من مستوى صيانتك، بهدف فقدان 0.5-1 كجم أسبوعياً.'
                },
                {
                    question: 'هل تؤثر كتلة العضلات على احتياجات السعرات الحرارية؟',
                    answer: 'نعم! تحرق أنسجة العضلات سعرات حرارية أكثر في الراحة من الدهون. الأشخاص ذوو الكتلة العضلية الأعلى لديهم معدلات أيض واحتياجات سعرات حرارية أعلى.'
                }
            ]
        },
        fr: {
            hero_title: 'Calculateur de Calories',
            hero_subtitle: 'Découvrez vos besoins caloriques quotidiens pour vos objectifs de santé',
            hero_emoji: '🍎',
            hero_color: 'from-red-400 to-rose-500',

            seo_what_title: 'Que sont les calories et les besoins caloriques quotidiens ?',
            seo_what_content: 'Les calories sont des unités d\'énergie que votre corps utilise pour toutes les activités, de la respiration à l\'exercice. Vos besoins caloriques quotidiens dépendent de facteurs tels que l\'âge, le sexe, le poids, la taille et le niveau d\'activité. Comprendre vos besoins caloriques est essentiel pour la gestion du poids, que vous souhaitiez perdre, prendre ou maintenir votre poids.',

            seo_why_title: 'Pourquoi calculer vos calories quotidiennes ?',
            seo_why_content: 'Connaître vos besoins caloriques vous aide à créer un plan nutritionnel efficace. Consommer trop de calories entraîne une prise de poids, tandis que trop peu peut ralentir le métabolisme et provoquer des carences nutritionnelles. Notre calculateur utilise des formules scientifiquement prouvées comme l\'équation de Mifflin-St Jeor pour fournir des estimations précises pour une santé optimale.',

            seo_how_title: 'Comment utiliser le calculateur de calories',
            seo_how_steps: [
                'Entrez votre poids, taille et âge',
                'Sélectionnez votre sexe biologique',
                'Choisissez votre niveau d\'activité (sédentaire à très actif)',
                'Consultez vos recommandations caloriques quotidiennes personnalisées'
            ],

            seo_tips_title: 'Conseils de gestion des calories',
            seo_tips: [
                '🎯 **Fixez des objectifs réalistes** : Visez un déficit de 500-750 calories pour une perte de poids progressive et durable.',
                '🥗 **La qualité compte** : Concentrez-vous sur les aliments riches en nutriments plutôt que sur les calories vides.',
                '📝 **Suivez votre consommation** : Utilisez des journaux alimentaires ou des applications pour surveiller la consommation quotidienne.',
                '💪 **Ajustez pour l\'exercice** : Tenez compte des calories brûlées pendant les entraînements.'
            ],

            seo_faqs: [
                {
                    question: 'Combien de calories dois-je manger pour perdre du poids ?',
                    answer: 'Pour une perte de poids saine, créez un déficit de 500-750 calories par jour par rapport à votre niveau de maintien, visant une perte de 0,5-1 kg par semaine.'
                },
                {
                    question: 'La masse musculaire affecte-t-elle les besoins caloriques ?',
                    answer: 'Oui ! Le tissu musculaire brûle plus de calories au repos que la graisse. Les personnes ayant une masse musculaire plus élevée ont des taux métaboliques et des besoins caloriques plus élevés.'
                }
            ]
        }
    },
    water: {
        en: {
            hero_title: 'Water Intake Calculator',
            hero_subtitle: 'Calculate your daily hydration needs based on your body and lifestyle.',
            hero_emoji: '💧',
            hero_color: 'from-blue-400 to-cyan-500',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'sleep', name: 'Sleep Calculator' }
            ],

            // Formula Explanation Section
            formula_title: 'Hydration Science: Beyond 8 Glasses',
            formula_explanation: 'The common "8x8" rule (eight 8-ounce glasses) is a dated oversimplification. Modern hydration science uses a formula based on total body weight and activity levels. Our calculator uses the base recommendation of 30-35ml of water per kilogram of body weight, adjusted for exercise intensity.',
            formula_text: 'Base Water (ml) = Weight (kg) × 33\nPlus: Exercise (min) × (Activity Level Factor)',
            formula_example: 'Example: A 70kg person = 70 × 33 = 2,310ml. If they exercise for 60 mins at moderate intensity (+500ml), total = 2,810ml.',
            formula_accuracy: 'This estimate accounts for metabolic water and respiratory loss. It is accurate for 95% of healthy adults in temperate climates.',

            // Step-by-Step Examples
            example_title: 'Personalized Hydration Examples',
            examples: [
                {
                    name: 'Lucas, Marathon Runner',
                    stats: 'Weight: 75kg, Activity: Extremely Active (90 min run)',
                    calculation: 'Base: 2475ml + 1200ml (High Intensity Exercise) = 3675ml',
                    result: 'Target: 3.7 Liters/day',
                    interpretation: 'Because Lucas loses significant fluids through sweat and increased respiration, he needs nearly 4 liters to prevent performance dehydration.'
                },
                {
                    name: 'Sophie, Remote Worker',
                    stats: 'Weight: 60kg, Activity: Sedentary',
                    calculation: 'Base: 1980ml + 0ml (No exercise) = 1980ml',
                    result: 'Target: 2.0 Liters/day',
                    interpretation: 'Sophie\'s lower weight and lack of intense movement mean 2 liters is sufficient to maintain skin health, cognitive function, and organ performance.'
                }
            ],

            seo_what_title: 'What is a Water Intake Calculator?',
            seo_what_content: 'A Water Intake Calculator is a tool designed to estimate the specific volume of water your body needs daily to function optimally. While the "8 glasses a day" rule is popular, it doesn\'t account for individual differences like body mass, metabolic rate, sweat rate, and environmental temperature. Our calculator uses physiological data to provide a personalized hydration baseline.',

            seo_why_title: 'Why is Hyper-Personalized Hydration Important?',
            seo_why_content: 'Water makes up about 60% of your body weight and is involved in every major system. Proper hydration regulates body temperature, lubricates joints, protects sensitive tissues, and helps your kidneys flush out waste products. Even mild dehydration (1-2% loss of body weight) can lead to brain fog, fatigue, mood swings, and decreased physical strength. By knowing your specific target, you ensure your body has the "oil" it needs to run smoothly.',

            seo_how_title: 'How to Use This Calculator',
            seo_how_steps: [
                'Enter your current body weight',
                'Select your typical daily activity level',
                'Input any additional exercise duration in minutes',
                'Review your daily total in liters and glasses'
            ],

            seo_tips_title: 'Smart Hydration Strategies',
            seo_tips: [
                '🍋 **Flavor Naturally**: If plain water is boring, add lemon, cucumber, or mint to encourage more frequent drinking.',
                '📱 **Set Reminders**: Use an app or a smartwatch to ping you every hour to take a few sips.',
                '🥒 **Eat Your Water**: 20% of hydration comes from food. Focus on watermelon, strawberries, and zucchini.',
                '🚽 **Check Your Urine**: Pale straw yellow is the goal. If it\'s dark like apple juice, you are likely dehydrated.',
                '🧂 **Electrolytes Matter**: If you sweat heavily, plain water isn\'t enough. Add a pinch of sea salt or an electrolyte powder to stay balanced.'
            ],

            seo_faqs: [
                { question: 'Does coffee or tea count?', answer: 'Yes! While caffeine has a slight diuretic effect, the water in these drinks still contributes significantly to your daily total.' },
                { question: 'Can you drink too much water?', answer: 'Yes. Hyponatremia (water intoxication) occurs when you drink so much that it dilutes the sodium in your blood. This is rare but dangerous; stick to your calculator targets.' },
                { question: 'Should I drink water with meals?', answer: 'Generally, yes. It aids digestion and can help with portion control by making you feel fuller faster.' },
                { question: 'Does temperature matter?', answer: 'Cold water is absorbed slightly faster and can help lower core temperature during exercise, but room temperature water is equally effective for general hydration.' }
            ]
        },
        ar: {
            hero_title: 'حاسبة شرب الماء',
            hero_subtitle: 'اكتشف كمية الماء التي يجب تناولها يومياً بناءً على جسمك ونشاطك',
            hero_emoji: '💧',
            hero_color: 'from-blue-400 to-cyan-500',
            seo_what_title: 'أهمية الترطيب',
            seo_what_content: 'الماء ضروري لكل وظيفة في الجسم تقريباً، من تنظيم درجة الحرارة إلى تزييت المفاصل ونقل المغذيات. الترطيب السليم هو أساس الطاقة والتركيز والحيوية الشاملة.',
            seo_why_title: 'لماذا تحسب احتياجاتك من الماء؟',
            seo_why_content: 'قاعدة "8 أكواب يومياً" لا تناسب الجميع. وزنك ومناخك ومستوى نشاطك يحدد احتياجاتك الخاصة. الجفاف يؤدي للإرهاق والصداع وضعف الإدراك.',
            seo_how_title: 'كيفية الاستخدام',
            seo_how_steps: ['أدخل وزنك', 'اختر مستوى نشاطك اليومي', 'احصل على هدف الترطيب المخصص لك'],
            seo_tips_title: 'نصائح للترطيب',
            seo_tips: ['اشرب قبل أن تشعر بالعطش', 'استخدم زجاجة قابلة لإعادة الاستخدام لتتبع تقدمك', 'تناول الفواكه الغنية بالماء مثل البطيخ والخيار'],
            seo_faqs: [
                { question: 'هل القهوة تحتسب ضمن الترطيب؟', answer: 'نعم، لكن الماء دائماً هو الخيار الأفضل للترطيب النقي.' },
                { question: 'ما هي علامات الجفاف؟', answer: 'البول الداكن، جفاف الفم، والدوخة هي مؤشرات شائعة.' }
            ]
        },
        fr: {
            hero_title: 'Calculateur d\'Eau',
            hero_subtitle: 'Découvrez la quantité d\'eau à boire quotidiennement selon votre corps et activité',
            hero_emoji: '💧',
            hero_color: 'from-blue-400 to-cyan-500',
            seo_what_title: 'L\'importance de l\'hydratation',
            seo_what_content: 'L\'eau est essentielle pour presque toutes les fonctions corporelles. Une bonne hydratation est la base de l\'énergie et du focus.',
            seo_why_title: 'Pourquoi calculer vos besoins ?',
            seo_why_content: 'La règle des "8 verres" ne s\'applique pas à tous. Votre poids et activité déterminent vos besoins spécifiques.',
            seo_how_title: 'Comment utiliser',
            seo_how_steps: ['Entrez votre poids', 'Sélectionnez votre activité', 'Obtenez votre objectif personnalisé'],
            seo_tips_title: 'Conseils',
            seo_tips: ['Buvez avant d\'avoir soif', 'Gardez une bouteille avec vous', 'Mangez des fruits riches en eau'],
            seo_faqs: [
                { question: 'Le café compte-t-il ?', answer: 'Oui, mais l\'eau reste le meilleur choix.' },
                { question: 'Signes de déshydratation ?', answer: 'Urine foncée, bouche sèche et fatigue.' }
            ]
        }
    },
    'ideal-weight': {
        en: {
            hero_title: 'Ideal Weight Calculator',
            hero_subtitle: 'Find your medically-recommended healthy weight range.',
            hero_emoji: '🍐',
            hero_color: 'from-yellow-400 to-amber-500',
            related_tools: [
                { id: 'bmi', name: 'BMI Calculator' },
                { id: 'body-fat', name: 'Body Fat Calculator' }
            ],

            // Formula Explanation
            formula_title: 'Clinical Formulas: Devine, Miller, and Robinson',
            formula_explanation: 'Ideal Body Weight (IBW) is not a single number but a range based on clinical formulas used by medical professionals. These formulas use your height and biological sex to establish a weight that correlates with the lowest mortality and disease risk.',
            formula_text: 'Devine Formula (Men): 50kg + 2.3kg for every inch over 5ft\nDevine Formula (Women): 45.5kg + 2.3kg for every inch over 5ft',
            formula_example: 'Example: A 5\'10" man (10 inches over 5ft) = 50 + (10 × 2.3) = 73kg.',
            formula_accuracy: 'IBW formulas provide a research-backed target. However, they don\'t account for frame size or muscle mass.',

            // Examples
            example_title: 'Healthy Weight Range Examples',
            examples: [
                {
                    name: 'Michael, 6\'2" Tall',
                    stats: 'Height: 188cm',
                    calculation: 'Devine IBW: 82.2kg. BMI Healthy Range (18.5-25): 65kg - 88kg.',
                    result: 'Ideal Range: 75kg - 85kg',
                    interpretation: 'For Michael\'s height, maintaining a weight in the high 70s or low 80s is optimal for joint health and cardiovascular efficiency.'
                },
                {
                    name: 'Emma, 5\'4" Tall',
                    stats: 'Height: 162cm',
                    calculation: 'Devine IBW: 54.7kg. BMI Healthy Range: 48kg - 65kg.',
                    result: 'Ideal Range: 52kg - 60kg',
                    interpretation: 'Emma\'s ideal weight is closer to 55kg. This target ensures metabolic health while staying within a high-energy, low-risk category.'
                }
            ],

            // Comparison Table
            comparison_table_title: 'Ideal Weight Formula Comparison',
            ideal_weight_table: [
                { formula: 'Devine (Standard)', result: 'Most Widely Used', context: 'Used for medical drug dosing.' },
                { formula: 'Robinson', result: 'Higher Targets', context: 'Often preferred for taller individuals.' },
                { formula: 'Miller', result: 'Lower Targets', context: 'Better for smaller frame sizes.' },
                { formula: 'Hamwi', result: 'Classic Method', context: 'Simple, popular in older health texts.' },
                { formula: 'Healthy BMI Range', result: 'Flexible Goal', context: 'The most realistic "real world" target.' }
            ],

            seo_what_title: 'What is Ideal Body Weight?',
            seo_what_content: 'Ideal Body Weight (IBW) is a concept that aims to identify the weight at which an individual is likely to live the longest, healthiest life. While "ideal" is subjective, medical IBW is calculated using established clinical formulas (Devine, Robinson, Miller) that factor in height and sex. It provides a healthy baseline target that correlates with lower risks of heart disease, diabetes, and joint problems.',

            seo_why_title: 'Why Aim for an Ideal Weight?',
            seo_why_content: 'Maintaining a weight within your ideal range is one of the most effective ways to prevent chronic illness. Being overweight puts strain on the heart, lungs, and joints, while being severely underweight can lead to nutrient deficiencies and weakened immunity. Calculating your IBW gives you a "North Star" for your fitness journey, helping you set realistic, science-based goals rather than chasing aesthetic trends.',

            seo_how_title: 'How to Determine Your Ideal Weight',
            seo_how_steps: [
                'Measure your height accurately without shoes',
                'Select your biological sex',
                'Input your measurements into the calculator',
                'Compare the results across different formulas (Devine, Robinson, etc.)',
                'Focus on the range rather than a single pound or kilogram'
            ],

            seo_tips_title: 'Tips for Reaching Your Ideal Weight',
            seo_tips: [
                '🏋️ **Muscle vs Fat**: Don\'t obsess over the scale. If you are building muscle, you might weigh more than your "ideal" weight but be healthier.',
                '🍎 **Nutrient Density**: Focus on whole foods (veggies, lean protein, grains) rather than just calorie counting.',
                '🚶 **Daily Movement**: Consistency is key. A 30-minute daily walk is more effective than one intense workout per week.',
                '😴 **Manage Stress**: High cortisol levels can make it difficult for the body to reach its natural, healthy weight.',
                '🦷 **Dental Health**: Believe it or not, gum health is correlated with metabolic efficiency and easier weight management.'
            ],

            seo_faqs: [
                { question: 'Is the "Ideal Weight" the same for everyone of the same height?', answer: 'No. While formulas give a baseline, your ideal weight also depends on your muscle mass, bone density (frame size), and age.' },
                { question: 'Can I be healthy if I\'m 10lbs over my ideal weight?', answer: 'Absolutely. If your blood pressure, cholesterol, and blood sugar are healthy, being slightly outside the calculated range is often perfectly fine.' },
                { question: 'Why do men and women have different ideal weights?', answer: 'Men typically have higher bone density and more muscle mass, leading to higher medically-recommended weight targets for the same height.' },
                { question: 'What is the most accurate formula?', answer: 'The Devine formula is the medical gold standard, but the "Healthy BMI Range" is often more practical for athletes.' }
            ]
        },
        ar: {
            hero_title: 'حاسبة الوزن المثالي',
            hero_subtitle: 'اكتشف نطاق الوزن الصحي الموصى به طبياً لك',
            hero_emoji: '🍐',
            hero_color: 'from-yellow-400 to-amber-500',
            seo_what_title: 'ما هو الوزن المثالي؟',
            seo_what_content: 'يوفر الوزن المثالي للجسم (IBW) هدفاً صحياً بناءً على الطول والجنس باستخدام صيغ سريرية.',
            seo_why_title: 'الغرض من الحساب',
            seo_why_content: 'وجود هدف يساعد في وضع أهداف واقعية لتغييرات نمط الحياة والتقييمات السريرية.',
            seo_how_title: 'كيفية الاستخدام',
            seo_how_steps: ['أدخل الطول', 'اختر الجنس', 'احسب النطاق'],
            seo_tips_title: 'نصائح للوزن الصحي',
            seo_tips: ['ركز على تكوين الجسم، وليس فقط رقم الميزان', 'ابنِ عادات مستدامة'],
            seo_faqs: []
        }
    },
    sleep: {
        en: {
            hero_title: 'Sleep Calculator',
            hero_subtitle: 'Optimize your rest by waking up between 90-minute sleep cycles.',
            hero_emoji: '😴',
            hero_color: 'from-indigo-500 to-purple-600',
            related_tools: [
                { id: 'water', name: 'Water Intake Calculator' },
                { id: 'calories', name: 'Calorie Calculator' }
            ],

            // Formula Explanation
            formula_title: 'The 90-Minute Rule: How Sleep Cycles Work',
            formula_explanation: 'Human sleep is not a flat state of rest. It consists of multiple 90-minute cycles moving through Light Sleep, Deep Sleep, and REM (Rapid Eye Movement). Waking up in the middle of a cycle (especially Deep Sleep) causes "sleep inertia"—that heavy, groggy feeling. Waking up at the end of a cycle makes you feel instantly alert and refreshed.',
            formula_text: 'Best Wake Times = Sleep Time + (1.5 hours × N) + 15 mins (falling asleep)',
            formula_example: 'Example: Sleep at 11:00 PM. Cycles: 12:30, 2:00, 3:30, 5:00, 6:30. Best wake time: 6:30 AM (5 cycles).',
            formula_accuracy: 'While 90 minutes is the average, individual cycles can range from 70 to 110 minutes. Use this tool for 14 days to find your perfect rhythm.',

            // Step-by-Step Examples
            example_title: 'Sleep Strategy Scenarios',
            examples: [
                {
                    name: 'The Early Bird (5 Cycles)',
                    stats: 'Wake up at 6:00 AM',
                    calculation: '6:00 AM minus (1.5h × 5) minus 15 mins = 10:15 PM bed time.',
                    result: 'Sleep Time: 10:15 PM',
                    interpretation: 'This provides 7.5 hours of actual sleep, hitting the sweet spot for the average adult to feel fully recovered without oversleeping.'
                },
                {
                    name: 'The Power Sleeper (6 Cycles)',
                    stats: 'Wake up at 7:30 AM',
                    calculation: '7:30 AM minus (1.5h × 6) minus 15 mins = 10:15 PM bed time.',
                    result: 'Sleep Time: 10:15 PM',
                    interpretation: 'Athletes and those with high mental loads often need 9 hours (6 cycles). This ensures maximum REM for memory and Deep Sleep for physical repair.'
                }
            ],

            seo_what_title: 'What is a Sleep Calculator?',
            seo_what_content: 'A Sleep Calculator is a circadian rhythm tool that helps you determine the best time to go to bed or wake up. Unlike a standard alarm clock that just counts hours, this tool calculates sleep cycles. By timing your wake-up call to coincide with the end of a 90-minute cycle, you avoid being ripped out of deep sleep, which significantly improves your energy, mood, and cognitive performance throughout the day.',

            seo_why_title: 'Why Focus on Sleep Cycles?',
            seo_why_content: 'Quality of sleep is often more important than quantity. You can sleep for 8 hours but wake up feeling exhausted because your alarm went off during a deep sleep stage. Understanding sleep cycles allows you to optimize your brain health and hormonal balance. Proper sleep cycle management reduces the risk of chronic stress, obesity, and heart disease while boosting your immune system and creative abilities.',

            seo_how_title: 'How to Use This Sleep Calculator',
            seo_how_steps: [
                'Enter the time you need to wake up',
                'Or enter the time you plan to go to bed',
                'The calculator will provide 3-5 optimal options',
                'Select the option that allows for at least 5 full cycles (7.5 hours) if possible',
                'Account for the 14-16 minutes it takes for the average person to fall asleep'
            ],

            seo_tips_title: 'Sleep Hygiene Recommendations',
            seo_tips: [
                '🌑 **Complete Darkness**: Use blackout curtains or a sleep mask to keep melatonin levels high.',
                '🌡️ **Cool Temperature**: The ideal sleep environment is around 65°F (18°C). A cool room triggers sleepiness.',
                '🚫 **Blue Light Detox**: Stop using phones or computers 60 minutes before bed. Blue light suppresses melatonin.',
                '☕ **Caffeine Cut-off**: Avoid caffeine after 2:00 PM. It stays in your system for up to 8 hours and ruins sleep depth.',
                '🧘 **Bedtime Ritual**: Do something relaxing (reading, stretching, meditating) to tell your brain it\'s time to wind down.'
            ],

            seo_faqs: [
                { question: 'What is sleep inertia?', answer: 'Sleep inertia is the grogginess you feel when waking during deep sleep. It can last from 30 minutes to 4 hours if cycles are disrupted.' },
                { question: 'Is 6 hours of sleep enough?', answer: 'For most adults, no. While 4 cycles (6 hours) is better than 4.5 cycles (grogginess), it still leads to long-term "sleep debt" which impairs health.' },
                { question: 'Do nap times follow these cycles?', answer: 'Naps should be either 20 minutes (Power Nap - avoids deep sleep) or a full 90 minutes (Full Cycle). Napping for 45-60 minutes usually results in feeling worse.' },
                { question: 'How long does it take to fall asleep?', answer: 'The average healthy adult takes 14-20 minutes. Our calculator accounts for this by adding 15 minutes to Bed Time suggestions.' }
            ]
        },
        ar: {
            hero_title: 'حاسبة مدة النوم',
            hero_subtitle: 'قم بتحسين راحتك عن طريق حساب أفضل أوقات الاستيقاظ والنوم',
            hero_emoji: '🍇',
            hero_color: 'from-purple-400 to-violet-500',
            seo_what_title: 'علم النوم',
            seo_what_content: 'يحدث النوم في دورات. الاستيقاظ في نهاية الدورة يشعرك بالانتعاش، بينما الاستيقاظ في منتصفها يسبب الخمول.',
            seo_why_title: 'نوم أفضل، حياة أفضل',
            seo_why_content: 'النوم الجيد يحسن الذاكرة والمزاج ووظائف المناعة.',
            seo_how_title: 'كيف تعمل',
            seo_how_steps: ['أدخل وقت الاستيقاظ', 'شاهد أوقات النوم المقترحة بناءً على دورات 90 دقيقة'],
            seo_tips_title: 'نصائح لنوم صحي',
            seo_tips: ['حافظ على غرفتك باردة ومظلمة', 'تجنب الشاشات قبل ساعة من النوم'],
            seo_faqs: []
        }
    },
    bmr: {
        en: {
            hero_title: 'BMR Calculator',
            hero_subtitle: 'Calculate your Basal Metabolic Rate.',
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
            ]
        }
    },
    macro: {
        en: {
            hero_title: 'Macro Calculator',
            hero_subtitle: 'Find your target protein, carb, and fat ranges.',
            hero_emoji: '🥗',
            hero_color: 'from-green-400 to-emerald-600',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'bmr', name: 'BMR Calculator' },
                { id: 'bmi', name: 'BMI Calculator' }
            ],

            // Formula Explanation Section
            formula_title: 'Macro Splitting: The 4-4-9 Principle',
            formula_explanation: 'Macronutrients (macros) are the sources of your calories: Protein, Carbohydrates, and Fats. Our calculator uses your TDEE and target goal to determine the optimal split. We use the scientific caloric density of each macro to convert your calorie goals into gram targets.',
            formula_text: 'Protein: 4 kcal/gram | Carbs: 4 kcal/gram | Fats: 9 kcal/gram',
            formula_example: 'Example: 2000 kcal diet with 40/40/20 split = 200g Protein, 200g Carbs, 44g Fat.',
            formula_accuracy: 'Macro targets are highly personalized. While calorie balance determines weight change, macro balance determines body composition (fat vs muscle).',

            // Step-by-Step Example
            example_title: 'Macro Strategy Examples',
            examples: [
                {
                    name: 'David, Muscle Building (Bulking)',
                    stats: 'TDEE: 2800 kcal, Goal: Lean Bulk (+200 kcal)',
                    calculation: 'Total: 3000 kcal. Split: 30% Protein, 50% Carbs, 20% Fat.',
                    result: 'Targets: 225g Protein, 375g Carbs, 67g Fat',
                    interpretation: 'David needs high protein to repair muscle and high carbs to fuel intense training sessions. The 20% fat keeps hormones healthy without excess energy.'
                },
                {
                    name: 'Elena, Fat Loss (Cutting)',
                    stats: 'TDEE: 2000 kcal, Goal: Fat Loss (-400 kcal)',
                    calculation: 'Total: 1600 kcal. Split: 45% Protein, 25% Carbs, 30% Fat.',
                    result: 'Targets: 180g Protein, 100g Carbs, 53g Fat',
                    interpretation: 'Elena uses a high-protein, lower-carb approach to maintain muscle while in a deficit. High protein increases satiety, making the diet easier to follow.'
                }
            ],

            // Comparison Table
            comparison_table_title: 'Common Macro Ratios by Goal',
            macro_ratios: [
                { goal: 'Maintenance', split: '40/40/20', description: 'Balanced approach for long-term health.' },
                { goal: 'Muscle Gain', split: '30/50/20', description: 'Higher carbs for training performance.' },
                { goal: 'Fat Loss', split: '45/25/30', description: 'High protein to protect muscle mass.' },
                { goal: 'Keto (Very Low Carb)', split: '25/5/70', description: 'High fat, very low carb for ketosis.' }
            ],

            seo_what_title: 'What is a Macro Calculator?',
            seo_what_content: 'A Macro Calculator breaks down your total daily calorie needs into three primary macronutrients: Protein, Carbohydrates, and Fats. While calories determine whether you gain or lose weight, macros determine the quality of that weight change. Proper macro ratios ensure that weight loss comes from fat rather than muscle, and weight gain comes from muscle rather than fat.',

            seo_why_title: 'Why Calculate Your Macros?',
            seo_why_content: '"If It Fits Your Macros" (IIFYM) is a popular nutrition strategy because it provides flexibility while ensuring metabolic health. Calculating macros allows you to optimize your nutrition for specific performance goals. For example, athletes need more carbohydrates for energy, while those looking to lose weight benefit from higher protein to curb hunger and preserve lean tissue.',

            seo_how_title: 'How to Use This Macro Calculator',
            seo_how_steps: [
                'Enter your Total Daily Energy Expenditure (TDEE)',
                'Select your fitness goal (Lose Weight, Maintain, Build Muscle)',
                'Choose your preferred macro split (Balanced, Low Carb, High Protein)',
                'Get your daily targets in grams for Protein, Carbs, and Fats'
            ],

            seo_tips_title: 'Macro Tracking Pro-Tips',
            seo_tips: [
                '🥩 **Protein is King**: Prioritize hitting your protein goal first.',
                '🥦 **Fiber Matters**: Aim for 25-35g of fiber daily for digestive health.',
                '⚖️ **Get a Food Scale**: Weighing food in grams is the only way to track macros precisely.',
                '🥑 **Healthy Fats**: Focus on monounsaturated and polyunsaturated fats (avocados, nuts, olive oil).'
            ],

            seo_faqs: [
                { question: 'What is the "best" macro split?', answer: 'There is no single best split. 40/40/20 is great for general health, while 45/25/30 is often better for fat loss.' },
                { question: 'Do I need to track macros every day?', answer: 'At first, yes. Tracking for 30 days helps you learn the nutritional content of foods.' },
                { question: 'What happens if I eat too much protein?', answer: 'Protein has calories too. If too much protein puts you in a calorie surplus, you will gain weight.' }
            ]
        }
    },
    'body-fat': {
        en: {
            hero_title: 'Body Fat Calculator',
            hero_subtitle: 'Estimate your body fat percentage accurately.',
            hero_emoji: '🍊',
            hero_color: 'from-orange-400 to-orange-600',
            related_tools: [
                { id: 'bmi', name: 'BMI Calculator' },
                { id: 'ideal-weight', name: 'Ideal Weight Calculator' }
            ],

            // Formula Explanation
            formula_title: 'U.S. Navy Method: Scientific Body Composition',
            formula_explanation: 'This calculator uses the U.S. Navy Method, which estimates body fat percentage using circumference measurements. It is considered the most reliable non-clinical method for predicting body composition without expensive DEXA scans.',
            formula_text: 'Males: 495 / (1.0324 - 0.19077 × log10(waist-neck) + 0.15456 × log10(height)) - 450',
            formula_example: 'Example: A man with a 90cm waist, 40cm neck, and 180cm height has ~18.5% body fat.',
            formula_accuracy: 'Accurate within ±3-4% compared to DEXA gold-standard testing.',

            // Step-by-Step Example
            example_title: 'Body Fat Goal Examples',
            examples: [
                {
                    name: 'Athlete Profile (Male)',
                    stats: 'Goal: Single-digit Body Fat',
                    calculation: 'Requires consistent deficit and high-intensity training.',
                    result: 'Current: 15% -> Target: 8-9%',
                    interpretation: 'At 8-9%, abdominal definition is sharp and muscle separation is highly visible.'
                },
                {
                    name: 'Fitness Profile (Female)',
                    stats: 'Goal: Lean & Toned',
                    calculation: 'Optimal range for lean female physique is 18-22%.',
                    result: 'Current: 26% -> Target: 20%',
                    interpretation: 'At 20%, a woman will have clear muscle tone while maintaining hormonal and reproductive health.'
                }
            ],

            seo_what_title: 'Understanding Body Fat Percentage',
            seo_what_content: 'Body fat percentage is the total mass of fat divided by total body mass. It is a far better indicator of health and fitness than weight alone. While BMI only considers height and weight, body fat percentage tells you how much of your weight is actually fat versus muscle, bone, and organs.',

            seo_why_title: 'Why Measure Body Fat?',
            seo_why_content: 'Tracking body fat is essential for anyone undergoing a body transformation. If you are losing weight but your body fat stays the same, you are losing muscle—which is bad for your metabolism. Knowing your body fat percentage allows you to set realistic goals and ensure that your diet and exercise are actually improving your body composition, not just lowering a number on a scale.',

            seo_how_title: 'How to Get Accurate Measurements',
            seo_how_steps: [
                'Use a flexible measuring tape',
                'Measure your neck (just below the larynx)',
                'Measure your waist (at the navel for men, narrowest point for women)',
                'Measure your hips (at the widest point—women only)',
                'Keep the tape flat against the skin but do not compress it'
            ],

            seo_tips_title: 'Tips for Lowering Body Fat',
            seo_tips: [
                '💪 **Resistance Training**: Building muscle increases your BMR, making it easier to burn fat even at rest.',
                '🥗 **Calorie Deficit**: You must consume fewer calories than you burn, but keep protein high to protect muscle.',
                '🚶 **Increase NEAT**: Simple daily movement like walking (10k steps) is a powerful tool for fat loss.',
                '💧 **Hydration & Sleep**: Lack of sleep increases cortisol, which triggers the body to store fat around the midsection.'
            ],

            seo_faqs: [
                { question: 'What is a "good" body fat percentage?', answer: 'For men, 14-17% is considered "Fitness" level. For women, 21-24% is the same equivalent.' },
                { question: 'How often should I measure body fat?', answer: 'Body fat changes slowly. Measuring once every 2-4 weeks is ideal to see real trends.' },
                { question: 'Is this as accurate as a DEXA scan?', answer: 'No, DEXA is the gold standard. However, the Navy Method is surprisingly accurate for a free, no-cost tool and is perfect for tracking relative progress.' }
            ]
        }
    },
    'one-rep-max': {
        en: {
            hero_title: 'One-Rep Max (1RM) Calculator',
            hero_subtitle: 'Predict your maximum lifting capacity safely.',
            hero_emoji: '🏋️',
            hero_color: 'from-gray-700 to-gray-900',
            related_tools: [
                { id: 'calories', name: 'Calorie Calculator' },
                { id: 'body-fat', name: 'Body Fat Calculator' }
            ],

            // Formula Explanation
            formula_title: 'The Brzycki Formula: Predicting Strength',
            formula_explanation: 'Calculating your One-Rep Max (1RM) allows you to determine your absolute strength without the risk of injury that comes with actually lifting your maximum possible weight. Our calculator primarily uses the Brzycki Formula, which is highly accurate for repetitions under 10.',
            formula_text: '1RM = Weight / (1.0278 - (0.0278 × Reps))',
            formula_example: 'Example: If you bench press 100kg for 5 reps: 100 / (1.0278 - (0.0278 × 5)) = 112.5kg.',
            formula_accuracy: 'Predictions are most accurate between 2 and 8 repetitions. If you can perform more than 12 reps, the formula accuracy decreases.',

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
                'Perform a thorough warm-up',
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
            ]
        }
    }
};
