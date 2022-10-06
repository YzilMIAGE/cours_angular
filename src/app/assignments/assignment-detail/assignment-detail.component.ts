import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Assignments } from '../../assignments/assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmitted: any = undefined;

  constructor(private iAssignmentsService: AssignmentsService) {}

  ngOnInit(): void {}

  onAssignmentSent() {
    // this.assignmentTransmitted.rendu = true;

    this.iAssignmentsService
      .updateAssignment(this.assignmentTransmitted)
      .subscribe((aResponse) => {
        console.log(aResponse);
      });
  }

  onDeleteAssignmentBtnClick() {
    this.iAssignmentsService
      .deleteAssignment(this.assignmentTransmitted)
      .subscribe((aResponse) => {
        console.log(aResponse);
      });

    this.assignmentTransmitted = undefined;
  }
}
