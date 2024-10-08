
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit  {
   fechaHoy : number = Date.now();
  
   ngOnInit(): void {
    this.actualizarHora();
  }

  actualizarHora() {
    setInterval(() => {
      this.fechaHoy = Date.now();
    }, 1000); // Actualiza cada segundo
  }
  
}

