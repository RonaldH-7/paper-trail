import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { GroupService } from '../../../services/group.service';
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
    private readonly router: Router,
    private userService: UserService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
  }

  register(loginData: LoginData) {
    this.authService.register(loginData)
      .then(() => {
        const uid: any = this.authService.getUID();
        this.router.navigate(['/login']);
        this.userService.createUser(uid, loginData.name, loginData.email);
        this.groupService.createGroup(uid);
      })
      .catch((err) => console.log(err.message));
  }
}
