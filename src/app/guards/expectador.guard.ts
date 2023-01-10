import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ExpectadorGuard implements CanActivate {

  //Metodos
  canActivate(
    //Metodo para limitar la navegación entre rutas
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginService.isLoggedIn()){
        return true;
      }else{
        this.router.navigate(['']);
        alert("Primero debes cerrar sesion");
        return false;
      }
  }
  
  //Constructor
  constructor(private loginService:LoginService, private router:Router){
    
  }
}
