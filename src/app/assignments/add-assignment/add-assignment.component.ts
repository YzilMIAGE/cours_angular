import { Component, OnInit /*EventEmitter,Output */ } from '@angular/core';
import { Assignments } from '../../assignments/assignments.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { FormControl, Validators } from '@angular/forms';
import { SubjectsService, Subject } from 'src/app/shared/subjects.service';
import { AuthService } from 'src/app/shared/auth.service';
import { formatDate } from 'src/app/shared/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  hasError = false;
  errorText = '';
  notes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  matieres!: Subject[];
  rendu = false;
  dateDeRendu = new FormControl(formatDate(new Date()), [Validators.required]);
  note = new FormControl(0, [Validators.required]);
  matiere = new FormControl('', [Validators.required]);
  auteur = new FormControl('', [Validators.required]);
  nom = new FormControl('', [Validators.required]);
  remarques = new FormControl('');

  nomDevoir: string = '';

  constructor(
    private assignmentsService: AssignmentsService,
    private subjectsService: SubjectsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subjectsService.getSubjects().subscribe((aSubjects) => {
      this.matieres = aSubjects;
    });
  }

  handleSubmit() {
    if (
      !this.auteur.errors &&
      !this.nom.errors &&
      !this.dateDeRendu.errors &&
      this.auteur.value &&
      this.dateDeRendu.value &&
      this.nom.value &&
      this.matiere.value
    ) {
      const aNewAssignment = new Assignments();
      aNewAssignment.nom = this.nom.value;
      aNewAssignment.dateDeRendu = new Date(this.dateDeRendu.value);
      aNewAssignment.auteur = this.auteur.value;
      if (this.note.value) {
        aNewAssignment.note = this.note.value;
      } else {
        aNewAssignment.note = 0;
      }
      aNewAssignment.rendu = this.rendu;
      if (this.remarques.value) {
        aNewAssignment.remarques = this.remarques.value;
      } else {
        aNewAssignment.remarques = '';
      }

      aNewAssignment.subjectId = this.matiere.value;
      this.assignmentsService.addAssignment(aNewAssignment).subscribe(
        (aMessage) => {
          console.log(aMessage);
          this.router.navigate(['/']);
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

  handleRenduChange() {
    this.rendu = !this.rendu;
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
