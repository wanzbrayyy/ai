import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, viewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

declare var lottie: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements AfterViewInit {
  lottieContainer = viewChild<ElementRef>('lottieContainer');
  languageService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLottieAnimation();
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
        path: 'https://assets3.lottiefiles.com/packages/lf20_p9bhdjw2.json' // Another cool AI animation
      });
    }
  }
}