import { Component, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen';
import { NavbarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SplashScreenComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showSplash = true;

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      const alreadyVisited = sessionStorage.getItem('hasVisited');
      const delay = alreadyVisited ? 0 : 2000;

      setTimeout(() => {
        this.showSplash = false;
        sessionStorage.setItem('hasVisited', 'true');
        this.cdr.detectChanges();
      }, delay);

      this.initScrollAnimations();
    });
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const observe = () => {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
      });
    };

    observe();

    // Re-observe after route changes
    const routeObserver = new MutationObserver(observe);
    routeObserver.observe(document.body, { childList: true, subtree: true });
  }
}