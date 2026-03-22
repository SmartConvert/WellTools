const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
let c = fs.readFileSync(postsPath, 'utf8');

const replacements = {
    '/?page=bmi': '/bmi',
    '/?page=calories': '/calories',
    '/?page=sleep': '/sleep',
    '/?page=water': '/water',
    '/?page=ideal-weight': '/ideal-weight',
    '/?page=body-fat': '/body-fat',
    '/?page=bmr': '/bmr',
    '/?page=macro': '/macro',
    '/target-heart-rate': '/calories',
    '/daily-water-intake-calculator-by-weight': '/water',
    '/daily-calorie-calculator-for-weight-loss': '/calories',
    '/bmi-calculator-for-women-and-men': '/bmi',
    '/precise-body-fat-percentage-calculator': '/body-fat',
    '/ideal-weight-calculator-for-men-and-women': '/ideal-weight',
    '/protein-intake-calculator-for-weight-loss-and-muscle-gain': '/macro',
    '/tools/menstrual-cycle-tracker': '/blog',
    '/tools/sleep-calculator': '/sleep',
    '/tools/testosterone-calculator': '/blog',
    '/tools/symptom-tracker': '/blog',
    '/tools/hormone-quiz': '/blog',
    '/tools/nutrition-planner': '/meal-planner'
};

for (const [bad, good] of Object.entries(replacements)) {
    c = c.split(bad).join(good);
}

fs.writeFileSync(postsPath, c, 'utf8');
console.log('Successfully patched all broken links using exact string replacement.');
