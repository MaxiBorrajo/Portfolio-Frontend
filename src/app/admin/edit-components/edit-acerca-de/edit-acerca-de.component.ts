import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { InfoService } from 'src/app/services/info.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.scss']
})
export class EditAcercaDeComponent {

  //Iconos
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  //Atributos
  infoUserForm: FormGroup;
  expUserForm: FormGroup;
  educationForm: FormGroup;
  skillForm: FormGroup;
  public expUser: any;
  public educationUser: any;
  public skills: any;
  username: string;
  selectedInfoFile: any;


  //Constructor
  constructor(private formBuilder: FormBuilder, private infoService: InfoService,
    private loginService: LoginService) {
    this.infoUserForm = this.formBuilder.group({
      id_InfoUser: [0],
      name: [''],
      last_name: [''],
      photo: [''],
      cloud_id: [''],
      title: [''],
      description: ['']
    });
    this.expUserForm = this.formBuilder.group({
      id_ExpUser: [0],
      workplace: [''],
      job: [''],
      period: [''],
      acts_perform: ['']
    });
    this.educationForm = this.formBuilder.group({
      id_EducationUser: [0],
      title: [''],
      institution: [''],
      inst_brand: [''],
      cloud_id: [''],
      period: ['']
    });
    this.skillForm = this.formBuilder.group({
      id_skill: [0],
      skill: [''],
      percentage: [0, [Validators.max(100), Validators.min(0)]]
    });
    this.username = this.loginService.getUser().username;
  }

  //Metodos
  ngOnInit() {
    this.cargarInfoUser();
    this.cargarExpUser();
    this.cargarEducationUser();
    this.cargarSkills();
  }

  cargarInfoUser() {
    //Metodo para obtener información de un usuario
    this.infoService.getInfoByUsername("info", this.username).subscribe(
      resp => {
        this.infoUserForm.setValue(resp);
      }
    );
  }

  cargarExpUser() {
    //Metodo para obtener la experiencia laboral de un usuario
    this.infoService.getInfoByUsername("exp_user", this.username).subscribe(
      resp => {
        this.expUser = resp;
      }
    )
  }

  cargarEducationUser() {
    //Metodo para obtener educación de un usuario
    this.infoService.getInfoByUsername("education", this.username).subscribe(
      resp => {
        this.educationUser = resp;
      }
    )
  }

  cargarSkills() {
    //Metodo para cargar la habilidades de un usuario
    this.infoService.getInfoByUsername("skill", this.username).subscribe(
      resp => {
        this.skills = resp;
      }
    )
  }

  deleteExpUser(url: string, id: string) {
    //Metodo para eliminar la experiencia de un usuario
    for (let exp of this.expUser) {
      if (exp.id_ExpUser == id) {
        let indice = this.expUser.indexOf(exp); // obtenemos el indice
        this.expUser.splice(indice, 1);
      }
    }
    this.infoService.deleteInfo(url, id).subscribe(
      resp => {
        console.log(resp)
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteEducationUser(url: string, id: string) {
    //Metodo para eliminar la educación de un usuario
    const path = "eduUser/" + id + "/eduUser_" + id;
    for (let edu of this.educationUser) {
      if (edu.id_EducationUser == id) {
        let indice = this.educationUser.indexOf(edu); // obtenemos el indice
        this.educationUser.splice(indice, 1);
      }
    }
    this.infoService.deleteInfo(url, id).subscribe(
      resp => {
        console.log(resp)
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteSkill(url: string, id: string) {
    //Metodo para eliminar la habilidad de un usuario
    for (let skill of this.skills) {
      if (skill.id_skill == id) {
        let indice = this.skills.indexOf(skill); // obtenemos el indice
        this.skills.splice(indice, 1);
      }
    }
    this.infoService.deleteInfo(url, id).subscribe(
      resp => {
        console.log(resp)
      },
      error => {
        console.log(error);
      }
    )
  }

  formSubmitInfo(e: Event, url: string, form: FormGroup) {
    //Metodo para editar la información del usuario actual
    e.preventDefault();
    let username = this.loginService.getUser().username;
    this.infoService.postInfo(url, form.value, username).subscribe(
      data => {
        console.log(data)
        if(this.infoUserForm.get('photo')?.value != '' && 
        this.infoUserForm.get('photo')?.value != null){
          this.uploadInfoPhoto(url);
        }else{
          this.cargarInfoUser();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  uploadInfoPhoto(url: string){
    let username = this.loginService.getUser().username;
    this.infoService.postPhotoInfo(url, username, this.selectedInfoFile).subscribe(
      resp => {
        console.log(resp)
        this.cargarInfoUser();
      }
    )
  }

  formSubmit(url: string, form: FormGroup) {
    //Metodo para subir información a la base de datos segun corresponda
    let username = this.loginService.getUser().username;
    this.infoService.postInfo(url, form.value, username).subscribe(
      data => {
        console.log(data)
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  selectInfoFile(event: any) {
    //Metodo para obtener la imagen seleccionada en un input file
    const file = event.target.files[0];
    this.selectedInfoFile = file;
  }


  deleteInfoImg() {
    //Metodo para eliminar la imagen en la información de usuario
    const url = "infouser/perfil_" + this.username;
    this.infoUserForm.get('photo')?.setValue('');
    this.infoUserForm.get('cloud_id')?.setValue('');
    this.infoService.deletePhotoInfo('info', this.username).subscribe(
      resp =>{
        console.log(resp);
        this.infoService.postInfo('info', this.infoUserForm.value, this.username).subscribe(
          data => {
            console.log(data);
            this.cargarInfoUser();
          },
          error => {
            console.log(error);
          }
        );
      }
    )
  }

  devolverControl(control: string, form: FormGroup) {
    //Metodo para devolver el control de un formulario
    return form.get(control);
  }

}
