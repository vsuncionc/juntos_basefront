import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Implementa la lógica del guard
    return this.verificarToken(); // Cambia esto según tus necesidades
  }


  verificarToken(): boolean {
    try {
      const token = this.cookieService.check('token');
      if(!token){
        this.router.navigate(["/login"]);    
      } 
      return token; // Devuelve true si el token existe, false si no
      
    } catch (error) {
      console.log('Error al verificar el token:', error);
      return false;
    }
    
  }

}