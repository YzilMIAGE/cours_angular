import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  hasError = false;
  errorText = '';
  lastNameFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))(?=.{6,})/),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleSubmit() {
    if (
      !this.passwordFormControl.errors &&
      !this.emailFormControl.errors &&
      !this.lastNameFormControl.errors &&
      !this.firstNameFormControl.errors
    ) {
      this.AuthService.register({
        lastName: this.lastNameFormControl.value,
        firstName: this.firstNameFormControl.value,
        mail: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      }).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('token', data.token.toString());
          localStorage.setItem('userId', data.user._id);
          if (data.role == 'admin') {
            this.AuthService.setAdmin(true);
          } else {
            this.AuthService.setAdmin(false);
          }
          this.AuthService.setLogIn(true);
          this.router.navigate(['/']);
        },
        (error) => {
          this.hasError = true;
          if (error.status == 400) {
            this.errorText =
              'Adresse mail déjà prise, veuillez en choisir une autre';
          } else {
            this.errorText = 'Une erreur est survenue, veuillez réessayer';
          }
        }
      );
    }
  }
}
