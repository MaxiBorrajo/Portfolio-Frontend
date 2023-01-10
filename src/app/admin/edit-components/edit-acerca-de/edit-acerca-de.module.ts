import { NgModule } from '@angular/core';
import { CommonModule, FormatWidth } from '@angular/common';

import { EditAcercaDeRoutingModule } from './edit-acerca-de-routing.module';
import { EditAcercaDeComponent } from './edit-acerca-de.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [EditAcercaDeComponent],
  imports: [
    CommonModule,
    EditAcercaDeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class EditAcercaDeModule { }
