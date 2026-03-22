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
        8. **Images**: DO NOT INJECT ANY EXTERNAL OR MARKDOWN IMAGE LINKS. NO IMAGES WHATSOEVER.

        OUTPUT FORMAT: Single Valid JSON Object.
        {
          "title": "SEO Optimized Numbered Title (50-60 chars)",
          "category": "${selectedTopic.group}",
          "excerpt": "Meta Description (140-160 chars)",
          "imageAlt": "SEO optimized alt text in ${lang.name}",
          "content": "Full markdown content starting with H1... MUST INCLUDE callouts, Markdown Tables, H2s, H3s, bullet points, internal links to 4+ calculators. DO NOT INJECT ANY IMAGES.",
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

            // --- POST-PROCESS: Select Unsplash Hero Image ---
            const topicImages = {
                'inflammation': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
                'microbiome': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
                'muscle': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
                'protein': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=1200',
                'aging': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
                'sleep': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200',
                'weight': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
                'water': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1200',
                'hydration': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1200',
                'calories': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
                'fasting': 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1200',
                'default': 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200'
            };

            function getRelevantImage(text) {
                const t = text.toLowerCase();
                for (const [topic, url] of Object.entries(topicImages)) {
                    if (t.includes(topic)) return url;
                }
                return topicImages.default;
            }

            const imageUrl = getRelevantImage(selectedTopic.title);

            // Fetch 2 unique images for the article body
            const allUrls = Object.values(topicImages);
            function getRandomImages(count, exclude) {
                const pool = allUrls.filter(u => u !== exclude);
                const shuffled = pool.sort(() => 0.5 - Math.random());
                return shuffled.slice(0, count);
            }

            if (newContent.content && !newContent.content.includes('![')) {
                let lines = newContent.content.split('\\n');
                const h2Indices = [];
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith('## ')) h2Indices.push(i);
                }
                
                if (h2Indices.length >= 4) {
                    const img1Index = h2Indices[1];
                    const img2Index = h2Indices[Math.min(4, h2Indices.length - 1)];
                    const injections = getRandomImages(2, imageUrl);
                    
                    lines.splice(img2Index + 1, 0, `\\n![WellTools Health Guide](${injections[1]})\\n`);
                    lines.splice(img1Index + 1, 0, `\\n![WellTools Nutrition Info](${injections[0]})\\n`);
                    newContent.content = lines.join('\\n');
                }
            }


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
