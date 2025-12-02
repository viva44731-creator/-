import { GoogleGenAI, Type } from "@google/genai";
import { Scene, ScriptAnalysisResult } from "../types";

const GEMINI_API_KEY = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Analyzes a raw script text and breaks it down into structured scenes, characters, and dramatic analysis.
 */
export const breakdownScript = async (scriptText: string): Promise<ScriptAnalysisResult> => {
  if (!scriptText) throw new Error("Script text is empty");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert Film Dramaturg and Assistant Director. Analyze the following script segment deeply.
      
      Perform the following tasks:
      1. **Scene Breakdown**: Split into executable scenes with camera direction.
      2. **Character Profiling**: Infer age, personality tags, goals, and motivations from the subtext.
      3. **Relationship Mapping**: Identify relationships between characters.
      4. **Emotional/Tension Curve**: Rate the dramatic tension (1-10) for each key beat/scene.

      Script:
      ${scriptText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            genre: { type: Type.STRING },
            logline: { type: Type.STRING, description: "One sentence summary" },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.STRING },
                  location: { type: Type.STRING },
                  time: { type: Type.STRING },
                  description: { type: Type.STRING },
                  characters: { type: Type.ARRAY, items: { type: Type.STRING } },
                  visualPrompt: { type: Type.STRING },
                  shotType: { type: Type.STRING, description: "e.g. Wide, Close-up, POV" },
                  cameraMove: { type: Type.STRING, description: "e.g. Static, Pan, Dolly In" },
                  conflict: { type: Type.STRING, description: "The central conflict of this scene" },
                  mood: { type: Type.STRING, description: "Emotional atmosphere word" }
                }
              }
            },
            characterProfiles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  age: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  role: { type: Type.STRING },
                  goal: { type: Type.STRING, description: "Immediate or life goal" },
                  motivation: { type: Type.STRING, description: "Psychological driver" },
                  keyEvent: { type: Type.STRING }
                }
              }
            },
            relationships: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  relation: { type: Type.STRING },
                  strength: { type: Type.NUMBER, description: "1 to 10" }
                }
              }
            },
            emotionalCurve: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneIndex: { type: Type.NUMBER },
                  intensity: { type: Type.NUMBER, description: "1 to 10" },
                  label: { type: Type.STRING }
                }
              }
            }
          },
          required: ["title", "scenes", "characterProfiles", "emotionalCurve"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const result = JSON.parse(text) as ScriptAnalysisResult;
    result.scenes = result.scenes.map((s, index) => ({
      ...s,
      id: `scene-${index}-${Date.now()}`,
      status: 'pending'
    }));
    
    return result;

  } catch (error) {
    console.error("Script Breakdown Error:", error);
    // Fallback Mock Data
    return {
      title: "示例剧本：迷雾深处 (API Fallback)",
      genre: "Suspense/Mystery",
      logline: "A veteran detective confronts his past while interrogating a suspect who knows too much.",
      scenes: [
        {
          id: '1',
          sceneNumber: '1',
          location: 'Abandoned Warehouse',
          time: 'Night',
          description: 'Detective Chen enters the dusty warehouse. Shadows cling to the corners.',
          characters: ['Detective Chen'],
          visualPrompt: 'Cinematic shot, abandoned warehouse, volumetric lighting, silhouette, noir style.',
          shotType: 'Wide Shot',
          cameraMove: 'Dolly In',
          conflict: 'Man vs Environment',
          mood: 'Tense',
          status: 'pending'
        },
        {
          id: '2',
          sceneNumber: '2',
          location: 'Interrogation Room',
          time: 'Interior',
          description: 'Chen slams the file on the table. The suspect, Viper, simply smiles.',
          characters: ['Detective Chen', 'Viper'],
          visualPrompt: 'Close up, metal table, harsh overhead light, sweat on brow.',
          shotType: 'Close Up',
          cameraMove: 'Static',
          conflict: 'Interrogation struggle',
          mood: 'Hostile',
          status: 'pending'
        }
      ],
      characterProfiles: [
        {
          name: "Detective Chen",
          age: "45",
          tags: ["Rugged", "Obsessive", "Cynical"],
          role: "Protagonist",
          goal: "Find the truth about the 1999 case",
          motivation: "Guilt over partner's death",
          keyEvent: "Entering the warehouse"
        },
        {
          name: "Viper",
          age: "30",
          tags: ["Calm", "Manipulative", "Mysterious"],
          role: "Antagonist",
          goal: "Hide the boss's location",
          motivation: "Loyalty to the syndicate",
          keyEvent: "The interrogation smile"
        }
      ],
      relationships: [
        { source: "Detective Chen", target: "Viper", relation: "Enemies", strength: 9 }
      ],
      emotionalCurve: [
        { sceneIndex: 1, intensity: 4, label: "Entry" },
        { sceneIndex: 2, intensity: 8, label: "Confrontation" },
        { sceneIndex: 3, intensity: 6, label: "Flashback" },
        { sceneIndex: 4, intensity: 9, label: "Discovery" }
      ]
    };
  }
};

/**
 * Refines a simple user prompt into a high-quality Image Generation prompt using Gemini.
 */
export const refinePrompt = async (rawPrompt: string, type: 'character' | 'scene' | 'merch'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert AI Art prompt engineer. Optimize the following description for a high-end image generator (like Midjourney v6).
      Target Type: ${type}
      Original Description: "${rawPrompt}"
      
      Requirements:
      - Add lighting, texture, and camera details.
      - If it's a character, focus on facial features and clothing consistency.
      - If it's merch, focus on material (PVC, Plush) and studio lighting.
      - Output ONLY the prompt text, no explanations.`,
    });
    return response.text || rawPrompt;
  } catch (e) {
    return rawPrompt + ", high quality, 8k, cinematic lighting";
  }
}

/**
 * Generates an image using Gemini Flash Image (Simulated/Real).
 */
export const generateImageContent = async (prompt: string): Promise<string> => {
  // If no API Key, immediately return a high-quality seed image to ensure UX flow.
  if (!GEMINI_API_KEY) {
     await new Promise(resolve => setTimeout(resolve, 2500));
     return `https://picsum.photos/seed/${encodeURIComponent(prompt).slice(0, 10)}/1024/1024`; 
  }

  try {
    // Attempt to use the Gemini Image Generation capabilities
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image', 
        contents: prompt,
    });
    
    // Check for inline data (Base64)
    if (response.candidates?.[0]?.content?.parts) {
       for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
             return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
       }
    }
    
    // If text was returned instead of image (common if model falls back), or if using a model that doesn't output image bytes directly in this SDK version yet:
    // Fallback to Lorem Picsum with a seed derived from prompt for consistency
    return `https://picsum.photos/seed/${encodeURIComponent(prompt).slice(0, 15)}/1024/1024`;

  } catch (e) {
    console.warn("Image Gen Error (Falling back to mock):", e);
    return `https://picsum.photos/seed/${Math.random()}/1024/1024`;
  }
};