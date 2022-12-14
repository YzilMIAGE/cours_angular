import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.service';

export class authUser {
  user!: User;
  token!: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = false;
  // uri = 'http://localhost:8010/api/users';
  uri = 'https://angular-back-rendu.herokuapp.com/api/users';

  constructor(private http: HttpClient) {}

  register(iFormValues: object) {
    return this.http.post<authUser>(this.uri + '/register', iFormValues);
  }

  logIn(iFormValues: object) {
    return this.http.post<authUser>(this.uri + '/login', iFormValues);
  }

  setLogIn(iValue: boolean) {
    this.loggedIn = iValue;
  }

  setAdmin(iValue: boolean) {
    this.admin = iValue;
  }

  isLogged() {
    return this.loggedIn;
  }

  isAdmin() {
    return this.admin;
  }
}
