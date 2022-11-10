import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Lien de l'appli https://front-cours-angular.herokuapp.com
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  sideNavOpened = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();

      this.router.navigate(['/home']);
    }
  }
}
