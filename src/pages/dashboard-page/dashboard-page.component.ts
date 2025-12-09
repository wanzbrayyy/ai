import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { DashboardService, ApiKey, AiModel } from '../../services/dashboard.service';

const DAILY_LIMIT = 100;

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  authService = inject(AuthService);
  languageService = inject(LanguageService);
  dashboardService = inject(DashboardService);
  router = inject(Router);

  currentUser = this.authService.currentUser;
  apiKeys = signal<ApiKey[]>([]);
  models = signal<AiModel[]>([]);
  
  generatingKey = signal(false);
  copiedKey = signal<string | null>(null);

  dailyLimit = DAILY_LIMIT;
  
  requestsUsedToday = computed(() => 
    this.apiKeys().reduce((acc, key) => acc + key.requests_today, 0)
  );

  usagePercentage = computed(() => {
    if (this.dailyLimit === 0) return 0;
    return (this.requestsUsedToday() / this.dailyLimit) * 100;
  });

  async ngOnInit(): Promise<void> {
    this.models.set(this.dashboardService.getModels());
    await this.loadApiKeys();
  }

  async loadApiKeys(): Promise<void> {
    const keys = await this.dashboardService.getApiKeys();
    this.apiKeys.set(keys);
  }

  async generateNewKey(): Promise<void> {
    this.generatingKey.set(true);
    const newKey = await this.dashboardService.generateApiKey();
    if (newKey) {
      this.apiKeys.update(keys => [...keys, newKey]);
    }
    this.generatingKey.set(false);
  }

  async onLogout(): Promise<void> {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
  
  copyToClipboard(key: string): void {
    navigator.clipboard.writeText(key).then(() => {
      this.copiedKey.set(key);
      setTimeout(() => this.copiedKey.set(null), 2000);
    });
  }
}