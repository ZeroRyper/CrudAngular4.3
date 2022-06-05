import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject,Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { UsuariosI } from '../models/usuarios';
import { TokenI } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  AUTH_SERVER:string='http://localhost:3100/api/';
  authSubject=new BehaviorSubject(false);

  private token:any='';

  public urlUsuarioIntentaAcceder:string='';
  public changeLoginStatusSubject=new Subject<boolean>();
  public changeLoginStatus$=this.changeLoginStatusSubject.asObservable();
  public changeUserNameSubject=new Subject<String>();
  public changeUserName$=this.changeUserNameSubject.asObservable();

  constructor(private httpClient:HttpClient) { }

  login(user:UsuariosI):Observable<TokenI>{
    return this.httpClient.post<TokenI>(this.AUTH_SERVER+'login',
    user).pipe(tap(
    (res)=>{
      if(res.success){
        var decoded:any = jwt_decode(res.token);
        //guardar token en localstorage
        //this.changeUserNameSubject.next(userName);
        this.saveToken(res.token,decoded.exp)
        this.changeLoginStatusSubject.next(true);
      }
      return this.token;  
  })
    );
  
  }
  logout():void{
    this.token='';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this.changeLoginStatusSubject.next(false);
  }//Fin de logout
  
  private saveToken(token:string,expiresIn:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expiresIn);
    this.token=token;
  }//Fin de saveToken
  private getToken():string{
    if(this.token){
      this.token=localStorage.getItem("ACCESS_TOKEN");
  
    }
    return this.token;
  }//Fin de getToken

  isLoggedIn(url:string):boolean{
    const isLogged=localStorage.getItem("ACCESS_TOKEN");
    if(!isLogged){
      this.urlUsuarioIntentaAcceder=url;
      return false;
    }
    return true;
  }//Fin de isLoggedIn

  
  }

