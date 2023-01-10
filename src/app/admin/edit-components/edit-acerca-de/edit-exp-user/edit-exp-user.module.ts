import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExpUserRoutingModule } from './edit-exp-user-routing.module';
import { EditExpUserComponent } from './edit-exp-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EditExpUserComponent
  ],
  imports: [
    CommonModule,
    EditExpUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class EditExpUserModule { }
