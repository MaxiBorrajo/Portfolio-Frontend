import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { EditProjectosComponent } from './edit-projectos.component';

const routes: Routes = [
  {path:'', component:EditProjectosComponent},
  {path:'edit-project/:id', 
  loadChildren:() => import('./edit-project/edit-project.module').then(m => m.EditProjectModule),
  canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProjectosRoutingModule { }
