const fs = require('fs');
const path = require('path');

const topicsPath = path.join(__dirname, '../scripts/topics.json');
const topicsData = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const newTopics = [
    {
        "id": 101,
        "group": "daily_health_topics",
        "title": "The Science of Muscle Hypertrophy: How to Build Muscle Naturally",
        "completed": false
    },
    {
        "id": 102,
        "group": "daily_health_topics",
        "title": "Understanding Glycemic Index: Foods that Spike Your Blood Sugar",
        "completed": false
    },
    {
        "id": 103,
        "group": "daily_health_topics",
        "title": "The Truth About Detox Diets: Do You Really Need to Cleanse?",
        "completed": false
    },
    {
        "id": 104,
        "group": "daily_health_topics",
        "title": "HIIT vs. Steady State Cardio: Which Burns More Fat?",
        "completed": false
    },
    {
        "id": 105,
        "group": "daily_health_topics",
        "title": "Electrolytes Explained: Why Drinking Just Water Isn't Enough",
        "completed": false
    },
    {
        "id": 106,
        "group": "daily_health_topics",
        "title": "The Crucial Role of Dietary Fiber in Weight Loss and Gut Health",
        "completed": false
    },
    {
        "id": 107,
        "group": "daily_health_topics",
        "title": "How Does Alcohol Consumption Affect Muscle Growth and Fat Loss?",
        "completed": false
    },
    {
        "id": 108,
        "group": "daily_health_topics",
        "title": "Plant-Based Protein vs. Animal Protein: A Scientific Comparison",
        "completed": false
    },
    {
        "id": 109,
        "group": "daily_health_topics",
        "title": "The Direct Connection Between Sleep Deprivation and Weight Gain",
        "completed": false
    },
    {
        "id": 110,
        "group": "daily_health_topics",
        "title": "Metabolic Adaptation: How to Overcome a Stubborn Weight Loss Plateau",
        "completed": false
    }
];

topicsData.topics.push(...newTopics);
topicsData.total_pages = topicsData.topics.length;

fs.writeFileSync(topicsPath, JSON.stringify(topicsData, null, 4));
console.log(`Successfully added 10 new topics. Total topics is now ${topicsData.topics.length}`);
