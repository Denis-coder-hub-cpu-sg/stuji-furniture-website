import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  badge: string;
  gallery?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    {
      id: 1,
      name: 'Console Table + Mirror',
      category: 'Furniture',
      price: 19000,
      originalPrice: 22000,
      rating: 4.7,
      reviews: 45,
      description: 'Modern wooden console table with matching mirror. Elegant design for any living space.',
      image: 'images/product1.jpg',
      badge: '⭐ Bestseller'
    },
    {
      id: 2,
      name: 'Wine Holder Stand',
      category: 'Furniture',
      price: 5000,
      originalPrice: 6500,
      rating: 4.7,
      reviews: 18,
      description: 'Elegant wine holder stand — choose from multiple design styles.',
      image: 'images/product2.jpg',
      badge: '🌟 New',
      gallery: ['images/product2.jpg', 'images/product3.jpg', 'images/product4.jpg', 'images/product5.jpg']
    }
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getRelatedProducts(category: string, excludeId: number): Product[] {
    return this.products.filter(p => p.category === category && p.id !== excludeId);
  }
}