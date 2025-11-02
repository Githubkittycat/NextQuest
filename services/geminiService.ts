import { GoogleGenAI } from "@google/genai";
import { MOCK_GAMES } from "../data/mock";
import type { DiscoverPreferences, RecommendedGame, Collection } from '../types';

// The API key is injected from the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGameRecommendations = async (preferences: DiscoverPreferences, collection: Collection): Promise<RecommendedGame> => {
  const existingGameTitles = [
    ...collection.reviews.map(r => r.game.title),
    ...collection.playing.map(g => g.title),
    ...collection.backlog.map(g => g.title),
    ...collection.wishlist.map(g => g.title),
    ...collection.dropped.map(g => g.title),
  ];
  const uniqueTitles = [...new Set(existingGameTitles)];

  // Get all game titles from our mock database
  const allAvailableGameTitles = MOCK_GAMES.map(game => game.title);

  let prompt = `You are a helpful gaming assistant called NextQuest. Recommend ONE video game based on the user's preferences from a specific list of available games.
The user's preferences are:
- Mood: ${preferences.mood}
- Genre: ${preferences.genre}
- Desired Playtime: ${preferences.playtime}
- Platform: ${preferences.platform}`;

  prompt += `\n\nCRITICAL: The "title" of the game you recommend MUST be one of the following available titles: ${allAvailableGameTitles.join(', ')}.`;

  if (uniqueTitles.length > 0) {
    prompt += `\n\nIMPORTANT: Also, do NOT recommend any of the following games, as the user already has them in their library: ${uniqueTitles.join(', ')}.`;
  }

  prompt += `\n\nYour response MUST be a single, valid JSON object string. Do not include any other text, just the JSON. The JSON object must have ONLY the following properties: "title" (from the provided list), "description" (a one-sentence compelling description of the game), and "reason" (a one-sentence explanation of why it fits the user's preferences).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received empty response from API");
    }

    // Clean potential markdown code block fences
    const cleanedJsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');

    const partialRecommendation = JSON.parse(cleanedJsonText) as { title: string; description: string; reason: string };

    const recommendedGameFromDb = MOCK_GAMES.find(game => game.title.toLowerCase() === partialRecommendation.title.toLowerCase());

    if (!recommendedGameFromDb) {
      console.error(`Gemini recommended a game not in our DB: "${partialRecommendation.title}"`);
      throw new Error('Recommended game could not be found in the database.');
    }

    // Combine data from Gemini and our DB for a reliable result
    const finalRecommendation: RecommendedGame = {
      title: recommendedGameFromDb.title,
      description: partialRecommendation.description,
      genre: recommendedGameFromDb.genres[0], // Use primary genre from our DB
      platform: recommendedGameFromDb.platforms[0], // Use primary platform from our DB
      reason: partialRecommendation.reason,
      coverUrl: recommendedGameFromDb.coverUrl, // Use the reliable cover URL from our DB
    };

    return finalRecommendation;
  } catch (e) {
    console.error("Error fetching or parsing game recommendations:", e);
    // You could return a fallback or re-throw a more specific error
    throw new Error('Failed to get recommendations from Gemini API.');
  }
};