import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, '../src/data/posts.json');

const data = JSON.parse(await fs.readFile(POSTS_PATH, 'utf-8'));
let fixedCount = 0;

for (const lang of Object.keys(data)) {
    for (const post of data[lang]) {
        if (!post.content) continue;

        const before = post.content;
        post.content = post.content.replace(
            /!\[([^\]]+)\]\((https:\/\/image\.pollinations\.ai\/prompt\/([^)]+?))\)/g,
            (match, alt, fullUrl, promptPart) => {
                // Already has query params — skip
                if (promptPart.includes('?')) return match;
                const cleanPrompt = promptPart.replace(/ /g, '%20');
                fixedCount++;
                return `![${alt}](https://image.pollinations.ai/prompt/${cleanPrompt}?width=1200&height=630&nologo=true&model=flux)`;
            }
        );

        // Also fix the hero image field if it has an overly long prompt
        if (post.image && post.image.includes('pollinations.ai')) {
            // If the URL is very long (>300 chars), try to trim the prompt part
            if (post.image.length > 350) {
                try {
                    const url = new URL(post.image);
                    const promptPath = url.pathname.replace('/prompt/', '');
                    const decodedPrompt = decodeURIComponent(promptPath);
                    const trimmedPrompt = decodedPrompt.slice(0, 150);
                    const encodedPrompt = encodeURIComponent(`${trimmedPrompt}, photorealistic, 8k, cinematic`);
                    post.image = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true&model=flux`;
                    fixedCount++;
                } catch (e) {
                    // skip if URL parsing fails
                }
            }
        }
    }
}

await fs.writeFile(POSTS_PATH, JSON.stringify(data, null, 4));
console.log(`✅ Fixed ${fixedCount} Pollinations.ai image URLs in posts.json`);
