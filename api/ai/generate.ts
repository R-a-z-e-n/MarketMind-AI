
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
    const { platform, topic, keyTakeaway, callToAction, toneOverride, brandInfo } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        variations: [
          {
            title: `Option 1: High Engagement ${platform.toUpperCase()} Post`,
            content: `Stopping scrolling for a second!\n\n${topic || "Transforming your marketing workflow"}.\n\nKey Takeaways:\n- Automate repetitive tasks\n- Maintain brand voice everywhere\n- Save 80% time on campaign execution\n\n${callToAction || "Comment 'DEMO' below to get early access!"}\n\n#MarketingAutomation #AI #ContentStrategy #Growth`,
            hashtags: ["#MarketingAutomation", "#AI", "#ContentStrategy", "#Growth"],
            suggestedMediaPrompt: "A sleek dashboard interface showing growth charts on a modern dark desktop workspace with neon purple lighting.",
          },
          {
            title: `Option 2: Storytelling & Conversational Format`,
            content: `We noticed a major pattern last month...\n\nMost founders spend 15+ hours a week fighting content bottlenecks.\n\nHere is how we solved it for ${brandInfo?.brandName || "our clients"}:\n\n1. Standardized brand voice guidelines\n2. AI-assisted editorial planning\n3. Auto-generated multi-platform variations\n\nWhat is your biggest content bottleneck right now?\n\n${callToAction || "Let us know in the replies!"}`,
            hashtags: ["#StartupGrowth", "#Productivity", "#TechTools"],
            suggestedMediaPrompt: "Minimalist graphic with bold typography quote: Automate strategy, elevate creativity.",
          },
        ],
      });
    }

    const systemPrompt = `You are a world-class Copywriter and Social Media Growth Strategist specializing in ${platform}.
    Brand Name: ${brandInfo?.brandName || "Brand"}
    Brand Tone: ${toneOverride || brandInfo?.tone || "Professional & Engaging"}
    Target Audience: ${brandInfo?.targetAudience || "Decision makers and industry leaders"}
    Core Value Prop: ${brandInfo?.valueProposition || "Efficiency and Growth"}

    Generate 2 distinct high-converting variations suitable for ${platform}.
    Return JSON format:
    {
      "variations": [
        {
          "title": "Variation Title / Style",
          "content": "Full formatted post with line breaks and appropriate emojis",
          "hashtags": ["#tag1", "#tag2"],
          "suggestedMediaPrompt": "Detailed prompt for generating visual image/banner for this post"
        }
      ]
    }`;

    const userPrompt = `Topic/Concept: ${topic}\nKey Takeaway: ${keyTakeaway || "Value driven insights"}\nCall To Action: ${callToAction || "Engage or click link"}`;

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
    console.error("Error in Content Generator route:", error);
    return res.status(500).json({ error: error.message || "Failed to generate content" });
  }
}
