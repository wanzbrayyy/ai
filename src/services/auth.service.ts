import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User, AuthError, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase = inject(SupabaseService).client;
  
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.currentUser.set(session.user);
        this.isLoggedIn.set(true);
      } else {
        this.currentUser.set(null);
        this.isLoggedIn.set(false);
      }
    });
    // Initial check
    this.getSession();
  }

  private async getSession() {
    const { data } = await this.supabase.auth.getSession();
    if (data.session) {
       this.currentUser.set(data.session.user);
       this.isLoggedIn.set(true);
    }
  }

  signIn(credentials: SignInWithPasswordCredentials, rememberMe: boolean): Promise<{ error: AuthError | null }> {
    return this.supabase.auth.signInWithPassword({
      ...credentials,
      options: {
        // Supabase uses localStorage by default. If 'rememberMe' is false, we can't easily switch to session storage
        // without more complex logic. The default behavior is usually desirable.
        // This is a placeholder for how you might handle it if you had more complex requirements.
      }
    });
  }

  signUp(credentials: SignUpWithPasswordCredentials, fullName: string): Promise<{ error: AuthError | null }> {
    return this.supabase.auth.signUp({
      ...credentials,
      options: {
        data: {
          full_name: fullName
        }
      }
    });
  }

  signOut(): Promise<{ error: AuthError | null }> {
    return this.supabase.auth.signOut();
  }
}
