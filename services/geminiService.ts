
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInputs, AnalysisResult } from "../types";

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    rootNumber: { type: Type.INTEGER, description: "Numerology root number (or relationship number for couples)" },
    moonSign: { type: Type.STRING, description: "Approximate Vedic Moon Sign" },
    nakshatra: { type: Type.STRING, description: "Approximate Nakshatra" },
    basicSummary: { type: Type.STRING, description: "A short, engaging 2-sentence summary." },
    animalPersona: {
      type: Type.OBJECT,
      properties: {
        animal: { type: Type.STRING, description: "Name of the spirit animal (or couple's power animal)" },
        emoji: { type: Type.STRING, description: "Emoji representing the animal" },
        description: { type: Type.STRING, description: "Short reason why this animal represents them" }
      },
      required: ["animal", "emoji", "description"]
    },
    weeklyForecast: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Current week range string" },
        dos: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 specific actions to take this week" },
        avoids: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 specific things to avoid this week" }
      },
      required: ["title", "dos", "avoids"]
    },
    personality: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 concise personality traits (or relationship strengths for couples)." 
    },
    loveMarriage: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 points on relationships/marriage." 
    },
    careerMoney: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 points on career/finance." 
    },
    health: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 points on health." 
    },
    areasToAvoid: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3 points on pitfalls." 
    },
    strengthBoosters: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3 points on skills/habits." 
    },
    luckyElements: {
      type: Type.OBJECT,
      properties: {
        colors: { type: Type.STRING },
        numbers: { type: Type.STRING },
        direction: { type: Type.STRING },
        deityOrMantra: { type: Type.STRING }
      },
      required: ["colors", "numbers", "direction", "deityOrMantra"]
    },
    practicalTips: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 realistic lifestyle tips." 
    },
    lifeBalanceScores: {
      type: Type.OBJECT,
      properties: {
        love: { type: Type.INTEGER },
        career: { type: Type.INTEGER },
        health: { type: Type.INTEGER },
        family: { type: Type.INTEGER },
        spirituality: { type: Type.INTEGER }
      },
      required: ["love", "career", "health", "family", "spirituality"]
    },
    luckyDays: {
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List 2-3 favorable days."
    },
    festivalInsights: {
      type: Type.STRING,
      description: "A short insight connecting to a festival."
    },
    compatibilityReport: {
      type: Type.OBJECT,
      properties: {
        overallScore: { type: Type.INTEGER, description: "0-100 Compatibility Score" },
        loveLevel: { type: Type.STRING, description: "Short title e.g. 'Soulmate Potential' or 'Karmic Lesson'" },
        elementalVibe: { type: Type.STRING, description: "e.g. 'Fire meets Air - Explosive but Fun'" },
        relationshipDynamic: { type: Type.STRING, description: "Detailed paragraph about how they interact." },
        communicationStyle: { type: Type.STRING, description: "How they talk to each other." },
        communicationTips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 tips to improve communication." },
        challengesToAvoid: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 specific relationship pitfalls." },
        auspiciousMilestones: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    event: { type: Type.STRING, description: "e.g. Engagement, Travel, Deepening Bond" },
                    period: { type: Type.STRING, description: "e.g. 'Late 2025' or 'Fridays in Nov'" },
                    description: { type: Type.STRING }
                }
            },
            description: "3 important future milestones or good times for the couple."
        },
        sexualChemistry: { type: Type.STRING, description: "Brief description of physical/emotional intimacy." },
        financialCompatibility: { type: Type.STRING, description: "Brief description of shared financial luck/habits." }
      },
      nullable: true
    }
  },
  required: [
    "rootNumber", "moonSign", "nakshatra", "basicSummary", "animalPersona", "weeklyForecast",
    "personality", "loveMarriage", "careerMoney", "health", 
    "areasToAvoid", "strengthBoosters", "luckyElements", "practicalTips",
    "lifeBalanceScores", "luckyDays", "festivalInsights"
  ]
};

export const generateAstrologyInsights = async (inputs: UserInputs): Promise<AnalysisResult> => {
  // Use user-provided API key if available, otherwise fallback to environment variable
  const finalApiKey = inputs.apiKey || process.env.API_KEY;

  if (!finalApiKey) {
    throw new Error("API Key is missing. Please provide a custom key or ensure the app is configured correctly.");
  }

  const ai = new GoogleGenAI({ apiKey: finalApiKey });

  const isCompatibility = inputs.mode === 'compatibility';
  const primaryLifestyle = inputs.primaryLifestyle ? inputs.primaryLifestyle : "Not specified";
  const secondaryLifestyle = inputs.secondaryLifestyle ? inputs.secondaryLifestyle : "Not specified";
  const style = inputs.chartStyle === 'south' ? 'South Indian Chart Style' : 'North Indian Chart Style';
  const language = inputs.language || 'en';
  const today = new Date().toDateString();

  const langInstruction = language === 'hi' 
    ? "OUTPUT LANGUAGE: HINDI (Devanagari). Translate all content values to Hindi, including numbers if applicable. Keep JSON keys in English."
    : "OUTPUT LANGUAGE: ENGLISH. Use simple, clear, everyday language (CEFR Level B1/B2). Avoid complex astrological jargon. If a technical term is used, explain it simply in parentheses.";

  let prompt = `
    Role: You are an expert minimalist Indian Jyotish (Vedic Astrologer) & Numerologist.
    Style: Modern, premium, billion-dollar app feel. Approachable but insightful.
    Chart Style Preference: ${style}.
    Current Date: ${today}.
    ${langInstruction}
    
    Task: Analyze based on the following details.
  `;

  if (isCompatibility) {
    prompt += `
    MODE: RELATIONSHIP COMPATIBILITY (MATCH CHECK)
    
    PARTNER A (Primary):
    - DOB: ${inputs.dob}
    - Gender: ${inputs.gender}
    - Time/Place: ${inputs.timeOfBirth || "Unknown"}, ${inputs.placeOfBirth || "Unknown"}
    - Lifestyle: ${primaryLifestyle}, ${secondaryLifestyle}
    
    PARTNER B:
    - DOB: ${inputs.partnerDob}
    - Gender: ${inputs.partnerGender}
    - Time/Place: ${inputs.partnerTimeOfBirth || "Unknown"}, ${inputs.partnerPlaceOfBirth || "Unknown"}
    
    INSTRUCTIONS FOR COMPATIBILITY MODE:
    1. Fill the 'compatibilityReport' object completely with deep insights.
    2. 'overallScore': A realistic compatibility percentage (0-100).
    3. 'relationshipDynamic': Describe the specific energy between these two (e.g., "A stabilizing yet exciting bond...").
    4. 'auspiciousMilestones': Suggest 3 specific future periods/dates for key relationship steps (Engagement, Marriage, Travel, Moving in).
    5. 'challengesToAvoid': What specifically triggers fights for THIS couple?
    6. 'animalPersona': Create a "Couple Power Animal" (e.g., "Two Wolves", "Swan Pair", "Lion & Lioness").
    7. 'weeklyForecast': Focus strictly on relationship harmony/conflicts for this week.
    8. For standard arrays like 'careerMoney' or 'health', provide BRIEF insights on how the relationship affects these areas (e.g., "Partner A brings luck to Partner B's career").
    `;
  } else {
    prompt += `
    MODE: INDIVIDUAL ANALYSIS
    
    USER DETAILS:
    - DOB: ${inputs.dob}
    - Gender: ${inputs.gender}
    - Time/Place: ${inputs.timeOfBirth || "Unknown"}, ${inputs.placeOfBirth || "Unknown"}
    - Lifestyle: ${primaryLifestyle}, ${secondaryLifestyle}
    
    INSTRUCTIONS:
    - Calculate Root Number, Moon Sign, Nakshatra.
    - 'compatibilityReport' should be null.
    - Focus on individual growth, career, marriage, and health.
    `;
  }

  prompt += `
    Guidelines:
    - Cultural Relevance: Relate to Indian family dynamics, vastu, festivals.
    - Tone: Positive, avoiding fear. Use "tendency", "likely".
    - Scores: Provide realistic 0-100 scores.
    
    Return strictly JSON matching the provided schema.
  `;

  try {
    // 1. Text Analysis
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
        temperature: 0.7, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const result = JSON.parse(text) as AnalysisResult;
    result.language = language;

    // 2. Image Generation (Optional)
    if (inputs.includeImage) {
        try {
            const imagePrompt = `
                A majestic, spiritual, and ethereal artistic representation of a ${result.animalPersona.animal}. 
                Style: High-end digital art, glowing bioluminescence, Vedic cosmic aesthetics.
                Mood: ${result.basicSummary.substring(0, 100)}.
                Colors: Dominant shades of ${result.luckyElements.colors}.
                No text. Cinematic lighting.
            `;
            
            // Downgraded to gemini-2.5-flash-image which is free tier compatible.
            // Removed imageSize as it is not supported by this model.
            const imageResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: imagePrompt }],
                },
                config: {
                    imageConfig: {
                        aspectRatio: "1:1",
                    }
                }
            });

            // Extract image data
            for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    result.generatedImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    break;
                }
            }
        } catch (imgError) {
            console.error("Image generation failed:", imgError);
            // We do not throw here, so the user still gets the text analysis.
        }
    }

    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error; // Re-throw to be caught by UI
  }
};
