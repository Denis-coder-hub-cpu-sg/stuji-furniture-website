import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService, CartItem } from '../cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  orderPlaced = false;
  orderId = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s\-]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
  }

  getSubtotal(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  generateOrderId(): string {
    return 'STUJI-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;

    this.isLoading = true;

    setTimeout(() => {
      this.orderId = this.generateOrderId();
      this.orderPlaced = true;
      this.isLoading = false;
      this.cartService.clearCart();
    }, 2000);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}