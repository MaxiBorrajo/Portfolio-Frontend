import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactoService } from 'src/app/services/contacto.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  //Atributos
  contactForm:FormGroup;

  //Constructor
  constructor(private formBuilder:FormBuilder, private userService:UserService,
     private contactoService:ContactoService){
    this.contactForm = this.formBuilder.group({
      fromEmail:['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  //Metodos
  ngOnInit(){
  }

  devolverControl(control:string){
    //Metodo para devolver un control de un formulario
    return this.contactForm.get(control);
  }

  enviarCorreo(event:Event){
    //Metodo para enviar un correo electronico
    event.preventDefault();
    this.contactoService.enviarCorreo(this.contactForm.value).subscribe(
      resp => {
        console.log(resp)
        this.contactForm.reset();
      },
      err => {
        console.log(err)
      }
    )
  }
}
