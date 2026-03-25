export async function onRequestPost({ request, env }) {
    try {
        const data = await request.json();
        const { imageBase64, mimeType } = data;

        if (!imageBase64) {
             return new Response(JSON.stringify({ error: "No image payload provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Check if the user has properly configured their key in Cloudflare Pages
        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ 
                error: "Gemini API key is missing. Please securely configure GEMINI_API_KEY in your Cloudflare Pages environment variables." 
            }), { 
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const apiKey = env.GEMINI_API_KEY;
        const base64Data = imageBase64.replace(/^data:image\/(png|jpeg|webp|jpg);base64,/, "");

        const promptText = `
        Analyze this food image and provide a highly accurate nutritional breakdown.
        Estimate the portion size based on standard visual references.
        You must return ONLY a raw JSON object containing exactly the following keys:
        {
            "foodName": "A descriptive name of the meal (e.g., Grilled Chicken Salad)",
            "ingredients": ["list", "of", "detected", "ingredients"],
            "calories": 450,
            "protein": 30,
            "carbs": 25,
            "fats": 15,
            "confidence": "High"
        }
        Return ONLY valid JSON.
        `;

        let modelUrl, payload, headers;

        // Support both OpenRouter and Native Google API keys
        if (apiKey.startsWith('sk-or-v1-')) {
            modelUrl = "https://openrouter.ai/api/v1/chat/completions";
            headers = {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://welltools.net",
                "X-Title": "WellTools Meal Scanner"
            };
            payload = {
                model: "google/gemini-2.0-flash-001",
                response_format: { type: "json_object" },
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: promptText },
                            { type: "image_url", image_url: { url: `data:${mimeType || 'image/jpeg'};base64,${base64Data}` } }
                        ]
                    }
                ]
            };
        } else {
            modelUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            headers = { "Content-Type": "application/json" };
            payload = {
                contents: [
                    {
                        parts: [
                            { text: promptText },
                            {
                                inline_data: {
                                    mime_type: mimeType || "image/jpeg",
                                    data: base64Data
                                }
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.1,
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
            return new Response(JSON.stringify({ error: apiData.error?.message || "Vision API Error" }), { 
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
