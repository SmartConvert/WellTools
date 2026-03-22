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
    const isOpenRouter = PERPLEXITY_API_KEY.startsWith("sk-or-");
    const endpoint = isOpenRouter
        ? "https://openrouter.ai/api/v1/chat/completions"
        : "https://api.perplexity.ai/chat/completions";

    const modelName = isOpenRouter ? "perplexity/sonar" : "sonar-reasoning";

    console.log(`  🌐 Using API (${modelName}) via ${isOpenRouter ? 'OpenRouter' : 'Perplexity'}...`);

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
        WORD COUNT CONSTRAINT: MUST BE BETWEEN 2000 AND 3500 WORDS.
        READING LEVEL: Simple, clear, and accessible for a general audience (Grade 8-9). Use active voice.

        STRICT QUALITY GUIDELINES (E-E-A-T):
        1. **Expertise**: Content must demonstrate a deep understanding of physiology/nutrition.
        2. **Accuracy**: No pseudoscience. Stick to consensus medical facts. You MUST include real, verifiable scientific sources (e.g., WHO, NIH, PubMed) in the "sources" JSON array.
        3. **Author Block**: You must generate a realistic Author profile (Name, Role, short 1-sentence bio) representing a WellTools expert.
        4. **Reviewer Block**: Include data for \`reviewedBy\` in the JSON to simulate medical fact-checking.
        5. **No Fluff**: Get straight to the point. Respect the reader's time.

        KEYWORD RESEARCH & STRATEGY (CRITICAL):
        1. Identify 5-7 high-impact, long-tail keywords (3-5 words each) relevant to the topic.
        2. **MANDATORY INTEGRATION**: You must insert these keywords naturally into:
           - The SEO Meta Title (primary keyword, MUST start with or include a NUMBER like "7 Ways..." or "5 Best...", MUST be 50-60 characters total length).
           - The Meta Description (primary + secondary keyword, MUST be 140-160 characters).
           - The H1 Headline (MUST also include the primary keyword and the number).
           - The first 100 words (primary keyword at least once).
           - At least THREE H2 Subheadings.
        3. List these specific long-tail keywords in the JSON output "keywords" array.

        IMAGE GENERATION RULE:
        You must generate a concise "Photographic Image Prompt" in ENGLISH (Maximum 20 words) for the hero image.
        - Focus STRICTLY on REAL FOOD or REAL PHYSICAL ACTIVITIES depending on the topic. Must look like a real photograph of a subject in action (e.g., "A fresh salad with avocado and grilled chicken" or "A person jogging in a sunny park"). Avoid abstract or medical-only visuals.
        - NO TEXT IN IMAGE.

        IN-ARTICLE IMAGES & INFOGRAPHICS (CRITICAL FORMAT):
        1. **Photographic Images**: Insert exactly 2 real food/activity images in the content. Format (Markdown Image Links):
           ![Descriptive Alt Text](https://pollinations.ai/p/PROMPT_HERE?width=1200&height=630&nologo=true&model=flux)
           Where PROMPT_HERE is a URL-encoded English description of a real food or activity, max 15 words.
        2. **Infographics**: Instead of a photo, you must generate 1 simple Infographic image. Prompt the image to be a clean diagram or illustration without text. Example prompt:
           ![Topic Infographic](https://pollinations.ai/p/A%20clean%20minimalist%20infographic%20illustration%20about%20fitness%20metrics%20no%20text?width=800&height=1200&nologo=true&model=flux)
           Place this infographic after the 3rd H2 section. Place the other 2 photographic images after the 2nd and 5th H2s.

        CONTENT STRUCTURE (MANDATORY FORMATTING - USE GITHUB MARKDOWN):
        1. **H1 Headline**: The main article title containing a number.
        2. **Introduction (150-200 words)**: Formulate a relatable problem, introduce the science, and promise a clear solution. Write exactly 3 paragraphs.
        3. **Deep Dive Body (1500-2500 words)**: 
           - You MUST write EXACTLY 8 major sections separated by H2 headings.
           - EACH H2 section MUST contain 4 to 5 substantial paragraphs of deeply researched content.
           - Use H3 subheadings frequently to break down complex medical/fitness concepts.
           - **Formatting**: Short paragraphs, bullet points, bold text for emphasis.
        4. **Visual Enhancements**:
           - **Callouts**: Inject at least 3 markdown callouts (> [!TIP], > [!IMPORTANT], > [!WARNING]).
           - **Comparison Table**: Create at least 1 Markdown table comparing concepts, foods, or routines with detailed rows.
        5. **Interactive Elements Focus**: Explicitly mention and link to AT LEAST 4 to 5 relevant WellTools calculators (e.g., BMI Calculator, BMR Calculator, Sleep, Water, Ideal Weight, Macro, Body Fat, 1RM) using markdown links (e.g., \`[BMI Calculator](/bmi)\`). Weave these naturally into the related paragraphs.
        6. **Myth vs Fact Section (150-200 words)**: A dedicated H2 section debunking 3 common misconceptions.
        7. **Summary / Key Takeaways**: Bulleted list of 5 main points at the end.
        8. **Images**: Insert the 1 Infographic and 2 photographic images exactly as specified above using Pollinations.ai links.

        OUTPUT FORMAT: Single Valid JSON Object.
        {
          "title": "SEO Optimized Numbered Title (50-60 chars)",
          "category": "${selectedTopic.group}",
          "excerpt": "Meta Description (140-160 chars)",
          "imagePrompt": "precise english visual description for hero image involving real food or activity...",
          "imageAlt": "SEO optimized alt text in ${lang.name}",
          "content": "Full markdown content starting with H1... MUST INCLUDE callouts, Markdown Tables, H2s, H3s, bullet points, internal links to 4+ calculators, 1 infographic image, and 2 photo images.",
          "keywords": ["keyword1", "keyword2", "keyword3"],
          "author": { "name": "Expert Name", "role": "Credentials", "bio": "Short 1-sentence bio." },
          "reviewedBy": { "name": "Dr. Name", "credentials": "MD" },
          "factCheckedBy": { "name": "Checker Name" },
          "faq": [ {"question": "Q1", "answer": "A1"} ],
          "sources": [ {"title": "WHO: Topic Name", "url": "https://www.who.int/..."} ]
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

            // --- POST-PROCESS: Fix in-article Pollinations.ai image URLs ---
            // The AI sometimes generates bare URLs without query params. Add them and a random seed.
            const generateSeed = () => Math.floor(Math.random() * 100000000);

            if (newContent.content) {
                newContent.content = newContent.content.replace(
                    /!\[([^\]]+)\]\(https:\/\/pollinations\.ai\/p\/([^)]+?)\)/g,
                    (match, alt, promptPart) => {
                        // Clean up existing query params if found to build fresh
                        let cleanPrompt = promptPart.split('?')[0];
                        // Ensure prompt part itself doesn't have spaces
                        cleanPrompt = cleanPrompt.replace(/ /g, '%20');
                        return `![${alt}](https://pollinations.ai/p/${cleanPrompt}?width=1200&height=630&nologo=true&seed=${generateSeed()}&model=flux)`;
                    }
                );
            }

            // Construct Hero Image URL using high-quality prompt with Unsplash style keywords
            const basePrompt = newContent.imagePrompt || selectedTopic.title + " photography";
            // Keep it concise (under 200 chars) to avoid CDN timeouts
            const trimmedPrompt = basePrompt.slice(0, 150);
            const enhancedPrompt = `${trimmedPrompt}, photorealistic, cinematic`;
            const encodedPrompt = encodeURIComponent(enhancedPrompt);
            const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1200&height=630&nologo=true&seed=${generateSeed()}&model=flux`;


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
            if (wordCount < 2000) {
                console.warn(`    ⚠️ WARNING: Article is below 2000 words (${wordCount}). Consider regenerating for better SEO.`);
            } else if (wordCount > 3500) {
                console.warn(`    ⚠️ WARNING: Article exceeds 3500 words (${wordCount}). Consider condensing.`);
            } else {
                console.log(`    ✅ Word count within optimal range (2000-3500)`);
            }

            console.log(`    ✅ Done: ${lang.name}`);

            // Delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 5000));

        } catch (error) {
            console.error(`  ❌ Failed ${lang.name}:`, error.message);
            // Critical Fix: If generation fails, we must exit immediately to prevent 
            // the GitHub Action from falsely marking the topic as completed.
            console.error("  🚨 CRITICAL ERROR: Aborting generation to preserve topic queue.");
            process.exit(1);
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
