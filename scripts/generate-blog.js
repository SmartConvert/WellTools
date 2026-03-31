import { GoogleGenAI } from "@google/genai";
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

const genAI = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const MODELS_TO_TRY = [
    "gemini-2.5-flash",          // Stable, best price-performance for production
    "gemini-2.5-pro",            // Stable, most advanced
    "gemini-2.5-flash-lite",     // Stable, fastest & cheapest
    "gemini-3.1-pro-preview",    // Preview, latest generation
    "gemini-3-flash-preview",    // Preview, frontier-class
    "gemini-3.1-flash-lite-preview" // Preview, cost-efficient
];

async function getWorkingModel(genAI) {
    if (!genAI) throw new Error("Gemini AI not initialized.");
    for (const modelName of MODELS_TO_TRY) {
        let retries = 0;
        const MAX_RETRIES = 3;

        while (retries <= MAX_RETRIES) {
            try {
                console.log(`Testing model: ${modelName} (Attempt ${retries + 1})...`);
                const result = await genAI.models.generateContent({
                    model: modelName,
                    contents: [{ role: 'user', parts: [{ text: "hi" }] }]
                });

                if (result.text) {
                    console.log(`✅ Selected working model: ${modelName}`);
                    return modelName;
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

    // Build a list of already-published titles to prevent any repetition
    const existingTitles = (posts.en || []).map(p => `- ${p.title}`).join('\n');

    // Initialize arrays if they don't exist
    languages.forEach(lang => {
        if (!posts[lang.code]) posts[lang.code] = [];
    });

    for (const lang of languages) {
        console.log(`  📝 Generating ${lang.name} version...`);

        const prompt = `
        You are a world-class Health & Wellness Editor for "WellTools", a premium health platform.
        Your task is to write a high-value, SEO-optimized, and medically accurate article in ${lang.name}.

        ASSIGNED TOPIC (MANDATORY): "${selectedTopic.title}"
        You MUST write specifically about this topic. Do NOT change or ignore it.
        The article angle, title, and all content must be directly related to: "${selectedTopic.title}".

        ⛔ ALREADY PUBLISHED TOPICS — DO NOT REPEAT OR OVERLAP WITH THESE:
${existingTitles}

        TARGET AUDIENCE: Health-conscious individuals seeking science-backed advice.
        LANGUAGE: ${lang.name} (${lang.nuance})
        DIRECTION: ${lang.dir}
        WORD COUNT CONSTRAINT: MUST BE AT LEAST 2200 WORDS. Make it deeply detailed.
        READING LEVEL: Basic English (A2-B1). Use simple sentence structure and common vocabulary.

        STRICT QUALITY GUIDELINES & PROJECT RULES:
        1. **Tone**: ${selectedTopic.tone ? selectedTopic.tone : 'Simple, friendly, non-medical.'}
        2. **PROHIBITED CONTENT**: Absolutely NO medical diagnosis, treatment advice, or medication recommendations. If discussing symptoms, always say "Consult a doctor if symptoms persist" instead of naming drugs.
        3. **Mandatory Disclaimer**: You MUST weave this exact sentence into the conclusion naturally: "This website provides general health information and does not replace professional medical advice."
        4. **Author Block**: You must generate a realistic Author profile (Name, Role, short 1-sentence bio) representing a WellTools writer.
        5. **No Fluff**: Get straight to the point. Respect the reader's time.

        KEYWORD RESEARCH & STRATEGY (CRITICAL):
        1. Identify 3-5 high-impact, long-tail keywords (3-5 words each) relevant to the topic.
        2. **MANDATORY INTEGRATION**: You must insert these keywords naturally into:
           - The SEO Meta Title (primary keyword, MUST start with or include a NUMBER like "7 Ways..." or "5 Best...", MUST be 50-60 characters total length).
           - The Meta Description (primary + secondary keyword, MUST be 140-160 characters. ${selectedTopic.tone ? 'Must be catchy and answer the search intent of the user.' : ''}).
           - The H1 Headline (MUST also include the primary keyword and the number).
           - The first 100 words (primary keyword at least once).
           - At least TWO H2 Subheadings.
        3. List these specific long-tail keywords in the JSON output "keywords" array.

        CONTENT STRUCTURE (MANDATORY FORMATTING - USE GITHUB MARKDOWN):
        1. **H1 Headline**: The main article title containing a number.
        2. **Introduction**: Formulate a relatable problem and promise a clear solution.
        3. **Body Paragraphs**: 
           - Break down the content into 4-6 simple sections separated by H2 headings.
           - Ensure deep coverage using structured headings, short paragraphs, and bullet points.
        4. **Visual Enhancements**:
           - **Callouts**: Inject at least 2 markdown callouts (> [!TIP], > [!IMPORTANT]).
        5. **Interactive Elements Focus**: ${selectedTopic.requiredCalculator ? `CRITICAL: You MUST naturally embed contextual links directing readers to the [${selectedTopic.requiredCalculator}](/${selectedTopic.requiredCalculator.toLowerCase().replace(/ /g, '-')}) in the text.` : 'Link to 2-3 relevant WellTools calculators (e.g., [BMI Calculator](/bmi), [BMR Calculator](/bmr), [Water Intake](/water), [Ideal Weight](/ideal-weight), [Macro](/macro)) naturally in the text.'}
        6. **FAQ Section**: Add 3-4 common questions and simple answers at the end.
        7. **Images**: You MUST inject 3 to 4 images throughout the article related to the topic of the current section. 
           Use the following URL format for images in Markdown, replacing YOUR-IMAGE-PROMPT with a 3-5 word hyphen-separated description of the image:
           ![Image Alt Text](https://image.pollinations.ai/prompt/YOUR-IMAGE-PROMPT?width=1200&height=800&nologo=true)
           Example: ![Healthy Snacks](https://image.pollinations.ai/prompt/healthy-snacks-on-a-wooden-table?width=1200&height=800&nologo=true)

        OUTPUT FORMAT: Single Valid JSON Object.
        {
          "title": "SEO Optimized Numbered Title (50-60 chars)",
          "category": "${selectedTopic.group}",
          "excerpt": "Meta Description (140-160 chars)",
          "imageAlt": "SEO optimized alt text in ${lang.name}",
          "content": "Full markdown content starting with H1... MUST INCLUDE Markdown Images, callouts, Markdown Tables, H2s, H3s, bullet points, internal links to 4+ calculators.",
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
                    const modelName = await getWorkingModel(genAI);
                    const result = await genAI.models.generateContent({
                        model: modelName,
                        contents: [{ role: 'user', parts: [{ text: prompt }] }],
                        config: { responseMimeType: 'application/json' }
                    });
                    text = result.text;
                }
            } else {
                const modelName = await getWorkingModel(genAI);
                const result = await genAI.models.generateContent({
                    model: modelName,
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    config: { responseMimeType: 'application/json' }
                });
                text = result.text;
            }

            if (!text) throw new Error("No content generated.");

            // ── Step 1: strip <think> tags (reasoning models) ─────────────
            let cleanedText = text.trim();
            if (cleanedText.includes("<think>")) {
                cleanedText = cleanedText.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
            }

            // ── Step 2: strip markdown code fences (```json ... ``` or ``` ... ```) ──
            cleanedText = cleanedText
                .replace(/^```(?:json)?\s*/i, "")
                .replace(/\s*```\s*$/i, "")
                .trim();

            // ── Step 3: extract the outermost JSON object ─────────────────
            const jsonStart = cleanedText.indexOf("{");
            const jsonEnd   = cleanedText.lastIndexOf("}");
            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
            }

            // ── Step 4: repair common AI JSON issues ──────────────────────
            // Remove trailing commas before } or ]
            cleanedText = cleanedText.replace(/,\s*([}\]])/g, "$1");

            // ── Step 5: multi-strategy robust parse ───────────────────────
            let newContent;

            // Strategy A: standard JSON.parse
            try {
                newContent = JSON.parse(cleanedText);
            } catch (_) { /* try next */ }

            // Strategy B: fix raw newlines/tabs inside JSON string values
            // (Gemini often writes literal newlines in "content" field)
            if (!newContent) {
                try {
                    const fixed = cleanedText.replace(
                        /"((?:[^"\\]|\\.)*)"/gs,
                        (match, inner) => {
                            const escaped = inner
                                .replace(/\n/g, "\\n")
                                .replace(/\r/g, "\\r")
                                .replace(/\t/g, "\\t");
                            return `"${escaped}"`;
                        }
                    );
                    newContent = JSON.parse(fixed);
                } catch (_) { /* try next */ }
            }

            // Strategy C: tolerant eval-style parse (safe – no user input)
            if (!newContent) {
                try {
                    newContent = Function(`"use strict"; return (${cleanedText})`)();
                } catch (_) { /* try next */ }
            }

            // Strategy D: field-by-field regex extraction as last resort
            if (!newContent) {
                console.warn("  ⚠️ All JSON strategies failed. Attempting field-by-field extraction...");
                try {
                    const extract = (key) => {
                        // Matches "key": "value" where value may span multiple lines
                        const re = new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s");
                        const m = cleanedText.match(re);
                        return m ? m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"') : "";
                    };
                    const extractArr = (key) => {
                        const re = new RegExp(`"${key}"\\s*:\\s*(\\[[\\s\\S]*?\\])`, "s");
                        const m = cleanedText.match(re);
                        if (!m) return [];
                        try { return JSON.parse(m[1]); } catch { return []; }
                    };
                    const extractObj = (key) => {
                        const re = new RegExp(`"${key}"\\s*:\\s*({[\\s\\S]*?})`, "s");
                        const m = cleanedText.match(re);
                        if (!m) return {};
                        try { return JSON.parse(m[1]); } catch { return {}; }
                    };

                    newContent = {
                        title:         extract("title"),
                        category:      extract("category"),
                        excerpt:       extract("excerpt"),
                        imageAlt:      extract("imageAlt"),
                        content:       extract("content"),
                        keywords:      extractArr("keywords"),
                        author:        extractObj("author"),
                        reviewedBy:    extractObj("reviewedBy"),
                        factCheckedBy: extractObj("factCheckedBy"),
                        faq:           extractArr("faq"),
                        sources:       extractArr("sources"),
                    };

                    if (!newContent.title || !newContent.content) {
                        throw new Error("Extraction yielded empty title/content");
                    }
                    console.log("  ✅ Field-by-field extraction succeeded.");
                } catch (extractErr) {
                    console.error("Failed to parse JSON. Raw output:", cleanedText.substring(0, 500) + "...");
                    throw new Error("Invalid JSON returned by AI");
                }
            }

            // --- POST-PROCESS: Sanitize and Enhance AI Images (Pollinations.ai) ---
            function sanitizePollinationsUrl(rawUrl, altText) {
                if (!rawUrl) return allocateUniqueFallback(); // Ultimate fallback
                if (rawUrl.includes('unsplash.com')) return rawUrl;
                
                // Extract prompt or use alt text
                let prompt = altText || "wellness and health";
                const promptMatch = rawUrl.match(/\/prompt\/([^?)\s]+)/);
                if (promptMatch) {
                    try {
                        prompt = decodeURIComponent(promptMatch[1]);
                    } catch (e) {
                        prompt = promptMatch[1];
                    }
                }
                
                // Clean and encode
                const cleanPrompt = prompt.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                const encodedPrompt = encodeURIComponent(cleanPrompt);
                
                // Add a random seed to ensure uniqueness even for similar prompts
                const seed = Math.floor(Math.random() * 1000000);
                return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&nologo=true&model=flux&seed=${seed}`;
            }

            // Standardize pollinations URLs in the content
            if (newContent.content) {
                newContent.content = newContent.content.replace(
                    /!\[([^\]]*)\]\((https?:\/\/(?:image\.)?pollinations\.ai\/[^)]+)\)/g,
                    (match, alt, url) => {
                        return `![${alt}](${sanitizePollinationsUrl(url, alt)})`;
                    }
                );
            }

            const imageUrl = sanitizePollinationsUrl(`https://image.pollinations.ai/prompt/${encodeURIComponent(newContent.title || selectedTopic.title)}`, newContent.title || selectedTopic.title);


            const postObj = {
                id: baseId,
                ...newContent,
                image: imageUrl,
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
