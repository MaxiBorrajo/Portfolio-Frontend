import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { InfoService } from 'src/app/services/info.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-exp-user',
  templateUrl: './edit-exp-user.component.html',
  styleUrls: ['./edit-exp-user.component.css']
})
export class EditExpUserComponent {

  //Iconos
  faArrowLeftLong = faArrowLeftLong;

  //Atributos
  expUserForm:FormGroup;
  id:number;

  //Constructor
  constructor(private formBuilder:FormBuilder, private infoService:InfoService,
    private loginService:LoginService, private _router:Router, private route:ActivatedRoute){
      this.expUserForm = this.formBuilder.group({
        id_ExpUser: [0],
        workplace: [''],
        job: [''],
        period: [''],
        acts_perform: ['']
      });
      this.id = Number(route.snapshot.paramMap.get('id'));
  }

  //Metodos
  ngOnInit() {
    this.cargarExpUser(this.id);
  }
  
  cargarExpUser(id:number){
    //Metodo para cargar la experiencia laboral de un usuario por su id
    let username = this.loginService.getUser().username;
    this.infoService.getInfoById("exp_user", id).subscribe(
      resp => {
        console.log(resp)
        this.expUserForm.setValue(resp);
      }
    );
  }

  goBack(): void {
    //Metodo para ir a la ruta anterior a la actual
    this._router.navigateByUrl('/admin/edit-acerca-de').then(
      () => {
        this._router.navigate(['/admin/edit-acerca-de'])
      }
    );
  }

  formSubmit(event:Event, url:string, form:FormGroup){
    //Metodo para editar la experiencia laboral actual
    event.preventDefault();
    let username = this.loginService.getUser().username;
    this.infoService.postInfo(url, form.value, username).subscribe(
      data => {
        console.log(data)
        this.goBack();
      },
      error => {
        console.log(error);
      }
    )
  }
}
