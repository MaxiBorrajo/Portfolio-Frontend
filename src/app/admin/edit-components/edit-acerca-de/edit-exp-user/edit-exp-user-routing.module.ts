import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExpUserComponent } from './edit-exp-user.component';

const routes: Routes = [
  {path: '', component:EditExpUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditExpUserRoutingModule { }
