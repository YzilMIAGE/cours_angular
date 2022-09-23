import { Component, OnInit } from '@angular/core';
import { Assignments } from './assignments.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Mon Application sur les Assignments";

  ajoutActive = false;
  
  dateRendu:Date = new Date();
  nomDevoir:string = "";

  assignments = [{
    nom: "TP de Java",
    dateRendu: new Date('2022-10-10'),
    rendu: true
  }, {
    nom: "TP de React",
    dateRendu: new Date('2022-09-10'),
    rendu: false
  }, {
    nom: "TP d'Angular",
    dateRendu: new Date('2022-08-10'),
    rendu: true
  }]

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
  }

  onSubmit() {
    const newAssignment = new Assignments();
    newAssignment.nom= this.nomDevoir;
    newAssignment.dateRendu = this.dateRendu;
    newAssignment.rendu = false;

    this.assignments.push(newAssignment)
  }

}
