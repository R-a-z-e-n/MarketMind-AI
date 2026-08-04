
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
    const { prompt, contextUrl, documentText, brandInfo, history } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `[Demo Mode - Configure GEMINI_API_KEY for live responses]\n\nI analyzed your prompt: "${prompt}".\nHere are 3 recommended marketing actions:\n1. Launch a targeted LinkedIn series on industry trends.\n2. Create an infographic carousel for Instagram.\n3. Publish an SEO blog post targeting high-intent keywords.`,
        suggestedActions: ["Generate LinkedIn Post", "Create Content Calendar", "Run Competitor Audit"],
      });
    }

    let fullPrompt = `You are MarketMind AI, an elite Chief Marketing Officer and Content Director assistant.\nUser Brand Context:\nName: ${brandInfo?.brandName || "MarketMind"}\nIndustry: ${brandInfo?.industry || "SaaS / Tech"}\nTone: ${brandInfo?.tone || "Professional and Authoritative"}\nTarget Audience: ${brandInfo?.targetAudience || "B2B Decision Makers"}\n\n`;

    if (contextUrl) fullPrompt += `Context URL to analyze: ${contextUrl}\n`;
    if (documentText) fullPrompt += `Uploaded Document Content:\n${documentText.slice(0, 3000)}\n\n`;

    fullPrompt += `User Command: ${prompt}\n\nProvide a comprehensive, highly actionable, strategic marketing response with clear next steps and template suggestions.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
    });

    return res.json({
      reply: response.text || "No response generated.",
      suggestedActions: ["Create Campaign", "Draft Social Posts", "Perform SWOT Analysis", "Generate Video Script"],
    });
  } catch (error: any) {
    console.error("Error in AI Command route:", error);
    return res.status(500).json({ error: error.message || "Failed to process command" });
  }
}
