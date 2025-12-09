import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  languageService = inject(LanguageService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorMessage.set(this.languageService.translate('invalidForm'));
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const { email, password, rememberMe } = this.loginForm.value;

    try {
      const { error } = await this.authService.signIn(email!, password!, rememberMe!);
      if (error) {
        throw new Error(error.message);
      }
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage.set(this.languageService.translate('loginFailed'));
      console.error('Login error:', error.message);
    } finally {
      this.loading.set(false);
    }
  }
}
