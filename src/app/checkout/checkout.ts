import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService, CartItem } from '../cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  orderPlaced = false;
  orderId = '';
  isLoading = false;
  errorMessage = '';

  private apiUrl = 'https://stuji-backend.onrender.com';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
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

  onSubmit() {
    if (this.checkoutForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const orderData = {
      customer_name: this.checkoutForm.value.name,
      customer_phone: this.checkoutForm.value.phone,
      customer_email: this.checkoutForm.value.email,
      delivery_address: this.checkoutForm.value.address,
      items: this.cartItems.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      total_price: this.getSubtotal()
    };

    this.http.post<any>(`${this.apiUrl}/orders/`, orderData).subscribe({
      next: (response) => {
        this.orderId = response.order_id;
        this.orderPlaced = true;
        this.isLoading = false;
        this.cartService.clearCart();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to place order. Please try again.';
        this.cdr.detectChanges();
        console.error('Order error:', err);
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}