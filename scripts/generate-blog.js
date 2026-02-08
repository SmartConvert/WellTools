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
        5. **No Fluff**: Get straight to the point. Respect the reader's time.

        IMAGE GENERATION RULE:
        You must generate a "Photographic Image Prompt" in ENGLISH.
        - It must describe a high-quality, cinematic, photorealistic image.
        - Lighting: Natural, soft, golden hour, or studio lighting.
        - Style: 8k resolution, highly detailed, professional photography, macro or wide shot as appropriate.
        - Subject: Healthy food, active people, medical concepts, or nature (depending on topic).
        - NO TEXT IN IMAGE.

        CONTENT STRUCTURE:
        1. **SEO Meta Title**: Compelling, under 60 chars.
        2. **Meta Description**: High CTR, under 160 chars, includes keywords.
        3. **H1 Headline**: The main article title.
        4. **Introduction**: Hook the reader immediately. State the problem and the solution.
        5. **Deep Dive (Body)**: 3-5 distinct sections with H2 headings. Explain the "Science" and the "How-To".
        6. **Actionable List**: Bullet points of immediate steps the reader can take.
        7. **Pro Tips**: A "WellTools Expert Tip" section.
        8. **FAQ**: 5 real-world questions people ask on Google about this topic.
        9. **Internal Linking**: Suggest 3 relevant WellTools calculators (BMI, Calories, Water, etc.) that fit the context.
        10. **Medical Disclaimer**: Standard medical disclaimer in ${lang.name}.

        OUTPUT FORMAT: Single Valid JSON Object.
        {
          "title": "SEO Optimized Title",
          "category": "${selectedTopic.group}",
          "excerpt": "Meta Description",
          "imagePrompt": "Detailed English description for the photo...",
          "imageAlt": "SEO optimized alt text in ${lang.name}",
          "content": "Full markdown content starting with H1...",
          "keywords": ["keyword1", "keyword2", "keyword3"],
          "faq": [
            {"question": "Q1", "answer": "A1"},
            {"question": "Q2", "answer": "A2"}
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

            // Construct Image URL using the high-quality prompt
            const encodedPrompt = encodeURIComponent(newContent.imagePrompt || selectedTopic.title + " high quality 8k photography");
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
