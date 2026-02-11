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
        const staticUrls = [
            { loc: '/', priority: '1.0', freq: 'daily' },
            { loc: '/calculators', priority: '0.8', freq: 'weekly' },
            { loc: '/tracking', priority: '0.8', freq: 'weekly' },
            { loc: '/blog', priority: '0.9', freq: 'daily' },
            { loc: '/about', priority: '0.5', freq: 'monthly' },
            { loc: '/contact', priority: '0.5', freq: 'monthly' },
            // Tools
            { loc: '/bmi', priority: '0.7', freq: 'monthly' },
            { loc: '/calories', priority: '0.7', freq: 'monthly' },
            { loc: '/water', priority: '0.7', freq: 'monthly' },
            { loc: '/ideal-weight', priority: '0.7', freq: 'monthly' },
            { loc: '/sleep', priority: '0.7', freq: 'monthly' },
            { loc: '/body-fat', priority: '0.7', freq: 'monthly' },
            { loc: '/meal-planner', priority: '0.8', freq: 'weekly' }
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

        // Add Dynamic Blog Post URLs
        // Format: /?lang=en&post=ID
        if (postsData.en) {
            postsData.en.forEach(post => {
                const postUrl = `${BASE_URL}/?post=${post.id}`;
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
