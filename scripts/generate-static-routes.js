import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexFile = path.join(distDir, 'index.html');

const POSTS_FILE = path.resolve(__dirname, '../src/data/posts.json');

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
    'editorial-policy',
    'ai-body-metrics-and-workout-advisor',
    'food-scanner',
    'cookie-policy'
];

const generateSlug = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/[^\w\u0621-\u064A\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

async function generateStaticRoutes() {
    console.log('🔄 Generating static route folders for Cloudflare Pages...');

    if (!fs.existsSync(indexFile)) {
        console.error('❌ Error: dist/index.html not found. Run Vite build first.');
        process.exit(1);
    }

    const indexContent = fs.readFileSync(indexFile, 'utf8');

    // 1. Process Static Routes
    for (const route of routes) {
        const routeDir = path.join(distDir, route);
        if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
        }
        fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent);
        console.log(`✅ Created ${route}/index.html`);
    }

    // 2. Process Dynamic Blog Routes
    if (fs.existsSync(POSTS_FILE)) {
        const postsData = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
        const allPosts = postsData.en || [];

        console.log(`📝 Processing ${allPosts.length} blog posts...`);

        for (const post of allPosts) {
            const slug = generateSlug(post.title);
            if (!slug) continue;

            const blogRoute = `blog/${slug}`;
            const legacyRoute = slug;

            // Create /blog/[slug]/index.html
            const blogDir = path.join(distDir, blogRoute);
            if (!fs.existsSync(blogDir)) {
                fs.mkdirSync(blogDir, { recursive: true });
            }
            fs.writeFileSync(path.join(blogDir, 'index.html'), indexContent);

            // Create /[slug]/index.html (Legacy Support)
            const legacyDir = path.join(distDir, legacyRoute);
            if (!fs.existsSync(legacyDir)) {
                fs.mkdirSync(legacyDir, { recursive: true });
            }
            fs.writeFileSync(path.join(legacyDir, 'index.html'), indexContent);

            console.log(`✅ Created routes for: ${slug}`);
        }
    }

    console.log('🎉 Static routes generation complete!');
}

generateStaticRoutes();
