import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProjectosRoutingModule } from './edit-projectos-routing.module';
import { EditProjectosComponent } from './edit-projectos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [EditProjectosComponent],
  imports: [
    CommonModule,
    EditProjectosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class EditProjectosModule { }
