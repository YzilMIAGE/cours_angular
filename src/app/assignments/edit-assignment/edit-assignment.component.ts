import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignments } from '../assignments.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignments | undefined;
  nomAssignment!: string;
  dateRendu!: Date;

  constructor(
    private iAssignmentsService: AssignmentsService,
    private iRoute: ActivatedRoute,
    private iRouter: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const aAssignmentId = +this.iRoute.snapshot.params['id'];

    this.iAssignmentsService
      .getAssignment(aAssignmentId)
      .subscribe((aAssignment) => {
        if (!aAssignment.nom) return;

        this.assignment = aAssignment;
        this.nomAssignment = aAssignment.nom;
        this.dateRendu = aAssignment.dateRendu;
      });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateRendu = this.dateRendu;

    this.iAssignmentsService
      .updateAssignment(this.assignment)
      .subscribe((aMessage) => {
        console.log(aMessage);
        this.iRouter.navigate(['/home']);
      });
  }
}
