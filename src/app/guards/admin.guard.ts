import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  //Constructor
  constructor(private loginService:LoginService, private router:Router){
    
  }

  //Metodos
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Metodo para limitar la navegación entre rutas
      if(this.loginService.isLoggedIn() && this.loginService.getUserRole() == 'ADMIN'){
        return true;
      }else{
        alert("Solo usuarios administradores pueden acceder");
        this.router.navigate(['']);
        return false;
      }
  }
  
}
