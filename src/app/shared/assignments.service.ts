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
  // assignments: Assignments[] = [
  //   {
  //     id: 1,
  //     nom: 'TP de Java',
  //     dateRendu: new Date('2022-10-10'),
  //     rendu: true,
  //   },
  //   {
  //     id: 2,
  //     nom: 'TP de React',
  //     dateRendu: new Date('2022-09-10'),
  //     rendu: false,
  //   },
  //   {
  //     id: 3,
  //     nom: "TP d'Angular",
  //     dateRendu: new Date('2022-08-10'),
  //     rendu: true,
  //   },
  // ];
  uri = 'http://localhost:8010/api/assignments';
  constructor(
    private iLoggingService: LoggingService,
    private http: HttpClient
  ) {}

  getAssignments(pageIndex: number): Observable<AssignmentsPaginate> {
    return this.http.get<AssignmentsPaginate>(this.uri + '?page=' + pageIndex);
  }

  addAssignment(iAssignment: Assignments): Observable<any> {
    // this.assignments.push(iAssignment);
    // this.iLoggingService.log(iAssignment.nom, 'Correctly Added');
    // return of('Assignment Added');
    return this.http.post<Assignments>(this.uri, iAssignment);
  }

  updateAssignment(iAssignment: Assignments): Observable<string> {
    // iAssignment.rendu = true;
    // this.iLoggingService.log(iAssignment.nom, 'Correctly Updated');
    // return of('Assignment Updated');
    return this.http.put<string>(this.uri, iAssignment);
  }

  deleteAssignment(iAssignment: Assignments): Observable<string> {
    // let aAssignmentPosition = this.assignments.indexOf(iAssignment);
    // this.assignments.splice(aAssignmentPosition, 1);
    // this.iLoggingService.log(iAssignment.nom, 'Correctly Deleted ');
    // return of('Assignment Deleted');
    return this.http.delete<string>(this.uri + '/' + iAssignment._id);
  }

  getAssignment(id: Number): Observable<Assignments> {
    // const aAssignment = this.assignments.find(
    //   (aAssignment) => aAssignment.id === id
    // );
    // if (aAssignment) {
    //   return of(aAssignment);
    // }
    // return of(new Assignments());
    return this.http.get<Assignments>(this.uri + '/' + id);
  }
}
