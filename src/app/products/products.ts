import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../product';
import { CartService } from '../cart';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsComponent implements OnInit {

  searchQuery = '';
  selectedCategory = 'All';
  sortBy = 'newest';
  minPrice = 0;
  maxPrice = 100000;
  minRating = 0;
  currentPage = 1;
  itemsPerPage = 6;

  categories = ['All', 'Furniture', 'Electronics', 'Fashion', 'Beauty', 'Home'];

  products: Product[] = [];

 constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  private cartService: CartService
) {}
  ngOnInit() {
    this.products = this.productService.getAllProducts();

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
    });
  }

  get filteredProducts(): Product[] {
    let result = [...this.products];

    if (this.searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedCategory !== 'All') {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    result = result.filter(p =>
      p.price >= this.minPrice && p.price <= this.maxPrice
    );

    if (this.minRating > 0) {
      result = result.filter(p => p.rating >= this.minRating);
    }

    if (this.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  getDiscount(original: number, current: number): number {
    return Math.round(((original - current) / original) * 100);
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.currentPage = 1;
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.sortBy = 'newest';
    this.minPrice = 0;
    this.maxPrice = 100000;
    this.minRating = 0;
    this.currentPage = 1;
  }
  addToCart(product: Product) {
  this.cartService.addToCart(product, 1);
  alert(`${product.name} added to cart!`);
}

  selectImage(product: Product, img: string) {
    product.image = img;
  }
}