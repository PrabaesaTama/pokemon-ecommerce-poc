import axios from "axios";
import { PokemonCard } from "./types/PokemonCardType";

export const cors_proxy = "https://cors-anywhere.herokuapp.com/";

export const TCGDEX_API = {
  BASE_URL: `https://api.tcgdex.net/v2/en`,
  ENDPOINTS: {
    CARDS: "/cards",
    SETS: "/sets",
  } as const,
} as const;

export async function getAllCards(): Promise<PokemonCard[]> {
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

    console.log(
      `Successfully loaded ${successfulCards.length} out of ${cards.length} cards`
    );

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
    return new PokemonCard(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
