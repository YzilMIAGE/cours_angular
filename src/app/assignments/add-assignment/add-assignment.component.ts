import { Component, OnInit /*EventEmitter,Output */ } from '@angular/core';
import { Assignments } from '../../assignments/assignments.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // @Output() newAssignment = new EventEmitter<Assignments>();

  dateRendu: Date = new Date();
  nomDevoir: string = '';

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {}

  onSubmit() {
    const aNewAssignment = new Assignments();
    aNewAssignment.nom = this.nomDevoir;
    aNewAssignment.dateRendu = this.dateRendu;
    aNewAssignment.rendu = false;
    aNewAssignment.id = Math.floor(Math.random()*1000000000);
    this.assignmentsService
      .addAssignment(aNewAssignment)
      .subscribe((aMessage) => console.log(aMessage));
  }
}
