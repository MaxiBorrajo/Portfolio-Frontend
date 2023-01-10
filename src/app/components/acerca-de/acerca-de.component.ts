import { Component } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.scss']
})
export class AcercaDeComponent {

  //Atributos
  public infoUser:any;
  public expUser:any;
  public educationUser:any;
  public skills:any;

  //Constructor
  constructor(private infoService:InfoService){
  }

  //Metodos
  ngOnInit() {
    this.cargarInfoUser();
    this.cargarExpUser();
    this.cargarEducationUser();
    this.cargarSkills();
  }

  cargarInfoUser(){
    //Metodo para obtenedor información de un usuario
    this.infoService.getInfoByUsername("info", "MaxiBorrajo").subscribe(
      resp => {
        this.infoUser = resp;
      }
    )
  };

  cargarExpUser(){
    //Metodo para obtener la experiencias laborales de un usuario
    this.infoService.getInfoByUsername("exp_user", "MaxiBorrajo").subscribe(
      resp => {
        this.expUser = resp;
      }
    )
  };

  cargarEducationUser(){
    //Metodo para obtener los titulos y certificados academicos de un usuario
    this.infoService.getInfoByUsername("education", "MaxiBorrajo").subscribe(
      resp => {
        this.educationUser = resp;
      }
    )
  };

  cargarSkills(){
    //Metodo para obtener las habilidades de un usuario
    this.infoService.getInfoByUsername("skill", "MaxiBorrajo").subscribe(
      resp => {
        this.skills = resp;
      }
    )
  }
}
