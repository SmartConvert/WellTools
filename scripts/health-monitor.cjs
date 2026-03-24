const fs = require('fs');
const path = require('path');

const COLORS = {
    reset: '\\x1b[0m',
    red: '\\x1b[31m',
    green: '\\x1b[32m',
    yellow: '\\x1b[33m',
    blue: '\\x1b[34m',
    cyan: '\\x1b[36m',
    bold: '\\x1b[1m'
};

const LOG = {
    info: (msg) => console.log(`${COLORS.cyan}[INFO]${COLORS.reset} ${msg}`),
    success: (msg) => console.log(`${COLORS.green}[OK]${COLORS.reset}   ${COLORS.bold}${msg}${COLORS.reset}`),
    warn: (msg) => console.log(`${COLORS.yellow}[WARN]${COLORS.reset} ${msg}`),
    error: (msg) => console.log(`${COLORS.red}[FAIL]${COLORS.reset} ${msg}`)
};

let errors = 0;
let warnings = 0;

// Gather all valid paths
const VALID_EXACT_ROUTES = new Set([
    '/', '/blog', '/meal-planner', '/about', '/contact', 
    '/privacy-policy', '/terms', '/editorial-policy',
    '/bmi', '/calories', '/water', '/ideal-weight', 
    '/sleep', '/body-fat', '/bmr', '/macro', '/1rm', '/fasting',
    // Old paths that are redirected
    '/calories-calculator', '/water-intake-calculator', '/sleep-calculator-and-sleep-cycles',
    '/ideal-weight-calculator-healthy-weight', '/body-fat-percentage-calculator-navy-method',
    '/bmr-calculator-basal-metabolic-rate', '/macro-calculator-macros-for-weight-loss',
    '/1rm-one-rep-max-calculator', '/intermittent-fasting-calculator'
]);

function checkBlogPosts() {
    LOG.info('Scanning posts.json for data integrity...');
    const postsPath = path.join(__dirname, '../src/data/posts.json');
    
    if (!fs.existsSync(postsPath)) {
        LOG.error('posts.json not found!');
        errors++;
        return;
    }

    let data;
    try {
        data = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
        LOG.success('posts.json parses successfully.');
    } catch (e) {
        LOG.error(`posts.json is corrupted: ${e.message}`);
        errors++;
        return;
    }

    const enPosts = data.en || [];
    LOG.info(`Found ${enPosts.length} published articles.`);

    enPosts.forEach((post, index) => {
        // Core Fields
        if (!post.id || !post.title || !post.content) {
            LOG.error(`Post at index ${index} is missing id, title, or content.`);
            errors++;
        }

        // URL Registration
        if (post.id) {
            VALID_EXACT_ROUTES.add(`/blog/${post.id}`);
        }

        // Content Length (SEO Audit)
        const wordCount = (post.content || '').split(/\s+/).length;
        if (wordCount < 1000) {
            LOG.warn(`Post '${post.title}' has very low word count (${wordCount} words). Minimum recommended is 1500.`);
            warnings++;
        }

        // Image Validation
        if (post.image && !post.image.startsWith('http')) {
            LOG.error(`Post '${post.title}' has an invalid hero image URL: ${post.image}`);
            errors++;
        }
        
        // AI hallucinations artifact check
        if ((post.content || '').includes('pollinations.ai')) {
            LOG.error(`Post '${post.title}' still contains an AI generated pollinations URL!`);
            errors++;
        }
    });
}

function checkInternalLinks() {
    LOG.info('Scanning markdown content for broken internal links...');
    const postsPath = path.join(__dirname, '../src/data/posts.json');
    if (!fs.existsSync(postsPath)) return;
    
    const data = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
    const enPosts = data.en || [];
    
    // Regex matches Markdown links: [Text](/some-path)
    const linkRegex = new RegExp('\\[([^\\]]+)\\]\\(([^)]+)\\)', 'g');

    enPosts.forEach(post => {
        if (!post.content) return;
        
        let match;
        while ((match = linkRegex.exec(post.content)) !== null) {
            let url = match[2]; // match[2] is the URL, match[1] is the alt text
            
            // Remove hash fragments
            url = url.split('#')[0];
            
            // Ignore external and mailto links
            if (url.startsWith('http') || url.startsWith('mailto:')) continue;
            
            // Ignore static assets
            if (['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif'].some(ext => url.toLowerCase().endsWith(ext))) continue;
            
            // Clean up missing leading slash for relative links if necessary
            if (!url.startsWith('/')) url = '/' + url;
            
            if (!VALID_EXACT_ROUTES.has(url)) {
                LOG.error(`Broken Link Found in Post '${post.id}': Points to '${url}' which does not exist.`);
                errors++;
            }
        }
    });

    LOG.success('Internal links validation completed.');
}

function checkRequiredFiles() {
    LOG.info('Auditing Core Tools & System Files...');
    const filesToCheck = [
        '../public/ads.txt',
        '../public/_redirects',
        '../index.html',
        '../src/App.jsx',
        '../src/data/seoContent.js',
        '../src/components/HomePage.jsx',
        '../src/components/BlogPostPage.jsx'
    ];

    filesToCheck.forEach(relativePath => {
        const fullPath = path.join(__dirname, relativePath);
        if (!fs.existsSync(fullPath)) {
            LOG.error(`CRITICAL SYSTEM FILE MISSING: ${relativePath}`);
            errors++;
        }
    });
    LOG.success('Core files and AdSense manifests are present.');
}

// RUN ALL TASKS
console.log(`\\n${COLORS.cyan}${COLORS.bold}=========================================${COLORS.reset}`);
console.log(`${COLORS.cyan}${COLORS.bold}   WELLTOOLS HEALTH MONITOR & AUDITOR    ${COLORS.reset}`);
console.log(`${COLORS.cyan}${COLORS.bold}=========================================${COLORS.reset}\\n`);

checkRequiredFiles();
checkBlogPosts();
checkInternalLinks();

console.log(`\\n${COLORS.cyan}${COLORS.bold}=========================================${COLORS.reset}`);
console.log(`Auditor Finished.`);
console.log(`Errors Found: ${errors > 0 ? COLORS.red : COLORS.green}${errors}${COLORS.reset}`);
console.log(`Warnings Found: ${warnings > 0 ? COLORS.yellow : COLORS.green}${warnings}${COLORS.reset}`);

if (errors > 0) {
    console.log(`\\n${COLORS.red}❌ AUDIT FAILED: Please fix the errors above before deploying.${COLORS.reset}\\n`);
    process.exit(1);
} else {
    console.log(`\\n${COLORS.green}✅ SYSTEM HEALTHY: Zero critical defects found. Safe to deploy.${COLORS.reset}\\n`);
    process.exit(0);
}
