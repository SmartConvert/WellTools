import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");
const SITEMAP_PATH = path.join(__dirname, "../public/sitemap.xml");
const BASE_URL = "https://welltools.online";

async function updateSitemap() {
    try {
        console.log("🔄 Updating sitemap with latest posts...");

        // 1. Read Posts
        const postsData = JSON.parse(await fs.readFile(POSTS_PATH, 'utf-8'));

        // 2. Read Base Sitemap Template 
        // We will reconstruct it to ensure clean state, keeping the static pages
        const PAGE_SLUGS = {
          'bmi': 'bmi-calculator-for-women-and-men',
          'bmi-guide': 'bmichart-and-bmi-categories-guide',
          'calories': 'daily-calorie-calculator-for-weight-loss',
          'water': 'daily-water-intake-calculator-by-weight',
          'sleep': 'sleep-calculator-and-sleep-cycles',
          'sleep-guide': 'sleep-hygiene-and-circadian-rhythm-guide',
          'ideal-weight': 'ideal-weight-calculator-for-men-and-women',
          'body-fat': 'precise-body-fat-percentage-calculator',
          'body-fat-guide': 'body-fat-percentage-chart-and-health-guide',
          'bmr': 'bmr-calculator-mifflin-st-jeor',
          'macro': 'macro-calculator-for-muscle-gain-and-fat-loss',
          'food-scanner': 'food-scanner',
          '1rm': 'one-rep-max-calculator-for-weightlifting',
          'meal-planner': 'custom-meal-planner-and-nutrition-guide',
          'blog': 'blog-health-and-fitness-tips',
          'tracking': 'daily-health-and-weight-tracker',
          'about': 'about-welltools-scientific-health-calculators',
          'how-it-works': 'science-behind-our-health-calculators',
          'experts': 'our-medical-and-fitness-experts',
          'contact': 'contact-welltools-support-and-feedback',
          'privacy': 'privacy-policy',
          'terms': 'terms-of-use',
          'disclaimer': 'medical-disclaimer',
          'editorial-policy': 'editorial-policy',
          'fasting': 'intermittent-fasting-schedule-calculator',
          'cookie-policy': 'cookie-policy'
        };

        const staticUrls = [
            { loc: '/', priority: '1.0', freq: 'daily' },
            { loc: `/${PAGE_SLUGS['tracking']}`, priority: '0.8', freq: 'weekly' },
            { loc: `/${PAGE_SLUGS['blog']}`, priority: '0.9', freq: 'daily' },
            { loc: `/${PAGE_SLUGS['about']}`, priority: '0.5', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['how-it-works']}`, priority: '0.5', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['experts']}`, priority: '0.5', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['contact']}`, priority: '0.5', freq: 'monthly' },
            // Tools
            { loc: `/${PAGE_SLUGS['bmi']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['calories']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['water']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['ideal-weight']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['sleep']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['body-fat']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['bmr']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['macro']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['food-scanner']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['1rm']}`, priority: '0.7', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['meal-planner']}`, priority: '0.8', freq: 'weekly' },
            { loc: `/${PAGE_SLUGS['fasting']}`, priority: '0.7', freq: 'monthly' },
            // Pillar Guides
            { loc: `/${PAGE_SLUGS['body-fat-guide']}`, priority: '0.9', freq: 'weekly' },
            { loc: `/${PAGE_SLUGS['bmi-guide']}`, priority: '0.9', freq: 'weekly' },
            { loc: `/${PAGE_SLUGS['sleep-guide']}`, priority: '0.9', freq: 'weekly' },
            // Legal
            { loc: `/${PAGE_SLUGS['privacy']}`, priority: '0.3', freq: 'yearly' },
            { loc: `/${PAGE_SLUGS['terms']}`, priority: '0.3', freq: 'yearly' },
            { loc: `/${PAGE_SLUGS['disclaimer']}`, priority: '0.3', freq: 'yearly' },
            { loc: `/${PAGE_SLUGS['editorial-policy']}`, priority: '0.3', freq: 'monthly' },
            { loc: `/${PAGE_SLUGS['cookie-policy']}`, priority: '0.3', freq: 'yearly' }
        ];

        let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

        // Add Static URLs
        staticUrls.forEach(url => {
            sitemapContent += `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <changefreq>${url.freq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`;
        });

        const generateSlug = (text) => {
            if (!text) return '';
            return text
                .toLowerCase()
                .replace(/[^\w\u0621-\u064A\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        };

        // Add Dynamic Blog Post URLs
        // Format: /blog/slug
        if (postsData.en) {
            postsData.en.forEach(post => {
                const slug = generateSlug(post.title);
                const postUrl = `${BASE_URL}/blog/${slug}`;
                sitemapContent += `  <url>
    <loc>${postUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
            });
        }

        sitemapContent += `</urlset>`;

        await fs.writeFile(SITEMAP_PATH, sitemapContent);
        console.log("✅ Sitemap updated successfully!");

    } catch (error) {
        console.error("❌ Sitemap update failed:", error);
        process.exit(1);
    }
}

updateSitemap();
