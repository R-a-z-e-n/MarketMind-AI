
import { GoogleGenAI } from "@google/genai";

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey, httpOptions: { headers: { "User-Agent": "aistudio-build" } } });
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { type, query, competitorName, brandInfo } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        result: {
          summary: `Market Research Analysis for "${query || competitorName || brandInfo?.industry || "Market trends"}"`,
          swot: {
            strengths: ["Strong product-market fit", "High customer retention", "Agile innovation velocity"],
            weaknesses: ["Limited brand awareness in Asia-Pacific", "Content volume constraints"],
            opportunities: ["AI-driven workflow automation demand", "B2B influencer marketing acceleration"],
            threats: ["Lower price competitors emerging", "Platform algorithm updates"],
          },
          trends: [
            { title: "Short-form video dominance", growth: "+145%", momentum: "high" },
            { title: "Hyper-personalized email nurtures", growth: "+88%", momentum: "medium" },
            { title: "Thought leadership on LinkedIn", growth: "+210%", momentum: "high" },
          ],
          recommendations: [
            "Repurpose top-performing blogs into 60-second video hooks",
            "Target long-tail keywords in your product niche",
            "Establish bi-weekly executive newsletter",
          ],
        },
      });
    }

    const systemPrompt = `You are MarketMind's Lead Market Intelligence & Competitor Analyst. Conduct deep research for a B2B/B2C company. 
    Return structured JSON with keys:
    "summary" (string),
    "swot" (object with arrays "strengths", "weaknesses", "opportunities", "threats"),
    "trends" (array of objects with "title", "growth", "momentum" ['high'|'medium'|'emerging'], "description"),
    "recommendations" (array of strings)`;

    const userPrompt = `Research Type: ${type || "Competitor & Market Research"}\nQuery/Competitor: ${query || competitorName || brandInfo?.industry}\nBrand Context: ${JSON.stringify(brandInfo || {})}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ result: parsed });
  } catch (error: any) {
    console.error("Error in Research route:", error);
    return res.status(500).json({ error: error.message || "Failed to conduct research" });
  }
}
