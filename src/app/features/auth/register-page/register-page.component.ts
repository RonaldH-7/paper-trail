import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LoginData } from '../../../interfaces/login-data.interface';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  register(loginData: LoginData) {
    this.authService.register(loginData)
      .then(() => this.router.navigate(['/login']))
      .catch((err) => console.log(err.message));
  }
}
