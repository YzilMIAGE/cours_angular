import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignments } from '../assignments.model';
import { FormControl, Validators } from '@angular/forms';
import { Subject, SubjectsService } from 'src/app/shared/subjects.service';
import { AuthService } from 'src/app/shared/auth.service';
import { formatDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  hasError = false;
  errorText = '';
  notes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  matieres!: Subject[];
  rendu!: boolean;
  assignment!: Assignments | undefined;
  assignmentId = '';
  dateDeRendu = new FormControl('', [Validators.required]);
  note = new FormControl(0, [Validators.required]);
  matiere = new FormControl('', [Validators.required]);
  auteur = new FormControl('', [Validators.required]);
  nom = new FormControl('', [Validators.required]);
  remarques = new FormControl('');

  constructor(
    private iAssignmentsService: AssignmentsService,
    private authService: AuthService,
    private subjectsService: SubjectsService,
    private iRoute: ActivatedRoute,
    private iRouter: Router
  ) {
    this.getAssignment();
  }

  ngOnInit(): void {}

  getAssignment() {
    const aAssignmentId = this.iRoute.snapshot.params['id'];

    this.iAssignmentsService
      .getAssignment(aAssignmentId)
      .subscribe((aAssignment) => {
        if (!aAssignment.nom) return;

        this.assignment = aAssignment;
        this.rendu = aAssignment.rendu;
        this.assignmentId = aAssignment._id;
        this.dateDeRendu.setValue(formatDate(aAssignment.dateDeRendu));

        this.matiere.setValue(aAssignment.subjectId);
        this.auteur.setValue(aAssignment.auteur);
        this.nom.setValue(aAssignment.nom);
        if (aAssignment.note !== -1) {
          this.note.setValue(aAssignment.note);
        }
        this.remarques.setValue(aAssignment.remarques);
      });

    this.subjectsService.getSubjects().subscribe((aSubjects) => {
      this.matieres = aSubjects;
    });
  }

  handleSubmit() {
    if (
      !this.nom.errors &&
      !this.dateDeRendu.errors &&
      !this.auteur.errors &&
      this.nom.value &&
      this.auteur.value &&
      this.dateDeRendu.value &&
      this.matiere.value &&
      this.assignmentId
    ) {
      const aModifiedAssignment = new Assignments();
      aModifiedAssignment.nom = this.nom.value;
      aModifiedAssignment.dateDeRendu = new Date(this.dateDeRendu.value);
      aModifiedAssignment.auteur = this.auteur.value;
      if (this.note.value) {
        aModifiedAssignment.note = this.note.value;
      } else {
        aModifiedAssignment.note = 0;
      }
      aModifiedAssignment.rendu = this.rendu;
      if (this.remarques.value) {
        aModifiedAssignment.remarques = this.remarques.value;
      } else {
        aModifiedAssignment.remarques = '';
      }
      aModifiedAssignment.subjectId = this.matiere.value;
      aModifiedAssignment._id = this.assignmentId;
      this.iAssignmentsService.updateAssignment(aModifiedAssignment).subscribe(
        () => {
          this.iRouter.navigate(['/']);
        },
        () => {
          this.hasError = true;
          this.errorText = 'Une erreur est survenue';
        }
      );
    } else {
      this.hasError = true;
      this.errorText = "Veuillez remplir l'ensemble des champs requis";
    }
  }

  handleDeletion() {
    this.iAssignmentsService.deleteAssignment(this.assignmentId).subscribe(
      (aMessage) => {
        console.log(aMessage);
        this.iRouter.navigate(['/']);
      },
      () => {
        this.hasError = true;
        this.errorText = 'Une erreur est survenue, merci de réessayer';
      }
    );
  }

  handleRenduChange() {
    this.rendu = !this.rendu;
  }

  isLogged() {
    return this.authService.isLogged();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
