import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexFile = path.join(distDir, 'index.html');

// List of all valid SEO routes manually defined in App.jsx
const routes = [
    'bmi-calculator-for-women-and-men',
    'bmichart-and-bmi-categories-guide',
    'daily-calorie-calculator-for-weight-loss',
    'daily-water-intake-calculator-by-weight',
    'sleep-calculator-and-sleep-cycles',
    'sleep-hygiene-and-circadian-rhythm-guide',
    'ideal-weight-calculator-for-men-and-women',
    'precise-body-fat-percentage-calculator',
    'body-fat-percentage-chart-and-health-guide',
    'bmr-calculator-mifflin-st-jeor',
    'macro-calculator-for-muscle-gain-and-fat-loss',
    'one-rep-max-calculator-for-weightlifting',
    'custom-meal-planner-and-nutrition-guide',
    'intermittent-fasting-schedule-calculator',
    'blog-health-and-fitness-tips',
    'daily-health-and-weight-tracker',
    'about-welltools-scientific-health-calculators',
    'science-behind-our-health-calculators',
    'our-medical-and-fitness-experts',
    'contact-welltools-support-and-feedback',
    'privacy-policy',
    'terms-of-use',
    'medical-disclaimer',
    'editorial-policy'
];

async function generateStaticRoutes() {
    console.log('🔄 Generating static route folders for Cloudflare Pages...');

    if (!fs.existsSync(indexFile)) {
        console.error('❌ Error: dist/index.html not found. Run Vite build first.');
        process.exit(1);
    }

    const indexContent = fs.readFileSync(indexFile, 'utf8');

    for (const route of routes) {
        const routeDir = path.join(distDir, route);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
        }

        // Write a copy of index.html inside the directory
        // This allows Cloudflare to serve /fasting-calculator/index.html natively
        // The SPA JavaScript will then hydrate and render the correct component based on the URL path.
        const routeIndexFile = path.join(routeDir, 'index.html');
        fs.writeFileSync(routeIndexFile, indexContent);
        console.log(`✅ Created ${route}/index.html`);
    }

    console.log('🎉 Static routes generation complete!');
}

generateStaticRoutes();
