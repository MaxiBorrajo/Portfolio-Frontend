import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  {path:'', redirectTo:'/edit-acerca-de', pathMatch:'full'},
  {
    path:'',
    component:DashboardAdminComponent,
    children:[
      {path: 'edit-acerca-de',
      loadChildren:() => import('./edit-components/edit-acerca-de/edit-acerca-de.module').then(m => m.EditAcercaDeModule),
      canActivate:[AdminGuard]},
      {path: 'edit-projectos', 
      loadChildren:() => import('./edit-components/edit-projectos/edit-projectos.module').then(m => m.EditProjectosModule),
      canActivate: [AdminGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
