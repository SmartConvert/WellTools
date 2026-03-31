import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, '../src/data/posts.json');

async function fixImageUrls() {
    const data = JSON.parse(await fs.readFile(POSTS_PATH, 'utf-8'));
    let fixedCount = 0;
    let convertedBackCount = 0;

    function sanitizePollinationsUrl(prompt, altText) {
        // Clean and encode
        const cleanPrompt = (prompt || altText || "wellness").trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        const encodedPrompt = encodeURIComponent(cleanPrompt);
        
        // Random seed for variety
        const seed = Math.floor(Math.random() * 1000000);
        return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&nologo=true&model=flux&seed=${seed}`;
    }

    for (const lang of Object.keys(data)) {
        for (const post of data[lang]) {
            let postModified = false;

            // 1. Fix/Revert Hero Image
            if (post.image && (post.image.includes('pollinations.ai') || post.image.includes('unsplash.com'))) {
                const isUnsplash = post.image.includes('unsplash.com');
                const newUrl = sanitizePollinationsUrl(post.imageAlt || post.title, post.title);
                
                // If it was Unsplash, we definitely want to "fix" it back to AI as per user request
                if (isUnsplash || newUrl !== post.image) {
                    post.image = newUrl;
                    postModified = true;
                    if (isUnsplash) convertedBackCount++;
                    else fixedCount++;
                }
            }

            // 2. Fix/Revert Content Images
            if (post.content) {
                const before = post.content;
                
                // First, catch Unsplash images and convert to Pollinations
                post.content = post.content.replace(
                    /!\[([^\]]*)\]\((https?:\/\/images\.unsplash\.com\/[^)]+)\)/g,
                    (match, alt, url) => {
                        convertedBackCount++;
                        return `![${alt}](${sanitizePollinationsUrl(alt, post.title)})`;
                    }
                );

                // Then, standardize existing pollinations URLs
                post.content = post.content.replace(
                    /!\[([^\]]*)\]\((https?:\/\/(?:image\.)?pollinations\.ai\/[^)]+)\)/g,
                    (match, alt, url) => {
                        const newUrl = sanitizePollinationsUrl(alt, post.title);
                        if (newUrl !== url) {
                            fixedCount++;
                        }
                        return `![${alt}](${newUrl})`;
                    }
                );
                
                if (post.content !== before) postModified = true;
            }
        }
    }

    await fs.writeFile(POSTS_PATH, JSON.stringify(data, null, 4));
    console.log(`✅ Converted ${convertedBackCount} Unsplash images to Pollinations.ai`);
    console.log(`✅ Fixed/Standardized ${fixedCount} Pollinations.ai image URLs in posts.json`);
}

fixImageUrls();
