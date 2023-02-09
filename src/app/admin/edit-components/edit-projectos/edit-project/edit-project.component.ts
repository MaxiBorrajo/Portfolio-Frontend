import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowLeftLong, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { InfoService } from 'src/app/services/info.service';
import { LoginService } from 'src/app/services/login.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  //Iconos
  faArrowLeftLong = faArrowLeftLong;
  faTrash = faTrash;

  //Atributos
  projectForm: FormGroup;
  id: number;
  selectedFiles!: FileList;
  images: any;
  invalidImage: boolean = false;
  selection: any;

  //Constructor
  constructor(private formBuilder: FormBuilder, private infoService: InfoService,
    private loginService: LoginService, private _router: Router, private _location: Location, private route: ActivatedRoute, private photoService: PhotoService) {
    this.projectForm = this.formBuilder.group({
      id_proyecto: [0],
      name: [''],
      description: [''],
      end_date: [''],
      link_page: [''],
      link_git: [''],
      userEntity: [null]
    });
    this.id = Number(route.snapshot.paramMap.get('id'));
  }

  //Metodos
  ngOnInit() {
    this.cargarProject(this.id);
    this.cargarImagenes();
  }

  cargarProject(id: number) {
    //Metodo para cagar un projecto segun un id
    this.infoService.getInfoById("project", id).subscribe(
      resp => {
        console.log(resp)
        this.projectForm.setValue(resp);
      }
    );
  }


  goBack(): void {
    //Metodo para ir a la ruta anterior
    this._router.navigateByUrl('/admin/edit-projectos').then(
      () => {
        this._router.navigate(['/admin/edit-projectos'])
      }
    );
  }

  formSubmit(event: Event, url: string, form: FormGroup) {
    //Metodo para editar el proyecto actual
    event.preventDefault();
    let username = this.loginService.getUser().username;
    this.infoService.postInfo(url, form.value, username).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
    if (this.selectedFiles != undefined && this.selectedFiles != null) {
      this.subirImagenes();
    }
  }

  subirImagenes() {
    //Metodo para subir varias imagenes a firebase
    for (let file of this.selectedFiles) {
      this.subirImagen(file);
      this.cargarImagenes();
    }
  }

  subirImagen(file: File) {
    //Metodo para subir una imagen a firebase
    this.photoService.postPhoto('photo', file, this.projectForm.get('id_proyecto')?.value).subscribe(
      resp => {
        console.log(resp)
      }
    )
  }

  getExtention(file: File) {
    //Metodo para obtener tipo de archivo de la imagen dada
    if (file.type == "image/jpeg") {
      return '.jpeg'
    } else if (file.type == "image/png") {
      return '.png'
    } else {
      return '.jpg'
    }
  }

  selectFile(event: any) {
    //Metodo para obtener el archivo seleccionado en un input file
    this.selectedFiles = event.target.files;
    let i = 1;
    let limit = 2000000
    while (i <= this.selectedFiles.length && this.selectedFiles[i - 1].size < limit) {
      i++
    }
    if (i <= this.selectedFiles.length) {
      this.invalidImage = true;
    } else {
      this.invalidImage = false;
    }
  }

  cargarImagenes() {
    //Metodo para cargar las imagenes del proyecto actual
    this.photoService.getPhotosByIdProject('photo', this.id).subscribe(
      resp => {
        this.images = resp;
      }
    )
  }

  deleteImg(id_photo: number) {
    //Metodo para borrar una imagen
    this.photoService.deletePhoto('photo', id_photo).subscribe(
      resp => {
        this.cargarImagenes();
      },
      err => { console.log(err) }
    )
  }
}
