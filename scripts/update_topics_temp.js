const fs = require('fs');
const path = require('path');

const topicsPath = path.join('d:\\BADISS\\WellTools\\scripts', 'topics.json');
const data = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

data.publishing_rate = '1 page per week';

const newTopics = [
    {
        "id": 1001,
        "group": "Series 1",
        "title": "The Ultimate Guide to Calorie Deficit: Why You're Not Losing Weight Even Though You Work Out.",
        "completed": false,
        "requiredCalculator": "AI Food Scanner",
        "tone": "Medical-grade, highly original, professional, and authoritative."
    },
    {
        "id": 1002,
        "group": "Series 1",
        "title": "Protein, Carbs, and Fats Explained: How to Calculate Your Perfect Macro Split.",
        "completed": false,
        "requiredCalculator": "Macro Calculator",
        "tone": "Medical-grade, highly original, professional, and authoritative."
    },
    {
        "id": 1003,
        "group": "Series 1",
        "title": "Is Your BMI Lying to You? The Difference Between Losing Weight and Losing Fat.",
        "completed": false,
        "requiredCalculator": "BMI Calculator",
        "tone": "Medical-grade, highly original, professional, and authoritative."
    },
    {
        "id": 1004,
        "group": "Series 2",
        "title": "The Hidden Reason You're Always Tired: How to Calculate Your Exact Sleep Cycles.",
        "completed": false,
        "requiredCalculator": "Sleep Cycle Calculator",
        "tone": "Medical-grade, highly original, professional, and authoritative."
    },
    {
        "id": 1005,
        "group": "Series 2",
        "title": "Does Drinking More Water Actually Help You Lose Weight? The Science Explained.",
        "completed": false,
        "requiredCalculator": "Water Intake Calculator",
        "tone": "Medical-grade, highly original, professional, and authoritative."
    }
];

data.topics.unshift(...newTopics);

fs.writeFileSync(topicsPath, JSON.stringify(data, null, 4));
console.log('Topics updated successfully.');
