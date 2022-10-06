import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignments } from './assignments.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon Application sur les Assignments';
  assignmentPicked: any = undefined;
  isFormVisible = false;
  assignments!: Assignments[];

  constructor(private iAssignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    this.iAssignmentsService
      .getAssignments()
      .subscribe((aObservableAssignments) => {
        this.assignments = aObservableAssignments;
      });
  }

  assignmentClick(iAssignment: Assignments) {
    this.assignmentPicked = iAssignment;
  }

  onAddAssignmentBtnClick() {
    this.isFormVisible = true;
  }

  onNewAssigment(iEvent: Assignments) {
    this.iAssignmentsService.addAssignment(iEvent).subscribe((aResponse) => {
      console.log(aResponse);
    });
    this.isFormVisible = false;
  }
}
