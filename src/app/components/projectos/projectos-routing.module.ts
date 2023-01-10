import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpectadorGuard } from 'src/app/guards/expectador.guard';
import { ProjectosComponent } from './projectos.component';

const routes: Routes = [
  {path: '', component:ProjectosComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectosRoutingModule { }
