import { Component } from '@angular/core'
import { AuthService } from '../../app/services/auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email = ''
  password = ''
  rememberMe = false

  constructor(private authService: AuthService) {}

  async onSubmit() {
    try {
      const res = await this.authService.signIn(this.email, this.password, this.rememberMe)
      console.log('Login success:', res)
    } catch (err) {
      console.error('Login error:', err)
    }
  }
}
