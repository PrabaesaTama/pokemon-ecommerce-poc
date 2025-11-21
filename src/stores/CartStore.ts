import { makeObservable, observable, action, computed } from "mobx";
import { PokemonCard } from "../services/types/PokemonCardType";

export interface CartItem {
  card: PokemonCard;
  slug: string;
  quantity: number;
}

class CartStore {
  items: CartItem[] = [];
  constructor() {
    makeObservable(this, {
      items: observable,
      addToCart: action,
      removeFromCart: action,
      updateQuantity: action,
      clearCart: action,
      totalItems: computed,
      totalPrice: computed,
    });

    this.loadFromLocalStorage();
  }

  private saveToLocalStorage = () => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    } catch (error) {
      console.warn("Failed to save to local storage:", error);
    }
  };

  private loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem("cartItems");
      if (saved) {
        const parsed = JSON.parse(saved);

        this.items = parsed.map((item: any) => ({
          ...item,
          card: new PokemonCard(item.card), // ✅ Recreate the class instance
        }));
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
    }
  };

  addToCart = (card: PokemonCard, slug: string, quantity: number) => {
    const existingItem = this.items.find(
      (item) => item.card.id === card.id && item.slug === slug
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ card, slug: slug, quantity: quantity });
    }

    this.saveToLocalStorage();
  };

  removeFromCart = (cardId: string, slug: string) => {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].card.id === cardId && this.items[i].slug === slug) {
        this.items.splice(i, 1);
        break;
      }
    }

    this.saveToLocalStorage();
  };

  updateQuantity = (cardId: string, slug: string, quantity: number) => {
    const item = this.items.find(
      (item) => item.card.id === cardId && item.slug === slug
    );

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(cardId, slug);
      } else {
        item.quantity = quantity;
      }
    }

    this.saveToLocalStorage();
  };

  clearCart = () => {
    this.items = [];

    this.saveToLocalStorage();
  };

  getCardQuantity = (cardId: string, slug: string): number => {
    const item = this.items.find(
      (item) => item.card.id === cardId && item.slug === slug
    );
    return item ? item.quantity : 0;
  };

  increaseCardQuantity = (cardId: string, slug: string) => {
    const item = this.items.find(
      (item) => item.card.id === cardId && item.slug === slug
    );
    if (item) {
      item.quantity++;
      this.saveToLocalStorage();
    }
  };

  decreaseCardQuantity = (cardId: string, slug: string) => {
    const item = this.items.find(
      (item) => item.card.id === cardId && item.slug === slug
    );
    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveToLocalStorage();
    }
  };

  isInCart = (cardId: string, slug: string): boolean => {
    return this.items.some(
      (item) => item.card.id === cardId && item.slug === slug
    );
  };

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    //Fix this later
    return this.items.reduce((sum, item) => {
      const price = item.card.getDisplayPrice?.(item.card)?.[0]
        ? parseFloat(item.card.getDisplayPrice(item.card)[0].split("$")[1])
        : 0;
      return sum + price * item.quantity;
    }, 0);
  }
}

export const cartStore = new CartStore();
export default cartStore;
