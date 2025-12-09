import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isVisible = signal(false);
  languageService = inject(LanguageService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('cookie_consent') !== 'accepted') {
        this.isVisible.set(true);
      }
    }
  }

  acceptConsent(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie_consent', 'accepted');
      this.isVisible.set(false);
    }
  }
}