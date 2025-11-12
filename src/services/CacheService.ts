import { PokemonCard } from "./types/PokemonCardType";

// services/cacheService.ts
const CACHE_KEYS = {
  POKEMON_CARDS: "pokemon_cards_cache",
  CACHE_TIMESTAMP: "pokemon_cards_timestamp",
};

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

export const cacheService = {
  // Save to cache
  setCards(cards: PokemonCard[]): void {
    try {
      localStorage.setItem(CACHE_KEYS.POKEMON_CARDS, JSON.stringify(cards));
      localStorage.setItem(CACHE_KEYS.CACHE_TIMESTAMP, Date.now().toString());
    } catch (error) {
      console.warn("Failed to save to cache:", error);
    }
  },

  // Get from cache
  getCards(): PokemonCard[] | null {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.POKEMON_CARDS);
      const timestamp = localStorage.getItem(CACHE_KEYS.CACHE_TIMESTAMP);

      if (!cached || !timestamp) return null;

      // Check if cache is still valid
      const cacheAge = Date.now() - parseInt(timestamp);
      if (cacheAge > CACHE_DURATION) {
        this.clearCards();
        return null;
      }

      const cardsData = JSON.parse(cached);
      // Convert back to PokemonCard instances if needed
      return cardsData.map((cardData: any) => new PokemonCard(cardData));
    } catch (error) {
      console.warn("Failed to load from cache:", error);
      return null;
    }
  },

  // Clear cache
  clearCards(): void {
    localStorage.removeItem(CACHE_KEYS.POKEMON_CARDS);
    localStorage.removeItem(CACHE_KEYS.CACHE_TIMESTAMP);
  },

  // Check if cache exists and is valid
  hasValidCache(): boolean {
    return this.getCards() !== null;
  },
};
