import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  //Constructores
  constructor(private http:HttpClient) { }

  //Metodos
  public enviarCorreo(correo:any){
    //Metodo para enviar un correo
    return this.http.post(`${baserUrl}/` + "contacto/enviar", correo, {responseType: 'text'});
  }
}
