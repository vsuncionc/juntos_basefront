import { Component, Inject,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent implements OnInit {
  constructor(private fb:FormBuilder,public dialogRef: MatDialogRef<InformacionComponent>, @Inject(MAT_DIALOG_DATA) public data: any ){
  }

  frmInformacion!: FormGroup;
  pidrevaluacion:number=0;

  ngOnInit(): void {
    console.log('....'+this.data.tipo);
    console.log('....'+this.data.expediente);
    console.log('....'+this.data.documento);
    console.log('....'+this.data.proceso); 
    console.log('....'+this.data.idrevaluacion);
    this.pidrevaluacion=this.data.idrevaluacion;
    this.cargarFormulario(this.data.tipo,this.data.expediente,this.data.documento,this.data.proceso);
  }
 
  onInput(event: Event) {
   console.log('....'+this.data);
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }

  cargarFormulario(tipo:String,expediente:String,documento:String,proceso:String){
    this.frmInformacion = this.fb.group({
      strTipo : [tipo],
      strExpediente : [expediente],
      strDocumento : [documento],
      strProceso: [proceso]
    });
  }
}
