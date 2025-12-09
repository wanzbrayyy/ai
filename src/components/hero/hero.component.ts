import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, viewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../services/language.service';

declare var lottie: any;
declare var gsap: any;

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit {
  lottieContainer = viewChild<ElementRef>('lottieContainer');
  heroTitle = viewChild<ElementRef>('heroTitle');
  heroSubtitle = viewChild<ElementRef>('heroSubtitle');
  heroButton = viewChild<ElementRef>('heroButton');

  private platformId = inject(PLATFORM_ID);
  languageService = inject(LanguageService);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLottieAnimation();
      this.animateText();
    }
  }

  private loadLottieAnimation(): void {
    const container = this.lottieContainer()?.nativeElement;
    if (container) {
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets1.lottiefiles.com/packages/lf20_gjsy1ouf.json' // A cool AI/tech animation
      });
    }
  }

  private animateText(): void {
    const title = this.heroTitle()?.nativeElement;
    const subtitle = this.heroSubtitle()?.nativeElement;
    const button = this.heroButton()?.nativeElement;

    if (title && subtitle && button) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(title, { opacity: 0, y: 30, duration: 1 })
        .from(subtitle, { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(button, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");
    }
  }
}