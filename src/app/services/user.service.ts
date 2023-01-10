import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Constructor
  constructor(private http:HttpClient) { }

  //Metodos
  public getUser(username:string){
    //Metodo para retonar el usuario actual
    return this.http.get(`${baserUrl}/user/` + username, {responseType: 'json'});
  }
}
