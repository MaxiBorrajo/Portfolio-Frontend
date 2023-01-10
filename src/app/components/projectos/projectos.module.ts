import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectosRoutingModule } from './projectos-routing.module';
import { ProjectosComponent } from './projectos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ProjectosComponent],
  imports: [
    CommonModule,
    ProjectosRoutingModule,
    FontAwesomeModule
  ],
  exports: [ProjectosComponent]
})
export class ProjectosModule { }
