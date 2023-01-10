import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    //Constructor
    constructor(private loginService:LoginService){
        
    }
    
    //Metodos
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Intercepta las request y le introduce el token de autorización
        const token = this.loginService.getToken();
        let authReq = req;
        if (token != null){
            authReq = req.clone({
                setHeaders : {"Authorization":`Bearer ${token}`}
            })
        }
        return next.handle(authReq);
    }
    
}

export const authinterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]