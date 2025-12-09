import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public client: SupabaseClient;

  constructor() {
    // These are your new Supabase credentials.
    const supabaseUrl = 'https://dhedqrmqtjslxpduduud.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZWRxcm1xdGpzbHhwZHVkdXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNjc4NDgsImV4cCI6MjA4MDg0Mzg0OH0.R1J35B4ddSkfPMPkdhdL31Yn_iqPvMxovQ0bRpTTwjg';
    
    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase URL and Key are not configured.');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }
}