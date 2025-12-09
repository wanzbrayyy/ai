import { Injectable, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

export interface ApiKey {
  id: string;
  user_id: string;
  api_key: string;
  created_at: string;
  requests_today: number;
  last_used_at: string | null;
}

export interface AiModel {
  name: string;
  id: string;
  size: string;
  modified: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private supabase = inject(SupabaseService).client;
  private authService = inject(AuthService);
  
  private models: AiModel[] = [
      { name: 'qwen:latest', id: 'd53d04290064', size: '2.3 GB', modified: '13 minutes ago' },
      { name: 'qwen2.5:1.5b', id: '65ec06548149', size: '986 MB', modified: '23 minutes ago' },
      { name: 'llama3:latest', id: '365c0bd3c000', size: '4.7 GB', modified: '24 minutes ago' }
  ];

  getModels(): AiModel[] {
    return this.models;
  }
  
  async getApiKeys(): Promise<ApiKey[]> {
    const user = this.authService.currentUser();
    if (!user) return [];

    const { data, error } = await this.supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API keys:', error);
      return [];
    }
    return data as ApiKey[];
  }

  async generateApiKey(): Promise<ApiKey | null> {
     const user = this.authService.currentUser();
     if (!user) return null;

     const newKey = `wanz-${uuidv4()}`;

     const { data, error } = await this.supabase
        .from('api_keys')
        .insert({
            user_id: user.id,
            api_key: newKey,
            requests_today: 0,
            last_used_at: null
        })
        .select()
        .single();
    
     if (error) {
        console.error('Error generating API key:', error);
        return null;
     }

     return data as ApiKey;
  }
}