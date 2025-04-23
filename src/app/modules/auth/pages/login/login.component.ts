import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeComponent } from '@compartido/component/mensaje/mensaje.component';
import { UsuarioLoginRequest } from '@principal/model/padron/request/UsuarioLoginRequest';
import { UsuarioLogeadoResponse } from '@principal/model/padron/response/UsuarioLogeadoResponse';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{
  formularioLogin: FormGroup = new FormGroup({});
  informacionUsuario: UsuarioLogeadoResponse[] = [];
  token: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.formularioLogin = new FormGroup(
      {
        username: new FormControl('',[
          Validators.required
        ]),
        password: new FormControl('',[
          Validators.required
        ])
      }
    );
  }

  sendLogin(){
   // const { username,password} = this.formularioLogin.value;
    const request : UsuarioLoginRequest ={
      username: this.formularioLogin.get('username')?.value,
      password: this.formularioLogin.get('password')?.value 
    }
    this.authService.envioCredenciales<UsuarioLogeadoResponse>(request)
    .pipe(
      finalize(()=>{
        console.log('Finalizado el proceso de login');
      })
    )
    .subscribe({
      next: (data) =>{

        if (data.status === '1') {
          this.informacionUsuario = data.data;
          this.token = data.token;
          this.cookieService.set('token', this.token, 4, '/');
          this.router.navigate(["/principal"]);
          console.log('token',this.token);
        } 
      },
      error: (error) => { 
        console.log('Error en la petición:', error);
        this.cookieService.delete('token', '/');
        this.mostrarMensaje('OCURRIO ERROR','Usuario/Contraseña incorrectos','var(--mensaje-color-error)');
      }
    });
 
  }


   mostrarMensaje(titulo_p:string,mensaje_p:string,color_p:string){
    const dialogRef = this.dialog.open(MensajeComponent, {
      width: '500px',
      data: { titulo: titulo_p ,mensaje: mensaje_p,colorTitulo: color_p }
   });
   }

  
}
