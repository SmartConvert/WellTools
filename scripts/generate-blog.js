import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");
const TOPICS_PATH = path.join(__dirname, "topics.json");

// API Key should be set in GitHub Secrets/Environment
const API_KEY = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";

if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

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
    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`Testing model: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("hi");
            const response = await result.response;

            if (response.text()) {
                console.log(`✅ Selected working model: ${modelName}`);
                return model;
            }
        } catch (error) {
            console.warn(`❌ Model ${modelName} failed. Reason: ${error.message}`);
            const isRateLimit = error.message.includes("429") || error.message.toLowerCase().includes("too many requests");
            const waitTime = isRateLimit ? 30000 : 5000;
            console.log(`Waiting ${waitTime / 1000} seconds before next attempt...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
    throw new Error("All Gemini models failed.");
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
        { code: "en", name: "English", dir: "ltr" },
        { code: "ar", name: "Arabic", dir: "rtl" },
        { code: "fr", name: "French", dir: "ltr" }
    ];

    let posts = {};
    try {
        const data = await fs.readFile(POSTS_PATH, "utf-8");
        posts = JSON.parse(data);
    } catch (e) {
        posts = { en: [], ar: [], fr: [] };
    }

    for (const lang of languages) {
        console.log(`  📝 Generating ${lang.name} version...`);

        const prompt = `
        You are a world-class SEO expert and health content creator for "WellTools".
        Generate a professional, high-quality blog post in ${lang.name}.

        CORE TOPIC: "${selectedTopic.title}"
        GROUP: ${selectedTopic.group}
        LANGUAGE: ${lang.name}
        DIRECTION: ${lang.dir}

        SEO REQUIREMENTS:
        - Identify 5 high-traffic keywords for this topic in ${lang.name} and use them naturally throughout the text.
        - Create a compelling H1 title (Question-based or Listicle).
        - Use H2 and H3 headings for logical structure.
        - Strategic internal linking: Mention BMI Calculator, Calories Calculator, Water Intake Calculator, Ideal Weight Calculator, Sleep Hours Calculator naturally.
        - Meta Description: 150-160 characters, highly clickable.

        CONTENT RULES:
        - TONE: Professional but accessible (Simple English/Arabic/French).
        - NO MEDICAL ADVICE: Use "This content provides general health information and does not replace professional medical advice." faithfully.
        - LENGTH: 800 - 1500 words.
        - IMAGE: Use exactly this URL pattern: "https://image.pollinations.ai/prompt/[professional_photo_description_in_english]?width=1200&height=800&nologo=true"

        OUTPUT FORMAT: Strictly valid JSON only.
        {
          "title": "SEO Optimized Title",
          "category": "${selectedTopic.group}",
          "excerpt": "Compelling Meta Description",
          "image": "https://image.pollinations.ai/prompt/[english_description]?width=1200&height=800&nologo=true",
          "imageAlt": "Descriptive Alt Text",
          "content": "Full Markdown content starting with H1. Use proper H2/H3 breakdown.",
          "keywords": ["key1", "key2", "key3", "key4", "key5"],
          "faq": [{"question": "Q1?", "answer": "A1."}, {"question": "Q2?", "answer": "A2."}]
        }
        `;

        try {
            const model = await getWorkingModel(genAI);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            if (text.startsWith("```json")) {
                text = text.substring(7, text.length - 3).trim();
            } else if (text.startsWith("```")) {
                text = text.substring(3, text.length - 3).trim();
            }

            const newContent = JSON.parse(text);
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
