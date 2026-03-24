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
        const modelUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // Ensure the base64 string is raw data (stripping the "data:image/jpeg;base64," header if the frontend sent it)
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

        const payload = {
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

        const response = await fetch(modelUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const geminiData = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", geminiData);
            return new Response(JSON.stringify({ error: geminiData.error?.message || "Gemini API Error" }), { 
                status: response.status,
                headers: { "Content-Type": "application/json" }
            });
        }

        const rawText = geminiData.candidates[0]?.content?.parts[0]?.text;
        
        if (!rawText) {
             return new Response(JSON.stringify({ error: "AI returned an empty response." }), { 
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        /* 
         * Because we passed response_mime_type: "application/json", 
         * Gemini guarantees the response is exactly JSON. No markdown stripping needed.
         */
        let parsedData = JSON.parse(rawText.trim());

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
