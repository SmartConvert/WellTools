import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");

// Manual .env loading fallback
try {
    const envPath = path.join(__dirname, "../.env");
    const envFile = await fs.readFile(envPath, "utf-8");
    envFile.split("\n").forEach(line => {
        const [key, value] = line.split("=");
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.log("No .env file found or error reading it.");
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY ? process.env.PERPLEXITY_API_KEY.trim() : "";

// We will use generateWithPerplexity
async function generateWithPerplexity(prompt) {
    const isOpenRouter = PERPLEXITY_API_KEY.startsWith("sk-or-");
    const endpoint = isOpenRouter
        ? "https://openrouter.ai/api/v1/chat/completions"
        : "https://api.perplexity.ai/chat/completions";

    const modelName = isOpenRouter ? "perplexity/sonar" : "sonar-reasoning";

    try {
        const payload = {
            model: modelName,
            max_tokens: 6000,
            messages: [
                { role: "system", content: "You are a professional blog post generator. Output strictly JSON formatting." },
                { role: "user", content: prompt }
            ]
        };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://welltools.online",
                "X-Title": "WellTools"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}

async function updateExistingPosts() {
    let posts = {};
    try {
        const data = await fs.readFile(POSTS_PATH, "utf-8");
        posts = JSON.parse(data);
    } catch (e) {
        console.error("No posts.json found. Exiting.");
        return;
    }

    for (const lang of Object.keys(posts)) {
        for (let i = 0; i < posts[lang].length; i++) {
            const oldPost = posts[lang][i];
            
            // Check if already updated (e.g. if it has a numbered title and 2000+ words)
            const isNumberedTitle = /^\d+/.test(oldPost.title.trim()) || /\s\d+\s/.test(oldPost.title);
            const wordCount = oldPost.content ? oldPost.content.split(/\s+/).length : 0;
            const hasInfographic = oldPost.content && oldPost.content.includes("infographic");
            
            if (isNumberedTitle && wordCount >= 1800 && hasInfographic) {
                console.log(`[${lang}] Skipping post "${oldPost.title}" - already looks updated.`);
                continue;
            }

            console.log(`[${lang}] Updating post: ${oldPost.title} (${wordCount} words)`);

            const prompt = `
            You are a world-class Health & Wellness Editor for "WellTools", repairing an existing article to meet our new strict guidelines.
            Language: ${lang === 'en' ? 'English' : lang}

            Here is the old article JSON:
            ${JSON.stringify({
                title: oldPost.title,
                excerpt: oldPost.excerpt,
                imagePrompt: oldPost.imagePrompt,
                content: oldPost.content,
                keywords: oldPost.keywords || [],
                author: oldPost.author || {},
                sources: oldPost.sources || [],
                faq: oldPost.faq || []
            }, null, 2)}

            YOUR TASK: Rewrite output as a valid JSON object matching the exact structure but enhanced:
            1. **Number Title**: Ensure the "title" starts with or inherently includes a number (e.g. "7 Ways...", "5 Best..."). Keep it 50-60 chars.
            2. **Length**: Expand the "content" to be between 2000 and 3500 words by adding deep, scientifically accurate details to the existing H2 sections.
            3. **Sources**: Add real scientific sources (e.g., WHO, NIH, PubMed URLs) to the "sources" array if missing.
            4. **Image**: Change "imagePrompt" to explicitly describe REAL FOOD or REAL ACTIVITIES in action (no abstract/medical symbols).
            5. **Internal Links**: Inject at least 4-5 internal markdown links to WellTools calculators (e.g. [BMI Calculator](/bmi), [BMR Calculator](/bmr), [Sleep Calculator](/sleep), [Water Calculator](/water), [Macro Calculator](/macro)) inside the "content".
            6. **Infographics & Images**: Insert exactly 1 Infographic and 2 photographic real life images within the "content" markdown.
               - Format: ![Alt text](https://pollinations.ai/p/URL_ENCODED_ENGLISH_PROMPT?width=1200&height=630&nologo=true&model=flux)
               - Infographic Example: ![Topic Infographic](https://pollinations.ai/p/A%20clean%20minimalist%20infographic%20illustration%20about%20fitness%20metrics%20no%20text?width=800&height=1200&nologo=true&model=flux)
            7. Keep existing JSON schema (title, category, excerpt, imagePrompt, imageAlt, content, keywords, author, reviewedBy, factCheckedBy, faq, sources).

            IMPORTANT: Output ONLY valid JSON without markdown wrapping if possible.
            `;

            try {
                const text = await generateWithPerplexity(prompt);
                
                let cleanedText = text.trim();
                if (text.includes("\`\`\`json")) text = text.split("\`\`\`json")[1].split("\`\`\`")[0].trim();
                else if (text.includes("\`\`\`")) text = text.split("\`\`\`")[1].split("\`\`\`")[0].trim();

                const newContent = JSON.parse(text);

                // Fix pollinations URLs and add random seed
                const generateSeed = () => Math.floor(Math.random() * 100000000);
                if (newContent.content) {
                    newContent.content = newContent.content.replace(
                        /!\[([^\]]+)\]\(https:\/\/pollinations\.ai\/p\/([^)]+?)\)/g,
                        (match, alt, promptPart) => {
                            let cleanPrompt = promptPart.split('?')[0].replace(/ /g, '%20');
                            return `![${alt}](https://pollinations.ai/p/${cleanPrompt}?width=1200&height=630&nologo=true&seed=${generateSeed()}&model=flux)`;
                        }
                    );
                }

                // Update Hero image
                const basePrompt = newContent.imagePrompt || oldPost.title;
                const encodedPrompt = encodeURIComponent(`${basePrompt.slice(0, 150)}, photorealistic, cinematic`);
                const heroImageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1200&height=630&nologo=true&seed=${generateSeed()}&model=flux`;

                // Keep old ID and Date
                posts[lang][i] = {
                    ...oldPost,
                    ...newContent,
                    id: oldPost.id,
                    date: oldPost.date,
                    lastUpdated: new Date().toISOString().split('T')[0],
                    image: heroImageUrl
                };

                console.log(`    ✅ Success: ${posts[lang][i].title}`);
                
                // Save incrementally
                await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 4));

                // Sleep to avoid rate limit
                await new Promise(res => setTimeout(res, 5000));
            } catch (err) {
                console.error(`    ❌ Error processing ${oldPost.title}:`, err.message);
            }
        }
    }
    console.log("Finished updating posts!");
}

updateExistingPosts();
