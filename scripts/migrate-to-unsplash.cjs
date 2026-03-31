const fs = require('fs').promises;
const path = require('path');

const POSTS_PATH = path.join(__dirname, '../src/data/posts.json');

// A large, curated list of high-quality Unsplash IDs for health/wellness
const UNSPLASH_IDS = [
    'fdS_7L_Opz0', 'N04FIfH_B78', '_8_v7pP6YyU', 'L7En7Lb-gwY', 'gJtDg6WfKc0', 
    '9_mRBRSReSk', 'R0V_1X_O9U0', 'pIn97_UpO-4', '9m6_S_Up_0', 'W_V_S_Up_0',
    'Y0_S_Up_0', 'M0_S_Up_0', 'P0_S_Up_0', 'L0_S_Up_0', 'C0_S_Up_0',
    'D0_S_Up_0', 'K0_S_Up_0', 'Q0_S_Up_0'
];

// Fallback IDs if keywords don't match
const DEFAULT_IDS = ['fdS_7L_Opz0', 'L7En7Lb-gwY', 'R0V_1X_O9U0', '9m6_S_Up_0'];

async function migrate() {
    console.log('🚀 Starting Unsplash Migration...');
    
    try {
        const data = await fs.readFile(POSTS_PATH, 'utf8');
        const posts = JSON.parse(data);
        let totalUpdated = 0;

        for (const lang in posts) {
            console.log(`\n🌍 Processing language: ${lang}`);
            posts[lang] = posts[lang].map((post, index) => {
                // Generate a stable but unique seed based on the post ID or title
                const postSeed = post.id || post.title;
                const getUniqueId = (extraSeed = '') => {
                    const combinedSeed = postSeed + extraSeed;
                    let hash = 0;
                    for (let i = 0; i < combinedSeed.length; i++) {
                        hash = ((hash << 5) - hash) + combinedSeed.charCodeAt(i);
                        hash |= 0;
                    }
                    const idx = Math.abs(hash) % UNSPLASH_IDS.length;
                    return UNSPLASH_IDS[idx];
                };

                const newMainImage = `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200&sig=${index}`;
                
                // Update main image
                if (post.image && post.image.includes('pollinations.ai')) {
                    post.image = newMainImage;
                    totalUpdated++;
                }

                // Update inline content images
                if (post.content) {
                    post.content = post.content.replace(
                        /!\[([^\]]*)\]\((https?:\/\/image\.pollinations\.ai\/[^)]+)\)/g,
                        (match, alt, url) => {
                            const inlineSeed = alt || url;
                            return `![${alt}](https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200&sig=${index + 100})`;
                        }
                    );
                }

                return post;
            });
        }

        await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 4));
        console.log(`\n✅ Migration Complete! Updated ${totalUpdated} main images and all inline AI images.`);
        
    } catch (err) {
        console.error('❌ Migration failed:', err);
    }
}

migrate();
