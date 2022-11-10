import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Assignments } from '../../assignments/assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmitted!: Assignments;

  constructor(
    private iAssignmentsService: AssignmentsService,
    private iRoute: ActivatedRoute,
    private iRouter: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAssignment();

    console.log('Query Params :');
    console.log(this.iRoute.snapshot.params['id']);
    console.log('Fragment : ');
    console.log(this.iRoute.snapshot.fragment);
  }

  getAssignment() {
    const aAssignmentId = +this.iRoute.snapshot.params['id'];
    this.iAssignmentsService
      .getAssignment(aAssignmentId)
      .subscribe((aAssignment) => (this.assignmentTransmitted = aAssignment));
  }

  onAssignmentSent() {
    this.assignmentTransmitted.rendu = true;

    this.iAssignmentsService
      .updateAssignment(this.assignmentTransmitted)
      .subscribe((aResponse) => {
        console.log(aResponse);
        this.iRouter.navigate(['/home']);
      });

    this.iRouter.navigate(['/home']);
  }

  onDeleteAssignmentBtnClick() {
    this.iAssignmentsService
      .deleteAssignment(this.assignmentTransmitted)
      .subscribe((aResponse) => {
        console.log(aResponse);
      });

    this.iRouter.navigate(['/home']);
  }

  onClickEdit() {
    this.iRouter.navigate(
      ['/assignment', this.assignmentTransmitted.id, 'edit'],
      {
        queryParams: {
          nom: this.assignmentTransmitted.nom,
        },
        fragment: 'edition',
      }
    );
  }

  isAdmin() {
    return this.authService.loggedIn;
  }
}
