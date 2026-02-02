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
    
    CRITICAL QUALITY & SEO RULES (20 CONDITIONS):
    1. SOLVE A PROBLEM: The article must solve a real problem (e.g., "How much water drink for my weight?") instead of generic facts.
    2. ONE TOPIC: Focus strictly on ONE specific subject per article.
    3. LENGTH: Minimum of 1000-1200 words. Deep explanation required.
    4. SIMPLIFIED ORIGINAL STYLE: Write in an original, easy-to-understand style. DO NOT copy existing medical sites.
    5. KEYWORD IN TITLE: The primary long-tail keyword must be in the H1 title.
    6. ENGAGING EXCERPT: The 'excerpt' must be a meta-description that encourages clicks.
    7. STRUCTURE: Use H1 for title, and multiple H2 and H3 for subheadings.
    8. IMAGE SEO: Provide a descriptive image prompt and a clear 'imageAlt' text.
    9. MOBILE-FRIENDLY MARKDOWN: Keep paragraphs short and use lists for readability.
    10. CLEAN DESIGN: (Metadata) Category must be precise.
    11. TRUST PAGES: (Internal linking) Mention "About Us" or "Contact Us" if natural.
    12. MEDICAL WARNING: Include a clear medical disclaimer at the VERY END of the content: "This content is for general information only and does not substitute for professional medical advice."
    13. NO DIAGNOSIS: Never provide a diagnosis or medication. Always suggest consulting a doctor for symptoms.
    14. REGULAR VALUE: Ensure the tone is consistent and high-quality.
    15. LONG-TAIL KEYWORDS: Target specific, low-competition keywords (e.g., "healthy diet to lose weight in a week" instead of just "weight loss").
    16. INTERNAL LINKING: Naturally mention and check the following tools:
       - BMI Calculator, Calories Calculator, Water Intake Calculator, Ideal Weight Calculator, Sleep Duration Calculator, Body Fat Percentage Calculator, Daily Health Tracking, Healthy Meal Suggestions.
    17. TRUSTED SOURCES: List 3-5 real sources (WHO, CDC, Mayo Clinic, etc.) with URLs.
    18. CATCHY TITLES: Use click-worthy psychological triggers in the title.
    19. FAQ SECTION: 5 "How-to" questions and answers.
    20. IMAGE FILENAME PROMPT: Ensure the image prompt implies a professional, high-quality medical photo.

    The output MUST be a valid JSON object:
    {
      "id": "unique-kebab-case-slug",
      "title": "Impactful long-tail SEO title",
      "date": "YYYY-MM-DD",
      "category": "${category}",
      "image": "https://image.pollinations.ai/prompt/[professional_photo_description]?width=1200&height=800&nologo=true",
      "imageAlt": "Descriptive alt text for the image",
      "excerpt": "Engaging 150-char meta description",
      "content": "Full 1200+ word article in Markdown with H2/H3. Wrap with a medical disclaimer at the end.",
      "keywords": ["specific-keyword-1", "long-tail-keyword-2", ...],
      "sources": ["Medical Study/Source Title (https://...)"],
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
