import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

// Custom validator to check if passwords match
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordsMismatch: true } : null;
}

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  languageService = inject(LanguageService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  signupForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordsMatchValidator });

  async onSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      this.errorMessage.set(this.languageService.translate('invalidForm'));
      return;
    }
    
    this.loading.set(true);
    this.errorMessage.set(null);
    
    const { fullName, email, password } = this.signupForm.value;

    try {
      const { error } = await this.authService.signUp(email!, password!, fullName!);
      if (error) {
        throw new Error(error.message);
      }
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage.set(this.languageService.translate('signupFailed'));
      console.error('Signup error:', error.message);
    } finally {
      this.loading.set(false);
    }
  }
}