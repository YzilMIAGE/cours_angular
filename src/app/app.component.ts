import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  sideNavOpened = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    if (localStorage.getItem('token') && localStorage.getItem('userId')) {
      this.userService
        .getUser(localStorage.getItem('userId'))
        .subscribe((user) => {
          if (user.role === 'admin') {
            this.authService.setAdmin(true);
          }
        });
      this.authService.setLogIn(true);
    }
  }

  public isLogged() {
    return this.authService.isLogged();
  }

  public logout() {
    this.authService.setLogIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}
