import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    FontAwesomeModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
