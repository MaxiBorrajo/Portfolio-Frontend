import { Injectable } from '@angular/core';
import baserUrl from './helper';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //Atributos
  public loginStatusSubject = new Subject<boolean>();
  public user!:any;

  //Constructor
  constructor(private http:HttpClient) { }

  //Metodos
  public login(data:any){
    //Metodo para iniciar sesión
    return this.http.post(`${baserUrl}/auth/login`, data, {responseType: 'text'});
  }
  
  public setToken(token:any){
    //Metodo para guardar el token de autorización en el local storage
    localStorage.setItem('token',token);
  }

  public isLoggedIn(){
    //Metodo que indica si el usuario está logueado o no
    let tokenStr = this.getToken();
    return tokenStr != undefined &&
    tokenStr != null &&
    tokenStr != '';
  }

  public logout(){
    //Metodo para cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('user')
  }

  public getToken(){
    //Metodo para obtener el token de autorización del usuario
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    //Metodo para guardar información del usuario en el local storage
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    //Metodo para obtener información del usuario en el local storage
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    //Metodo para obtener el rol del usuario
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    //Metodo al usuario actual
    return this.http.get(`${baserUrl}/auth/active-user`, {responseType: 'json'});
  }
}
