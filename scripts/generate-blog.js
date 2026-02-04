import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");
const TOPICS_PATH = path.join(__dirname, "topics.json");

// API Keys should be set in GitHub Secrets/Environment
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY ? process.env.PERPLEXITY_API_KEY.trim() : "";

if (!GEMINI_API_KEY && !PERPLEXITY_API_KEY) {
    console.error("Error: Neither GEMINI_API_KEY nor PERPLEXITY_API_KEY is set.");
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

    console.log(`🚀 Generating Multi-language Articles for: ${selectedTopic.title}`);

    const languages = [
        { code: "en", name: "English", dir: "ltr" }
    ];

    let posts = {};
    try {
        const data = await fs.readFile(POSTS_PATH, "utf-8");
        posts = JSON.parse(data);
    } catch (e) {
        posts = { en: [] };
    }

    for (const lang of languages) {
        console.log(`  📝 Generating ${lang.name} version...`);

        const prompt = `
        You are a world-class SEO expert and health content creator for "WellTools".
        Your goal is to generate a comprehensive, SEO-optimized health page in ${lang.name}.

        CORE TOPIC: "${selectedTopic.title}"
        GROUP: ${selectedTopic.group}
        LANGUAGE: ${lang.name}
        DIRECTION: ${lang.dir}

        STRICT QUALITY RULES:
        - Content must be medically neutral and informational.
        - NEVER provide a medical diagnosis or specific medical advice.
        - TONE: Professional but accessible (Simple ${lang.name}).
        - AdSense Compatibility: Content must be high-value and original.
        - NO EMOJIS.
        - Use short, readable paragraphs.

        PAGE STRUCTURE:
        1. SEO Title: Catchy and keyword-rich.
        2. Meta Description: 150-160 characters, highly clickable.
        3. H1 Heading: The primary title.
        4. Introduction: (100-150 words) hook the reader and explain the topic's importance.
        5. Main Content: (400-700 words) deep dive into ${selectedTopic.title}.
        6. List or Steps: Practical actionable information.
        7. Tips: 3-5 quick wellness tips related to the topic.
        8. FAQ: 5 frequent and high-volume questions that people actually search for or ask on health forums about this niche (Real-world search intent).
        9. Internal Links: Create a bulleted list (vertical) of 3-4 links to relevant WellTools health tools.
           STRICT URL FORMAT:
           - BMI Calculator: [BMI Calculator](/?page=bmi)
           - Calorie Counter: [Calorie Counter](/?page=calories)
           - Water Intake: [Water Tracker](/?page=water)
           - Ideal Weight: [Ideal Weight](/?page=ideal-weight)
           - Sleep Tracker: [Sleep Calculator](/?page=sleep)
           - Body Fat: [Body Fat Calculator](/?page=body-fat)
           - Tracking: [Daily Tracking](/?page=tracking)
        10. Medical Sources: List 2-4 reputable medical or scientific sources (e.g., Mayo Clinic, NIH, WHO) with actual URLs.
        11. Medical Disclaimer: Mandatory section at the end.

        OUTPUT FORMAT: Strictly valid JSON.
        {
          "title": "SEO Optimized Title",
          "category": "${selectedTopic.group}",
          "excerpt": "Meta Description",
          "image": "https://image.pollinations.ai/prompt/[professional_photo_description_in_english]?width=1200&height=800&nologo=true",
          "imageAlt": "Alt focus for SEO",
          "content": "Full content in Markdown starting from H1. Ensure clear headings and a professional layout.",
          "keywords": ["key1", "key2", "key3", "key4", "key5"],
          "faq": [{"question": "Real Search Question 1?", "answer": "Concise answer 1."}, {"question": "Real Search Question 2?", "answer": "Concise answer 2."}, {"question": "Real Search Question 3?", "answer": "Concise answer 3."}, {"question": "Real Search Question 4?", "answer": "Concise answer 4."}, {"question": "Real Search Question 5?", "answer": "Concise answer 5."}],
          "sources": [{"title": "Source 1 Name", "url": "https://source1.com"}, {"title": "Source 2 Name", "url": "https://source2.com"}]
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

            if (!text) {
                throw new Error("No content generated by any AI engine.");
            }

            // Cleanup AI response (remove markdown markers if present)
            let cleanedText = text.trim();
            if (cleanedText.includes("```json")) {
                cleanedText = cleanedText.split("```json")[1].split("```")[0].trim();
            } else if (cleanedText.includes("```")) {
                cleanedText = cleanedText.split("```")[1].split("```")[0].trim();
            }

            const newContent = JSON.parse(cleanedText);
            const postObj = {
                id: baseId, // Shared ID for sync
                ...newContent,
                date: date
            };

            if (!posts[lang.code]) posts[lang.code] = [];
            posts[lang.code].unshift(postObj);

            console.log(`    ✅ Done: ${lang.name}`);

            // Artificial delay to prevent rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
            console.error(`  ❌ Failed ${lang.name}:`, error.message);
            // If one fails, we stop to avoid partial generation
            process.exit(1);
        }
    }

    // 3. Save All Posts
    await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 4));

    // 4. Update Topics
    selectedTopic.completed = true;
    selectedTopic.completedDate = date;
    await fs.writeFile(TOPICS_PATH, JSON.stringify(topicsData, null, 4));

    console.log(`\n🎉 ALL VERSIONS SAVED SUCCESSFULLY!`);
}

generatePost();
