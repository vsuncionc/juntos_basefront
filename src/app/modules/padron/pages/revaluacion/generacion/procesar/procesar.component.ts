import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-procesar',
  templateUrl: './procesar.component.html',
  styleUrl: './procesar.component.scss'
})
export class ProcesarComponent  implements OnInit{
numeros: any[] = [];
constructor(private router: Router){
  this.iniciando();
  }

ngOnInit(): void { 
   
}

iniciando(){
  const param = this.router.getCurrentNavigation()?.extras.state;
  console.log("---"+param);
}

}
