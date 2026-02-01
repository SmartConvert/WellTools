import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = path.join(__dirname, "../src/data/posts.json");

// API Key should be set in GitHub Secrets/Environment
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const categories = ["Nutrition", "Fitness", "Mental Health", "Sleep", "Longevity", "Biohacking"];

async function generatePost() {
    const category = categories[Math.floor(Math.random() * categories.length)];

    const prompt = `
    Generate a high-quality, professional, and comprehensive health blog post for a website called "Daily Health Tools".
    The topic should be related to: ${category}.
    
    CRITICAL REQUIREMENTS:
    1. CONTENT LENGTH: The article must be a minimum of 1200 words. Provide deep, actionable insights.
    2. SEO OPTIMIZATION: 
       - Use a long, catchy, and high-search-volume primary title.
       - Use multiple H2 and H3 subheadings containing keywords.
       - Include 5-7 high-relevance keywords.
    3. INTERNAL LINKS: Naturally integrate links to the following tools available on our site:
       - BMI Calculator
       - Calories Calculator
       - Water Intake Calculator
       - Ideal Weight Calculator
       - Sleep Duration Calculator
       - Body Fat Percentage Calculator
       - Daily Health Tracking (Weight, Water, Sleep)
       - Healthy Meal Suggestions
       Use natural anchor text like "Check your [tool name] here". Note: Just use the tool name as text, do not generate actual <a> tags in the 'content' string as they are handled as text, but you can mention them in the prose.
    4. MEDICAL SOURCES: Provide a list of 3-5 real medical sources or research papers (Title and URL) that support the article's claims.
    5. FAQ SECTION: Include a FAQ section with at least 5 questions, focusing on "How-to" questions (e.g., "How can I improve my...").
    6. PROFESSIONAL IMAGE: Provide a URL for a high-quality, professional medical/health photograph using the following format:
       "https://image.pollinations.ai/prompt/[detailed_image_description]?width=1200&height=800&nologo=true"
       The [detailed_image_description] should be a highly detailed, professional prompt in English (e.g., "professional_medical_photography_of_a_stuffed_healthy_salad_bowl_with_vibrant_colors_soft_lighting_8k_resolution").
    
    The output MUST be a valid JSON object with the following structure:
    {
      "id": "unique-kebab-case-slug",
      "title": "A long, SEO-optimized title with high impact",
      "date": "YYYY-MM-DD",
      "category": "${category}",
      "image": "https://image.pollinations.ai/prompt/...&nologo=true",
      "excerpt": "A short, engaging summary (max 150 chars) with keywords",
      "content": "A very long (1200+ words), detailed article in Markdown. Use H2, H3 subheadings, bullet points, and bold text. Integrate internal tool mentions naturally.",
      "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
      "sources": ["Medical Study Title (https://pubmed.ncbi.nlm.nih.gov/...)", "CDC Guidelines (https://cdc.gov/...)"],
      "faq": [
        {"question": "How do I...?", "answer": "Detailed explanation..."},
        {"question": "Why should I...?", "answer": "Scientific reason..."}
      ]
    }
    
    Ensure the content is scientifically accurate, helpful, and mirrors the tone of a professional medical publication but remains accessible to the general public.
  `;

    try {
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
