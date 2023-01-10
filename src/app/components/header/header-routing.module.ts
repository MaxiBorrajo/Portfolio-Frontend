import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpectadorGuard } from 'src/app/guards/expectador.guard';
import { HeaderComponent } from './header.component';

const routes: Routes = [
  {path: '', component:HeaderComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
