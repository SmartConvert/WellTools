import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");

// Map each post to its two inline image replacements
const inlineImageMap = [
    {
        titleKeyword: "Protein Intake Calculator",
        // image 1 (after 2nd H2) and image 2 (after 5th H2)
        inlineImages: ["/images/blog/protein-intake.png", "/images/blog/protein-intake-2.png"]
    },
    {
        titleKeyword: "Sleep Hours Calculator",
        inlineImages: ["/images/blog/sleep-hours.png", "/images/blog/sleep-hours.png"]
    },
    {
        titleKeyword: "Cortisol",
        inlineImages: ["/images/blog/cortisol-weight.png", "/images/blog/cortisol-weight.png"]
    },
    {
        titleKeyword: "Intermittent Fasting Autophagy",
        inlineImages: ["/images/blog/intermittent-fasting.png", "/images/blog/intermittent-fasting.png"]
    },
    {
        titleKeyword: "Hydration",
        inlineImages: ["/images/blog/hydration.png", "/images/blog/hydration.png"]
    },
];

// Regex to match any Pollinations image markdown (both old and new format)
const pollinationsImageRegex = /!\[([^\]]*)\]\(https?:\/\/(?:image\.)?pollinations\.ai\/(?:prompt|p)\/[^)]+\)/g;

async function fixInlineImages() {
    try {
        const data = await fs.readFile(POSTS_PATH, "utf-8");
        const posts = JSON.parse(data);

        for (const mapping of inlineImageMap) {
            const post = posts.en.find(p => p.title.includes(mapping.titleKeyword));
            if (!post) {
                console.warn(`⚠️ Post not found: "${mapping.titleKeyword}"`);
                continue;
            }

            console.log(`\nProcessing: "${post.title}"`);

            if (!post.content) {
                console.log("  No content found, skipping.");
                continue;
            }

            let imageIndex = 0;
            let replacedCount = 0;
            post.content = post.content.replace(
                pollinationsImageRegex,
                (match, alt) => {
                    const localSrc = mapping.inlineImages[imageIndex] || mapping.inlineImages[mapping.inlineImages.length - 1];
                    imageIndex++;
                    replacedCount++;
                    return `![${alt}](${localSrc})`;
                }
            );

            console.log(`  ✅ Replaced ${replacedCount} inline images with static local paths.`);
        }

        await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 4));
        console.log("\n🎉 Done! All inline Pollinations images replaced with static assets.");

    } catch (e) {
        console.error("Error:", e);
    }
}

fixInlineImages();
