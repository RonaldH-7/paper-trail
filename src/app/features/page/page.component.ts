import { Component } from "@angular/core";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {}

    logout() {
        this.authService.logout()
            .then(() => this.router.navigate(['/']))
            .catch((err) => console.log(err.message));
    }
}