import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  //Constructores
  constructor(private http:HttpClient) { }

  //Metodos
  public getPhotosByIdProject(url:string, id:number){
    //Metodo para obtener fotos de un proyecto
    return this.http.get(`${baserUrl}/` + url + '/photos-of-project?id=' + id, {responseType: 'json'});
  }

  public getPhotoById(url:string, id:number){
    //Metodo para obtener un foto de un proyecto por su id
    return this.http.get(`${baserUrl}/` + url + '?id=' + id, {responseType: 'json'});
  }

  public postPhoto(url:string, file:File, id_proyecto:number){
    //Metodo para guardar una foto de un proyecto en la base de datos
    const formData = new FormData();
    formData.append("multipartFile", file);
    return this.http.post(`${baserUrl}/` + url + '?id_proyecto=' + id_proyecto, formData, {responseType: 'text'});
  }

  public deletePhoto(url:string, id:number){
    //Metodo para eliminar una foto de un proyecto
    return this.http.delete(`${baserUrl}/` + url + '?id=' + id, {responseType: 'text'});
  }
}
