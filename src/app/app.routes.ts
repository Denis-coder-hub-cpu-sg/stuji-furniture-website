import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { ProductsComponent } from './products/products';
import { HeroComponent } from './hero/hero';
import { ProductDetailComponent } from './product-detail/product-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HeroComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent },
];