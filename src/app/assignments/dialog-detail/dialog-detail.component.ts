import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { SubjectsService, Subject } from 'src/app/shared/subjects.service';

import { Assignments } from '../assignments.model';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css'],
})
export class DialogDetailComponent {
  nomMatiere!: String;
  prof!: String;
  constructor(
    private subjectService: SubjectsService,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Assignments
  ) {
    this.subjectService.getSubject(this.data.subjectId).subscribe((data) => {
      this.nomMatiere = data.name;
      this.prof = data.photoPass;
    });
  }

  public isLogged() {
    return this.authService.isLogged();
  }

  public modifyAssignment() {
    this.router.navigate([`/assignment/${this.data._id}/edit`]);
    this.dialogRef.close();
  }
}
