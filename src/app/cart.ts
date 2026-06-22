import { Injectable } from '@angular/core';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('cart');
    if (stored) {
      this.items = JSON.parse(stored);
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product, quantity: number = 1) {
    const existing = this.items.find(item => item.product.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    this.saveToStorage();
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveToStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveToStorage();
    }
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
  }

  getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
}