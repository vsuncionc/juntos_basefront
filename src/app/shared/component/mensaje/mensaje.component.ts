import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.scss'
})
export class MensajeComponent implements OnInit{

    constructor(public dialogref: MatDialogRef<MensajeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any){
       this.titulo=data.titulo,
       this.mensaje=data.mensaje,
       this.colorTitulo = data.colorTitulo
    }
  titulo: String="";
  mensaje: String="";
  colorTitulo: String="";

  ngOnInit(): void {
     
  }

  

}
