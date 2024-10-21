import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{
  formularioLogin: FormGroup = new FormGroup({});
  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.formularioLogin = new FormGroup(
      {
        usuario: new FormControl('',[
          Validators.required
        ]),
        clave: new FormControl('',[
          Validators.required
        ])
      }
    );
  }

  sendLogin(){
    const { usuario,clave} = this.formularioLogin.value;
    this.authService.envioCredenciales(usuario,clave);
    this.router.navigate(["/principal"]);
  }

  
}
