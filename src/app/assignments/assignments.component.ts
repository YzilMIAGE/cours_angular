import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignments } from './assignments.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  pageEvent?: PageEvent;
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;
  titre = 'Mon Application sur les Assignments';
  assignmentPicked: any = undefined;
  isFormVisible = false;
  assignments!: Assignments[];

  constructor(private iAssignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    this.getAssignementsData(0);
  }

  public getAssignementsData(iPageIndex: number) {
    this.iAssignmentsService
      .getAssignments(iPageIndex + 1)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.assignments.forEach((aAssignment, aIndex) => {
          this.assignments[aIndex].dateRendu = new Date(aAssignment.dateRendu);
        });
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
      });
  }

  assignmentClick(iAssignment: Assignments) {
    this.assignmentPicked = iAssignment;
  }

  // onAddAssignmentBtnClick() {
  //   this.isFormVisible = true;
  // }

  // onNewAssigment(iEvent: Assignments) {
  //   this.iAssignmentsService.addAssignment(iEvent).subscribe((aResponse) => {
  //     console.log(aResponse);
  //   });
  //   this.isFormVisible = false;
  // }
}
