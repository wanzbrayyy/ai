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
    this.getSession();
  }

  private async getSession() {
    const { data } = await this.supabase.auth.getSession();
    if (data.session) {
      this.currentUser.set(data.session.user);
      this.isLoggedIn.set(true);
    }
  }

  async signIn(email: string, password: string, rememberMe: boolean): Promise<{ error: AuthError | null }> {
    const credentials: SignInWithPasswordCredentials = { email, password };
    const { error } = await this.supabase.auth.signInWithPassword(credentials);
    if (!error && rememberMe) localStorage.setItem('rememberMe', 'true');
    else localStorage.removeItem('rememberMe');
    return { error };
  }

  async signUp(email: string, password: string, fullName: string): Promise<{ error: AuthError | null }> {
    const credentials: SignUpWithPasswordCredentials = { email, password };
    const { error } = await this.supabase.auth.signUp({
      ...credentials,
      options: { data: { full_name: fullName } }
    });
    return { error };
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    return this.supabase.auth.signOut();
  }
}
