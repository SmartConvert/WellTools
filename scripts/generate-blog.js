import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");

// API Key should be set in GitHub Secrets/Environment
const API_KEY = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";

if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// List of models discovered in logs, prioritizing 'lite' versions for better quota availability
const MODELS_TO_TRY = [
    "gemini-2.0-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-1.5-flash",
    "gemini-2.0-flash"
];

async function getWorkingModel(genAI) {
    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`Testing model: ${modelName}...`);
            // Explicitly try to get model
            const model = genAI.getGenerativeModel({ model: modelName });

            // Minimal test prompt
            const result = await model.generateContent("hi");
            const response = await result.response;

            if (response.text()) {
                console.log(`✅ Selected working model: ${modelName}`);
                return model;
            }
        } catch (error) {
            console.warn(`❌ Model ${modelName} failed. Reason: ${error.message}`);
            // Wait 2 seconds before trying next model to avoid hitting rate limits too fast
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    throw new Error("No suitable Gemini model found. You might have exceeded ALL your quotas for today. Please wait a while or check Google AI Studio.");
}

const categories = ["Nutrition", "Fitness", "Mental Health", "Sleep", "Longevity", "Biohacking"];

async function generatePost() {
    const category = categories[Math.floor(Math.random() * categories.length)];

    const prompt = `
    Generate a high-quality, professional, and comprehensive health blog post for a website called "Daily Health Tools".
    The topic should be related to: ${category}.
    
    CRITICAL PROJECT RULES (FROM CONFIG):
    - CORE CONCEPT: Providing simple health calculators and daily meal suggestions without medical diagnosis or treatment.
    - SOLVE PROBLEMS: Focus on solving daily user queries like "How much water?" or "What should I eat to lose weight?".
    - ONE TOPIC: Strictly one specific subject per article.
    - TONE: Simple, friendly, and non-medical.
    - CONTENT LENGTH: 1200+ words of deep, original, and simplified explanation.
    - NO DIAGNOSIS: Never provide a diagnosis or medication. Always suggest consulting a doctor for symptoms.
    - MANDATORY NOTICE: Include this disclaimer ALONE at the end: "This website provides general health information and does not replace professional medical advice."
    - STRUCTURE: Use H1 for title, and multiple H2 and H3 for subheadings.
    - SEARCH-BASED TITLE: Use real search-based titles like "How much water should I drink per day?".
    - INTERNAL LINKING: Naturally mention and check the following tools: BMI Calculator, Calories Calculator, Water Intake Calculator, Ideal Weight Calculator, Sleep Duration Calculator, Body Fat Percentage Calculator, Daily Health Tracking, Healthy Meal Suggestions.
    - TRUSTED SOURCES: List 3-5 real sources (WHO, CDC, Mayo Clinic, etc.) with URLs.
    - FAQ SECTION: Include 5 "How-to" questions.
    - IMAGE SEO: Provide descriptive image prompt and 'imageAlt' text.

    The output MUST be a valid JSON object:
    {
      "id": "unique-kebab-case-slug",
      "title": "Impactful long-tail SEO title",
      "date": "YYYY-MM-DD",
      "category": "${category}",
      "image": "https://image.pollinations.ai/prompt/[professional_photo_description]?width=1200&height=800&nologo=true",
      "imageAlt": "SEO-friendly alt text",
      "excerpt": "Engaging 150-char meta description",
      "content": "Detailed article in Markdown with H2/H3 subheadings. Wrap with the mandatory medical disclaimer.",
      "keywords": ["specific-keyword-1", "long-tail-keyword-2"],
      "sources": ["Source Title (https://...)"],
      "faq": [{"question": "...", "answer": "..."}]
    }
    `;

    try {
        const model = await getWorkingModel(genAI);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean potential markdown formatting from AI response
        if (text.startsWith("```json")) {
            text = text.substring(7, text.length - 3).trim();
        } else if (text.startsWith("```")) {
            text = text.substring(3, text.length - 3).trim();
        }

        const newPost = JSON.parse(text);
        newPost.date = new Date().toISOString().split('T')[0];
        newPost.id = `${newPost.id}-${Date.now()}`; // Ensure uniqueness

        // Load existing posts
        let posts = [];
        try {
            const data = await fs.readFile(POSTS_PATH, "utf-8");
            posts = JSON.parse(data);
        } catch (e) {
            console.log("Creating new posts file...");
        }

        // Add new post to the beginning
        posts.unshift(newPost);

        // Save back to file
        await fs.writeFile(POSTS_PATH, JSON.stringify(posts, null, 2));

        console.log(`Successfully generated and saved: ${newPost.title}`);
    } catch (error) {
        console.error("Failed to generate post:", error);
        process.exit(1);
    }
}

generatePost();
