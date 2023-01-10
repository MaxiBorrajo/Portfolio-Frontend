import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpectadorGuard } from 'src/app/guards/expectador.guard';
import { AcercaDeComponent } from './acerca-de.component';

const routes: Routes = [
  {path: '', component:AcercaDeComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcercaDeRoutingModule { }
