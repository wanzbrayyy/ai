import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  languageService = inject(LanguageService);
  openItemIndex = signal<number | null>(null);

  toggleItem(index: number): void {
    this.openItemIndex.update(currentIndex => (currentIndex === index ? null : index));
  }
}
