import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  enviarCredenciales(usuario: string,clave:string): void {
    console.log(usuario,clave);
  }
}
