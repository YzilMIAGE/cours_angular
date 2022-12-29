import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class Subject {
  _id!: String;
  name!: String;
  photoPass!: String;
}

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  // uri = 'http://localhost:8010/api/subjects';
  uri = 'https://api-cours-angular.herokuapp.com/api/subjects';

  constructor(private http: HttpClient) {}

  getSubject(id: String): Observable<Subject> {
    return this.http.get<Subject>(this.uri + '/' + id);
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.uri);
  }
}
