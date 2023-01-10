import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpectadorGuard } from 'src/app/guards/expectador.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {path: '', component:LoginComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
