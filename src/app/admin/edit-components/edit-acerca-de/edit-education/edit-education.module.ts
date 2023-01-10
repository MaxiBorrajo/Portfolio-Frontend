import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEducationRoutingModule } from './edit-education-routing.module';
import { EditEducationComponent } from './edit-education.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EditEducationComponent
  ],
  imports: [
    CommonModule,
    EditEducationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class EditEducationModule { }
