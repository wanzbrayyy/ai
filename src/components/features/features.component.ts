import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsChartComponent } from '../analytics-chart/analytics-chart.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, AnalyticsChartComponent],
  templateUrl: './features.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent {
  languageService = inject(LanguageService);

  features = computed(() => [
    {
      icon: 'fa-solid fa-microchip',
      title: this.languageService.translate('advancedProcessing'),
      description: this.languageService.translate('advancedProcessingDesc'),
      aos: 'fade-right',
    },
    {
      icon: 'fa-solid fa-robot',
      title: this.languageService.translate('intelligentAutomation'),
      description: this.languageService.translate('intelligentAutomationDesc'),
      aos: 'fade-left',
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: this.languageService.translate('predictiveAnalytics'),
      description: this.languageService.translate('predictiveAnalyticsDesc'),
      aos: 'fade-right',
    },
     {
      icon: 'fa-solid fa-shield-halved',
      title: this.languageService.translate('robustSecurity'),
      description: this.languageService.translate('robustSecurityDesc'),
      aos: 'fade-left',
    }
  ]);
}