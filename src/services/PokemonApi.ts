import axios from "axios";
import { PokemonCard } from "./types/PokemonCardType";
import { cacheService } from "./CacheService";

export const cors_proxy = "https://cors-anywhere.herokuapp.com/";

export const TCGDEX_API = {
  BASE_URL: `https://api.tcgdex.net/v2/en`,
  ENDPOINTS: {
    CARDS: "/cards",
    SETS: "/sets",
  } as const,
} as const;

export async function getAllCards(): Promise<PokemonCard[]> {
  // Check cache first
  const cachedCards = cacheService.getCards();
  if (cachedCards) {
    console.log("Loading cards from cache");
    return cachedCards;
  }

  try {
    const response = await axios.get(
      `${TCGDEX_API.BASE_URL}${TCGDEX_API.ENDPOINTS.SETS}/ME01`
    );
    console.log("response", response);
    const data = response.data;

    const cards = data.cards;
    const updatedCards = await Promise.allSettled(
      cards.map(async (card: any) => {
        return await getCardById(card.id);
      })
    );

    // Extract successful results
    const successfulCards = updatedCards
      .filter(
        (result): result is PromiseFulfilledResult<PokemonCard> =>
          result.status === "fulfilled" && result.value !== undefined
      )
      .map((result) => result.value);

    // Log any failures for debugging
    const failedCards = updatedCards.filter(
      (result) => result.status === "rejected"
    );

    if (failedCards.length > 0) {
      console.warn(`${failedCards.length} cards failed to load:`, failedCards);
    }

    // Save to cache
    cacheService.setCards(successfulCards);

    console.log(`Loaded ${successfulCards.length} cards from API and cached`);

    return successfulCards;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCardById(cardId: string): Promise<PokemonCard> {
  try {
    const response = await axios.get(
      `${TCGDEX_API.BASE_URL}${TCGDEX_API.ENDPOINTS.CARDS}/${cardId}`
    );

    const data = response.data;
    console.log(`Fetched card: `);
    console.log(data);
    return new PokemonCard(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Force refresh (bypass cache)
export function deleteCache() {
  cacheService.clearCards();
  console.log("Cache cleared");
}
