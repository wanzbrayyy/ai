import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api'

  constructor(private http: HttpClient) {}

  async signIn(email: string, password: string, rememberMe?: boolean): Promise<any> {
    return await this.http.post(`${this.apiUrl}/login`, { email, password, rememberMe }).toPromise()
  }

  async signUp(email: string, password: string, fullName?: string): Promise<any> {
    return await this.http.post(`${this.apiUrl}/signup`, { email, password, fullName }).toPromise()
  }
}
