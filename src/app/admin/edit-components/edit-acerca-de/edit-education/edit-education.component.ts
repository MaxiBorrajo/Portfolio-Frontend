import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowLeftLong, faTrash } from '@fortawesome/free-solid-svg-icons';
import { stringify } from 'querystring';
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
  educationForm: FormGroup;
  id: number;
  selectedFile!: File;

  //Constructor
  constructor(private formBuilder: FormBuilder, private infoService: InfoService,
    private loginService: LoginService, private _router: Router, private route: ActivatedRoute) {
    this.educationForm = this.formBuilder.group({
      id_EducationUser: [0],
      title: [''],
      institution: [''],
      inst_brand: [''],
      cloud_id: [''],
      period: [''],
      userEntity: [null]
    });
    this.id = Number(route.snapshot.paramMap.get('id'));
  }

  //Metodos
  ngOnInit() {
    this.cargarEducationUser(this.id);
  }

  cargarEducationUser(id: number) {
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

  uploadInfoPhoto(url: string, id: number) {
    this.infoService.postPhotoInfoById(url, id, this.selectedFile).subscribe(
      resp => {
        console.log(resp)
        this.goBack();
      }
    )
  }

  formSubmit(event: Event, url: string, form: FormGroup) {
    //Metodo para editar la educación de usuario actual
    event.preventDefault();
    let username = this.loginService.getUser().username;
    this.infoService.postInfo(url, form.value, username).subscribe(
      data => {
        console.log(data)
        if(this.selectedFile != undefined){
          this.uploadInfoPhoto(url, this.id)
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  selectFile(event: any) {
    //Metodo para obtener el archivo seleccionado en un input file
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  deleteImg() {
    //Metodo para eliminar la imagen de la educación actual
    const username = this.loginService.getUser().username;
    this.educationForm.get('inst_brand')?.setValue('');
    this.educationForm.get('cloud_id')?.setValue('');
    this.infoService.deletePhotoInfo('education', String(this.id)).subscribe(
      resp => {
        console.log(resp);
        this.infoService.postInfo('education', this.educationForm.value, username).subscribe(
          data => {
            console.log(data)
          },
          error => {
            console.log(error);
          }
        );
      }
    )
  }
}
