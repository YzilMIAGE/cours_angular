import { Injectable } from '@angular/core';
import {
  Assignments,
  AssignmentsPaginate,
} from '../assignments/assignments.model';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignments[] = [];
  // uri = 'http://localhost:8010/api/assignments';
  uri = 'https://api-cours-angular.herokuapp.com/api/assignments';
  constructor(private http: HttpClient) {}

  getAssignments(
    pageIndex: number,
    search: string = '',
    rendu: number = 3
  ): Observable<AssignmentsPaginate> {
    return this.http.get<AssignmentsPaginate>(
      this.uri + '?page=' + pageIndex + '&search=' + search + '&rendu=' + rendu
    );
  }

  addAssignment(iAssignment: Assignments): Observable<any> {
    return this.http.post<Assignments>(this.uri, iAssignment);
  }

  updateAssignment(iAssignment: Assignments): Observable<string> {
    return this.http.put<string>(this.uri, iAssignment);
  }

  deleteAssignment(iAssignmentId: string): Observable<string> {
    return this.http.delete<string>(this.uri + '/' + iAssignmentId);
  }

  getAssignment(id: String): Observable<Assignments> {
    return this.http.get<Assignments>(this.uri + '/' + id);
  }
}
