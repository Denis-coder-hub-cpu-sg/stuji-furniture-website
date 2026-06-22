import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../product';
import { CartService } from '../cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;
  relatedProducts: Product[] = [];
  quantity = 1;
  selectedImage = '';
constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  private cartService: CartService
) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.product = this.productService.getProductById(id);

      if (this.product) {
        this.selectedImage = this.product.image;
        this.relatedProducts = this.productService.getRelatedProducts(this.product.category, this.product.id);
        this.trackRecentlyViewed();
      }
    });
  }

  trackRecentlyViewed() {
    if (!this.product || typeof window === 'undefined') return;

    const stored = localStorage.getItem('recentlyViewed');
    let viewed = stored ? JSON.parse(stored) : [];

    viewed = viewed.filter((p: any) => p.id !== this.product!.id);

    viewed.unshift({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image
    });

    viewed = viewed.slice(0, 6);

    localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
    window.dispatchEvent(new Event('recentlyViewedUpdated'));
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }

  getDiscount(original: number, current: number): number {
    return Math.round(((original - current) / original) * 100);
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      alert(`${this.product.name} added to cart!`);
    }
  }
}