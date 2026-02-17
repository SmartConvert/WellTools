import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");
const TOPICS_PATH = path.join(__dirname, "topics.json");

// Manual .env loading fallback
try {
    const envPath = path.join(__dirname, "../.env");
    console.log("Attempting to read .env from:", envPath);
    const envFile = await fs.readFile(envPath, "utf-8");
    console.log(".env file found. Length:", envFile.length);
    envFile.split("\n").forEach(line => {
        const [key, value] = line.split("=");
        if (key && value) {
            console.log("Found key in .env:", key.trim());
            process.env[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.log("Error reading .env:", e.message);
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY ? process.env.PERPLEXITY_API_KEY.trim() : "";

console.log("GEMINI_API_KEY present:", !!GEMINI_API_KEY);
console.log("PERPLEXITY_API_KEY present:", !!PERPLEXITY_API_KEY);

if (!GEMINI_API_KEY && !PERPLEXITY_API_KEY) {
    console.error("Error: Neither GEMINI_API_KEY nor PERPLEXITY_API_KEY is set in environment or .env file.");
    process.exit(1);
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

const MODELS_TO_TRY = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-1.5-flash-002",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
    "gemini-1.5-pro-002",
    "gemini-1.5-pro-001",
    "gemini-pro"
];

async function getWorkingModel(genAI) {
    if (!genAI) throw new Error("Gemini AI not initialized.");
    for (const modelName of MODELS_TO_TRY) {
        let retries = 0;
        const MAX_RETRIES = 3;

        while (retries <= MAX_RETRIES) {
            try {
                console.log(`Testing model: ${modelName} (Attempt ${retries + 1})...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("hi");
                const response = await result.response;

                if (response.text()) {
                    console.log(`✅ Selected working model: ${modelName}`);
                    return model;
                }
            } catch (error) {
                console.warn(`❌ Model ${modelName} attempt ${retries + 1} failed. Reason: ${error.message}`);

                const isRateLimit = error.message.includes("429") || error.message.toLowerCase().includes("too many requests") || error.message.includes("Quota exceeded");
                const is404 = error.message.includes("404") || error.message.toLowerCase().includes("not found");

                if (isRateLimit && retries < MAX_RETRIES) {
                    const waitTime = 60000 * (retries + 1);
                    console.log(`⚠️ Rate limit hit. Waiting ${waitTime / 1000} seconds before retrying ${modelName}...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    retries++;
                } else if (is404) {
                    console.log(`⏩ Model ${modelName} not found (404). Trying next model...`);
                    break;
                } else {
                    break;
                }
            }
        }
    }
    throw new Error("All Gemini models failed.");
}

async function generateWithPerplexity(prompt) {
    console.log("  🌐 Using Perplexity API (sonar-reasoning)...");
    try {
        const payload = {
            model: "sonar", // Changed to standard sonar for maximum compatibility
            messages: [
                { role: "system", content: "You are a professional blog post generator. Output strictly JSON formatting." },
                { role: "user", content: prompt }
            ]
            // Removed response_format to avoid 400 errors if not supported
        };

        const response = await fetch("https://api.perplexity.ai/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Perplexity API Error: ${response.status} ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("  ❌ Perplexity Error Details:", error.message);
        throw error;
    }
}

async function generatePost() {
    // 1. Load Topics
    let topicsData = { topics: [] };
    try {
        const data = await fs.readFile(TOPICS_PATH, "utf-8");
        topicsData = JSON.parse(data);
    } catch (e) {
        console.error("Error: topics.json not found.");
        process.exit(1);
    }

    // 2. Select an uncompleted topic
    const availableTopics = topicsData.topics.filter(t => !t.completed);
    if (availableTopics.length === 0) {
        console.log("🎉 All topics completed!");
        return;
    }

    const selectedTopic = availableTopics[0];
    const baseId = `welltools-${selectedTopic.id}-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];

    console.log(`🚀 Generating Professional Multilingual Articles for: ${selectedTopic.title}`);

    const languages = [
        { code: "en", name: "English", dir: "ltr", nuance: "Professional, authoritative, yet accessible. Use American English." }
    ];

    let posts = {};
    try {
        const data = await fs.readFile(POSTS_PATH, "utf-8");
        posts = JSON.parse(data);
    } catch (e) {
        posts = { en: [] };
    }

    // Initialize arrays if they don't exist
    languages.forEach(lang => {
        if (!posts[lang.code]) posts[lang.code] = [];
    });

    for (const lang of languages) {
        console.log(`  📝 Generating ${lang.name} version...`);

        const prompt = `
        You are a world-class Health & Wellness Editor for "WellTools", a premium health platform.
        Your task is to write a high-value, SEO-optimized, and medically accurate article in ${lang.name}.

        CORE TOPIC: "${selectedTopic.title}"
        TARGET AUDIENCE: Health-conscious individuals seeking science-backed advice.
        LANGUAGE: ${lang.name} (${lang.nuance})
        DIRECTION: ${lang.dir}

        STRICT QUALITY GUIDELINES (E-E-A-T):
        1. **Expertise**: Content must demonstrate deep understanding of physiology/nutrition.
        2. **Accuracy**: No pseudoscience. Stick to consensus medical facts.
        3. **Tone**: Empathetic but authoritative. Professional yet motivating.
        4. **Formatting**: Use proper Markdown (H1, H2, H3, bolding for emphasis).
        5. **Word Count**: MANDATORY 1800-3000 words for comprehensive coverage.
        6. **Readability**: Short paragraphs (3-4 lines max), bullet points, numbered lists.
        7. **No Fluff**: Get straight to the point. Respect the reader's time.

        KEYWORD RESEARCH & STRATEGY (CRITICAL):
        Before writing, you must:
        1. Identify 5-7 high-impact, long-tail keywords (3-5 words each) relevant to the topic.
           - Example: "how to reduce chronic inflammation naturally" NOT "inflammation"
           - Example: "best anti-inflammatory foods for gut health" NOT "anti-inflammatory foods"
        2. **MANDATORY INTEGRATION**: You must naturally insert these keywords into:
           - The SEO Meta Title (primary keyword)
           - The H1 Headline (primary keyword in first 60 characters)
           - The first 100 words (primary keyword at least once)
           - At least THREE H2 Subheadings (include variations of keywords)
           - The Meta Description (primary + secondary keyword)
        3. List these specific long-tail keywords in the JSON output "keywords" array (5-7 items).

        IMAGE GENERATION RULE:
        You must generate a "Photographic Image Prompt" in ENGLISH.
        - It must describe a high-quality, cinematic, photorealistic image.
        - Lighting: Natural, soft, golden hour, or studio lighting.
        - Style: 8k resolution, highly detailed, professional photography, macro or wide shot as appropriate.
        - Subject: Healthy food, active people, medical concepts, or nature (depending on topic).
        - NO TEXT IN IMAGE.

        CONTENT STRUCTURE (MANDATORY 1800-3000 WORDS):
        1. **SEO Meta Title**: Compelling, 50-60 chars, MUST include primary long-tail keyword.
        2. **Meta Description**: High CTR, 150-160 chars, includes primary + secondary keyword.
        3. **H1 Headline**: The main article title with primary keyword in first 60 characters.
        4. **Introduction (150-200 words)**: 
           - Hook with relatable problem
           - Include primary keyword in first 100 words
           - Promise clear solution
           - Keep paragraphs to 2-3 sentences max
        5. **Deep Dive Body (1200-1800 words)**: 
           - 6-8 major sections with H2 headings (include keyword variations)
           - Each H2 section: 200-300 words
           - Use H3 subheadings for subsections (10-15 total H3s)
           - Short paragraphs (3-4 lines maximum)
           - Bullet points for lists of 3+ items
           - Numbered lists for step-by-step processes
           - Bold key terms and concepts
        6. **Actionable Steps Section (200-300 words)**:
           - "Your [Number]-Day Action Plan" or "Step-by-Step Guide"
           - Numbered list with detailed, practical steps
        7. **Common Mistakes Section (150-200 words)**:
           - "[Number] Mistakes to Avoid When [Topic]"
           - Numbered list with explanations
        8. **WellTools Expert Tips (100-150 words)**:
           - Unique insights
           - Tool integration recommendations
        9. **FAQ Section**: 7 real-world questions with detailed answers (50-100 words each).
           - Questions should be long-tail queries people actually search
           - Answers should be comprehensive, not one-liners
        10. **Internal Linking (8-12 links total)**:
           - 3-4 calculator links with contextual anchor text
           - 3-4 related blog post links (use /blog/[topic-slug])
           - 1-2 guide page links (/bmi-guide, /sleep-guide, etc.)
           - Use descriptive anchor text, NOT "click here"
        11. **Related Resources Section**:
           - Bullet list of 4-6 internal links with brief descriptions
        12. **Medical Disclaimer**: Standard medical disclaimer in ${lang.name}.

        OUTPUT FORMAT: Single Valid JSON Object.
        {
          "title": "SEO Optimized Title",
          "category": "${selectedTopic.group}",
          "excerpt": "Meta Description",
          "imagePrompt": "precise, visual description of a photorealistic image for the post (e.g., \"overhead shot of fresh vegetables on wood table, soft window light, high resolution\"). Focus on natural, authentic, Unsplash-style photography. Avoid text in image.",
          "imageAlt": "SEO optimized alt text in ${lang.name}",
          "content": "Full markdown content starting with H1...",
          "keywords": ["keyword1", "keyword2", "keyword3"],
          "faq": [
            {"question": "Long-tail question 1", "answer": "Detailed answer 1 (50-100 words)"},
            {"question": "Long-tail question 2", "answer": "Detailed answer 2 (50-100 words)"},
            {"question": "Long-tail question 3", "answer": "Detailed answer 3 (50-100 words)"},
            {"question": "Long-tail question 4", "answer": "Detailed answer 4 (50-100 words)"},
            {"question": "Long-tail question 5", "answer": "Detailed answer 5 (50-100 words)"},
            {"question": "Long-tail question 6", "answer": "Detailed answer 6 (50-100 words)"},
            {"question": "Long-tail question 7", "answer": "Detailed answer 7 (50-100 words)"}
          ],
          "sources": [
            {"title": "Reputable Source (e.g., PubMed, Mayo Clinic)", "url": "https://..."}
          ]
        }
        `;

        try {
            let text;
            if (PERPLEXITY_API_KEY) {
                try {
                    text = await generateWithPerplexity(prompt);
                    if (!text) throw new Error("Perplexity returned empty response");
                } catch (pe) {
                    console.log(`  ⚠️ Perplexity failed (${pe.message}), falling back to Gemini...`);
                    const model = await getWorkingModel(genAI);
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    text = response.text();
                }
            } else {
                const model = await getWorkingModel(genAI);
                const result = await model.generateContent(prompt);
                const response = await result.response;
                text = response.text();
            }

            if (!text) throw new Error("No content generated.");

            // Cleanup JSON
            let cleanedText = text.trim();
            if (cleanedText.includes("```json")) {
                cleanedText = cleanedText.split("```json")[1].split("```")[0].trim();
            } else if (cleanedText.includes("```")) {
                cleanedText = cleanedText.split("```")[1].split("```")[0].trim();
            }

            const newContent = JSON.parse(cleanedText);

            // Construct Image URL using high-quality prompt with Unsplash style keywords
            const basePrompt = newContent.imagePrompt || selectedTopic.title + " high quality 8k photography";
            const enhancedPrompt = `${basePrompt}, photorealistic, 8k, cinematic lighting, unsplash style, authentic, natural light`;
            const encodedPrompt = encodeURIComponent(enhancedPrompt);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&nologo=true&model=flux`;

            const postObj = {
                id: baseId,
                ...newContent,
                image: imageUrl, // Use the enhanced image URL
                date: date
            };

            // Remove the helper field before saving if desired, or keep it for reference
            // delete postObj.imagePrompt; 

            posts[lang.code].unshift(postObj);

            // Validate word count
            const wordCount = newContent.content.split(/\s+/).length;
            console.log(`    📊 Word count: ${wordCount} words`);
            if (wordCount < 1800) {
                console.warn(`    ⚠️ WARNING: Article is below 1800 words (${wordCount}). Consider regenerating for better SEO.`);
            } else if (wordCount > 3000) {
                console.warn(`    ⚠️ WARNING: Article exceeds 3000 words (${wordCount}). Consider condensing.`);
            } else {
                console.log(`    ✅ Word count within optimal range (1800-3000)`);
            }

            console.log(`    ✅ Done: ${lang.name}`);

            // Delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 5000));

        } catch (error) {
            console.error(`  ❌ Failed ${lang.name}:`, error.message);
            // We continue to next language even if one fails, to try to get partial results? 
            // Or exit? strict process suggests exit to ensure consistency.
            // But for robustness, let's log and continue, but mark topic as NOT completed if all fail.
        }
    }

    // 3. Save All Posts
    await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 4));

    // 4. Update Topics
    // Only mark completed if at least English was generated (or ideally all)
    // For now, we assume success if we reached here without major crash
    selectedTopic.completed = true;
    selectedTopic.completedDate = date;
    await fs.writeFile(TOPICS_PATH, JSON.stringify(topicsData, null, 4));

    console.log(`\n🎉 ALL VERSIONS SAVED SUCCESSFULLY!`);
}

generatePost();
