import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrl: './mensaje-confirmacion.component.scss'
})
export class MensajeConfirmacionComponent implements OnInit {
  mensaje: String="";
  btn: string="SI";

  constructor(public dialogref: MatDialogRef<MensajeConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
     this.mensaje=data.mensaje
  }

  ngOnInit(): void {
     
  }

  onNoClick(){
   this.dialogref.close();
  }
  

}
