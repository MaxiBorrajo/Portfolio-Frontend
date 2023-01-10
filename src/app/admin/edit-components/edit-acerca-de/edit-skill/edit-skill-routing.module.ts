import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSkillComponent } from './edit-skill.component';

const routes: Routes = [
  {path: '', component:EditSkillComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSkillRoutingModule { }
