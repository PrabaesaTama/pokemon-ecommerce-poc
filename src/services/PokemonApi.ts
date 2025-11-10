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

export async function getAllCards(
  page: number = 1,
  pageSize: number = 20
): Promise<PokemonCard[]> {
  try {
    const response = await axios.get(
      `${TCGDEX_API.BASE_URL}${TCGDEX_API.ENDPOINTS.SETS}/ME01`
    );
    console.log("response", response);
    const data = response.data;

    return data.cards.map((card: any) => new PokemonCard(card));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSingleCard(cardId: string): Promise<PokemonCard> {
  try {
    const response = await axios.get(
      `${TCGDEX_API.BASE_URL}${TCGDEX_API.ENDPOINTS.CARDS}/${cardId}`
    );

    const data = response.data;
    console.log(`Fetched card: }`);
    return new PokemonCard(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
