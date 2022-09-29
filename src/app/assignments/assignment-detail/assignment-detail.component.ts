import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Assignments } from '../../assignments/assignments.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmitted:Assignments = new Assignments();
  @Output() deleteAssignment = new EventEmitter<Assignments>();

  constructor() { }

  ngOnInit(): void {
  }

  onAssignmentSent() {
    this.assignmentTransmitted.rendu = true;
  }

  onDeleteAssignmentBtnClick() {
    const aAssignmentToDelete = new Assignments();
    aAssignmentToDelete.nom= this.assignmentTransmitted.nom;
    aAssignmentToDelete.dateRendu = this.assignmentTransmitted.dateRendu;
    aAssignmentToDelete.rendu = this.assignmentTransmitted.rendu;
    this.deleteAssignment.emit(aAssignmentToDelete);
    this.assignmentTransmitted = new Assignments();
  }
}