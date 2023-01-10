import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpectadorGuard } from 'src/app/guards/expectador.guard';
import { ContactoComponent } from './contacto.component';

const routes: Routes = [
  {path: '', component:ContactoComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactoRoutingModule { }
