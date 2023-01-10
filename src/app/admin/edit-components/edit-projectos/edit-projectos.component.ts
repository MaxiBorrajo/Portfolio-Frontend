import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ImageService } from 'src/app/services/image.service';
import { InfoService } from 'src/app/services/info.service';
import { LoginService } from 'src/app/services/login.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-edit-projectos',
  templateUrl: './edit-projectos.component.html',
  styleUrls: ['./edit-projectos.component.scss']
})
export class EditProjectosComponent {
  //Iconos
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  //Atributos
  public projects:any;
  projectForm:FormGroup;
  username:string;
  images:any = [];

  //Constructor
  constructor(private formBuilder:FormBuilder, private infoService:InfoService,
    private loginService:LoginService, private photoService:PhotoService,
    private imgService:ImageService){
    this.projectForm = this.formBuilder.group({
      id_proyecto: [0],
      name: [''],
      description: [''],
      end_date: [''],
      link_page: [''],
      link_git: ['']
    });
    this.username = this.loginService.getUser().username;
  }

  //Metodos
  ngOnInit() {
    this.cargarProjects();
  }

  cargarProjects(){
    //Metodos para cargar los proyectos del usuario
    this.infoService.getInfoByUsername("project", this.username).subscribe(
      resp => {
        this.projects = resp;
        this.cargarImagenes();
      }
    )
  };

  cargarImagenes(){
    //Metodos para cargar las imagenes de los proyectos del usuario
    for(let project of this.projects){
      console.log(project.id_proyecto)
      this.photoService.getPhotosByIdProject('photo', project.id_proyecto).subscribe(
        resp => {
          let imgs:any = resp;
          for(let img of imgs){
            this.images.push(img);
          }
        }
      ) 
    }
  }

  imgsProject(idProyecto:number, imgs:any){
    //Metodo para filtrar las imagenes de un proyecto especifico
    let imgsOfProjecto:any = [];
    for(let img of imgs){
      if(img.id_proyecto == idProyecto){
        imgsOfProjecto.push(img);
      }
    };
    return imgsOfProjecto
  }

  deleteProject(url:string, id:number){
    //Metodo para eliminar un proyecto especifico
    for(let project of this.projects){
      if(project.id_proyecto == id){
        let indice = this.projects.indexOf(project); // obtenemos el indice
        this.projects.splice(indice, 1);
      }
    }
    const images = this.imgsProject(id, this.images);
    if(images.length == 0){
      this.infoService.deleteInfo(url, String(id)).subscribe(
        resp => {
          console.log(resp)
        },
        error => {
          console.log(error);
        }
      );
    }else{
      for(let photo of images){
        const url = "projects/" + id + "/" + photo.name;
        this.imgService.delete(url);
      }
      this.infoService.deleteInfo(url, String(id)).subscribe(
        resp => {
          console.log(resp)
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  formSubmit(event:Event, url:string, form:FormGroup, lista?:any){
    //Metodo para agregar un proyecto nuevo
    event.preventDefault();
    if(lista != undefined){
      lista.push(form.value);
    }
    this.infoService.postInfo(url, form.value, this.username).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
}
