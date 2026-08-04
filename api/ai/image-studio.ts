
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
    const { prompt, style, aspectRatio, brandInfo } = req.body;
    const ai = getGeminiClient();

    let expandedPrompt = prompt || "Modern B2B marketing SaaS hero banner with sleek UI elements, subtle glowing gradient highlights, professional clean layout";
    let imageBase64 = null;

    if (ai) {
      try {
        const imgResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [{ text: `${expandedPrompt}, style: ${style || "modern minimalist gradient"}, high resolution 4k` }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio || "16:9",
            },
          },
        });

        if (imgResponse.candidates?.[0]?.content?.parts) {
          for (const part of imgResponse.candidates[0].content.parts) {
            if (part.inlineData) {
              imageBase64 = `data:image/png;base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch (e) {
        console.warn("Gemini image gen fallback triggered:", e);
      }
    }

    return res.json({
      expandedPrompt: `Professional ${style || "vector"} design: ${expandedPrompt}. High clarity, brand colors #${brandInfo?.brandColorPrimary || "6366f1"}, cinematic lighting, studio finish.`,
      imageUrl: imageBase64,
      carouselSlides: [
        { slide: 1, headline: "The Old Way vs The AI Way", subtext: "Why traditional content marketing is breaking down." },
        { slide: 2, headline: "80% Time Reduction", subtext: "Automate research, drafting, and scheduling." },
        { slide: 3, headline: "Consistency is King", subtext: "Never miss a publishing deadline again." },
        { slide: 4, headline: "Ready to Scale?", subtext: "Try MarketMind AI today." },
      ],
    });
  } catch (error: any) {
    console.error("Error in Image Studio route:", error);
    return res.status(500).json({ error: error.message || "Failed to process image studio" });
  }
}
