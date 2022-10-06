import { Injectable } from '@angular/core';
import { Assignments } from '../assignments/assignments.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignments[] = [
    {
      nom: 'TP de Java',
      dateRendu: new Date('2022-10-10'),
      rendu: true,
    },
    {
      nom: 'TP de React',
      dateRendu: new Date('2022-09-10'),
      rendu: false,
    },
    {
      nom: "TP d'Angular",
      dateRendu: new Date('2022-08-10'),
      rendu: true,
    },
  ];

  constructor(private iLoggingService: LoggingService) {}

  getAssignments(): Observable<Assignments[]> {
    return of(this.assignments);
  }

  addAssignment(iAssignment: Assignments): Observable<string> {
    this.assignments.push(iAssignment);
    this.iLoggingService.log(iAssignment.nom, 'Correctly Added');
    return of('Assignment Added');
  }

  updateAssignment(iAssignment: Assignments): Observable<string> {
    iAssignment.rendu = true;
    this.iLoggingService.log(iAssignment.nom, 'Correctly Updated');
    return of('Assignment Updated');
  }

  deleteAssignment(iAssignment: Assignments): Observable<string> {
    let aAssignmentPosition = this.assignments.indexOf(iAssignment);
    this.assignments.splice(aAssignmentPosition, 1);
    this.iLoggingService.log(iAssignment.nom, 'Correctly Deleted ');
    return of('Assignment Deleted');
  }
}
