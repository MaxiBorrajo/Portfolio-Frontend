import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InfoService {

  //Constructor
  constructor(private http:HttpClient) { }

  //Metodos
  public getInfoByUsername(url:string, username:string){
    //Metodo para obtener información del servidor mediante el nombre de usuario
    return this.http.get(`${baserUrl}/` + url + `/` + username, {responseType: 'json'});
  }

  public getInfoById(url:string, id:number){
    //Metodo para obtener información del servidor mediante un id
    return this.http.get(`${baserUrl}/` + url + '?id=' + id, {responseType: 'json'});
  }

  public postInfo(url:string, info:any, username:string){
    //Metodo para enviar información al servidor y que la guarde en la base de datos
    return this.http.post(`${baserUrl}/` + url + `?username=` + username, info, {responseType: 'text'});
  }

  public postPhotoInfo(url:string, username:string, file:any){
    const formData = new FormData();
    formData.append("multipartFile", file);
    return this.http.post(`${baserUrl}/` + url + "/photo?username=" + username, formData, {responseType: 'text'});
  }

  public postPhotoInfoById(url:string, id:number, file:any){
    const formData = new FormData();
    formData.append("multipartFile", file);
    return this.http.post(`${baserUrl}/` + url + "/photo?id=" + id, formData, {responseType: 'text'});
  }

  public deleteInfo(url:string, parametro:string){
    //Metodo para eliminar información de la base de datos
    /*parametro ese el nombre de usuario cuando quiero eliminar infouser,
    para el resto es un id*/
    return this.http.delete(`${baserUrl}/` + url + `/` + parametro, {responseType: 'text'});
  }

  public deletePhotoInfo(url:string, parametro:string){
    //Metodo para eliminar información de la base de datos
    /*parametro ese el nombre de usuario cuando quiero eliminar infouser,
    para el resto es un id*/
    return this.http.delete(`${baserUrl}/` + url + `/photo/` + parametro, {responseType: 'text'});
  }
}
