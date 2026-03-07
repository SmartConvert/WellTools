import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");

// Map of post title keywords -> new local static image path
const imageMappings = [
    { titleKeyword: "Protein Intake Calculator", newImage: "/images/blog/protein-intake.png" },
    { titleKeyword: "Sleep Hours Calculator", newImage: "/images/blog/sleep-hours.png" },
    { titleKeyword: "Cortisol", newImage: "/images/blog/cortisol-weight.png" },
    { titleKeyword: "Intermittent Fasting Autophagy", newImage: "/images/blog/intermittent-fasting.png" },
    { titleKeyword: "Hydration", newImage: "/images/blog/hydration.png" },
];

async function applyStaticImages() {
    try {
        const data = await fs.readFile(POSTS_PATH, "utf-8");
        const posts = JSON.parse(data);

        if (!posts.en || posts.en.length === 0) {
            console.log("No English posts found.");
            return;
        }

        let updatedCount = 0;
        for (const mapping of imageMappings) {
            const post = posts.en.find(p => p.title.includes(mapping.titleKeyword));
            if (post) {
                console.log(`✅ Updating image for: "${post.title}"`);
                console.log(`   Old: ${post.image ? post.image.substring(0, 80) + '...' : 'none'}`);
                post.image = mapping.newImage;
                console.log(`   New: ${post.image}`);
                updatedCount++;
            } else {
                console.warn(`⚠️ Post not found for keyword: "${mapping.titleKeyword}"`);
            }
        }

        await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 4));
        console.log(`\n🎉 Updated ${updatedCount} posts with static images!`);

    } catch (e) {
        console.error("Error:", e);
    }
}

applyStaticImages();
