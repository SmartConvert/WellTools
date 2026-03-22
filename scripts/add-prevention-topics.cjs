const fs = require('fs');
const path = require('path');

const topicsPath = path.join(__dirname, '../scripts/topics.json');
const topicsData = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const newTopics = [
    { "id": 201, "group": "disease_prevention", "title": "The Impact of Chronic Stress on the Immune System: Proven Ways to Protect Yourself", "completed": false },
    { "id": 202, "group": "disease_prevention", "title": "Preventing Type 2 Diabetes: Evidence-Based Daily Habits That Make a Complete Difference", "completed": false },
    { "id": 203, "group": "disease_prevention", "title": "Cardiovascular Health: The Best Science-Backed Foods to Keep Your Heart Strong", "completed": false },
    { "id": 204, "group": "body_preservation", "title": "The Science of Antioxidants: Preventing Cellular Damage, Mutations, and Premature Aging", "completed": false },
    { "id": 205, "group": "daily_health_topics", "title": "Vitamin D Deficiency: Hidden Symptoms, Long-Term Risks, and Safe Prevention Strategies", "completed": false },
    { "id": 206, "group": "daily_health_topics", "title": "Mental Health and Nutrition: The Fascinating Neurological Link Between Your Diet and Your Mood", "completed": false },
    { "id": 207, "group": "disease_prevention", "title": "Understanding Blood Pressure: Natural, Non-Pharmaceutical Ways to Keep It in Check", "completed": false },
    { "id": 208, "group": "body_preservation", "title": "Bone Mineral Density: Preventing Osteoporosis and Fractures As You Age", "completed": false },
    { "id": 209, "group": "daily_health_topics", "title": "The Gut-Brain Axis: How Your Intestinal Microbiome Health Actively Influences Anxiety and Depression", "completed": false },
    { "id": 210, "group": "disease_prevention", "title": "The Critical Importance of Routine Medical Checkups for Early Disease Prevention", "completed": false },
    { "id": 211, "group": "disease_prevention", "title": "The Cancer Prevention Diet: What the Latest Epidemiological Research Actually Says", "completed": false },
    { "id": 212, "group": "disease_prevention", "title": "Managing High Cholesterol Levels Naturally: A Functional Medicine Approach", "completed": false },
    { "id": 213, "group": "body_preservation", "title": "Digital Eye Strain: Protecting Your Vision in a Screen-Dominated World", "completed": false },
    { "id": 214, "group": "daily_health_topics", "title": "The Hidden Dangers of Processed Seed Oils on Cellular Inflammation", "completed": false },
    { "id": 215, "group": "disease_prevention", "title": "Boosting Your Immune Response Before the Cold and Flu Season Naturally", "completed": false },
    { "id": 216, "group": "disease_prevention", "title": "Fatty Liver Disease: The Silent Epidemic and Dietary Ways to Reverse It", "completed": false },
    { "id": 217, "group": "daily_health_topics", "title": "The Truth About Caffeine: When It's Healthy and When It Sabotages Your Health", "completed": false },
    { "id": 218, "group": "disease_prevention", "title": "Thyroid Health: Identifying Warning Signs of Hypothyroidism and Hyperthyroidism", "completed": false },
    { "id": 219, "group": "daily_health_topics", "title": "The Connection Between Posture, Back Pain, and Respiratory Health", "completed": false },
    { "id": 220, "group": "body_preservation", "title": "Cognitive Decline Prevention: Brain-Training Habits and Neuroprotective Foods", "completed": false }
];

topicsData.topics.push(...newTopics);
topicsData.total_pages = topicsData.topics.length;

fs.writeFileSync(topicsPath, JSON.stringify(topicsData, null, 4));
console.log(`Successfully added 20 new diverse health and prevention topics. Total queue is now ${topicsData.topics.length} topics.`);
