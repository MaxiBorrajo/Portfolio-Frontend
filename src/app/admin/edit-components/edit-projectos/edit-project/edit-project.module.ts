import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProjectRoutingModule } from './edit-project-routing.module';
import { EditProjectComponent } from './edit-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip'; 

@NgModule({
  declarations: [
    EditProjectComponent
  ],
  imports: [
    CommonModule,
    EditProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatTooltipModule
  ]
})
export class EditProjectModule { }
