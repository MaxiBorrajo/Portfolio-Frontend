import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { InfoService } from 'src/app/services/info.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-projectos',
  templateUrl: './projectos.component.html',
  styleUrls: ['./projectos.component.scss']
})
export class ProjectosComponent {

  //iconos
  faGithub = faGithub;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  //Atributos
  public projects:any;
  public images:any = [];

  //Constructor
  constructor(private infoService:InfoService, private photoService:PhotoService){
  }

  //Metodos
  ngOnInit() {
    this.cargarProjects();
  }

  cargarProjects(){
    //Metodo para obtener los proyectos de un usuario
    this.infoService.getInfoByUsername("project", "MaxiBorrajo").subscribe(
      resp => {
        this.projects = resp;
        this.cargarImagenes();
      }
    )
  };

  cargarImagenes(){
    //Metodo para obtener todas las imagenes de los proyectos de un usuario
    for(let project of this.projects){
      this.photoService.getPhotosByIdProject('photo', project.id_proyecto).subscribe(
        resp => {
          let imgs:any = resp;
          for(let img of imgs){
            this.images.push(img);
          }
        }
      ) 
    }
  };

  imgsProject(idProyecto:number, imgs:any){
    //Metodo para filtra y devuelve la primera imagen de un proyecto en particular
    let imgsOfProjecto:any = [];
    for(let img of imgs){
      if(img.id_proyecto == idProyecto){
        imgsOfProjecto.push(img);
      }
    };
    return imgsOfProjecto[0]
  }
}
