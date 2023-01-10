import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { EditAcercaDeComponent } from './edit-acerca-de.component';

const routes: Routes = [
  {path:'', component:EditAcercaDeComponent},
  {path:'edit-exp-user/:id', 
  loadChildren:() => import('./edit-exp-user/edit-exp-user.module').then(m => m.EditExpUserModule),
  canActivate: [AdminGuard]},
  {path:'edit-education-user/:id', 
  loadChildren:() => import('./edit-education/edit-education.module').then(m => m.EditEducationModule),
  canActivate: [AdminGuard]},
  {path:'edit-skill/:id', 
  loadChildren:() => import('./edit-skill/edit-skill.module').then(m => m.EditSkillModule),
  canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAcercaDeRoutingModule { }
