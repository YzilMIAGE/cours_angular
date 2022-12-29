import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class User {
  _id!: String;
  mail!: String;
  role!: String;
  lastName!: String;
  firstName!: String;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
//   uri = 'http://localhost:8010/api/users';
  uri = 'https://api-cours-angular.herokuapp.com/api/users';
  constructor(private http: HttpClient) {}

  getUser(id: string | null): Observable<User> {
    return this.http.get<User>(this.uri + '/' + id);
  }
}
