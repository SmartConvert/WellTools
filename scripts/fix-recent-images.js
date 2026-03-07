import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");

async function fixRecentImages() {
    try {
        const data = await fs.readFile(POSTS_PATH, "utf-8");
        const posts = JSON.parse(data);

        if (!posts.en || posts.en.length === 0) {
            console.log("No English posts found.");
            return;
        }

        console.log("Fixing images for the 5 most recent posts to bypass caching...");

        const generateSeed = () => Math.floor(Math.random() * 100000000);

        // We'll update the first 5 posts
        const numToFix = Math.min(5, posts.en.length);

        for (let i = 0; i < numToFix; i++) {
            const post = posts.en[i];
            console.log(`\nProcessing post: ${post.title}`);

            // 1. Fix Hero Image
            if (post.image && post.image.includes('pollinations.ai')) {
                const urlObj = new URL(post.image);
                // Extract the prompt path e.g. /prompt/A%20cat
                const promptPath = urlObj.pathname.replace('/prompt/', '');

                // Add a random seed to bypass cache
                const newHeroUrl = `https://image.pollinations.ai/prompt/${promptPath}?width=1200&height=630&nologo=true&seed=${generateSeed()}&model=flux`;
                post.image = newHeroUrl;
                console.log(`  ✅ Hero image updated with seed`);
            }

            // 2. Fix In-line Images
            if (post.content) {
                let updatedCount = 0;
                post.content = post.content.replace(
                    /!\[([^\]]+)\]\(https:\/\/image\.pollinations\.ai\/prompt\/([^)]+?)\)/g,
                    (match, alt, promptPart) => {
                        // Clean up existing query params if found to build fresh
                        let cleanPrompt = promptPart.split('?')[0];
                        // Ensure prompt part itself doesn't have spaces
                        cleanPrompt = cleanPrompt.replace(/ /g, '%20');
                        updatedCount++;
                        return `![${alt}](https://image.pollinations.ai/prompt/${cleanPrompt}?width=1200&height=630&nologo=true&seed=${generateSeed()}&model=flux)`;
                    }
                );
                console.log(`  ✅ ${updatedCount} in-line images updated with seed`);
            }
        }

        await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 4));
        console.log("\n🎉 Successfully updated recent posts in posts.json!");

    } catch (e) {
        console.error("Error updating posts:", e);
    }
}

fixRecentImages();
