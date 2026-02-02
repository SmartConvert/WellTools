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
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest"
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
        console.error("Error: topics.json not found. Run initialize-topics.js first.");
        process.exit(1);
    }

    // 2. Select an uncompleted topic
    const availableTopics = topicsData.topics.filter(t => !t.completed);
    if (availableTopics.length === 0) {
        console.log("🎉 All 30 topics completed! Nothing to generate.");
        return;
    }

    const selectedTopic = availableTopics[0]; // Take the first one (following the plan's priority)
    console.log(`🚀 Generating Article for: ${selectedTopic.title} (${selectedTopic.group})`);

    const prompt = `
    Generate a high-quality, professional health blog post for "WellTools".
    
    PRIMARY GOAL: 
    Generate an SEO-friendly page focused on: "${selectedTopic.title}". 
    Group: ${selectedTopic.group}.

    GLOBAL RULES:
    - LANGUAGE: English.
    - TONE: Simple, friendly, and non-medical.
    - NO DIAGNOSIS/TREATMENT: Strictly avoid diagnosing, treating, or suggesting medication.
    - MANDATORY NOTICE: End the post with this exact disclaimer: "This content provides general health information and does not replace professional medical advice."
    - READABILITY: Use Basic English (A2–B1) for high accessibility.
    - WORD COUNT: Target 700 - 1500 words of original explanation.
    
    PAGE STRUCTURE:
    1. H1 title (SEO-optimized and question-based).
    2. Short introduction (Explain the tool/topic purpose in simple words).
    3. Main content sections with H2 headings (Explanation, How to apply, Benefits for daily life).
    4. Practical tips (H2).
    5. Common mistakes (H2).
    6. Internal links suggestion (Naturally mention: BMI Calculator, Calories Calculator, Water Intake Calculator, Ideal Weight Calculator, Sleep Hours Calculator).
    7. Medical disclaimer (at the bottom).

    MONETIZATION:
    - Content must be AdSense friendly (clean, valuable, original).
    - Leave visual space for 2-3 ads.

    OUTPUT FORMAT: Must be valid JSON
    {
      "id": "slug-id",
      "title": "SEO Title",
      "category": "${selectedTopic.group}",
      "excerpt": "Short meta description",
      "image": "https://image.pollinations.ai/prompt/[professional_photo_description]?width=1200&height=800&nologo=true",
      "imageAlt": "Alt text",
      "content": "Full Markdown article starting with H1",
      "keywords": ["key1", "key2"],
      "sources": ["Source (URL)"],
      "faq": [{"question": "", "answer": ""}]
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

        const newPost = JSON.parse(text);
        newPost.date = new Date().toISOString().split('T')[0];
        newPost.id = `welltools-${selectedTopic.id}-${Date.now()}`;

        // 3. Save Post
        let posts = {};
        try {
            const data = await fs.readFile(POSTS_PATH, "utf-8");
            posts = JSON.parse(data);
        } catch (e) { }

        if (!posts.en) posts.en = [];
        posts.en.unshift(newPost);
        await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 4));

        // 4. Update topics.json
        selectedTopic.completed = true;
        selectedTopic.completedDate = newPost.date;
        await fs.writeFile(TOPICS_PATH, JSON.stringify(topicsData, null, 4));

        console.log(`✅ Successfully generated: ${newPost.title}`);
    } catch (error) {
        console.error("❌ Generation failed:", error);
        process.exit(1);
    }
}

generatePost();
