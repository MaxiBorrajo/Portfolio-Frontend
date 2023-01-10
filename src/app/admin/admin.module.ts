import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EditAcercaDeModule } from './edit-components/edit-acerca-de/edit-acerca-de.module';
import { EditProjectosModule } from './edit-components/edit-projectos/edit-projectos.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [
    DashboardAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    EditAcercaDeModule,
    EditProjectosModule,
  ]
})
export class AdminModule { }
