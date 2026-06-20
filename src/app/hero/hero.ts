import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestimonialsComponent } from '../testimonials/testimonials';
import { NewsletterComponent } from '../newslater/newslater';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, TestimonialsComponent, NewsletterComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {}