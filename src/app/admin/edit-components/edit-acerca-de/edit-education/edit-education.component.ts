import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowLeftLong, faTrash } from '@fortawesome/free-solid-svg-icons';
import { stringify } from 'querystring';
import { ImageService } from 'src/app/services/image.service';
import { InfoService } from 'src/app/services/info.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent {

  //Iconos
  faArrowLeftLong = faArrowLeftLong;
  faTrash = faTrash;

  //Atributos
  educationForm:FormGroup;
  id:number;
  selectedFile!:File;

  //Constructor
  constructor(private formBuilder:FormBuilder, private infoService:InfoService,
    private loginService:LoginService, private _router:Router, private route:ActivatedRoute,
    private imgService:ImageService){
      this.educationForm = this.formBuilder.group({
        id_EducationUser: [0],
        title: [''],
        institution: [''],
        inst_brand: [''],
        period: [''],
        userEntity: [null]
      });
      this.id = Number(route.snapshot.paramMap.get('id'));
  }

  //Metodos
  ngOnInit() {
    this.cargarEducationUser(this.id);
  }
  
  cargarEducationUser(id:number){
    //Metodo para obtener la educación de usuario
    this.infoService.getInfoById("education", id).subscribe(
      resp => {
        console.log(resp)
        this.educationForm.setValue(resp);
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
    //Metodo para editar la educación de usuario actual
    event.preventDefault();
    let username = this.loginService.getUser().username;
    if(this.educationForm.get('inst_brand')?.value == ''){
      const name = 'eduUser_' + this.id
      this.imgService.uploadImg('eduUser/' + this.id ,this.selectedFile, name);
      setTimeout(()=>{
        console.log(this.imgService.url)
        this.educationForm.get('inst_brand')?.setValue(this.imgService.url);
        this.infoService.postInfo(url, form.value, username).subscribe(
          data => {
            console.log(data)
            this.goBack();
          },
          error => {
            console.log(error);
          }
        );
      },5000);
    }else{
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
  }

  selectFile(event:any){
    //Metodo para obtener el archivo seleccionado en un input file
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  deleteImg(){
    //Metodo para eliminar la imagen de la educación actual
    const url = "eduUser/" + this.id + "/eduUser_" + this.id;
    const username = this.loginService.getUser().username;
    this.educationForm.get('inst_brand')?.setValue('');
    this.infoService.postInfo('education', this.educationForm.value, username).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
    this.imgService.delete(url);
  }
}
