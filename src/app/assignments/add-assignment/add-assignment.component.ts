import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignments } from '../../assignments/assignments.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() newAssignment = new EventEmitter<Assignments>();

  dateRendu:Date = new Date();
  nomDevoir:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const aNewAssignment = new Assignments();
    aNewAssignment.nom= this.nomDevoir;
    aNewAssignment.dateRendu = this.dateRendu;
    aNewAssignment.rendu = false;
    this.newAssignment.emit(aNewAssignment);
  }

}
