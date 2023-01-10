import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //Iconos
  faIcon = faEye;

  //Atributos
  formLogin:FormGroup;
  visibilidad:boolean = false;

  //Constructor
  constructor(private formBuilder:FormBuilder,
    private loginService:LoginService,
    private router:Router){
    this.formLogin = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  //Metodos
  formSubmit(event:Event){
    //Metodo para iniciar sesión
    event.preventDefault();
    this.loginService.login(this.formLogin.value).subscribe(
      data => {
        this.loginService.setToken(data);
        this.loginService.getCurrentUser().subscribe(
          user => {
            this.loginService.setUser(user);
            if(this.loginService.getUserRole() == 'ADMIN'){
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
              this.loginService.user = user;
            }else{
              this.loginService.logout();
            }
          }
        )

      },
      error => {
        console.log(error);
      }
    );
  }

  devolverControl(control:string){
    //Metodo para devolver el control de un formulario
    return this.formLogin.get(control);
  }

  view_Password(){
    //Metodo para cambiar la visibilidad de la contraseña
    if(this.visibilidad){
      this.visibilidad = !this.visibilidad
      this.faIcon = faEye;
    }else{
      this.visibilidad = !this.visibilidad
      this.faIcon = faEyeSlash;
    }
  }
}
