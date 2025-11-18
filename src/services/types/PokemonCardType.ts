export interface IPokemonCard {
  id: string;
  name: string;
  image?: string;
  rarity?: string;
  category?: string;
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
  variants?: {
    firstEdition: boolean;
    hololo: boolean;
    normal: boolean;
    reverse: boolean;
    wPromo: boolean;
  };
  hp?: number;
  types?: string[];
  evolveFrom?: string;
  description?: string;
  stage?: string;
  attacks?: {
    cost: string[];
    name: string;
    effect?: string;
    damage?: number;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  retreat?: number;
  regulationMark?: string;
  legal?: {
    standard: boolean;
    expanded: boolean;
  };
}
export class PokemonCard implements IPokemonCard {
  id: string = "";
  name: string = "";
  image?: string | undefined;
  rarity?: string | undefined;
  category?: string | undefined;
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

  variants?: {
    firstEdition: boolean;
    hololo: boolean;
    normal: boolean;
    reverse: boolean;
    wPromo: boolean;
  };
  hp?: number;
  types?: string[];
  evolveFrom?: string;
  description?: string;
  stage?: string;
  attacks?: {
    cost: string[];
    name: string;
    effect?: string;
    damage?: number;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  retreat?: number;
  regulationMark?: string;
  legal?: {
    standard: boolean;
    expanded: boolean;
  };

  constructor(card: any) {
    this.id = card.id;
    this.name = card.name;
    this.image = card.image;
    this.rarity = card.rarity;
    this.category = card.category;
    this.set = card.set;
    this.pricing = card.pricing;
    this.variants = card.variants;
    this.hp = card.hp;
    this.types = card.types;
    this.evolveFrom = card.evolveFrom;
    this.description = card.description;
    this.stage = card.stage;
    this.attacks = card.attacks;
    this.weaknesses = card.weaknesses;
    this.retreat = card.retreat;
    this.regulationMark = card.regulationMark;
    this.legal = card.legal;
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

    return prices;
  }

  getMarketPrices(): Array<{ version: String; price: number }> {
    const prices: Array<{ version: String; price: number }> = [];

    if (!this.pricing?.tcgplayer) {
      return prices;
    }

    const tcg = this.pricing.tcgplayer;

    if (tcg.normal?.marketPrice) {
      prices.push({ version: "Normal", price: tcg.normal.marketPrice });
    }

    if (tcg.holofoil?.marketPrice) {
      prices.push({ version: "Holofoil", price: tcg.holofoil.marketPrice });
    }

    if (tcg["reverse-holofoil"]?.marketPrice) {
      prices.push({
        version: "Reverse Holofoil",
        price: tcg["reverse-holofoil"].marketPrice,
      });
    }

    if (tcg["1st-edition"]?.marketPrice) {
      prices.push({
        version: "1st Edition",
        price: tcg["1st-edition"].marketPrice,
      });
    }

    if (tcg["1st-edition-holofoil"]?.marketPrice) {
      prices.push({
        version: "1st Edition Holofoil",
        price: tcg["1st-edition-holofoil"].marketPrice,
      });
    }

    if (tcg.unlimited?.marketPrice) {
      prices.push({ version: "Unlimited", price: tcg.unlimited.marketPrice });
    }

    if (tcg["unlimited-holofoil"]?.marketPrice) {
      prices.push({
        version: "Unlimited Holofoil",
        price: tcg["unlimited-holofoil"].marketPrice,
      });
    }

    return prices;
  }
}
