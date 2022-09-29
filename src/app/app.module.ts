import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox'

import { RenduDirective } from './shared/rendu.directive';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AddAssignmentComponent,
    AssignmentDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
