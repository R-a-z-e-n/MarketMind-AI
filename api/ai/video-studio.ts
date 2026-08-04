
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
    const { topic, format, targetDuration, brandInfo } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        hooks: [
          "Stop making this $10,000 marketing mistake in 2026!",
          "3 AI marketing tools that feel completely illegal to know...",
          "How we scaled organic reach by 300% without spending a single dollar on ads.",
        ],
        script: {
          hook: "Stop making this $10,000 marketing mistake in 2026!",
          body: "Most marketing teams create content first, then try to find an audience. Here is the exact 3-step reversal framework used by top growth leaders.",
          callToAction: "Save this reel and hit follow for daily AI growth hacks!",
        },
        storyboard: [
          { scene: 1, visual: "Creator pointing at high-contrast red warning metric screen", audio: "Stop making this $10,000 marketing mistake!" },
          { scene: 2, visual: "Fast transition to clean screen showing automated content queue", audio: "Step 1: Automate your research and keyword discovery." },
          { scene: 3, visual: "Over-the-shoulder shot scrolling through published analytics", audio: "Step 2: Maintain brand consistency across every channel." },
          { scene: 4, visual: "Ending card with animated follow icon and clear call to action", audio: "Follow MarketMind AI for more growth strategies." },
        ],
      });
    }

    const systemPrompt = `You are an expert Short-Form Video Producer (TikTok, Reels, YouTube Shorts).
    Generate a video package with:
    "hooks" (array of 3 high-retention 3-second visual/verbal hooks),
    "script" (object with "hook", "body", "callToAction"),
    "storyboard" (array of 4 visual scenes with "scene", "visual", "audio").
    Return in JSON format.`;

    const userPrompt = `Video Topic: ${topic}\nFormat: ${format || "Reel / Short"}\nTarget Duration: ${targetDuration || "30 seconds"}\nBrand: ${brandInfo?.brandName}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Error in Video Studio route:", error);
    return res.status(500).json({ error: error.message || "Failed to generate video script" });
  }
}
