import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  //Iconos
  faBars = faBars;

  //Atributos
  username!:string;
  menu:boolean = false;

  //Constructores
  constructor(public router:Router,
    public loginService:LoginService){
  }

  ngOnInit(){
    this.username = this.loginService.getUser().username;
  }

  //Metodos
  public isLoggedIn(){
    //Metodo que indica si el usuario actual está logueado
    return this.loginService.isLoggedIn();
  }

  logout(){
    //Metodo para cerrar sesión
    console.log("logout")
    this.loginService.logout();
    this.menu = false;
    this.router.navigate(['']);
  }


  navigate(ruta:string){
    //Metodo para navegar entre rutas
    if(!this.isLoggedIn()){
      this.router.navigate(['/' + ruta]);
      this.menu = false;
    }else{
      this.router.navigate(['admin/edit-' + ruta]);
      this.menu = false;
    }
  }

  getUsername(){
    //Metodo para obtener el Username del usuario actual
    this.username = this.loginService.user.username;
    return this.username;
  }

  isCurrentUrl(url:string){
    //Metodo indica si *url* conside con la url actual 
    return this.router.url == "/" + url ||
    this.router.url == "/admin/edit-" + url ||
    this.router.url == "/edit-" + url
  }

  openMenu(){
    //Metodo para abrir el menu desplegable
    this.menu = !this.menu;
  }
}
