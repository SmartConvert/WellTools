export async function onRequestPost({ request, env }) {
    try {
        const data = await request.json();
        const { targetCals, goal, dietaryPreference, language } = data;

        if (!targetCals) {
             return new Response(JSON.stringify({ error: "No target calories provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ 
                error: "Gemini API key is missing. Please securely configure GEMINI_API_KEY." 
            }), { 
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const apiKey = env.GEMINI_API_KEY;

        const systemPrompt = `
You are an expert nutritionist and AI Meal Planner.
Please generate a 1-day meal plan for a customized diet.

Parameters:
- Target Calories: ${targetCals} kcal
- Goal: ${goal} (e.g., lose, gain, maintain)
- Dietary Preference: ${dietaryPreference || 'None (Standard)'}
- Output Language: ${language === 'ar' ? 'Arabic' : 'English'}

Instructions:
1. Divide the total calories appropriately across exactly 4 meals in this order: Breakfast, Lunch, Dinner, Snack.
2. Respect the Dietary Preference strictly (e.g., if Vegan, absolutely no animal products).
3. The names and meal types must be in the specified Output Language.
4. The total calories of the 4 meals combined must be as close as possible to the Target Calories.
5. You MUST return ONLY a raw JSON object with exactly the following structure (no markdown blocks like \`\`\`json, just the raw braces):
{
    "total": ${targetCals},
    "items": [
        {
            "name": "Meal Name (in the requested language)",
            "type": "Meal Type (e.g. Breakfast, Lunch, Dinner, Snack in the requested language)",
            "portion": "1.0",
            "actualCalories": 500
        }
    ]
}
`;

        let modelUrl, payload, headers;

        if (apiKey.startsWith('sk-or-v1-')) {
            modelUrl = "https://openrouter.ai/api/v1/chat/completions";
            headers = {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://welltools.net",
                "X-Title": "WellTools Meal Planner"
            };
            payload = {
                model: "google/gemini-2.0-flash-001",
                response_format: { type: "json_object" },
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: systemPrompt }
                        ]
                    }
                ]
            };
        } else {
            modelUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            headers = { "Content-Type": "application/json" };
            payload = {
                contents: [
                    {
                        parts: [
                            { text: systemPrompt }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.3,
                    response_mime_type: "application/json"
                }
            };
        }

        const response = await fetch(modelUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        const apiData = await response.json();

        if (!response.ok) {
            console.error("API Error:", apiData);
            return new Response(JSON.stringify({ error: apiData.error?.message || "AI API Error" }), { 
                status: response.status,
                headers: { "Content-Type": "application/json" }
            });
        }

        let rawText = "";
        if (apiKey.startsWith('sk-or-v1-')) {
            rawText = apiData.choices?.[0]?.message?.content;
        } else {
            rawText = apiData.candidates?.[0]?.content?.parts?.[0]?.text;
        }
        
        if (!rawText) {
             return new Response(JSON.stringify({ error: "AI returned an empty response." }), { 
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Clean markdown backticks if OpenRouter returned them
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        let parsedData = JSON.parse(rawText);

        return new Response(JSON.stringify(parsedData), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Serverless Function Error:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal Serverless Error" }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
