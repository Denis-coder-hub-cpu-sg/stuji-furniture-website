import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;
  relatedProducts: Product[] = [];
  quantity = 1;
  selectedImage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.product = this.productService.getProductById(id);

      if (this.product) {
        this.selectedImage = this.product.image;
        this.relatedProducts = this.productService.getRelatedProducts(this.product.category, this.product.id);
      }
    });
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
}