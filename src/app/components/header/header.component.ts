import { Component } from '@angular/core';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  //Iconos
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;
  faGithub = faGithub;

  //Atributos
  public infoUser:any;

  //Constructor
  constructor(private infoService:InfoService){
  }

  ngOnInit() {
    this.cargarInfoUser();
  }

  //Metodos
  cargarInfoUser(){
    //Metodo para ganar información de un usuario
    this.infoService.getInfoByUsername("info", "MaxiBorrajo").subscribe(
      resp => {
        console.log(resp)
        this.infoUser = resp;
      }
    )
  }

}
