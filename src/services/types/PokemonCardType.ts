export interface IPokemonCard {
  id: string;
  name: string;
  image?: string;
  rarity?: string;
  set: {
    id: string;
    name: string;
  };
  pricing?: {
    cardmarket: {
      updated: string;
      unit: string;
      avg: number;
      low: number;
      trend: number;
      avg1: number;
      avg7: number;
      avg30: number;
      "avg-holo": number;
      "low-holo": number;
      "trend-holo": number;
      "avg1-holo": number;
      "avg7-holo": number;
      "avg30-holo": number;
    };
    tcgplayer: {
      updated: string;
      unit: string;
      normal: {
        lowPrice: number;
        midPrice: number;
        highPrice: number;
        marketPrice: number;
        directLowPrice: number;
      };
      reverse: {
        lowPrice: number;
        midPrice: number;
        highPrice: number;
        marketPrice: number;
        directLowPrice: number;
      };
      holofoil?: {
        lowPrice: number;
        midPrice: number;
        highPrice: number;
        marketPrice: number;
        directLowPrice: number;
      };
      "reverse-holofoil"?: {
        lowPrice: number;
        midPrice: number;
        highPrice: number;
        marketPrice: number;
        directLowPrice: number;
      };
      "1st-edition"?: {
        lowPrice: number;
        midPrice: number;
        highPrice: number;
        marketPrice: number;
        directLowPrice: number;
      };
      "1st-edition-holofoil"?: {
        lowPrice: number;
        midPrice: number;
        highPrice: number;
        marketPrice: number;
        directLowPrice: number;
      };
      unlimited?: {
        lowPrice: number;
        midPrice: number;
        highPrice: number;
        marketPrice: number;
        directLowPrice: number;
      };
      "unlimited-holofoil"?: {
        lowPrice: number;
        midPrice: number;
        highPrice: number;
        marketPrice: number;
        directLowPrice: number;
      };
    };
  };
}

export class PokemonCard implements IPokemonCard {
  id: string = "";
  name: string = "";
  image?: string | undefined;
  rarity?: string | undefined;
  set: { id: string; name: string } = { id: "", name: "" };
  pricing?:
    | {
        cardmarket: {
          updated: string;
          unit: string;
          avg: number;
          low: number;
          trend: number;
          avg1: number;
          avg7: number;
          avg30: number;
          "avg-holo": number;
          "low-holo": number;
          "trend-holo": number;
          "avg1-holo": number;
          "avg7-holo": number;
          "avg30-holo": number;
        };
        tcgplayer: {
          updated: string;
          unit: string;
          normal: {
            lowPrice: number;
            midPrice: number;
            highPrice: number;
            marketPrice: number;
            directLowPrice: number;
          };
          reverse: {
            lowPrice: number;
            midPrice: number;
            highPrice: number;
            marketPrice: number;
            directLowPrice: number;
          };
          holofoil?: {
            lowPrice: number;
            midPrice: number;
            highPrice: number;
            marketPrice: number;
            directLowPrice: number;
          };
          "reverse-holofoil"?: {
            lowPrice: number;
            midPrice: number;
            highPrice: number;
            marketPrice: number;
            directLowPrice: number;
          };
          "1st-edition"?: {
            lowPrice: number;
            midPrice: number;
            highPrice: number;
            marketPrice: number;
            directLowPrice: number;
          };
          "1st-edition-holofoil"?: {
            lowPrice: number;
            midPrice: number;
            highPrice: number;
            marketPrice: number;
            directLowPrice: number;
          };
          unlimited?: {
            lowPrice: number;
            midPrice: number;
            highPrice: number;
            marketPrice: number;
            directLowPrice: number;
          };
          "unlimited-holofoil"?: {
            lowPrice: number;
            midPrice: number;
            highPrice: number;
            marketPrice: number;
            directLowPrice: number;
          };
        };
      }
    | undefined;

  constructor(card: any) {
    this.id = card.id;
    this.name = card.name;
    this.image = card.image;
    this.rarity = card.rarity;
    this.set = card.set;
    this.pricing = card.pricing;
  }

  getImageURL(): string {
    if (typeof this.image === "undefined" || this.image === "") {
      return "/assets/pokemon_card_backside.png";
    } else {
      return this.image + "/high.webp";
    }
  }

  getDisplayPrice(card: PokemonCard): string[] {
    const prices = [];
    if (card.pricing?.tcgplayer?.normal?.marketPrice) {
      prices.push(`Normal: $${card.pricing.tcgplayer.normal.marketPrice}`);
    }

    if (card.pricing?.tcgplayer?.holofoil?.marketPrice) {
      prices.push(`Holofoil: $${card.pricing.tcgplayer.holofoil.marketPrice}`);
    }

    if (card.pricing?.tcgplayer?.["reverse-holofoil"]?.marketPrice) {
      prices.push(
        `Reverse Holofoil: $${card.pricing.tcgplayer["reverse-holofoil"].marketPrice}`
      );
    }

    if (card.pricing?.tcgplayer?.["1st-edition"]?.marketPrice) {
      prices.push(
        `1st Edition: $${card.pricing.tcgplayer["1st-edition"].marketPrice}`
      );
    }

    if (card.pricing?.tcgplayer?.["1st-edition-holofoil"]?.marketPrice) {
      prices.push(
        `1st Edition Holofoil: $${card.pricing.tcgplayer["1st-edition-holofoil"].marketPrice}`
      );
    }

    if (card.pricing?.tcgplayer?.unlimited?.marketPrice) {
      prices.push(
        `Unlimited: $${card.pricing.tcgplayer.unlimited.marketPrice}`
      );
    }

    if (card.pricing?.tcgplayer?.["unlimited-holofoil"]?.marketPrice) {
      prices.push(
        `Unlimited Holofoil: $${card.pricing.tcgplayer["unlimited-holofoil"].marketPrice}`
      );
    }

    console.log(`Card name: ${card.name}, Prices: ${prices}`);
    return prices;
  }
}
