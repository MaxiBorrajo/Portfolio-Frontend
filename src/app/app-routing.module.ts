import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { ExpectadorGuard } from './guards/expectador.guard';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path: 'home',
  loadChildren:() => import('./components/header/header.module').then(m => m.HeaderModule)},
  {path: 'acerca-de', 
  loadChildren:() => import('./components/acerca-de/acerca-de.module').then(m => m.AcercaDeModule),
  canActivate: [ExpectadorGuard]},
  {path: 'projectos', 
  loadChildren:() => import('./components/projectos/projectos.module').then(m => m.ProjectosModule),
  canActivate: [ExpectadorGuard]},
  {path: 'contacto', 
  loadChildren:() => import('./components/contacto/contacto.module').then(m => m.ContactoModule),
  canActivate: [ExpectadorGuard]},
  {path: 'login',
  loadChildren:() => import('./components/login/login.module').then(m => m.LoginModule),
  canActivate: [ExpectadorGuard]},
  {path: 'admin',
  loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule),
  canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    useHash: true,
    onSameUrlNavigation: 'reload',
    urlUpdateStrategy: 'eager'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
