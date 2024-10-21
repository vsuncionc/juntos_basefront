import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public envioCredenciales(usuario:String,clave:string): void {
     console.log("👀 CREDENCIALES :",usuario,clave);
  }
}
