import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faArrowLeftLong, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { InfoService } from 'src/app/services/info.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent {
  //Iconos
  faArrowLeftLong = faArrowLeftLong;
  faTrash = faTrash;

  //Atributos
  skillForm:FormGroup;
  id:number;

  //Constructor
  constructor(private formBuilder:FormBuilder, private infoService:InfoService,
    private loginService:LoginService, private _router:Router, private route:ActivatedRoute,
    private imgService:ImageService){
      this.skillForm = this.formBuilder.group({
        id_skill: [0],
        skill: [''],
        percentage: [0],
        userEntity: [null]
      });
      this.id = Number(route.snapshot.paramMap.get('id'));
  }

  //Metodos
  ngOnInit() {
    this.cargarSkills(this.id);
  }

  cargarSkills(id:number){
    //Cargar una habilidad por su id
    this.infoService.getInfoById("skill", id).subscribe(
      resp => {
        this.skillForm.setValue(resp);
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
    //Metodo para editar la habilidad actual
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
    );
  }

  devolverControl(control:string, form:FormGroup){
    //Metodo para devolver el control de un formulario
    return form.get(control);
  }

}
