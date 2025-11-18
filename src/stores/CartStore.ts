import { makeObservable, observable, action, computed } from "mobx";
import type { PokemonCard } from "../services/types/PokemonCardType";

export interface CartItem {
  card: PokemonCard;
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
  }

  addToCart = (card: PokemonCard) => {
    const existingItem = this.items.find((item) => item.card.id === card.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ card, quantity: 1 });
    }
  };

  removeFromCart = (cardId: string) => {
    this.items = this.items.filter((item) => item.card.id !== cardId);
  };

  updateQuantity = (cardId: string, quantity: number) => {
    const item = this.items.find((item) => item.card.id === cardId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(cardId);
      } else {
        item.quantity = quantity;
      }
    }
  };

  clearCart = () => {
    this.items = [];
  };

  getCardQuantity = (cardId: string): number => {
    const item = this.items.find((item) => item.card.id === cardId);
    return item ? item.quantity : 0;
  };

  isInCart = (cardId: string): boolean => {
    return this.items.some((item) => item.card.id === cardId);
  };

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
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
