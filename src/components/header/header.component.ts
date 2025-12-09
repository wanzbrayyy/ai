import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  label: string;
  type: 'scroll' | 'route';
  path?: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  languageService = inject(LanguageService);
  authService = inject(AuthService);
  router = inject(Router);

  isMobileMenuOpen = signal(false);
  isLanguageDropdownOpen = signal(false);
  
  isLoggedIn = this.authService.isLoggedIn;

  navItems = computed<NavItem[]>(() => [
    { label: this.languageService.translate('home'), type: 'scroll', fragment: 'home' },
    { label: this.languageService.translate('features'), type: 'scroll', fragment: 'features' },
    { label: this.languageService.translate('about'), type: 'scroll', fragment: 'about' },
    { label: this.languageService.translate('faq'), type: 'scroll', fragment: 'faq' },
    { label: this.languageService.translate('docs'), type: 'route', path: '/docs' },
    { label: this.languageService.translate('contact'), type: 'scroll', fragment: 'contact' },
  ]);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }
  
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownOpen.update(v => !v);
  }

  changeLanguage(lang: 'en' | 'id'): void {
    this.languageService.setLanguage(lang);
    this.isLanguageDropdownOpen.set(false);
    this.closeMobileMenu();
  }
  
  async onLogout(): Promise<void> {
    this.closeMobileMenu();
    await this.authService.signOut();
    this.router.navigate(['/']);
  }

  handleNavClick(item: NavItem): void {
    this.closeMobileMenu();
    if (item.type === 'scroll' && item.fragment) {
      this.scrollTo(item.fragment);
    } else if (item.type === 'route' && item.path) {
      this.router.navigate([item.path]);
    }
  }

  scrollTo(fragment: string): void {
    // If we're not on the home page, navigate there first with the fragment.
    if (!this.router.url.startsWith('/#') && this.router.url !== '/') {
      this.router.navigate(['/'], { fragment });
    } else {
      // If already on the home page, just scroll.
      if (typeof document !== 'undefined') {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }
}