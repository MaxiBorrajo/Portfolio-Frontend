import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoComponent } from './contacto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactoComponent
  ],
  imports: [
    CommonModule,
    ContactoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ContactoComponent]
})
export class ContactoModule { }
