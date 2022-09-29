import { Component, OnInit } from '@angular/core';
import { Assignments } from './assignments.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Mon Application sur les Assignments";
  assignmentPicked:Assignments = new Assignments();
  ajoutActive = false;
  isFormVisible = false;


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

  assignmentClick(iAssignment:Assignments) {
    this.assignmentPicked = iAssignment;
  }

  onAddAssignmentBtnClick() {
    this.isFormVisible = true;
  }

  onNewAssigment(iEvent:Assignments) {
    this.assignments.push(iEvent);
    this.isFormVisible = false;
  }

  onDeleteAssignment(iEvent:Assignments) {
    this.assignments = this.assignments.filter(aAssignment => aAssignment.nom !== iEvent.nom);
  }
}
