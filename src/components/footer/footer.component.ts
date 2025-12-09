import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  languageService = inject(LanguageService);
  currentYear = new Date().getFullYear();
  socials = [
    { icon: 'fa-brands fa-twitter', url: '#' },
    { icon: 'fa-brands fa-github', url: '#' },
    { icon: 'fa-brands fa-linkedin-in', url: '#' },
    { icon: 'fa-brands fa-youtube', url: '#' },
  ];
}