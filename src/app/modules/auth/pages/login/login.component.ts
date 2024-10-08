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
  constructor(private router: Router) {}

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
    console.log("inresee");
    this.router.navigate(["/principal"]);
  }

  
}
