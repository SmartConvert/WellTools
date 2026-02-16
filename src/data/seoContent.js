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
        },
        ar: {
            hero_title: 'حاسبة مؤشر كتلة الجسم للنساء والرجال',
            h1_title: 'الدليل الشامل: حاسبة مؤشر كتلة الجسم (BMI) والوزن المثالي',
            h2_title: 'احسب كتلة جسمك وافهم المخاطر الصحية المرتبطة بوزنك',
            meta_title: 'حاسبة مؤشر كتلة الجسم (BMI) - أدق حاسبة عربية للوزن المثالي | WellTools',
            meta_description: 'أداة طبية دقيقة لحساب مؤشر كتلة الجسم (BMI) للنساء والرجال والأطفال. اكتشف تصنيف وزنك (طبيعي، سمنة، نحافة) واحصل على نصائح طبية مخصصة بناءً على معايير منظمة الصحة العالمية.',
            hero_subtitle: 'اكتشف النطاق الصحي لوزنك بدقة متناهية باستخدام أحدث المعايير الطبية.',
            hero_emoji: '⚖️',
            hero_color: 'from-lime-400 to-green-500',
            related_tools: [
                { id: 'calories', name: 'حاسبة السعرات الحرارية' },
                { id: 'ideal-weight', name: 'حاسبة الوزن المثالي' }
            ],

            formula_title: 'المعادلة العلمية: كيف يعمل مؤشر كتلة الجسم؟',
            formula_explanation: 'تم تطوير مؤشر كتلة الجسم (الذي كان يُعرف سابقاً بمؤشر كوتليت) في عام 1832 ليكون معياراً عالمياً لتقييم صحة الوزن. الفكرة بسيطة ولكنها عبقرية: هي توحيد الوزن مقابل الطول لمعرفة ما إذا كان وزن الشخص مناسباً لهيكله العظمي. تعتمد منظمة الصحة العالمية (WHO) ووزارات الصحة العربية هذا المؤشر كأداة الفحص الأولى لتحديد مخاطر الأمراض المزمنة.',
            formula_text: 'مؤشر كتلة الجسم = الوزن (كجم) / (الطول بالمتر × الطول بالمتر)',
            formula_example: 'مثال توضيحي: أحمد (ورنه 90 كجم، طوله 180 سم).\nالحساب: 90 / (1.8 × 1.8) = 90 / 3.24 = 27.7.\nالنتيجة: أحمد يقع في فئة "زيادة الوزن"، مما يستدعي الانتباه لنظامه الغذائي.',

            example_title: 'أمثلة عملية لحساب مؤشر كتلة الجسم',
            examples: [
                {
                    name: 'الحالة الأولى: حياة مكتبية خاملة',
                    stats: 'منى، 35 سنة. الوزن: 85 كجم. الطول: 160 سم.',
                    calculation: 'BMI = 33.2',
                    result: 'النتيجة: سمنة من الدرجة الأولى',
                    interpretation: 'يشير المؤشر إلى وجود دهون زائدة تشكل خطراً على المفاصل ومستويات السكر في الدم. يُنصح ببدء برنامج مشي يومي.'
                },
                {
                    name: 'الحالة الثانية: رياضي كمال أجسام',
                    stats: 'عمر، 28 سنة. الوزن: 95 كجم. الطول: 180 سم.',
                    calculation: 'BMI = 29.3',
                    result: 'النتيجة: زيادة في الوزن',
                    interpretation: 'رغم أن المؤشر مرتفع، إلا أن عمر يمتلك كتلة عضلية ضخمة ونسبة دهون منخفضة. في هذه الحالة، "زيادة الوزن" هي عضلات وليست دهوناً، وهو مؤشر صحي ممتاز.'
                }
            ],

            comparison_table_title: 'جدول تصنيفات الوزن والمخاطر الصحية',
            bmi_ranges: [
                { category: 'نحافة شديدة', range: 'أقل من 16.0', risk: 'خطر مرتفع: فقر دم، هشاشة عظام، ضعف مناعة' },
                { category: 'وزن طبيعي', range: '18.5 - 25.0', risk: 'الحد الأدنى للمخاطر: النطاق المثالي للصحة' },
                { category: 'زيادة في الوزن', range: '25.0 - 30.0', risk: 'متوسط: بداية ارتفاع ضغط الدم والضغط على الركب' },
                { category: 'سمنة (درجة 1)', range: '30.0 - 35.0', risk: 'مرتفع: خطر السكري من النوع الثاني' },
                { category: 'سمنة مفرطة', range: 'أكثر من 40.0', risk: 'خطر جداً: مشاكل قلبية وتنفسية خطيرة' }
            ],

            seo_what_title: 'ما هو مؤشر كتلة الجسم (BMI) حقيقةً؟',
            seo_what_content: 'مؤشر كتلة الجسم ليس مجرد رقم، بل هو "جرس إنذار" مبكر. هو أداة مسح (Screening Tool) وليست أداة تشخيص. يخبرك ما إذا كانت كمية الأنسجة في جسمك (عضلات، دهون، عظام) مناسبة لطولك. الدراسات الطبية التي شملت الملايين أثبتت أن الابتعاد عن النطاق الطبيعي (18.5-25) يرتبط بشكل مباشر بزيادة الوفيات المبكرة والأمراض المزمنة.',

            seo_why_title: 'لماذا يجب عليك مراقبة هذا الرقم؟',
            seo_why_content: 'تخيل أنك تقود سيارة دون عداد سرعة. قد تكون سريعاً جداً (سمنة) أو بطيئاً جداً (نحافة) دون أن تدرك الخطر. مؤشر كتلة الجسم هو عداد السرعة لصحتك الأيضية. ارتفاعه يرتبط بصمت بارتفاع الكوليسترول، ومقاومة الأنسولين، والالتهابات الخفية في الجسم. معرفة رقمك اليوم هي الخطوة الأولى للوقاية من زيارة طبيب القلب غداً.',

            seo_how_title: 'كيف تستخدم هذه الأداة باحترافية؟',
            seo_how_steps: [
                '**القياس الصحيح**: قس وزنك في الصباح الباكر، بملابس خفيفة، وبعد استخدام الحمام للحصول على "الوزن الحقيقي".',
                '**الطول الدقيق**: قف مستقيماً ملتصقاً بالحائط بدون حذاء. الطول يؤثر جداً في المعادلة.',
                '**التفسير الذكي**: لا تفزع من الرقم. اقرأ "النصائح" المرافقة لنتيجتك.',
                '**قياس الخصر**: إذا كان مؤشرك مرتفعاً، قس محيط خصرك. إذا كان أقل من 94 سم للرجال أو 80 سم للنساء، فالخطر أقل حتى لو كان الوزن زائداً.'
            ],

            seo_tips_title: 'نصائح طبية وعملية لتحسين مؤشرك',
            seo_tips: [
                '📉 **إذا كان المؤشر مرتفعاً (>25)**: لا تحاول خسارة الوزن بسرعة. استهدف خسارة 0.5 كجم أسبوعياً فقط. هذا يحمي عضلاتك ويمنع عودة الوزن (تأثير اليويو).',
                '📈 **إذا كان المؤشر منخفضاً (<18.5)**: ركز على "كثافة الطاقة". تناول المكسرات، زيت الزيتون، والعصائر الطبيعية. ابدأ تمارين المقاومة لبناء عضلات بدلاً من مجرد تكديس الدهون.',
                '🧬 **العامل الوراثي**: بعض الأجسام تميل لتخزين الدهون في الأرداف (شكل الكمثرى) وهو أقل خطراً من تخزينها في البطن (شكل التفاحة) حتى لو تساوى مؤشر كتلة الجسم.',
                '👴 **لكبار السن**: بعد سن 65، القليل من الوزن الزائد (BMI 25-27) يعتبر صحياً ويحمي من الكسور عند السقوط ومن الضعف العام.'
            ],

            seo_faqs: [
                {
                    question: 'هل مؤشر كتلة الجسم دقيق للأطفال؟',
                    answer: 'لا تستخدم هذه الحاسبة للأطفال. نمو الأطفال يختلف بسرعة. للأطفال نستخدم "مئويات النمو" (Percentiles) التي تقارن الطفل بأقرانه في نفس العمر والجنس.'
                },
                {
                    question: 'أنا رياضي وعندي BMI مرتفع، هل أنا سمين؟',
                    answer: 'على الأغلب لا. العضلات أكثف وأثقل من الدهون. إذا كنت ترفع الأثقال وتتمرن بانتظام، فإن مؤشر "زيادة الوزن" لديك هو دليل صحة (عضلات) وليس مرض. اعتمد على قياس نسبة الدهون وشكل الجسم في المرآة.'
                },
                {
                    question: 'هل يمكن للنساء الحوامل استخدام الحاسبة؟',
                    answer: 'لا. وزن الحمل يشمل الجنين والمشيمة والسوائل. استخدمي وزنك ما قبل الحمل لمعرفة النطاق الصحي لزيادة الوزن المسموح بها.'
                },
                {
                    question: 'ما هو "السمنة الخفية" (Skinny Fat)؟',
                    answer: 'هذا يحدث عندما يكون مؤشر كتلة الجسم "طبيعي" ولكن الشخص لديه نسبة دهون عالية جداً وعضلات قليلة. هذا الشخص معرض لنفس مخاطر السمنة (السكري والضغط) رغم أنه يبدو نحيفاً بملابسه.'
                }
            ],

            additional_info: [
                {
                    title: 'الحقيقة حول الدهون الحشوية (الكرش)',
                    content: 'أخطر أنواع الدهون لا تظهر دائماً على الميزان. الدهون الحشوية تتجمع حول الكبد والبنكرياس وتفرز مواد كيميائية ضارة تسبب الالتهابات. حتى لو كان مؤشر كتلة جسمك 24 (طبيعي) ولكن لديك "كرش" بارز، فأنت في خطر صحي أعلى من شخص مؤشره 27 ولكن دهونه موزعة بالتساوي.'
                }
            ],

            medical_sources: [
                'منظمة الصحة العالمية (WHO) - السمنة والوزن الزائد.',
                'المعهد الوطني للسكري وأمراض الجهاز الهضمي والكلى (NIDDK).',
                'المراكز الأمريكية للسيطرة على الأمراض والوقاية منها (CDC).',
                'وزارة الصحة - المملكة العربية السعودية (دليل السعرات والوزن الصحي).'
            ]
        },
        fr: {
            hero_title: 'Calculateur d\'IMC',
            h1_title: 'Tout savoir sur l\'IMC : Guide complet et Calculateur',
            h2_title: 'Calculez votre Indice de Masse Corporelle et évaluez vos risques',
            meta_title: 'Calculatrice IMC - Indice de Masse Corporelle Homme / Femme (Normes OMS)',
            meta_description: 'Calculez votre IMC en ligne gratuitement. Interprétation médicale selon l\'OMS pour hommes, femmes et enfants. Découvrez votre poids idéal et vos risques santé.',
            hero_subtitle: 'L\'outil de référence pour évaluer votre corpulence selon les normes médicales.',
            hero_emoji: '🥑',
            hero_color: 'from-lime-400 to-green-500',
            related_tools: [
                { id: 'calories', name: 'Calculateur de Calories' },
                { id: 'ideal-weight', name: 'Poids Idéal' }
            ],

            formula_title: 'La Science de l\'IMC : Formule de Quetelet',
            formula_explanation: 'L\'Indice de Masse Corporelle (IMC) a été inventé par le mathématicien belge Adolphe Quetelet. C\'est aujourd\'hui l\'outil standard utilisé par l\'OMS pour estimer la corpulence. Il permet d\'évaluer les risques de santé liés au surpoids ou à la maigreur chez l\'adulte de 18 à 65 ans.',
            formula_text: 'IMC = Poids (kg) / Taille (m)²',
            formula_example: 'Exemple : Claire, 1,70 m et 65 kg.\nCalcul : 65 / (1.70 × 1.70) = 22,5.\nRésultat : Corpulence normale.',

            example_title: 'Exemples concrets de calcul IMC',
            examples: [
                {
                    name: 'Exemple 1 : Sédentaire',
                    stats: 'Pierre, 88 kg pour 1,75 m.',
                    calculation: 'IMC = 28,7',
                    result: 'Surpoids',
                    interpretation: 'Pierre a un excès de poids par rapport à sa taille. Sans activité physique, cela correspond probablement à un excès de masse grasse.'
                },
                {
                    name: 'Exemple 2 : Sportif',
                    stats: 'Lucas, rugbyman, 95 kg pour 1,80 m.',
                    calculation: 'IMC = 29,3',
                    result: 'Surpoids (Faux Positif)',
                    interpretation: 'Lucas est classé en surpoids, mais sa masse est constituée de muscle. Son risque cardiovasculaire est faible.'
                }
            ],

            comparison_table_title: 'Tableau des catégories IMC (OMS)',
            bmi_ranges: [
                { category: 'Maigreur', range: '< 18.5', risk: 'Accru : Carences, anémie, ostéoporose' },
                { category: 'Corpulence Normale', range: '18.5 - 25.0', risk: 'Faible : État de santé optimal' },
                { category: 'Surpoids', range: '25.0 - 30.0', risk: 'Modéré : Fatigue cardiaque, articulations' },
                { category: 'Obésité Modérée', range: '30.0 - 35.0', risk: 'Élevé : Diabète, Hypertension' },
                { category: 'Obésité Sévère', range: '> 35.0', risk: 'Très Élevé : Maladies cardiovasculaires graves' }
            ],

            seo_what_title: 'Qu\'est-ce que l\'Indice de Masse Corporelle ?',
            seo_what_content: 'L\'IMC n\'est pas un diagnostic, c\'est un indicateur. Il permet de savoir si votre poids est adapté à votre taille. L\'OMS l\'utilise pour définir le surpoids et l\'obésité chez l\'adulte. C\'est un outil de dépistage rapide qui doit être complété par d\'autres mesures (tour de taille, bilan sanguin) pour une évaluation complète.',

            seo_why_title: 'Pourquoi surveiller son IMC ?',
            seo_why_content: 'L\'IMC est fortement corrélé au risque de mortalité globale. Un IMC trop élevé augmente drastiquement les risques de diabète de type 2, d\'apnée du sommeil et de maladies cardiovasculaires. Un IMC trop bas peut signaler une dénutrition ou des troubles hormonaux. Le connaître vous permet d\'agir avant l\'apparition des symptômes.',

            seo_how_title: 'Bien utiliser ce calculateur',
            seo_how_steps: [
                'Pesez-vous le matin à jeun pour un résultat fiable.',
                'Mesurez votre taille précisément (les chaussures faussent le résultat).',
                'Entrez vos données et découvrez votre catégorie.',
                'Lisez l\'interprétation : un IMC de 26 n\'est pas grave si vous êtes musclé.',
                'Consultez un médecin si votre IMC est inférieur à 18,5 ou supérieur à 30.'
            ],

            seo_tips_title: 'Conseils Santé & Bien-être',
            seo_tips: [
                '📉 **Perdre du poids** : Ne visez pas la "perte rapide". Perdre 5 à 10% de son poids suffit à améliorer grandement la santé métabolique.',
                '💪 **Le muscle pèse lourd** : Ne confondez pas graisse et muscle. Si vous faites du sport, votre IMC peut augmenter alors que votre silhouette s\'affine.',
                '🧬 **L\'âge compte** : Après 60 ans, un IMC légèrement supérieur (25-27) est considéré comme protecteur contre la fragilité.',
                '🥗 **L\'assiette idéale** : 50% de légumes, 25% de protéines, 25% de féculents complets. C\'est la clé pour réguler son poids sans faim.'
            ],

            seo_faqs: [
                {
                    question: 'L\'IMC est-il fiable pour tout le monde ?',
                    answer: 'Non. Il est imprécis pour les athlètes (trop de muscle), les femmes enceintes (poids du bébé) et les personnes âgées (perte de taille). Pour la population générale, il reste un excellent indicateur.'
                },
                {
                    question: 'Quelle est la différence entre IMC et IMG ?',
                    answer: 'L\'IMC (Indice de Masse Corporelle) est un rapport poids/taille. L\'IMG (Indice de Masse Grasse) est le pourcentage réel de graisse dans le corps. L\'IMG est plus précis mais nécessite des outils spécifiques (pince à plis, impédancemétrie).'
                }
            ],

            medical_sources: [
                'Organisation Mondiale de la Santé (OMS) - Surpoids et obésité.',
                'Haute Autorité de Santé (HAS) - France.',
                'Institut National de la Santé et de la Recherche Médicale (Inserm).'
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
                'American Journal of Clinical Nutrition - "Validation of predictive equations for resting energy expenditure".',
                'Academy of Nutrition and Dietetics (ADA).',
                'International Society of Sports Nutrition (ISSN) Position Stand: Diets and Body Composition.',
                'National Strength and Conditioning Association (NSCA) - "Essentials of Strength Training and Conditioning".'
            ]
        },
        ar: {
            hero_title: 'حاسبة السعرات الحرارية (TDEE)',
            h1_title: 'الدليل الاحترافي: حاسبة السعرات الحرارية ومعدل الحرق اليومي',
            h2_title: 'خطط لغذائك بدقة: فقدان الوزن، المحافظة، أو بناء العضلات',
            meta_title: 'حاسبة السعرات الحرارية - دقة طبية للتخسيس وزيادة الوزن | WellTools',
            meta_description: 'احسب احتياجك اليومي من السعرات الحرارية (TDEE) بدقة علمية. خطط مخصصة للتنشيف، التضخيم، أو إنقاص الوزن بناءً على معادلة ميفلين سانت جيور المعتمدة عالمياً.',
            hero_subtitle: 'تحكم في وزنك بذكاء باستخدام المعيار الذهبي لحساب الطاقة.',
            hero_emoji: '🔥',
            hero_color: 'from-orange-400 to-red-500',
            related_tools: [
                { id: 'bmi', name: 'حاسبة مؤشر كتلة الجسم' },
                { id: 'macro', name: 'حاسبة الماكروز' }
            ],

            formula_title: 'العلم وراء الأرقام: معادلة ميفلين-سانت جيور',
            formula_explanation: 'حساب السعرات ليس تخميناً. نحن نستخدم معادلة "ميفلين-سانت جيور" المعترف بها من قبل الجمعية الأمريكية للتغذية كأدق معادلة للأشخاص الأصحاء. نقوم أولاً بحساب معدل الأيض الأساسي (BMR) - الطاقة التي يحتاجها جسمك للبقاء حياً دون حركة - ثم نضربها في عامل النشاط البدني للوصول إلى رقم السعرات الكلية الدقيق.',
            formula_text: 'للرجال: (10 × الوزن) + (6.25 × الطول) - (5 × العمر) + 5\nللنساء: (10 × الوزن) + (6.25 × الطول) - (5 × العمر) - 161',
            formula_example: 'مثال: يوسف (30 سنة، موظف مكتبي، يتمرن 3 أيام). وزنه 80 كجم.\nعملية الأيض الأساسية (BMR): 1780 سعرة.\nالاحتياج اليومي الكلي (TDEE): 1780 × 1.55 = 2759 سعرة للحفاظ على الوزن.',

            example_title: 'كيف نترجم الأرقام إلى خطة؟',
            examples: [
                {
                    name: 'الهدف: فقدان الدهون (التنشيف)',
                    stats: 'سارة، احتياجها اليومي: 2000 سعرة.',
                    calculation: 'العجز المطلوب: -20% (400 سعرة)',
                    result: 'الهدف اليومي: 1600 سعرة',
                    interpretation: 'هذا العجز المعتدل يضمن خسارة الدهون (حوالي 0.4 كجم أسبوعياً) دون تجويع الجسم أو فقدان الكتلة العضلية أو ترهل الجلد.'
                },
                {
                    name: 'الهدف: بناء العضلات (التضخيم)',
                    stats: 'كريم، احتياجه اليومي: 2500 سعرة.',
                    calculation: 'الفائض المطلوب: +10% (250 سعرة)',
                    result: 'الهدف اليومي: 2750 سعرة',
                    interpretation: 'الفائض البسيط مع تمارين المقاومة يضمن أن الوزن المكتسب يذهب للعضلات وليس لتخزين الدهون في منطقة البطن.'
                }
            ],

            comparison_table_title: 'شرح مستويات النشاط البدني',
            activity_levels: [
                { level: 'خامل (Sedentary)', multiplier: '1.2', description: 'وظيفة مكتبية، لا رياضة. معظم الناس يقعون هنا.' },
                { level: 'نشاط خفيف', multiplier: '1.375', description: 'رياضة خفيفة/مشي 1-3 أيام أسبوعياً.' },
                { level: 'نشاط متوسط', multiplier: '1.55', description: 'رياضة فعلية 3-5 أيام أسبوعياً (جيم، سباحة).' },
                { level: 'نشاط عالي', multiplier: '1.725', description: 'تمارين شاقة 6-7 أيام أسبوعياً.' },
                { level: 'نشاط فائق', multiplier: '1.9', description: 'رياضي محترف أو وظيفة بدنية شاقة جداً.' }
            ],

            seo_what_title: 'ما هي السعرة الحرارية حقاً؟',
            seo_what_content: 'السعرة هي ببساطة وحدة طاقة. جسدك محرك بيولوجي يحتاج وقوداً. السعرات الزائدة عن الحاجة تُخزن كوقود احتياطي (دهون). السعرات الناقصة تجبر الجسم على حرق المخزون. المعادلة في غاية البساطة فيزيائياً: الطاقة لا تفنى ولا تستحدث من عدم. تحكم في المدخلات لتتحكم في المخرجات.',

            seo_why_title: 'لماذا تفشل الحميات العشوائية؟',
            seo_why_content: 'معظم الحميات (كيتو، أتكنز، الصيام) تعمل لسبب واحد فقط: أنها تخلق عجزاً في السعرات الحرارية بطرق غير مباشرة. حساب السعرات يزيل الغموض ويسمح لك بتناول أي نوع من الطعام (بيتزا، شوكولاتة) طالما أنه "ضمن الميزانية". هذه المرونة هي سر الاستمرارية والنجاح طويل الأمد.',

            seo_how_title: 'كيف تنجح في حساب السعرات؟',
            seo_how_steps: [
                '**الصدق التام**: سجل كل لقمة، كل ملعقة زيت، كل رشفة عصير. نحن نميل لنسيان 30% مما نأكله.',
                '**الميزان هو الحكم**: "ملعقة زبدة فول سوداني" قد تكون 100 سعرة أو 300 سعرة حسب حجم الملعقة. استخدم ميزان طعام.',
                '**لا تأكل سعرات الرياضة**: ساعات اللياقة تبالغ جداً في حساب الحرق. اعتبر التمارين "بونص" ولا تزد أكلك لأنك مشيت قليلاً.',
                '**البروتين أولاً**: البروتين يجعلك تشعر بالشبع لفترة أطول ويرفع معدل الحرق بنسبة 30% أثناء هضمه.'
            ],

            seo_tips_title: 'أسرار التمثيل الغذائي (الأيض)',
            seo_tips: [
                '🔥 **تأثير البروتين الحراري (TEF)**: جسمك يحرق سعرات لهضم البروتين أكثر من الكربوهيدرات والدهون. ارفع استهلاكك للبروتين لتسريع الحرق.',
                '🚶 **سحر الخطوات (NEAT)**: الحركة غير الرياضية (المشي، الوقوف، التململ) تحرق سعرات يومياً أكثر من ساعة في الجيم. لا تجلس طوال اليوم.',
                '📉 **خرافة "وضع المجاعة"**: لن يتوقف جسمك عن الحرق وأنت تأكل. "ثبات الوزن" غالباً سببه احتباس سوائل أو عدم دقة في الحساب، وليس توقف الأيض.',
                '😴 **النوم والكرش**: قلة النوم ترفع هرمون الجوع (الجريلين) وتخفض هرمون الشبع (اللبتين). النوم 7 ساعات هو أسهل طريقة لتقليل شهيتك.'
            ],

            seo_faqs: [
                {
                    question: 'هل 1200 سعرة حرارية كافية؟',
                    answer: 'للأطفال؟ نعم. للبالغين؟ غالباً لا. النزول تحت 1200 يسبب نقص فيتامينات، تساقط شعر، وتراهلات. هذا الرقم انتشر بالخطأ وهو غير صحي لمعظم النساء والرجال.'
                },
                {
                    question: 'لماذا وزني ثابت وأنا "دايت"؟',
                    answer: 'السبب غالباً: زيوت الطبخ غير المحسوبة، قليل من "التذوق" أثناء الطبخ، المبالغة في حجم الحصة، أو احتباس الماء بعد يوم به نشويات أو ملح كثير. راجع حساباتك بدقة.'
                },
                {
                    question: 'ما هو "اليوم المفتوح" (Cheat Day)؟',
                    answer: 'استراتيجياً، وجبة مفتوحة (Cheat Meal) أفضل من يوم كامل. يوم كامل من الأكل العشوائي قد يدمر عجز السعرات الذي حققته طوال الأسبوع. كن حكيماً.'
                }
            ],

            additional_info: [
                {
                    title: 'الماكروز: ما وراء السعرات',
                    content: 'السعرات تحدد "وزنك"، لكن الماكروز (بروتين، كارب، دهون) تحدد "شكل جسمك". تناول 2000 سعرة من الدجاج والأرز سيعطيك جسماً رياضياً ومشدوداً، بينما 2000 سعرة من الحلويات ستجعلك مترهلاً بنفس الوزن. اهتم بجودة السعرة كما تهتم بعددها.'
                }
            ],

            medical_sources: [
                'الكلية الأمريكية للطب الرياضي (ACSM).',
                'المجلة الأمريكية للتغذية السريرية.',
                'الجمعية الدولية للتغذية الرياضية (ISSN).',
                'الهيئة العامة للغذاء والدواء (السعرات والبطاقة الغذائية).'
            ]
        },
        fr: {
            hero_title: 'Calculateur de Calories (TDEE)',
            h1_title: 'Calculateur de Calories (TDEE) : Perte de Poids et Prise de Masse',
            h2_title: 'Maîtrisez votre nutrition avec la formule scientifique Mifflin-St Jeor',
            meta_title: 'Calcul Calories Journalières - TDEE & Métabolisme de Base | WellTools',
            meta_description: 'Calculez vos besoins caloriques journaliers (TDEE). Outil précis pour maigrir, maintenir son poids ou prendre du muscle. Basé sur la science.',
            hero_subtitle: 'Découvrez exactement combien manger pour atteindre vos objectifs.',
            hero_emoji: '🔥',
            hero_color: 'from-orange-400 to-red-500',
            related_tools: [
                { id: 'macro', name: 'Calculateur de Macros' },
                { id: 'bmi', name: 'Calculateur IMC' }
            ],

            formula_title: 'La Science : Formule Mifflin-St Jeor',
            formula_explanation: 'Pour calculer vos besoins énergétiques, nous utilisons l\'équation de Mifflin-St Jeor, reconnue comme la plus fiable par les diététiciens. Elle estime votre Métabolisme de Base (l\'énergie pour vivre au repos) et y ajoute votre dépense d\'activité physique pour obtenir votre TDEE (Dépense Énergétique Totale).',
            formula_text: 'Hommes : (10 × Poids) + (6.25 × Taille) - (5 × Age) + 5\nFemmes : (10 × Poids) + (6.25 × Taille) - (5 × Age) - 161',
            formula_example: 'Exemple : Thomas (30 ans, Actif). Poids : 80 kg.\nMB = 1780 kcal.\nTDEE (Activité Modérée) = 1780 × 1.55 = 2759 kcal/jour pour maintenir son poids.',

            example_title: 'Définir Votre Objectif Calorique',
            examples: [
                {
                    name: 'Perte de Poids (Sèche)',
                    stats: 'Julie, TDEE : 2000 kcal.',
                    calculation: 'Déficit : -20% (400 kcal)',
                    result: 'Cible : 1600 kcal/jour',
                    interpretation: 'Ce déficit permet de perdre environ 0,5 kg de graisse par semaine de manière durable, sans fonte musculaire excessive.'
                },
                {
                    name: 'Prise de Masse (Clean Bulk)',
                    stats: 'Marc, TDEE : 2600 kcal.',
                    calculation: 'Surplus : +10% (260 kcal)',
                    result: 'Cible : 2860 kcal/jour',
                    interpretation: 'Un léger surplus permet de construire du muscle minimisant la prise de gras. C\'est la méthode recommandée pour une prise de masse "propre".'
                }
            ],

            comparison_table_title: 'Niveaux d\'Activité Physique',
            activity_levels: [
                { level: 'Sédentaire', multiplier: '1.2', description: 'Travail de bureau, peu de mouvement. La majorité des gens.' },
                { level: 'Légèrement Actif', multiplier: '1.375', description: 'Sport léger 1-3 fois par semaine.' },
                { level: 'Modérément Actif', multiplier: '1.55', description: 'Sport modéré 3-5 fois par semaine.' },
                { level: 'Très Actif', multiplier: '1.725', description: 'Sport intense 6-7 jours par semaine.' },
                { level: 'Extrêmement Actif', multiplier: '1.9', description: 'Entraînement pro biquotidien ou travail physique intense.' }
            ],

            seo_what_title: 'Qu\'est-ce qu\'une calorie ?',
            seo_what_content: 'Une calorie est une unité d\'énergie. Votre corps consomme de l\'énergie en permanence, même en dormant. La gestion du poids est une question de bilan énergétique : si vous mangez moins que ce que vous le brûlez (déficit), vous perdez du poids. Si vous mangez plus (surplus), vous en prenez. C\'est la loi de la thermodynamique appliquée à la biologie.',

            seo_why_title: 'Pourquoi compter ses calories ?',
            seo_why_content: 'Compter les calories est la méthode la plus scientifique pour contrôler son poids. Contrairement aux régimes restrictifs qui interdisent certains aliments, le comptage calorique vous offre une flexibilité totale (IIFYM - If It Fits Your Macros). Vous pouvez manger du chocolat et maigrir, tant que vous restez en déficit calorique global.',

            seo_how_title: 'Réussir son régime calorique',
            seo_how_steps: [
                'Calculez votre TDEE avec notre outil.',
                'Visez un déficit modéré (-300 à -500 kcal).',
                'Utilisez une application pour scanner vos aliments.',
                'Pesez vos aliments crus/secs pour plus de précision.',
                'Réajustez vos calories tous les 3-5 kg perdus.'
            ],

            seo_tips_title: 'Astuces Métaboliques',
            seo_tips: [
                '🔥 **Mangez des Protéines** : Elles sont rassasiantes et leur digestion brûle beaucoup de calories (effet thermique).',
                '🚶 **Bougez plus (NEAT)** : Marchez, prenez l\'escalier. Ces petites activités brûlent plus de calories cumulées qu\'une séance de sport.',
                '📉 **Ne descendez pas trop bas** : Manger trop peu (< 1200 kcal) ralentit votre métabolisme et provoque l\'effet yoyo. Soyez patient.',
                '😴 **Dormez 8h** : Le manque de sommeil donne faim et favorise le stockage du gras.'
            ],

            seo_faqs: [
                {
                    question: 'Dois-je manger mes calories d\'exercice ?',
                    answer: 'Non, évitez. Les montres connectées surestiment souvent les calories brûlées. Considérez le sport comme un bonus pour accélérer la perte de poids.'
                },
                {
                    question: 'Pourquoi je ne perds pas de poids à 1200 calories ?',
                    answer: 'C\'est souvent dû à une sous-estimation des calories ingérées (huiles, grignotages oubliés) ou à une rétention d\'eau masquant la perte de gras. La "mode famine" bloquant la perte de poids est un mythe chez les personnes ayant des réserves de graisse.'
                }
            ],

            medical_sources: [
                'American Dietetic Association.',
                'ANSES (Agence nationale de sécurité sanitaire de l\'alimentation).',
                'Études cliniques sur l\'équation Mifflin-St Jeor.'
            ]
        }
    },
    water: {
        en: {
            hero_title: 'Daily Water Intake Calculator',
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
        },
        ar: {
            hero_title: 'حاسبة شرب الماء (الاحتياج اليومي)',
            h1_title: 'حاسبة الماء: كم لتر ماء يجب أن تشرب يومياً؟',
            h2_title: 'احسب احتياج جسمك الدقيق من الماء للصحة والنشاط',
            meta_title: 'حاسبة شرب الماء - الكمية اليومية حسب الوزن والنشاط | WellTools',
            meta_description: 'تخلص من خرافة "8 أكواب". احسب كمية الماء التي يحتاجها جسمك ولون البول الصحي. أداة دقيقة تعتمد على الوزن ومستوى الجهد البدني.',
            hero_subtitle: 'لا تخمن. اشرب الماء بناءً على احتياج جسمك الحقيقي.',
            hero_emoji: '💧',
            hero_color: 'from-blue-400 to-cyan-500',
            related_tools: [
                { id: 'calories', name: 'حاسبة السعرات' },
                { id: 'bmi', name: 'حاسبة كتلة الجسم' }
            ],

            formula_title: 'العلم وراء الترطيب: وداعاً لخرافة 8 أكواب',
            formula_explanation: 'قاعدة "8 أكواب" هي نصيحة قديمة جداً (من عام 1945). العلم الحديث يؤكد أن احتياجك يختلف جذرياً عن غيرك. حاسبتنا تستخدم المعيار الطبي (30-35 مل لكل كجم من الوزن)، ثم تضيف تعويضاً للسوائل المفقودة أثناء الرياضة لتعطيك رقماً دقيقاً.',
            formula_text: 'الأساس = الوزن (كجم) × 33 مل\n+ تعويض الرياضة (12 مل لكل دقيقة نشاط)',
            formula_example: 'مثال: أحمد (وزنه 70 كجم). الأساس: 70 × 33 = 2,300 مل.\nلعب كرة قدم لمدة 60 دقيقة: يضاف 700 مل.\nالهدف النهائي: 3 لترات تقريباً.',
            formula_accuracy: 'تستند هذه الأرقام لتوصيات الأكاديمية الوطنية للعلوم ولجنة الغذاء والتغذية.',

            example_title: 'سيناريوهات الاحتياج اليومي',
            examples: [
                {
                    name: 'الموظف المكتبي',
                    stats: 'خالد، 90 كجم، لا يمارس رياضة.',
                    calculation: 'الهدف: 3 لتر',
                    result: 'النتيجة: 3 لتر',
                    interpretation: 'حتى بدون رياضة، الأجسام الأكبر حجماً تحتاج ماء أكثر للعمليات الحيوية ووظائف الكلى.'
                },
                {
                    name: 'الرياضية',
                    stats: 'نورة، 60 كجم، تمرين هيت (HIT) لمدة 45 دقيقة.',
                    calculation: 'الأساس 2 لتر + تعويض 0.6 لتر',
                    result: 'الهدف: 2.6 لتر',
                    interpretation: 'ارتفاع حرارة الجسم أثناء الرياضة يتطلب تبريداً بالتعرق، مما يستنزف مخزون الماء بسرعة ويوجب تعويضه.'
                }
            ],

            comparison_table_title: 'اختبار لون البول: هل تشرب كفايتك؟',
            activity_levels: [
                { level: 'شفاف / أصفر باهت', multiplier: 'ممتاز', description: '✅ أنت مرتوٍ تماماً. استمر هكذا.' },
                { level: 'أصفر صافي', multiplier: 'جيد', description: '✓ طبيعي. اشرب عند العطش.' },
                { level: 'أصفر غامق', multiplier: 'جفاف خفيف', description: '⚠️ كليتك تحاول توفير الماء. اشرب كوبين الآن.' },
                { level: 'عسلي / برتقالي', multiplier: 'جفاف شديد', description: '🚨 جسمك يعاني. يجب شرب الماء فوراً.' },
                { level: 'بني / كولا', multiplier: 'خطر', description: '🚑 قد يشير لمشاكل كبد أو تكسر عضلات. راجع طبيباً.' }
            ],

            seo_what_title: 'لماذا الماء هو "سر الحياة"؟',
            seo_what_content: 'الماء يشكل 60% من وزنك. إنه ليس مجرد مشروب، بل هو وسيلة النقل لكل فيتامين ومعدن في دمك. هو زيت التشحيم لمفاصلك، ونظام التبريد (العرق) لجلدك. عقلك 73% ماء؛ نقص بسيط جداً في الماء يسبب ضعف التركيز والنسيان والعصبية.',

            seo_why_title: 'علامات الجفاف الصامتة (غير العطش)',
            seo_why_content: 'عندما تشعر بالعطش، تكون قد فقدت 1-2% من سوائل جسمك بالفعل. انتبه لهذه العلامات:\n1. **الصداع**: غالباً أول علامة لنقص الماء.\n2. **الجوع الكاذب**: نخلط غالباً بين العطش والرغبة في السكريات.\n3. **جفاف الجلد**: إذا قرصت جلد ظهر يدك ولم يعد فوراً، فأنت جاف.\n4. **الإمساك**: القولون يسحب الماء من الفضلات لتعويض النقص في الجسم.',

            seo_how_title: 'كيف تصل لهدفك اليومي؟',
            seo_how_steps: [
                '**ابدأ يومك بكوبين**: تفقد 1 لتر ماء أثناء النوم (تنفس وتعرق). عوضه فور الاستيقاظ.',
                '**كل ماءك**: الخيار والبطيخ والخس والفراولة، كلها >90% ماء.',
                '**النكهة الطبيعية**: إذا كنت لا تستسيغ الماء، أضف شرائح ليمون أو نعناع. المشروبات الغازية لا تحتسب (السكر يمتص الماء).',
                '**استراتيجية القنينة**: ضع قنينة مدرجة أمامك دائماً. العين تذكرك بالشرب.'
            ],

            seo_tips_title: 'خرافات وحقائق',
            seo_tips: [
                '⚡ **الإلكتروليت (الأملاح)**: إذا كنت تتعرق بغزارة، الماء وحده لا يكفي وقد يسبب "تسمم مائي". تحتاج صوديوم وبوتاسيوم (ملح ليمون، أو مشروب رياضي).',
                '☕ **القهوة والشاي**: نعم، الكافيين مدر للبول، لكنك تحتفظ بـ 95% من الماء الموجود في القهوة. هي تحتسب ضمن سوائلك، لكن لا تجعلها مصدرك الوحيد.',
                '🌡️ **البارد أم الفاتر؟**: الماء البارد يمتص أسرع ويبرد الجسم. الماء الفاتر يريح المعدة. اشرب ما تفضله، المهم أن تشرب.',
                '🤰 **الحامل والمرضع**: حليب الأم 87% ماء. المرضع تحتاج 1 لتر إضافي يومياً لتصنيع الحليب.'
            ],

            seo_faqs: [
                {
                    question: 'هل يمكن شرب الماء بكثرة؟',
                    answer: 'نعم. "تسمم الماء" حالة نادرة ولكن خطيرة تحدث عند شرب كميات ضخمة (>1 لتر/ساعة) مما يخفف صوديوم الدم. اشرب بانتظام ولا تفرط.'
                },
                {
                    question: 'هل الماء الغازي مفيد؟',
                    answer: 'طبعاً. هو ماء + ثاني أكسيد الكربون. يرطب تماماً مثل الماء العادي، طالما أنه بدون سكر.'
                },
                {
                    question: 'كيف أعرف أنني أحتاج أملاح (إلكتروليت)؟',
                    answer: 'إذا كان عرقك مالحاً جداً (يحرق العين)، أو يترك بقعاً بيضاء على الملابس، أو تعاني من شد عضلي، فأنت تحتاج أملاحاً مع الماء.'
                },
                {
                    question: 'هل الماء ينقص الوزن؟',
                    answer: 'نعم بشكل غير مباشر. شرب الماء قبل الأكل يقلل الشهية، وعملية "حرق الدهون" كيميائياً تحتاج جزيئات ماء لتتم.'
                }
            ],

            medical_sources: [
                'الأكاديميات الوطنية للعلوم والهندسة والطب (الاحتياجات المرجعية الغذائية).',
                'الهيئة الأوروبية لسلامة الأغذية (EFSA).',
                'المجلة الأمريكية لعلم وظائف الأعضاء.'
            ]
        },
        fr: {
            hero_title: 'Calculateur d\'Eau (Hydratation)',
            h1_title: 'Calculateur d\'Eau : Combien de Litres Boire par Jour ?',
            h2_title: 'Vos besoins d\'hydratation personnalisés selon votre profil',
            meta_title: 'Calculateur Eau - Besoin Hydrique Journalier (Litre) | WellTools',
            meta_description: 'Oubliez la règle des "1,5 litres". Calculez vos besoins réels en eau selon votre poids, activité et climat. Outil précis pour la santé et le sport.',
            hero_subtitle: 'Ne devinez plus. Hydratez-vous selon votre biologie unique.',
            hero_emoji: '💧',
            hero_color: 'from-blue-400 to-cyan-500',
            related_tools: [
                { id: 'calories', name: 'Calculateur Calories' },
                { id: 'sleep', name: 'Calculateur Sommeil' }
            ],

            formula_title: 'La Science de l\'Hydratation',
            formula_explanation: 'La règle des "8 verres par jour" est un mythe obsolète (1945). La science moderne prouve que les besoins varient. Notre calculateur utilise le standard médical (30-35ml par kg de poids), et ajoute les pertes estimées dues à l\'exercice pour vous donner une cible précise.',
            formula_text: 'Base = Poids (kg) × 33ml\n+ Sport (12ml par minute d\'activité modérée)',
            formula_example: 'Exemple : Sophie (60kg). Base : 60 × 33 = 1980ml.\nElle court 30 min : +360ml.\nCible Totale : 2,34 Litres.',
            formula_accuracy: 'Basé sur les recommandations de l\'EFSA (Autorité Européenne de Sécurité des Aliments).',

            example_title: 'Qui a besoin de combien ?',
            examples: [
                {
                    name: 'Le Sédentaire',
                    stats: 'Marc, 85kg, bureau.',
                    calculation: 'Cible : 2,8 Litres',
                    result: 'Objectif : 2,8 L',
                    interpretation: 'Même sans sport, un corps plus grand a besoin de plus d\'eau pour filtrer le sang et maintenir la température.'
                },
                {
                    name: 'La Sportive',
                    stats: 'Julie, 65kg, CrossFit (60 min).',
                    calculation: 'Base 2,1L + Perte Sport 1L',
                    result: 'Objectif : 3,1 L',
                    interpretation: 'La thermorégulation pendant le sport consomme énormément d\'eau. Ne pas compenser mène à une chute des performances.'
                }
            ],

            comparison_table_title: 'Le Test des Urines : Êtes-vous hydraté ?',
            activity_levels: [
                { level: 'Clair / Paille pâle', multiplier: 'Optimal', description: '✅ Parfait. Continuez ainsi.' },
                { level: 'Jaune transparent', multiplier: 'Bon', description: '✓ Normal. Buvez à votre soif.' },
                { level: 'Jaune foncé', multiplier: 'Léger Déshydratation', description: '⚠️ Vos reins économisent l\'eau. Buvez un grand verre.' },
                { level: 'Ambré / Miel', multiplier: 'Sévère', description: '🚨 Déshydratation importante. Buvez immédiatement.' },
                { level: 'Brun / Cola', multiplier: 'Urgence', description: '🚑 Danger. Consultez un médecin (problème hépatique ou musculaire).' }
            ],

            seo_what_title: 'L\'eau : Carburant Vital',
            seo_what_content: 'Vous êtes fait à 60% d\'eau. Ce n\'est pas juste une boisson, c\'est le transporteur de tous vos nutriments, le lubrifiant de vos articulations et votre système de refroidissement. Votre cerveau est à 73% de l\'eau; une baisse de 2% d\'hydratation suffit à réduire votre concentration et votre mémoire.',

            seo_why_title: 'Signes de Déshydratation (Au-delà de la soif)',
            seo_why_content: 'Quand vous avez soif, vous êtes déjà déshydraté de 1 à 2%. Surveillez ces signes :\n1. **Maux de tête** : Souvent le premier signal.\n2. **Faim** : On confond souvent soif et envie de sucre.\n3. **Peau sèche** : Le test du pli cutané (pincer la peau) est un bon indicateur.\n4. **Fatigue** : Le sang devient plus épais, le cœur force plus pour pomper.',

            seo_how_title: 'Atteindre son quota : Stratégies',
            seo_how_steps: [
                '**Réveil = Eau** : Vous perdez ~1L la nuit. Buvez 500ml dès le saut du lit.',
                '**Mangez votre eau** : Concombres, tomates, pastèques sont pleins d\'eau.',
                '**Aromatisez** : Citron, menthe, fruits rouges. Si ça vous aide à boire, faites-le (sans sucre ajouté).',
                '**La bouteille témoin** : Gardez une gourde graduée sur votre bureau. C\'est un rappel visuel constant.'
            ],

            seo_tips_title: 'Le Saviez-vous ?',
            seo_tips: [
                '⚡ **Électrolytes** : Si vous transpirez beaucoup (sel sur la peau, yeux qui piquent), l\'eau seule ne suffit pas. Ajoutez une pincée de sel ou des électrolytes.',
                '☕ **Café/Thé** : Oui, ça compte ! L\'effet diurétique est faible. Vous gardez 95% de l\'eau ingérée.',
                '🌡️ **Température** : L\'eau fraîche est absorbée plus vite. L\'eau tiède aide la digestion. L\'important est de boire.',
                '🤰 **Grossesse** : Le liquide amniotique et le volume sanguin accru demandent beaucoup d\'eau. L\'allaitement requiert ~1L de plus par jour.'
            ],

            seo_faqs: [
                {
                    question: 'Peut-on boire trop d\'eau ?',
                    answer: 'Oui. La "potomanie" ou hyponatrémie (trop d\'eau dilue le sel du sang) est dangereuse. Ne dépassez pas 1L par heure.'
                },
                {
                    question: 'L\'eau gazeuse compte-t-elle ?',
                    answer: 'Oui, c\'est de l\'eau avec du CO2. Hydratation identique à l\'eau plate.'
                },
                {
                    question: 'L\'eau fait-elle maigrir ?',
                    answer: 'Indirectement. Elle augmente le métabolisme de base (thermogenèse) et prend de la place dans l\'estomac, réduisant l\'appétit.'
                },
                {
                    question: 'Quand faut-il des électrolytes ?',
                    answer: 'Pour le sport > 1h, les fortes chaleurs, ou si vous êtes un "gros sueur" (traces de sel sur les vêtements).'
                }
            ],

            medical_sources: [
                'EFSA (Autorité Européenne de Sécurité des Aliments).',
                'National Academies of Sciences (USA).',
                'Institut Pasteur (Physiologie).'
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
        ar: {
            hero_title: 'حاسبة الوزن المثالي حسب الطول',
            h1_title: 'حاسبة الوزن المثالي: ما هو وزنك الصحي؟',
            h2_title: 'اعرف النطاق الطبي الموصى به لصحتك وطول عمرك',
            meta_title: 'حاسبة الوزن المثالي - اكتشف وزنك الصحي وطولك المناسب | WellTools',
            meta_description: 'اكتشف نطاق وزنك المثالي الموصى به طبياً بناءً على الطول والعمر والجنس. أداة دقيقة لتحديد أهداف الوزن الصحي المستدامة.',
            hero_subtitle: 'اكتشف الوزن المثالي لجسمك بناءً على المعايير الطبية العالمية',
            hero_emoji: '⚖️',
            hero_color: 'from-orange-400 to-amber-500',
            related_tools: [
                { id: 'bmi', name: 'حاسبة كتلة الجسم' },
                { id: 'body-fat', name: 'حاسبة نسبة الدهون' }
            ],

            formula_title: 'المعادلات الطبية: ديفاين، ميلر، وروبنسون',
            formula_explanation: 'الوزن المثالي ليس رقماً واحداً، بل هو نطاق. نستخدم معادلات طبية (مثل ديفاين 1974) تُستخدم في المستشفيات لتحديد جرعات الأدوية. هذه المعادلات تحسب الوزن الذي يرتبط إحصائياً بأقل نسبة أمراض.',
            formula_text: 'معادلة ديفاين (رجال): 50 + 2.3 كجم لكل بوصة فوق 5 أقدام\nمعادلة ديفاين (نساء): 45.5 + 2.3 كجم لكل بوصة فوق 5 أقدام',
            formula_example: 'مثال: رجل طوله 178 سم. الوزن المثالي حسب ديفاين = 73 كجم تقريباً.',
            formula_accuracy: 'هذه المعادلات دقيقة لعامة الناس، لكنها لا تأخذ العضلات في الاعتبار. الرياضيون قد يكونون "أثقل" من المثال بسبب كثافة العضلات.',

            example_title: 'أمثلة واقعية',
            examples: [
                {
                    name: 'محمد، طول 180 سم',
                    stats: 'بنية متوسطة',
                    calculation: 'ديفاين: 75 كجم. نطاق BMI الصحي: 60-81 كجم.',
                    result: 'الهدف الاستراتيجي: 72-78 كجم',
                    interpretation: 'بالنسبة لطول محمد، البقاء في السبعينات يضمن خفة الحركة وصحة الركبتين والقلب.'
                },
                {
                    name: 'سارة، طول 160 سم',
                    stats: 'بنية ناعمة',
                    calculation: 'ديفاين: 52 كجم. نطاق BMI الصحي: 47-64 كجم.',
                    result: 'الهدف الاستراتيجي: 50-55 كجم',
                    interpretation: 'سارة لا تحتاج لرقم واحد. أي وزن بين 50 و 55 يعتبر مثالياً صحياً ولا داعي للهوس برقم 50 بالتحديد.'
                }
            ],

            comparison_table_title: 'لماذا تختلف النتائج؟',
            activity_levels: [
                { level: 'ديفاين (1974)', multiplier: 'المعيار', description: 'الأكثر استخداماً عالمياً في المجال الطبي.' },
                { level: 'روبنسون (1983)', multiplier: 'أعلى', description: 'يعطي نتائج أعلى قليلاً، مفضل للطوال.' },
                { level: 'ميلر (1983)', multiplier: 'أقل', description: 'يعطي نتائج منخفضة جداً، يعتبره البعض قديماً.' },
                { level: 'مؤشر كتلة الجسم', multiplier: 'مرن', description: 'معيار منظمة الصحة العالمية. يعطيك أوسع نطاق صحي (الخيار الأفضل للواقعية).' }
            ],

            seo_what_title: 'ما هو الوزن المثالي؟',
            seo_what_content: 'الوزن المثالي هو الوزن الذي يعمل فيه جسمك بكفاءة قصوى، وتقل فيه احتمالية الإصابة بالسكري والضغط وآلام المفاصل. هو ليس الوزن "الجمالي" الذي تراه في المجلات، بل الوزن "الصحي" الذي يسمح لك بالعيش بنشاط وعمر أطول.',

            seo_why_title: 'لماذا يجب أن أهتم؟',
            seo_why_content: 'الوصول للوزن المثالي (أو القريب منه) هو أفضل استثمار في صحتك. كل كيلوجرام زائد يضع ضغطاً بمقدار 4 كيلوجرامات على ركبتيك أثناء المشي. التخلص من الوزن الزائد يعني نوماً أفضل، طاقة أكبر، ومناعة أقوى.',

            seo_how_title: 'كيف أحدد هدفي؟',
            seo_how_steps: [
                'قس طولك بدقة (بدون حذاء)',
                'أدخل بياناتك في الحاسبة',
                'انظر إلى "النطاق الصحي" وليس الرقم الفردي',
                'إذا كنت رياضياً، وزنك المثالي قد يكون أعلى من الرقم الظاهر (بسبب العضلات)'
            ],

            seo_tips_title: 'نصائح للوصول للوزن المثالي',
            seo_tips: [
                '🏋️ **العضلات أثقل**: العضلات تأخذ حجماً أقل من الدهون لكنها تزن أكثر. اهتم بالشكل والمقاسات أكثر من الميزان.',
                '🍎 **جودة الأكل**: 500 سعرة من التفاح تشبعك، 500 سعرة من البسكويت تجوعك. اختر الألياف والبروتين.',
                '🚶 **الحركة الدائمة**: لا تجلس أكثر من ساعة متواصلة. قم وتحرك لدقيقتين لتنشيط الحرق.',
                '😴 **النوم**: قلة النوم ترفع هرمون الجوع (الجريلين). نم 7-8 ساعات لتسهل على نفسك الالتزام بالدايت.',
                '🦷 **العادات الصغيرة**: اشرب كوبين ماء قبل كل وجبة. هذه العادة وحدها قد تنقص وزنك 2 كجم في السنة.'
            ],

            seo_faqs: [
                {
                    question: 'هل الوزن المثالي واحد لجميع من هم بنفس الطول؟',
                    answer: 'لا. يختلف حسب حجم الهيكل العظمي (العظم العريض) والكتلة العضلية.'
                },
                {
                    question: 'هل يمكن أن أكون بصحة جيدة وأنا فوق الوزن المثالي؟',
                    answer: 'نعم. إذا كانت مؤشراتك الحيوية (ضغط، سكر، كوليسترول) سليمة وتتحرك بنشاط، فلا داعي للقلق من زيادة بسيطة.'
                },
                {
                    question: 'لماذا يختلف وزن الرجال عن النساء؟',
                    answer: 'الرجال لديهم كتلة عظمية وعضلية أكبر طبيعياً، مما يجعل "الوزن الصحي" لهم أعلى من النساء لنفس الطول.'
                }
            ],

            medical_sources: [
                'المجلة الأمريكية للتغذية السريرية (صيغ الوزن المثالي).',
                'منظمة الصحة العالمية (معايير BMI).',
                'المعاهد الوطنية للصحة (NIH).'
            ]
        },
        fr: {
            hero_title: 'Poids Idéal',
            h1_title: 'Calculateur de Poids Idéal : Quel est votre poids santé ?',
            h2_title: 'Trouvez votre zone de poids recommandée pour la longévité',
            meta_title: 'Calcul Poids Idéal - Formules de Devine et IMC | WellTools',
            meta_description: 'Quel est votre poids idéal ? Utilisez les formules médicales (Devine, Lorentz) pour trouver votre objectif de poids santé selon votre taille et morphologie.',
            hero_subtitle: 'Découvrez votre zone de poids santé basée sur des métriques scientifiques.',
            hero_emoji: '⚖️',
            hero_color: 'from-orange-400 to-amber-500',
            related_tools: [
                { id: 'bmi', name: 'Calculateur IMC' },
                { id: 'body-fat', name: 'Masse Graisseuse' }
            ],

            formula_title: 'Les Formules Médicales : Devine, Miller',
            formula_explanation: 'Le "Poids Idéal" n\'est pas magique, c\'est une statistique. Les médecins utilisent ces formules pour doser les médicaments. Elles indiquent le poids statistiquement associé à la meilleure espérance de vie.',
            formula_text: 'Formule de Devine (Hommes) : 50kg + 2.3kg par pouce au-dessus de 1m52\nFormule de Devine (Femmes) : 45.5kg + 2.3kg par pouce au-dessus de 1m52',
            formula_example: 'Exemple : Homme de 1m80. Poids Idéal Devine = ~75 kg.',
            formula_accuracy: 'Ces formules sont des guides. Elles ne voient pas si vous êtes musclé (bodybuilder) ou si vous avez une ossature fine.',

            example_title: 'Exemples Concrets',
            examples: [
                {
                    name: 'Thomas, 1m88',
                    stats: 'Ossature moyenne',
                    calculation: 'Devine : 82 kg. Zone IMC Santé : 65-88 kg.',
                    result: 'Cible : 80-85 kg',
                    interpretation: 'Pour sa taille, rester autour de 80-85 kg protège ses articulations et son cœur.'
                },
                {
                    name: 'Sophie, 1m62',
                    stats: 'Ossature fine',
                    calculation: 'Devine : 55 kg. Zone IMC Santé : 48-65 kg.',
                    result: 'Cible : 52-58 kg',
                    interpretation: 'Sophie a une marge de manœuvre. Entre 52 et 58 kg, elle est en parfaite santé métabolique.'
                }
            ],

            comparison_table_title: 'Comparatif des Formules',
            activity_levels: [
                { level: 'Devine (1974)', multiplier: 'Standard', description: 'La référence médicale la plus utilisée.' },
                { level: 'Robinson (1983)', multiplier: 'Plus Haut', description: 'Souvent mieux pour les hommes grands.' },
                { level: 'Lorentz', multiplier: 'Classique', description: 'Très populaire en France, prend en compte l\'âge.' },
                { level: 'Zone IMC', multiplier: 'Flexible', description: 'La recommandation de l\'OMS. La zone la plus réaliste.' }
            ],

            seo_what_title: 'C\'est quoi le Poids Idéal ?',
            seo_what_content: 'Le Poids Idéal Théorique (PIT) est le poids où votre corps subit le moins de stress. Ce n\'est pas un poids esthétique (souvent trop maigre), mais un poids physiologique où votre cœur, vos poumons et vos articulations fonctionnent sans surcharge.',

            seo_why_title: 'Pourquoi viser un poids santé ?',
            seo_why_content: 'Maintenir un poids santé réduit drastiquement les risques de diabète de type 2, d\'hypertension et de problèmes articulaires. C\'est le meilleur "médicament" préventif qui existe. Cela améliore aussi la qualité du sommeil et l\'énergie quotidienne.',

            seo_how_title: 'Comment trouver son objectif ?',
            seo_how_steps: [
                'Mesurez votre taille précisément',
                'Utilisez le calculateur',
                'Ne fixez pas un chiffre unique, mais une "zone" de 2-3 kg',
                'Ajustez selon votre ressenti (énergie, facilité de mouvement)'
            ],

            seo_tips_title: 'Conseils Minceur Durables',
            seo_tips: [
                '🏋️ **Le Muscle pèse lourd** : Si vous faites du sport, le miroir compte plus que la balance. Le muscle est plus dense que le gras.',
                '🍎 **Volumétrie** : Mangez des aliments volumineux mais peu caloriques (légumes, soupes) pour être rassasié.',
                '🚶 **Marchez** : 30 minutes de marche par jour suffisent à maintenir un poids santé une fois atteint.',
                '😴 **Dormez** : Le manque de sommeil fait grossir (dérèglement hormonal).',
                '🦷 **Patience** : Une perte de poids durable se fait lentement (0.5 kg par semaine max).'
            ],

            seo_faqs: [
                {
                    question: 'Le poids idéal est-il le même pour tous ?',
                    answer: 'Non. L\'âge, l\'ossature et la masse musculaire changent la donne.'
                },
                {
                    question: 'Peut-on être en bonne santé avec quelques kilos en trop ?',
                    answer: 'Oui, le "surpoids" modéré (IMC 25-27) n\'est pas dangereux si vous êtes actif et que vos analyses sanguines sont bonnes.'
                },
                {
                    question: 'Pourquoi les hommes sont-ils plus lourds ?',
                    answer: 'Ils ont génétiquement plus d\'os et de muscle, ce qui pèse lourd sur la balance.'
                }
            ],

            medical_sources: [
                'American Journal of Clinical Nutrition.',
                'Organisation Mondiale de la Santé (OMS).',
                'Haute Autorité de Santé (France).'
            ]
        }
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
        ar: {
            hero_title: 'حاسبة النوم (دورات النوم)',
            h1_title: 'حاسبة النوم: استيقظ بنشاط كل صباح',
            h2_title: 'اضبط منبهك مع ساعتك البيولوجية (قاعدة 90 دقيقة)',
            meta_title: 'حاسبة النوم - أفضل وقت للاستيقاظ والنوم | WellTools',
            meta_description: 'استيقظ وأنت تشعر بالانتعاش من خلال توقيت دورات نومك. احسب أفضل وقت للنوم أو الاستيقاظ بناءً على دورات نوم مدتها 90 دقيقة. وداعاً للخمول الصباحي.',
            hero_subtitle: 'توقف عن الاستيقاظ متعباً. التزم بدورات النوم الطبيعية لجسمك.',
            hero_emoji: '😴',
            hero_color: 'from-indigo-500 to-purple-600',
            related_tools: [
                { id: 'water', name: 'حاسبة شرب الماء' },
                { id: 'calories', name: 'حاسبة السعرات' }
            ],

            formula_title: 'علم دورات النوم',
            formula_explanation: 'النوم ليس "غيبوبة" مستمرة. دماغك يمر بمراحل (نوم خفيف، عميق، أحلام) في دورة تتكرر كل 90 دقيقة تقريباً. إذا رن المنبه وأنت في مرحلة "النوم العميق"، ستشعر بصداع وخمول شديد (قصور النوم). السر هو الاستيقاظ نهاية الدورة.',
            formula_text: 'وقت الاستيقاظ المثالي = وقت النوم + (90 دقيقة × عدد الدورات) + 15 دقيقة (وقت الغفوة)',
            formula_example: 'مثال: تريد الاستيقاظ 7:00 صباحاً.\nنعد للخلف 5 دورات (7.5 ساعات) + 15 دقيقة = تنام الساعة 11:15 ليلاً.',
            formula_accuracy: '90 دقيقة هو المتوسط العالمي. قد تختلف قليلاً من شخص لآخر لكنها معيار دقيق للأغلبية.',

            example_title: 'سيناريوهات النوم',
            examples: [
                {
                    name: 'الموظف المنتج (5 دورات)',
                    stats: 'الهدف: 7.5 ساعة نوم',
                    calculation: 'نوم: 11:00 م -> استيقاظ: 6:30 ص',
                    result: 'النتيجة: طاقة عالية',
                    interpretation: '5 دورات هي الرقم الذهبي لأغلب البالغين. تكفي لترميم الجسم (نوم عميق) وترتيب الذاكرة (أحلام).'
                },
                {
                    name: 'الرياضي (6 دورات)',
                    stats: 'الهدف: 9 ساعات نوم',
                    calculation: 'نوم: 10:00 م -> استيقاظ: 7:00 ص',
                    result: 'النتيجة: استشفاء عضلي',
                    interpretation: 'هرمون النمو يفرز بكثرة أثناء النوم العميق. الرياضيون يحتاجون وقتاً أطول لإصلاح الأنسجة التالفة.'
                }
            ],

            seo_what_title: 'ما هي دورة النوم؟',
            seo_what_content: 'هي رحلة مدتها 90 دقيقة يمر بها الدماغ. تبدأ بالنعاس، ثم النوم الخفيف، ثم العميق (حيث يبني الجسم العضلات ويقوي المناعة)، وأخيراً مرحلة الأحلام (REM) التي تعالج المشاعر والذكريات. قطع هذه الرحلة في المنتصف هو سبب شعورك بالتعب رغم نومك لساعات طويلة.',

            seo_why_title: 'لماذا التوقيت أهم من المدة؟',
            seo_why_content: 'النوم لمدة 7.5 ساعة قد يكون أفضل من 8 ساعات! لماذا؟ لأنك في 7.5 ساعة تنهي دورة كاملة. أما في 8 ساعات، تكون قد دخلت في نصف ساعة من دورة جديدة (غالباً نوم عميق). الاستيقاظ فجأة من النوم العميق يصدم الجهاز العصبي.',

            seo_how_title: 'كيف تستخدم الحاسبة؟',
            seo_how_steps: [
                'اختر "أريد الاستيقاظ في..." إذا كان لديك دوام',
                'اختر "سأنام الآن..." إذا كنت جاهزاً للسرير',
                'الحاسبة تضيف تلقائياً 15 دقيقة (متوسط الوقت لتغفو)',
                'حاول دائماً اختيار توقيت يعطيك 5 أو 6 دورات'
            ],

            seo_tips_title: 'أركان "نظافة النوم"',
            seo_tips: [
                '🌡️ **البرودة**: الغرفة الباردة (18-20 درجة) تساعد الجسم على الدخول في النوم العميق.',
                '🚫 **الضوء الأزرق**: الجوال يخدع دماغك ويجعله يظن أن الوقت ظهراً، مما يوقف إفراز الميلاتونين (هرمون النوم).',
                '☕ **الكافيين**: يبقى في دمك 8 ساعات. قهوة العصر قد لا تمنعك من النوم، ولكنها ستقلل جودة "النوم العميق" بشدة.',
                '☀️ **شمس الصباح**: تعرض لضوء الشمس فور استيقاظك. هذا يضبط ساعتك البيولوجية لتشعر بالنعاس ليلاً في الوقت المناسب.',
                '🧘 **تنفس 4-7-8**: تقنية تنفس (شهيق 4 ثوان، حبس 7، زفير 8) تهدئ ضربات القلب وتجلب النعاس.'
            ],

            seo_faqs: [
                {
                    question: 'ماذا لو استيقظت وسط الليل؟',
                    answer: 'لا تفتح الجوال أبداً. الضوء سيوقظك تماماً. ابقَ في الظلام وحاول الاسترخاء. القلق بشأن "عدم النوم" هو عدو النوم الأول.'
                },
                {
                    question: 'هل تكفي 6 ساعات نوم؟',
                    answer: 'للغالبية العظمى (95%)، لا. 6 ساعات تعني تراكم "ديون نوم" تؤدي لضعف التركيز، العصبية، وزيادة الوزن على المدى الطويل.'
                },
                {
                    question: 'هل يمكن تعويض النوم في الويكند؟',
                    answer: 'جزئياً فقط. النوم الزائد يوم الجمعة قد يربك ساعتك البيولوجية ويسبب أرق ليلة السبت (ما يسمى "جاز لاج اجتماعي").'
                },
                {
                    question: 'ما هي أفضل وضعية للنوم؟',
                    answer: 'النوم على الجانب هو الأفضل لفتح مجرى التنفس وتقليل الشخير. النوم على البطن هو الأسوأ للرقبة والعمود الفقري.'
                }
            ],

            medical_sources: [
                'مؤسسة النوم الوطنية الأمريكية (National Sleep Foundation).',
                'مجلة أبحاث النوم السريرية.',
                'ستانفورد لعلوم النوم.'
            ]
        },
        fr: {
            hero_title: 'Calculateur de Sommeil',
            h1_title: 'Calculateur de Sommeil : Réveillez-vous en Forme',
            h2_title: 'Maîtrisez vos cycles de sommeil (Règle des 90 minutes)',
            meta_title: 'Calculateur Sommeil - Heure de Coucher et Réveil Idéal | WellTools',
            meta_description: 'Fini le réveil difficile. Calculez l\'heure idéale pour se coucher ou se lever en respectant vos cycles de 90 minutes. Optimisez votre énergie.',
            hero_subtitle: 'Respectez votre horloge biologique pour une énergie maximale.',
            hero_emoji: '😴',
            hero_color: 'from-indigo-500 to-purple-600',
            related_tools: [
                { id: 'water', name: 'Calculateur Eau' },
                { id: 'calories', name: 'Calculateur Calories' }
            ],

            formula_title: 'La Science des Cycles',
            formula_explanation: 'Le sommeil n\'est pas uniforme. Il fonctionne par cycles de 90 minutes : Sommeil Léger, Profond (Récupération Physique), et Paradoxal/REM (Rêves/Mémoire). Se réveiller au milieu d\'un cycle profond provoque "l\'inertie du sommeil" (tête dans le brouillard). Le but est de se réveiller à la fin d\'un cycle.',
            formula_text: 'Réveil Idéal = Coucher + (90 min × N) + 15 min (Temps d\'endormissement)',
            formula_example: 'Exemple : Réveil voulu à 7h00.\nOn compte 5 cycles (7h30) en arrière + 15 min pour s\'endormir = Coucher à 23h15.',
            formula_accuracy: '90 minutes est une moyenne fiable. Testez sur 10 jours pour trouver votre rythme personnel.',

            example_title: 'Stratégies de Sommeil',
            examples: [
                {
                    name: 'Le Standard (5 Cycles)',
                    stats: 'Objectif : 7h30 de sommeil',
                    calculation: 'Coucher : 23h00 -> Réveil : 6h30',
                    result: 'Résultat : Énergie Optimale',
                    interpretation: '7h30 permet de compléter 5 cycles entiers. C\'est l\'équilibre parfait pour la majorité des adultes actifs.'
                },
                {
                    name: 'Le Grand Dormeur (6 Cycles)',
                    stats: 'Objectif : 9h00 de sommeil',
                    calculation: 'Coucher : 22h00 -> Réveil : 7h00',
                    result: 'Résultat : Récupération Max',
                    interpretation: 'Recommandé pour les sportifs ou en cas de maladie. Le 6ème cycle est souvent riche en sommeil paradoxal (créativité, émotion).'
                }
            ],

            seo_what_title: 'C\'est quoi un cycle de sommeil ?',
            seo_what_content: 'Un cycle est une "vague" de 90 minutes. Vous plongez dans le sommeil profond (réparation des tissus, hormones), puis remontez vers le sommeil paradoxal (cerveau très actif, rêves). Casser cette vague au point le plus bas (sommeil profond) est brutal pour le cerveau.',

            seo_why_title: 'Qualité > Quantité',
            seo_why_content: 'Dormir 7h30 peut être mieux que dormir 8h00 ! À 8h, vous entamez un nouveau cycle et vous vous réveillez en plein "brouillard". À 7h30, vous terminez un cycle naturellement. Le timing est tout aussi important que la durée.',

            seo_how_title: 'Comment utiliser l\'outil',
            seo_how_steps: [
                'Choisissez "Je veux me lever à..." pour planifier votre nuit',
                'Choisissez "Je vais dormir..." si vous allez au lit maintenant',
                'L\'outil ajoute 15 min de "latence" (temps moyen pour s\'endormir)',
                'Visez 5 cycles pour une journée de travail, 6 pour un weekend relax'
            ],

            seo_tips_title: 'Hygiène de Sommeil',
            seo_tips: [
                '🌡️ **Fraîcheur** : Une chambre à 18-19°C est idéale. Le corps doit refroidir pour dormir.',
                '🚫 **Écrans** : La lumière bleue des LED bloque la mélatonine. Coupez tout 1h avant de dormir.',
                '☕ **Caféine** : Demi-vie de 6h. Un café à 16h est encore là à 22h. Évitez après 14h.',
                '☀️ **Lumière du jour** : Sortez 10 min dehors le matin. Cela "ancre" votre rythme circadien.',
                '🧘 **Routine** : Un thé, un livre, des étirements. Dites à votre cerveau "c\'est l\'heure".'
            ],

            seo_faqs: [
                {
                    question: 'Je me réveille la nuit, c\'est grave ?',
                    answer: 'C\'est normal de se réveiller brièvement entre deux cycles. Si vous vous rendormez vite, pas de souci. Ne regardez surtout pas l\'heure !'
                },
                {
                    question: '6 heures, ça suffit ?',
                    answer: 'Rarement. Le "manque de sommeil chronique" tue à petit feu (cœur, immunité, poids). Visez 7h30 minimum.'
                },
                {
                    question: 'La sieste compte-t-elle ?',
                    answer: 'Oui. Une sieste de 10-20 min (Power Nap) booste la vigilance sans entrer en sommeil profond. Évitez de dormir 1h (réveil difficile).'
                },
                {
                    question: 'Quelle position pour dormir ?',
                    answer: 'Sur le côté est idéal pour le dos et la respiration. Sur le ventre est déconseillé (tensions cervicales).'
                }
            ],

            medical_sources: [
                'National Sleep Foundation (USA).',
                'Institut National du Sommeil et de la Vigilance (France).',
                'Études sur les rythmes circadiens (Prix Nobel 2017).'
            ]
        }
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
        },
        ar: {
            hero_title: 'حاسبة معدل الأيض الأساسي (BMR)',
            h1_title: 'حاسبة BMR: اعرف احتياج جسمك الأساسي',
            h2_title: 'احسب معدل حرق السعرات في وقت الراحة بدقة علمية',
            meta_title: 'حاسبة BMR - احسب السعرات الحرارية التي يحرقها جسمك في الراحة | WellTools',
            meta_description: 'احسب معدل الأيض الأساسي (BMR) بدقة باستخدام معادلة ميفلين سانت جيور. اكتشف الحد الأدنى من السعرات الحرارية التي يحتاجها جسمك للبقاء على قيد الحياة.',
            hero_subtitle: 'اكتشف احتياج جسمك الأساسي من الطاقة في وضع الراحة التامة',
            hero_emoji: '⚡',
            hero_color: 'from-amber-400 to-orange-500',
            related_tools: [
                { id: 'calories', name: 'حاسبة السعرات' },
                { id: 'macro', name: 'حاسبة الماكروز' },
                { id: 'bmi', name: 'حاسبة كتلة الجسم' }
            ],

            formula_title: 'معادلة ميفلين سانت جيور: العلم وراء BMR',
            formula_explanation: 'معدل الأيض الأساسي (BMR) هو الحد الأدنى من الطاقة (السعرات) التي يحتاجها جسمك ليعمل وأنت نائم أو مرتاح تماماً. يشمل ذلك التنفس، ضربات القلب، وعمل الدماغ. نستخدم معادلة "ميفلين" لأنها الأكثر دقة طبياً.',
            formula_text: 'الرجال: (10 × الوزن) + (6.25 × الطول) - (5 × العمر) + 5\nالنساء: (10 × الوزن) + (6.25 × الطول) - (5 × العمر) - 161',
            formula_example: 'مثال: رجل وزنه 80 كجم وطوله 180 سم وعمره 30 سنة.\nBMR = (10 × 80) + (6.25 × 180) - (5 × 30) + 5 = 1780 سعرة.',
            formula_accuracy: 'هذه المعادلة دقيقة بنسبة تزيد عن 90% لمعظم الناس، وهي المعيار الذهبي المعتمد لدى أخصائيي التغذية.',

            example_title: 'أمثلة عملية',
            examples: [
                {
                    name: 'سارة، مهندسة (25 سنة)',
                    stats: 'وزن: 55 كجم، طول: 160 سم',
                    calculation: 'حساب BMR = 1264 سعرة حرارية',
                    result: 'النتيجة: 1264 سعرة/يوم',
                    interpretation: 'جسم سارة يحرق 1264 سعرة فقط ليبقى حياً. هذا هو خط الأساس. أي نشاط إضافي يتطلب سعرات أكثر.'
                },
                {
                    name: 'أحمد، رياضي (40 سنة)',
                    stats: 'وزن: 100 كجم، طول: 185 سم',
                    calculation: 'حساب BMR = 1961 سعرة حرارية',
                    result: 'النتيجة: 1961 سعرة/يوم',
                    interpretation: 'بسب كتلته العضلية وحجمه، يحرق أحمد ما يقارب 2000 سعرة وهو جالس دون حراك!'
                }
            ],

            seo_what_title: 'ما هو معدل الأيض الأساسي؟',
            seo_what_content: 'هو عدد السعرات التي يحرقها جسمك لو بقيت في السرير طوال الـ 24 ساعة دون أي حركة. تخيل أنه "فاتورة الكهرباء" التشغيلية لجسمك. معرفة هذا الرقم ضرورية جداً لأنها الأساس الذي نبني عليه أي خطة غذائية.',

            seo_why_title: 'لماذا يجب أن تحسب BMR؟',
            seo_why_content: 'بدون معرفة BMR، أنت تخمن عشوائياً. إذا أكلت أقل من هذا الرقم (ريجيم قاسي)، سيدخل جسمك في حالة "المجاعة" ويتمسك بالدهون بدلاً من حرقها. وإذا أكلت أكثر بكثير، سيزيد وزنك. معرفة BMR تحميك من هذه الأخطاء.',

            seo_how_title: 'كيف تستخدم الحاسبة؟',
            seo_how_steps: [
                'اختر الجنس (ذكر/أنثى) لأن التركيب العضلي يختلف',
                'أدخل وزنك الحالي بالكيلوجرام',
                'أدخل طولك بالسنتيمتر',
                'أدخل عمرك',
                'اضغط "احسب" لتر النتيجة فوراً'
            ],

            seo_tips_title: 'كيف ترفع معدل الحرق (BMR)؟',
            seo_tips: [
                '💪 **ابنِ عضلات**: العضلات نسيج "شره" للطاقة. كلما زادت عضلاتك، زاد حرقك حتى وأنت نائم.',
                '🥩 **تناول البروتين**: هضم البروتين يستهلك طاقة أكبر من هضم الدهون، مما يرفع الأيض مؤقتاً.',
                '💧 **اشرب الماء**: الجفاف يبطئ عمليات الأيض في الخلايا.',
                '🚫 **لا تجوع نفسك**: الأكل القليل جداً يخيف الجسم ويجعله يبطئ الحرق للحفاظ على الطاقة.',
                '⚡ **نم جيداً**: النوم المضطرب يلعب بهرمونات الجوع ويقلل كفاءة الحرق.'
            ],

            seo_faqs: [
                {
                    question: 'هل يتغير BMR مع العمر؟',
                    answer: 'نعم، يقل الحرق بنسبة 2-3% كل 10 سنوات بعد سن الثلاثين بسبب فقدان العضلات الطبيعي. الرياضة هي الحل الوحيد لإيقاف هذا التدهور.'
                },
                {
                    question: 'ما الفرق بين BMR و TDEE؟',
                    answer: 'BMR هو حرقك وأنت "نائم". TDEE هو حرقك اليومي الكامل (شامل المشي، الشغل، والرياضة). TDEE دائماً أعلى.'
                },
                {
                    question: 'هل يمكنني أكل أقل من BMR؟',
                    answer: 'لا ننصح بذلك إلا تحت إشراف طبي. الأكل أقل من BMR قد يسبب ترهلات، تساقط شعر، وانهيار في معدل الحرق.'
                },
                {
                    question: 'كيف أعرف إذا كان حرقي بطيئاً؟',
                    answer: 'أغلب الناس حرقهم طبيعي. إذا كنت تأكل قليلاً ولا تنحف، فالسبب غالباً إما دقة حساب السعرات أو خمول الغدة الدرقية (تحتاج تحليل).'
                }
            ],

            medical_sources: [
                'المجلة الأمريكية للتغذية السريرية.',
                'أكاديمية التغذية وعلم النظم الغذائية.',
                'جمعية السكري الأمريكية.'
            ]
        },
        fr: {
            hero_title: 'Calculateur de BMR (Métabolisme de Base)',
            h1_title: 'Calculateur BMR : Comprendre votre métabolisme',
            h2_title: 'Calculez vos besoins caloriques de base avec précision',
            meta_title: 'Calculateur BMR - Calculez votre métabolisme de base | WellTools',
            meta_description: 'Trouvez votre taux métabolique de base (BMR) à l\'aide de l\'équation de Mifflin-St Jeor. Découvrez combien de calories votre corps brûle au repos.',
            hero_subtitle: 'Découvrez les besoins caloriques de base de votre corps.',
            hero_emoji: '⚡',
            hero_color: 'from-amber-400 to-orange-500',
            related_tools: [
                { id: 'calories', name: 'Calculateur Calories' },
                { id: 'macro', name: 'Calculateur Macros' },
                { id: 'bmi', name: 'Calculateur IMC' }
            ],

            formula_title: 'Formule Mifflin-St Jeor : La Science du BMR',
            formula_explanation: 'Votre taux métabolique de base (BMR) représente l\'énergie minimale (calories) dont votre corps a besoin pour maintenir ses fonctions vitales au repos (respiration, cœur, cerveau). Nous utilisons l\'équation de Mifflin-St Jeor, considérée comme la plus précise.',
            formula_text: 'Hommes : (10 × poids) + (6.25 × taille) - (5 × âge) + 5\nFemmes : (10 × poids) + (6.25 × taille) - (5 × âge) - 161',
            formula_example: 'Exemple : Homme de 30 ans, 180cm, 80kg. BMR = 1780 kcal.',
            formula_accuracy: 'Cette formule est précise à ±10% pour la majorité des adultes.',

            example_title: 'Exemples Concrets',
            examples: [
                {
                    name: 'Sarah, 25 ans',
                    stats: 'Poids : 55kg, Taille : 160cm',
                    calculation: 'BMR = 1264 kcal',
                    result: 'Résultat : 1264 kcal/jour',
                    interpretation: 'C\'est le "plancher" métabolique de Sarah. Elle ne devrait jamais manger moins que ça.'
                },
                {
                    name: 'Tom, Athlète',
                    stats: 'Poids : 100kg, Taille : 185cm',
                    calculation: 'BMR = 1961 kcal',
                    result: 'Résultat : 1961 kcal/jour',
                    interpretation: 'La masse musculaire de Tom augmente considérablement sa dépense calorique au repos.'
                }
            ],

            seo_what_title: 'Qu\'est-ce que le BMR ?',
            seo_what_content: 'Le BMR (Basal Metabolic Rate) est le nombre de calories que vous brûlez en ne faisant absolument rien. C\'est l\'énergie vitale. Connaître ce chiffre est la première étape pour créer un plan nutritionnel, que ce soit pour perdre du poids ou prendre de la masse.',

            seo_why_title: 'Pourquoi calculer son BMR ?',
            seo_why_content: 'Sans connaître votre BMR, vous naviguez à l\'aveugle. C\'est la base mathématique de votre dépense énergétique totale (TDEE). Si vous mangez en dessous de votre BMR, vous risquez de ralentir votre métabolisme. Si vous mangez trop au-dessus sans activité, vous stockerez du gras.',

            seo_how_title: 'Utilisation du calculateur',
            seo_how_steps: [
                'Sélectionnez votre sexe (hommes et femmes ont des besoins différents)',
                'Entrez votre poids en kg',
                'Entrez votre taille en cm',
                'Entrez votre âge',
                'Cliquez sur "Calculer"'
            ],

            seo_tips_title: 'Booster son métabolisme',
            seo_tips: [
                '💪 **Musculation** : Le muscle consomme plus d\'énergie que le gras, même au repos.',
                '🥩 **Protéines** : Elles demandent plus d\'énergie à digérer (effet thermique), ce qui booste le métabolisme.',
                '💧 **Hydratation** : Boire de l\'eau stimule légèrement la dépense énergétique.',
                '😴 **Sommeil** : Un bon sommeil régule les hormones de la faim et du métabolisme.'
            ],

            seo_faqs: [
                {
                    question: 'Le BMR change-t-il avec l\'âge ?',
                    answer: 'Oui, il diminue légèrement avec l\'âge, principalement à cause de la perte musculaire. Le sport aide à contrer cet effet.'
                },
                {
                    question: 'Puis-je manger moins que mon BMR ?',
                    answer: 'C\'est déconseillé sur le long terme. Cela peut entraîner carences et fatigue, et paradoxalement bloquer la perte de poids (mode famine).'
                },
                {
                    question: 'Quelle est la différence avec le TDEE ?',
                    answer: 'Le BMR est le repos strict. Le TDEE inclut vos mouvements et le sport. Votre objectif calorique doit se baser sur le TDEE, pas le BMR seul.'
                }
            ],

            medical_sources: [
                'American Journal of Clinical Nutrition.',
                'Organisation Mondiale de la Santé (OMS).',
                'Haute Autorité de Santé.'
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
        ar: {
            hero_title: 'حاسبة الماكروز (المغذيات الكبرى)',
            h1_title: 'حاسبة الماكروز: صمم نظامك الغذائي باحتراف',
            h2_title: 'نسب البروتين والكارب والدهون المخصصة لهدفك',
            meta_title: 'حاسبة الماكروز - تقسيم البروتين والكربوهيدرات والدهون بدقة | WellTools',
            meta_description: 'احسب نسب الماكروز المثالية (البروتين، الكربوهيدرات، الدهون) لأهدافك الرياضية سواء لإنقاص الوزن أو بناء العضلات. خطة غذائية مخصصة لك.',
            hero_subtitle: 'حدد أهدافك اليومية من البروتين والدهون والكربوهيدرات بدقة علمية',
            hero_emoji: '🥗',
            hero_color: 'from-green-400 to-emerald-600',
            related_tools: [
                { id: 'calories', name: 'حاسبة السعرات' },
                { id: 'bmr', name: 'حاسبة الأيض BMR' },
                { id: 'bmi', name: 'حاسبة كتلة الجسم' }
            ],

            formula_title: 'علم الماكروز',
            formula_explanation: 'السعرات تحدد "كم" ينقص وزنك، لكن الماكروز تحدد "شكل" جسمك. الماكروز هي: بروتين (بناء)، كاربوهيدرات (طاقة)، ودهون (هرمونات). الجسم يحتاج توازناً دقيقاً بينهم حسب نشاطك.',
            formula_text: 'التقسيم الشائع: البروتين (4 سعرة/جم)، الكارب (4 سعرة/جم)، الدهون (9 سعرة/جم).',
            formula_example: 'مثال لنظام 2000 سعرة: 40% كارب (200جم)، 30% بروتين (150جم)، 30% دهون (67جم).',
            formula_accuracy: 'حاسبتنا تضمن لك "حد الأمان" من البروتين لمنع هدم العضلات أثناء الرجيم.',

            example_title: 'أنظمة غذائية مشهورة',
            examples: [
                {
                    name: 'التنشيف (خسارة الدهون)',
                    stats: 'بروتين عالي / كارب متوسط',
                    calculation: 'التقسيم: 40% بروتين / 35% كارب / 25% دهون',
                    result: 'الهدف: الحفاظ على العضلات',
                    interpretation: 'البروتين العالي يشعرك بالشبع ويحمي عضلاتك من الهدم بينما تحرق الدهون.'
                },
                {
                    name: 'الكيتو (Keto)',
                    stats: 'دهون عالية / كارب منعدم',
                    calculation: 'التقسيم: 5% كارب / 25% بروتين / 70% دهون',
                    result: 'الهدف: الحالة الكيتونية',
                    interpretation: 'بقطع الكاربوهيدرات، يجبر الجسم على استخدام الدهون كمصدر طاقة بديل (الكيتونات).'
                }
            ],

            comparison_table_title: 'أفضل النسب لأهدافك',
            macro_ratios: [
                { goal: 'ثبات الوزن', split: '40/30/30', description: 'توازن مثالي للصحة العامة والطاقة المستدامة.' },
                { goal: 'بناء عضلات', split: '50/30/20', description: 'كارب عالي لدعم التمارين الشاقة ورفع الأوزان.' },
                { goal: 'حرق دهون', split: '35/40/25', description: 'بروتين أعلى للتحكم في الجوع وحماية الكتلة العضلية.' },
                { goal: 'كيتو', split: '25/5/70', description: 'لخسارة الوزن السريعة وعلاج مقاومة الأنسولين.' }
            ],

            seo_what_title: 'ما هي الماكروز؟',
            seo_what_content: 'هي العناصر الغذائية الكبرى:\n\n**البروتين**: حجر الأساس للعضلات والأنزيمات. مصدره اللحوم، البيض، البقوليات.\n**الكربوهيدرات**: وقود السيارة. مصدر الطاقة المفضل للدماغ والعضلات. (أرز، خبز، فواكه).\n**الدهون**: ضرورية لامتصاص الفيتامينات وصناعة الهرمونات الذكرية والأنثوية. (زيت زيتون، مكسرات، أفوكادو).',

            seo_why_title: 'لماذا أحسب الماكروز وليس السعرات فقط؟',
            seo_why_content: 'لو أكلت 1500 سعرة من الحلويات ستنحف، لكنك ستخسر عضلات وتصبح "نحيلاً مترهلاً" (Skinny Fat). حساب الماكروز يضمن أن وزنك المفقود هو "دهون صافية" وأنك تبني أو تحافظ على عضلاتك، مما يعطيك جسماً مشدوداً وصحياً.',

            seo_how_title: 'كيف تستخدم الأداة',
            seo_how_steps: [
                'احسب سعراتك اليومية (TDEE) أولاً',
                'اختر هدفك (تنشيف، تضخيم، محافظة)',
                'اختر نمطك المفضل (متوازن، قليل الكارب، عالي البروتين)',
                'ستظهر لك النتايج بالجرامات بدقة (مثلاً: تحتاج 160 جرام دجاج، وليس بروتين صافي)'
            ],

            seo_tips_title: 'نصائح المحترفين',
            seo_tips: [
                '🧩 **ابدأ بالبروتين**: املأ صحنك بمصدر البروتين أولاً ثم أضف الباقي.',
                '📉 **الألياف**: لا تهمل الخضروات. الألياف تحسب ككاربوهيدرات لكنها لا ترفع السكر وتشعرك بالشبع.',
                '⚖️ **الميزان**: اشتري ميزان طعام. التخمين بالعين هو سبب فشل 90% من الأنظمة الغذائية.',
                '🔄 **التجهيز المسبق**: جهز وجباتك ليومين أو ثلاثة مقدماً (Meal Prep) لتتجنب طلب الوجبات السريعة عند الجوع.'
            ],

            seo_faqs: [
                { question: 'هل أحسب الخضار؟', answer: 'الخضروات النشوية (بطاطس) نعم. الورقيات (خس، خيار) لا داعي لحسابها إلا للكميات الكبيرة جداً.' },
                { question: 'ماذا عن السكر؟', answer: 'السكر يندرج تحت الكربوهيدرات. يفضل أن تكون أغلب الكربوهيدرات "معقدة" (شوفان، أسمر) وليست سكريات بسيطة.' },
                { question: 'هل البروتين الزائد يضر الكلى؟', answer: 'للشخص السليم، لا. الدراسات الحديثة تؤكد أن حتى 2.5جم/كجم آمن تماماً للكلى السليمة.' }
            ],

            medical_sources: [
                'الجمعية الدولية للتغذية الرياضية (ISSN).',
                'كلية هارفارد للصحة العامة.',
                'المعاهد الوطنية للصحة (NIH).'
            ]
        },
        fr: {
            hero_title: 'Calculateur de Macros',
            h1_title: 'Calculateur de Macros : Optimisez votre Nutrition',
            h2_title: 'Ratios Protéines / Glucides / Lipides Personnalisés',
            meta_title: 'Calculateur Macros - Ratios Protéines, Glucides, Lipides | WellTools',
            meta_description: 'Calculez votre répartition idéale de macronutriments (Protéines, Glucides, Lipides) pour la perte de poids, la prise de muscle ou le maintien.',
            hero_subtitle: 'Obtenez vos objectifs quotidiens en grammes pour chaque nutriment.',
            hero_emoji: '🥗',
            hero_color: 'from-green-400 to-emerald-600',
            related_tools: [
                { id: 'calories', name: 'Calculateur Calories' },
                { id: 'bmr', name: 'Calculateur BMR' },
                { id: 'bmi', name: 'Calculateur IMC' }
            ],

            formula_title: 'La Science des Macronutriments',
            formula_explanation: 'Les calories déterminent le poids, les macros déterminent la composition corporelle. Les macros sont : Protéines (4 kcal/g), Glucides (4 kcal/g), et Lipides (9 kcal/g). Votre ratio idéal dépend de votre sensibilité à l\'insuline et de votre activité.',
            formula_text: 'Exemple Zone : 40% Glucides, 30% Protéines, 30% Lipides.',
            formula_example: 'Pour 2000 kcal : 40% Glucides = 200g, 30% Protéines = 150g, 30% Lipides = 67g.',
            formula_accuracy: 'Notre outil ajuste les besoins pour préserver la masse musculaire en déficit.',

            example_title: 'Stratégies Nutritionnelles',
            examples: [
                {
                    name: 'Prise de Masse (Bulking)',
                    stats: 'Glucides Élevés / Protéines Élevées',
                    calculation: 'Split : 50% G / 30% P / 20% L',
                    result: 'Objectif : Performance',
                    interpretation: 'Les glucides sont essentiels pour restaurer le glycogène musculaire après un entraînement intense.'
                },
                {
                    name: 'Perte de Gras (Cutting)',
                    stats: 'Protéines Élevées / Glucides Modérés',
                    calculation: 'Split : 35% G / 40% P / 25% L',
                    result: 'Objectif : Satiété',
                    interpretation: 'Les protéines augmentent la satiété et coûtent plus d\'énergie à digérer, aidant le déficit calorique.'
                }
            ],

            comparison_table_title: 'Répartitions Populaires',
            macro_ratios: [
                { goal: 'Maintenance', split: '40/30/30', description: 'Approche équilibrée "Zone". Bonne pour la santé générale.' },
                { goal: 'Muscle', split: '50/30/20', description: 'Carburant pour l\'entraînement.' },
                { goal: 'Perte de Gras', split: '35/40/25', description: 'Protection musculaire maximale.' },
                { goal: 'Cétogène (Keto)', split: '5/25/70', description: 'Très riche en lipides pour passer en cétose.' }
            ],

            seo_what_title: 'C\'est quoi les Macros ?',
            seo_what_content: 'Ce sont les nutriments majeurs :\n\n**Protéines** : Briques de construction des muscles et hormones.\n**Glucides** : Carburant préféré du cerveau et des efforts intenses.\n**Lipides** : Essentiels pour les hormones et la santé cellulaire.',

            seo_why_title: 'Pourquoi compter les macros ?',
            seo_why_content: 'Si vous ne comptez que les calories, vous pouvez perdre du poids en mangeant n\'importe quoi, mais vous perdrez du muscle et de la santé. Compter les macros s\'assure que vous nourrissez votre corps avec ce dont il a besoin pour être performant et esthétique.',

            seo_how_title: 'Comment utiliser l\'outil',
            seo_how_steps: [
                'Calculez votre TDEE (Dépense énergétique) d\'abord',
                'Choisissez votre objectif',
                'Sélectionnez votre préférence (Équilibré, Low Carb, etc.)',
                'L\'outil vous donne les grammes exacts à viser'
            ],

            seo_tips_title: 'Conseils de Pro',
            seo_tips: [
                '🧩 **Protéines d\'abord** : Construisez vos repas autour de la source de protéine.',
                '📉 **Fibres** : Visez 30g de fibres par jour pour la digestion et la satiété.',
                '⚖️ **Pesez vos aliments** : L\'estimation est l\'ennemie du progrès. Pesez cru de préférence.'
            ],

            seo_faqs: [
                { question: 'Dois-je compter les légumes ?', answer: 'Les légumes verts, non. Les féculents et légumineuses, oui.' },
                { question: 'Et l\'alcool ?', answer: 'L\'alcool contient 7 kcal/g. Il freine la perte de gras. Comptez-le comme des glucides ou des lipides.' }
            ],

            medical_sources: [
                'Journal of the International Society of Sports Nutrition.',
                'Harvard T.H. Chan School of Public Health.',
                'Anses (France).'
            ]
        }
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
        },
        ar: {
            hero_title: 'حاسبة نسبة الدهون (طريقة البحرية)',
            h1_title: 'حاسبة نسبة الدهون: اعرف تكوين جسمك الحقيقي',
            h2_title: 'تحليل دقيق لنسبة الدهون والعضلات بدون أجهزة معقدة',
            meta_title: 'حاسبة دهون الجسم - قياس نسبة الدهون بدقة (طريقة البحرية) | WellTools',
            meta_description: 'احسب نسبة الدهون في جسمك بدقة باستخدام طريقة البحرية الأمريكية. تتبع تطور تكوين جسمك ونسبة العضلات والدهون بسهولة.',
            hero_subtitle: 'أداة دقيقة لقياس نسبة الدهون في الجسم بناءً على مقاساتك الشخصية',
            hero_emoji: '🍊',
            hero_color: 'from-orange-400 to-orange-600',
            related_tools: [
                { id: 'bmi', name: 'حاسبة كتلة الجسم' },
                { id: 'ideal-weight', name: 'الوزن المثالي' },
                { id: 'calories', name: 'حاسبة السعرات' }
            ],

            formula_title: 'معادلة البحرية الأمريكية',
            formula_explanation: 'تستخدم هذه الحاسبة "طريقة البحرية الأمريكية" لتقدير نسبة الدهون. أثبتت الدراسات أن هذه الطريقة هي أدق وسيلة منزلية لقياس الدهون، وتتفوق في الدقة على الموازين الذكية المنزلية.',
            formula_text: 'تعتمد المعادلة على العلاقة الهندسية بين محيط الرقبة، الخصر، والطول (والحوض للنساء).',
            formula_example: 'مثال: رجل (خصر 90سم، رقبة 40سم، طول 180سم) = نسبة دهون 18.5%.',
            formula_accuracy: 'دقة المعادلة تصل إلى ±3% مقارنة بأجهزة الفحص الطبي (DEXA) باهظة الثمن.',

            example_title: 'أمثلة للأهداف',
            examples: [
                {
                    name: 'جسم رياضي (رجال)',
                    stats: 'هدف: عضلات بطن بارزة',
                    calculation: 'الحالي: 15% -> الهدف: 10%',
                    result: 'الخطة: عجز سعرات + تمارين مقاومة',
                    interpretation: 'عند الوصول لـ 10%، تصبح عضلات البطن (السكس باك) واضحة جداً.'
                },
                {
                    name: 'جسم رشيق (نساء)',
                    stats: 'هدف: جسم مشدود (Tone)',
                    calculation: 'الحالي: 28% -> الهدف: 22%',
                    result: 'الخطة: كارديو + أوزان خفيفة',
                    interpretation: 'نسبة 22% تعطي مظهراً مشدوداً جداً مع الحفاظ على الأنوثة والصحة الهرمونية.'
                }
            ],

            seo_what_title: 'ما هي نسبة الدهون؟',
            seo_what_content: 'هي نسبة كتلة الدهون إلى باقي وزن الجسم (عضلات، عظام، ماء). هي المقياس الحقيقي للصحة وليس "الميزان". قد يكون وزنك مثالياً لكن نسبة دهونك عالية (السمنة الخفية)، والعكس صحيح للرياضيين.',

            seo_why_title: 'لماذا يجب قياس الدهون؟',
            seo_why_content: 'إذا كنت تتبع حمية وتخسر وزناً، كيف تعرف أنك لا تفقد العضلات؟ قياس نسبة الدهون يخبرك بالحقيقة. فقدان العضلات يعني بطء الحرق وترهلات. هدفنا دائماً هو "خسارة الدهون" وليس "خسارة الوزن".',

            seo_how_title: 'كيف تأخذ مقاسات دقيقة؟',
            seo_how_steps: [
                'استخدم شريط قياس مرن (مازورة)',
                'الرقبة: تحت تفاحة آدم مباشرة',
                'الخصر للرجال: عند مستوى السرة تماماً',
                'الخصر للنساء: عند أضيق منطقة في البطن',
                'الحوض (للنساء فقط): عند أعرض منطقة',
                'نصيحة: لا تشد الشريط بقوة، دعه يلامس الجلد فقط'
            ],

            seo_tips_title: 'طرق القضاء على الدهون',
            seo_tips: [
                '💪 **الحديد**: تمارين المقاومة هي العدو الأول للدهون لأنها ترفع الحرق لساعات بعد التمرين.',
                '🥩 **البروتين**: يحتاج طاقة لهضمه ويحافظ على عضلاتك من الانهيار.',
                '🚶 **الحركة المستمرة**: لا تجلس طويلاً. المشي اليومي (10 آلاف خطوة) يحرق دهوناً أكثر مما تتخيل.',
                '😴 **النوم**: قلة النوم ترفع الكورتيزول الذي يخزن الدهون في منطقة البطن تحديداً.'
            ],

            seo_faqs: [
                { question: 'ما النسبة الطبيعية؟', answer: 'للنساء: 21-31% (صحي)، للرجال: 14-24% (صحي). الرياضيون أقل من ذلك.' },
                { question: 'متى أقيس؟', answer: 'مرة كل أسبوعين في الصباح الباكر قبل الأكل. لا تقيس يومياً.' },
                { question: 'هل الميزان الذكي دقيق؟', answer: 'لا، الموازين المنزلية تتأثر بشرب الماء ورطوبة القدمين. شريط القياس (هذه الحاسبة) أدق بكثير.' }
            ],

            medical_sources: [
                'مركز البحوث الصحية البحرية الأمريكية.',
                'دورية أبحاث القوة والتكييف البدني.',
                'المجلس الأمريكي للتمرين (ACE).'
            ]
        },
        fr: {
            hero_title: 'Calculateur de Masse Grasse (Navy)',
            h1_title: 'Calculateur de Masse Grasse : Votre Vrai Bilan Forme',
            h2_title: 'Analysez votre composition corporelle avec précision',
            meta_title: 'Calculateur Masse Grasse - Méthode US Navy Précise | WellTools',
            meta_description: 'Estimez votre pourcentage de graisse corporelle avec la méthode US Navy. Suivez votre évolution physique et vos progrès fitness efficacement.',
            hero_subtitle: 'Calculez votre taux de masse grasse avec une précision clinique.',
            hero_emoji: '🍊',
            hero_color: 'from-orange-400 to-orange-600',
            related_tools: [
                { id: 'bmi', name: 'Calculateur IMC' },
                { id: 'ideal-weight', name: 'Poids Idéal' },
                { id: 'calories', name: 'Calculateur Calories' }
            ],

            formula_title: 'Méthode US Navy : La Référence',
            formula_explanation: 'Ce calculateur utilise la méthode de la Marine Américaine (US Navy Method). Les études ont montré que c\'est la méthode non-clinique la plus fiable pour estimer le taux de gras, souvent à 3% près des scanners DEXA.',
            formula_text: 'Basée sur les mensurations : Cou, Taille, Hauteur (et Hanches pour les femmes).',
            formula_example: 'Homme (Taille 90cm, Cou 40cm, 180cm) = 18.5% de gras.',
            formula_accuracy: 'Précision de ±3-4%. Idéal pour suivre vos progrès à la maison.',

            example_title: 'Exemples d\'Objectifs',
            examples: [
                {
                    name: 'L\'Athlète (Homme)',
                    stats: 'Objectif : Abdominaux Visibles',
                    calculation: 'Actuel : 15% -> Cible : 8-10%',
                    result: 'Plan : Déficit calorique + Musculation',
                    interpretation: 'À 8-10%, la définition musculaire est maximale et les veines sont visibles.'
                },
                {
                    name: 'Fitness (Femme)',
                    stats: 'Objectif : Tonique',
                    calculation: 'Actuel : 26% -> Cible : 20%',
                    result: 'Plan : Cardio + Renforcement',
                    interpretation: 'À 20%, la silhouette est athlétique et tonique, tout en restant saine.'
                }
            ],

            seo_what_title: 'Qu\'est-ce que le taux de masse grasse ?',
            seo_what_content: 'C\'est la proportion de votre poids qui est composée de graisse. C\'est un indicateur de santé bien supérieur au poids seul. Deux personnes de 80kg peuvent avoir le même IMC mais être radicalement différentes : l\'une musclée (10% gras), l\'autre sédentaire (30% gras).',

            seo_why_title: 'Pourquoi mesurer sa masse grasse ?',
            seo_why_content: 'Si vous perdez du poids, vous devez savoir si vous perdez du gras ou du muscle. Perdre du muscle est catastrophique pour le métabolisme. En suivant votre taux de gras, vous vous assurez que votre régime cible bien les graisses stockées.',

            seo_how_title: 'Comment prendre ses mesures ?',
            seo_how_steps: [
                'Utilisez un mètre ruban souple',
                'Cou : Juste en dessous de la pomme d\'Adam',
                'Taille (Hommes) : Au niveau du nombril',
                'Taille (Femmes) : Au point le plus fin (taille naturelle)',
                'Hanches (Femmes) : Au point le plus large des fesses',
                'Ne serrez pas trop, le ruban doit juste toucher la peau'
            ],

            seo_tips_title: 'Conseils pour sécher',
            seo_tips: [
                '💪 **Poussez lourd** : La musculation préserve le muscle en déficit calorique.',
                '🥗 **Protéines** : Indispensables pour la satiété et la protection musculaire.',
                '🚶 **Bougez** : La marche (NEAT) est une arme secrète pour brûler des calories sans fatigue excessive.',
                '😴 **Dormez** : Le manque de sommeil bloque la perte de gras.'
            ],

            seo_faqs: [
                { question: 'Quel est un bon taux ?', answer: 'Femmes : 21-24% (Fitness). Hommes : 14-17% (Fitness).' },
                { question: 'À quelle fréquence mesurer ?', answer: 'Une fois toutes les 2 semaines. Le gras part doucement, ne vous pesez pas tous les jours.' },
                { question: 'Est-ce précis ?', answer: 'Oui, c\'est très fiable pour voir la tendance (si le chiffre baisse, c\'est que vous perdez du gras).' }
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
        },
        ar: {
            hero_title: 'حاسبة أقصى وزن لتكرار واحد (1RM)',
            h1_title: 'حاسبة 1RM: اعرف قوتك الحقيقية',
            h2_title: 'توقع أقصى وزن يمكنك رفعه بأمان ودقة',
            meta_title: 'حاسبة 1RM - احسب أقصى قدرة رفع وقوتك البدنية | WellTools',
            meta_description: 'احسب أقصى وزن يمكنك رفعه (1RM) بدقة. أداة مثالية للاعبي كمال الأجسام والقوة لتحديد أوزان التدريب المناسبة وتجنب الإصابة.',
            hero_subtitle: 'توقع قوتك القصوى للأوزان وخطط لتمارينك بناءً على قدراتك الفعلية',
            hero_emoji: '🏋️',
            hero_color: 'from-gray-700 to-gray-900',
            related_tools: [
                { id: 'calories', name: 'حاسبة السعرات' },
                { id: 'body-fat', name: 'نسبة الدهون' },
                { id: 'macro', name: 'حاسبة الماكروز' }
            ],

            formula_title: 'معادلة برزيكي (Brzycki)',
            formula_explanation: 'حساب "التكرار الأقصى" (1RM) يسمح لك بمعرفة قوتك المطلقة دون المخاطرة برفع وزن ثقيل قد يؤدي للإصابة. تستخدم حاسبتنا معادلة Brzycki الرياضية، وهي دقيقة جداً للتكرارات الأقل من 10.',
            formula_text: 'المعادلة: الوزن المرفوع ÷ (1.0278 - (0.0278 × عدد التكرارات))',
            formula_example: 'مثال: رفعت 100 كجم لـ 5 تكرارات. النتيجة = 112.5 كجم.',
            formula_accuracy: 'الدقة تكون في أعلى مستوياتها بين 2 الى 8 تكرارات.',

            example_title: 'أمثلة عملية',
            examples: [
                {
                    name: 'محمد، لاعب باورليفتنج',
                    stats: 'أداء حالي: 140 كجم سكوات (3 تكرارات)',
                    calculation: '1RM = 140 / (1.0278 - (0.0278 × 3))',
                    result: 'الحد الأقصى المتوقع: 151 كجم',
                    interpretation: 'يمكن لمحمد الآن بناء جدوله التدريبي بناءً على رقم 151 كجم.'
                },
                {
                    name: 'سارة، مبتدئة',
                    stats: 'أداء حالي: 40 كجم دفع أكتاف (8 تكرارات)',
                    calculation: '1RM = 40 / (1.0278 - (0.0278 × 8))',
                    result: 'الحد الأقصى المتوقع: 49 كجم',
                    interpretation: 'سارة تعرف الآن أن قوتها القصوى هي حوالي 50 كجم، فلا تحاول رفع أثقل من ذلك حالياً.'
                }
            ],

            comparison_table_title: 'نسب التدريب (Percentages)',
            strength_percentages: [
                { percentage: '100%', repetitions: '1', focus: 'القوة القصوى' },
                { percentage: '95%', repetitions: '2', focus: 'قوة / انفجارية' },
                { percentage: '90%', repetitions: '3-4', focus: 'أساس القوة' },
                { percentage: '85%', repetitions: '5-6', focus: 'ضخامة / قوة' },
                { percentage: '80%', repetitions: '7-8', focus: 'بناء عضلات (ضخامة)' },
                { percentage: '75%', repetitions: '10-12', focus: 'تحمل / ضخامة' }
            ],

            seo_what_title: 'ما هو 1RM؟',
            seo_what_content: 'هو أقصى وزن يمكنك رفعه لتكرار واحد صحيح وكامل. يعتبر المعيار الذهبي لقياس القوة في عالم الرياضة.',

            seo_why_title: 'لماذا يجب أن أعرفه؟',
            seo_why_content: 'معظم البرامج التدريبية الاحترافية تعتمد على النسب المئوية (مثلاً: العب 3 مجموعات بوزن 80% من الـ 1RM). بدون معرفة رقمك، ستتدرب بأوزان عشوائية ولن تحقق أفضل النتائج.',

            seo_how_title: 'كيف تستخدم الحاسبة بأمان',
            seo_how_steps: [
                'سخن جيداً جداً',
                'اختر وزناً تستطيع رفعه من 3 إلى 8 تكرارات',
                'قم بالتمرين حتى التعب (قبل الفشل العضلي بتكرار واحد)',
                'ادخل الوزن والعدات في الحاسبة',
                'استخدم النتيجة لتصميم جدولك'
            ],

            seo_tips_title: 'نصائح لزيادة قوتك',
            seo_tips: [
                '📉 **لا تختبر الحقيقي كثيراً**: اختبار الـ 1RM الحقيقي (رفع أقصى وزن) مرهق جداً للجهاز العصبي. افعله مرة كل 3-4 أشهر فقط.',
                '🧘 **المدى الحركي**: "نصف تكرار" لا يحسب. التكرار يجب أن يكون بمدى حركي كامل.',
                '🔋 **الراحة**: عند التدريب للقوة، ارتح 3-5 دقائق بين الجولات.',
                '🗒️ **التدوين**: سجل كل أوزانك. زيادة 2.5 كجم في الـ 1RM المتوقع كل شهر هو تقدم ممتاز.'
            ],

            seo_faqs: [
                { question: 'ما هي أدق معادلة؟', answer: 'معادلة Brzycki هي الأفضل للأوزان الثقيلة (تكرارات قليلة)، ومعادلة Epley أفضل للتكرارات العالية (6-12).' },
                { question: 'هل الاختبار خطير؟', answer: 'الاختبار الفعلي (رفع أقصى وزن) فيه مخاطرة. استخدام الحاسبة (بناءً على 5-8 تكرارات) آمن جداً.' }
            ],

            medical_sources: [
                'الجمعية الوطنية للقوة والتكييف (NSCA).',
                'مجلة علوم الرياضة.',
                'الكلية الأمريكية للطب الرياضي (ACSM).'
            ]
        },
        fr: {
            hero_title: 'Calculateur 1RM (Force Max)',
            h1_title: 'Calculateur 1RM : Votre Force Maximale',
            h2_title: 'Estimez votre charge maximale sans risque',
            meta_title: 'Calculateur 1RM - Max Repetition Calcul | WellTools',
            meta_description: 'Calculez votre 1RM estimé pour le développé couché, le squat et le soulevé de terre. Optimisez vos charges d\'entraînement pour la force et le muscle.',
            hero_subtitle: 'Prédisez votre capacité de levage maximale et optimisez votre entraînement.',
            hero_emoji: '🏋️',
            hero_color: 'from-gray-700 to-gray-900',
            related_tools: [
                { id: 'calories', name: 'Calculateur Calories' },
                { id: 'body-fat', name: 'Masse Grasse' },
                { id: 'macro', name: 'Calculateur Macros' }
            ],

            formula_title: 'Formule de Brzycki',
            formula_explanation: 'Le calcul de votre Répétition Maximale (1RM) vous permet de déterminer votre force absolue sans le risque de blessure lié au soulèvement réel de votre charge maximale. Notre calculateur utilise la formule de Brzycki, très précise pour les séries de moins de 10 répétitions.',
            formula_text: '1RM = Poids / (1.0278 - (0.0278 × Répétitions))',
            formula_example: 'Exemple : 100kg pour 5 reps : 100 / (1.0278 - (0.0278 × 5)) = 112.5kg.',
            formula_accuracy: 'Les prédictions sont les plus précises entre 2 et 8 répétitions.',

            example_title: 'Exemples Concrets',
            examples: [
                {
                    name: 'Alex, Powerlifter',
                    stats: 'Squat actuel : 140kg pour 3 reps',
                    calculation: '1RM = 140 / (1.0278 - (0.0278 × 3))',
                    result: '1RM Estimé : 151kg',
                    interpretation: 'Alex peut utiliser cette base de 151kg pour calculer ses pourcentages (ex: 80% pour 5x5).'
                },
                {
                    name: 'Sarah, Débutante',
                    stats: 'Presse militaire : 40kg pour 8 reps',
                    calculation: '1RM = 40 / (1.0278 - (0.0278 × 8))',
                    result: '1RM Estimé : 49kg',
                    interpretation: 'Sarah connaît sa limite théorique sans avoir à risquer l\'échec sous une barre lourde.'
                }
            ],

            comparison_table_title: 'Pourcentages d\'Entraînement',
            strength_percentages: [
                { percentage: '100%', repetitions: '1', focus: 'Force Absolue' },
                { percentage: '95%', repetitions: '2', focus: 'Puissance / Force' },
                { percentage: '90%', repetitions: '3-4', focus: 'Base de Force' },
                { percentage: '85%', repetitions: '5-6', focus: 'Hypertrophie / Force' },
                { percentage: '80%', repetitions: '7-8', focus: 'Hypertrophie (Muscle)' },
                { percentage: '75%', repetitions: '10-12', focus: 'Endurance / Hypertrophie' }
            ],

            seo_what_title: 'Qu\'est-ce que le 1RM ?',
            seo_what_content: 'Le 1RM (One-Rep Max) est le poids maximum que vous pouvez soulever sur une seule répétition avec une technique correcte. C\'est la mesure standard de la force.',

            seo_why_title: 'Pourquoi calculer son 1RM ?',
            seo_why_content: 'La plupart des programmes de force (5/3/1, Starting Strength) utilisent des pourcentages du 1RM. Connaître votre 1RM est essentiel pour "auto-réguler" votre entraînement : ni trop léger, ni trop lourd.',

            seo_how_title: 'Utilisation Sécurisée',
            seo_how_steps: [
                'Échauffez-vous soigneusement',
                'Choisissez un poids que vous maîtrisez pour 3 à 8 répétitions',
                'Allez jusqu\'à avoir 1 répétition en réserve (RPE 9)',
                'Entrez le poids et les répétitions',
                'Utilisez le résultat pour calibrer vos futures séances'
            ],

            seo_tips_title: 'Conseils Force',
            seo_tips: [
                '📉 **Ne testez pas trop souvent** : Le vrai test 1RM est très taxant. Utilisez ce calculateur.',
                '🧘 **Technique** : Une "rep trichée" fausse le calcul et mène à la blessure.',
                '🔋 **Repos** : Prenez 3 à 5 minutes de repos entre les séries lourdes.',
                '🗒️ **Notez tout** : La force est un marathon. Une petite augmentation du 1RM estimé chaque mois est un grand succès.'
            ],

            seo_faqs: [
                { question: 'Quelle formule est la meilleure ?', answer: 'Brzycki est excellente pour les charges lourdes. Epley est bien pour les séries plus longues.' },
                { question: 'Est-ce dangereux ?', answer: 'Le test physique est risqué. Le calcul mathématique (basé sur 5-8 reps) est très sûr.' }
            ],

            medical_sources: [
                'National Strength and Conditioning Association (NSCA).',
                'Journal of Sports Sciences.',
                'American College of Sports Medicine (ACSM).'
            ]
        }
    },
    'meal-planner': {
        en: { meta_title: 'Meal Planner - Personalized Diet Plans | WellTools', meta_description: 'Create a custom meal plan based on your calories and macros. Healthy, delicious recipes tailored to your weight loss or muscle gain goals.' },
        ar: { meta_title: 'مخطط الوجبات - خطط غذائية مخصصة | WellTools', meta_description: 'أنشئ خطة وجبات مخصصة بناءً على السعرات الحرارية والماكروز. وصفات صحية ولذيذة مصممة لأهدافك.' },
        fr: { meta_title: 'Planificateur de repas - Plans diététiques personnalisés | WellTools', meta_description: 'Créez un plan de repas personnalisé basé sur vos calories et macros. Des recettes saines et délicieuses adaptées à vos objectifs.' }
    },
    tracking: {
        en: { meta_title: 'Daily Tracking - Monitor Your Fitness Progress | WellTools', meta_description: 'Track your daily weight, water intake, and calories. Visualize your progress with interactive charts and stay motivated.' },
        ar: { meta_title: 'التتبع اليومي - راقب تقدم لياقتك | WellTools', meta_description: 'تتبع وزنك والمياه والسعرات الحرارية يومياً. راقب تقدمك مع مخططات تفاعلية وحافظ على حماسك.' },
        fr: { meta_title: 'Suivi Quotidien - Surveillez vos progrès | WellTools', meta_description: 'Suivez votre poids, votre consommation d\'eau et vos calories chaque jour. Visualisez vos progrès avec des graphiques interactifs.' }
    },
    home: {
        en: {
            meta_title: 'WellTools - Free Health Calculators, Meal Plans & Wellness Tracking',
            meta_description: 'Achieve your fitness goals with our free, science-backed health calculators (BMI, TDEE, Macros), personalized meal planner, and daily progress tracking tools.'
        },
        ar: {
            meta_title: 'WellTools - حاسبات صحية مجانية، خطط وجبات وتتبع اللياقة',
            meta_description: 'حقق أهدافك الصحية مع حاسباتنا المجانية (مؤشر كتلة الجسم، السعرات، الماكروز)، ومخطط الوجبات الشخصي، وأدوات تتبع التقدم اليومي.'
        },
        fr: {
            meta_title: 'WellTools - Calculateurs de santé gratuits, plans de repas et suivi',
            meta_description: 'Atteignez vos objectifs de forme avec nos calculateurs de santé gratuits et validés par la science (IMC, TDEE, Macros), nos plans de repas et outils de suivi.'
        }
    },
    about: {
        en: {
            meta_title: 'About WellTools - Our Mission & Health Experts',
            meta_description: 'Learn about WellTools mission to provide accessible, accurate health tools. Meet our team of fitness experts and medical advisors.'
        },
        ar: {
            meta_title: 'عن WellTools - مهمتنا وخبراء الصحة',
            meta_description: 'تعرف على مهمة WellTools لتوفير أدوات صحية دقيقة وسهلة الوصول. قابل فريقنا من خبراء اللياقة والمستشارين الطبيين.'
        },
        fr: {
            meta_title: 'À propos de WellTools - Notre mission & experts santé',
            meta_description: 'Découvrez la mission de WellTools de fournir des outils de santé accessibles et précis. Rencontrez notre équipe d\'experts en fitness et conseillers médicaux.'
        }
    },
    contact: {
        en: {
            meta_title: 'Contact Us - WellTools Support',
            meta_description: 'Have questions or feedback? Contact the WellTools team for support with our calculators or meal planning tools.'
        },
        ar: {
            meta_title: 'اتصل بنا - دعم WellTools',
            meta_description: 'لديك أسئلة أو ملاحظات؟ اتصل بفريق WellTools للحصول على الدعم بخصوص حاسباتنا أو أدوات تخطيط الوجبات.'
        },
        fr: {
            meta_title: 'Contactez-nous - Support WellTools',
            meta_description: 'Des questions ou des commentaires ? Contactez l\'équipe WellTools pour obtenir de l\'aide avec nos calculateurs ou outils de planification de repas.'
        }
    },
    privacy: {
        en: { meta_title: 'Privacy Policy - WellTools', meta_description: 'Read our privacy policy to understand how we protect your personal health data.' },
        ar: { meta_title: 'سياسة الخصوصية - WellTools', meta_description: 'اقرأ سياسة الخصوصية لفهم كيف نحمي بياناتك الصحية الشخصية.' },
        fr: { meta_title: 'Politique de confidentialité - WellTools', meta_description: 'Lisez notre politique de confidentialité pour comprendre comment nous protégeons vos données de santé personnelles.' }
    },
    terms: {
        en: { meta_title: 'Terms of Service - WellTools', meta_description: 'Terms and conditions for using WellTools services.' },
        ar: { meta_title: 'شروط الخدمة - WellTools', meta_description: 'شروط وأحكام استخدام خدمات WellTools.' },
        fr: { meta_title: 'Conditions d\'utilisation - WellTools', meta_description: 'Conditions générales d\'utilisation des services WellTools.' }
    },
    disclaimer: {
        en: { meta_title: 'Medical Disclaimer - WellTools', meta_description: 'Important medical disclaimer regarding the use of our health calculators and content.' },
        ar: { meta_title: 'إخلاء المسؤولية الطبية - WellTools', meta_description: 'إخلاء مسؤولية طبي هام بخصوص استخدام حاسباتنا الصحية والمحتوى.' },
        fr: { meta_title: 'Avis de non-responsabilité médicale - WellTools', meta_description: 'Avis de non-responsabilité médicale important concernant l\'utilisation de nos calculateurs de santé et de notre contenu.' }
    },
    'how-it-works': {
        en: { meta_title: 'How It Works - Science Behind WellTools', meta_description: 'Understand the science and formulas behind our health calculators.' },
        ar: { meta_title: 'كيف يعمل - العلم وراء WellTools', meta_description: 'افهم العلم والصيغ وراء حاسباتنا الصحية.' },
        fr: { meta_title: 'Comment ça marche - La science derrière WellTools', meta_description: 'Comprenez la science et les formules derrière nos calculateurs de santé.' }
    },
    experts: {
        en: { meta_title: 'Our Experts - WellTools Medical Advisory Board', meta_description: 'Meet the certified nutritionists, doctors, and trainers who review our content.' },
        ar: { meta_title: 'خبراؤنا - المجلس الاستشاري الطبي لـ WellTools', meta_description: 'قابل خبراء التغذية والأطباء والمدربين المعتمدين الذين يراجعون محتوانا.' },
        fr: { meta_title: 'Nos experts - Conseil consultatif médical WellTools', meta_description: 'Rencontrez les nutritionnistes, médecins et entraîneurs certifiés qui examinent notre contenu.' }
    },
    blog: {
        en: { meta_title: 'Health & Fitness Blog - WellTools', meta_description: 'Latest articles on nutrition, fitness, and wellness from our experts.' },
        ar: { meta_title: 'مدونة الصحة واللياقة - WellTools', meta_description: 'أحدث المقالات حول التغذية واللياقة والعافية من خبرائنا.' },
        fr: { meta_title: 'Blog Santé & Fitness - WellTools', meta_description: 'Derniers articles sur la nutrition, le fitness et le bien-être par nos experts.' }
    }
};
