import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  cerrarSession(){
    console.log("inresee");
    this.cookieService.delete('token', '/');
    this.router.navigate(['/']);
  }
}
