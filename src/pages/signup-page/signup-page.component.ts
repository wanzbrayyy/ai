import { Component } from '@angular/core'
import { AuthService } from '../../app/services/auth.service'

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  email = ''
  password = ''
  fullName = ''

  constructor(private authService: AuthService) {}

  async onSubmit() {
    try {
      const res = await this.authService.signUp(this.email, this.password, this.fullName)
      console.log('Signup success:', res)
    } catch (err) {
      console.error('Signup error:', err)
    }
  }
}
