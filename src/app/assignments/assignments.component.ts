import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignments } from './assignments.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  pageEvent?: PageEvent;
  page: number = 1;
  filter: number = 0;
  limit: number = 20;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;
  search = new FormControl('');
  titre = 'Mon Application sur les Assignments';
  assignmentPicked: any = undefined;
  isFormVisible = false;
  assignments!: Assignments[];

  constructor(
    private iAssignmentsService: AssignmentsService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAssignementsData(0);
  }

  public getAssignementsData(
    iPageIndex: number,
    search: string = '',
    rendu: number = 3
  ) {
    console.log(iPageIndex, search);
    this.iAssignmentsService
      .getAssignments(iPageIndex + 1, search, rendu)
      .subscribe((data) => {
        console.log(data);
        this.assignments = data.docs;
        this.assignments.forEach((aAssignment, aIndex) => {
          this.assignments[aIndex].dateDeRendu = new Date(
            aAssignment.dateDeRendu
          );
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

  handleRadioChange(iValue: number) {
    this.filter = iValue;
    if (this.search.value && this.search.value.length > 2) {
      this.getAssignementsData(0, this.search.value, this.filter);
    } else {
      this.getAssignementsData(0, '', this.filter);
    }
  }

  handlePageChange(pageIndex: number) {
    if (this.search.value && this.search.value.length > 2) {
      this.getAssignementsData(pageIndex, this.search.value, this.filter);
    } else {
      this.getAssignementsData(pageIndex, '', this.filter);
    }
  }
  assignmentClick(iAssignment: Assignments) {
    this.assignmentPicked = iAssignment;
  }

  openDetails(iAssignment: Assignments) {
    const dialogRef = this.dialog.open(DialogDetailComponent, {
      data: iAssignment,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  handleSearch() {
    console.log(this.search.value);
    if (this.search.value && this.search.value.length > 2) {
      this.getAssignementsData(0, this.search.value, this.filter);
    } else {
      this.getAssignementsData(0, '', this.filter);
    }
  }
}
