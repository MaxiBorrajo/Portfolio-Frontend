import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcercaDeRoutingModule } from './acerca-de-routing.module';
import { AcercaDeComponent } from './acerca-de.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@NgModule({
  declarations: [AcercaDeComponent],
  imports: [
    CommonModule,
    AcercaDeRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [AcercaDeComponent]
})
export class AcercaDeModule { }
