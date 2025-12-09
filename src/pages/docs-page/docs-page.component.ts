import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-docs-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docs-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPageComponent {
  languageService = inject(LanguageService);
  dashboardService = inject(DashboardService);

  models = this.dashboardService.getModels();
  modelsJson = computed(() => JSON.stringify(this.models, null, 2));

  curlCommand = `curl -X POST http://146.190.98.149:3000/chat \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "model": "llama3",
    "prompt": "Write a simple html code"
  }'`;

  copiedState = signal<'none' | 'curl' | 'json'>('none');

  copyToClipboard(text: string, type: 'curl' | 'json'): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedState.set(type);
      setTimeout(() => this.copiedState.set('none'), 2000);
    });
  }
}