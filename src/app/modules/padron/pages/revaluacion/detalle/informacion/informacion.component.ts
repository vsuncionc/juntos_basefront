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
    this.pidrevaluacion=this.data.idrevaluacion;
    this.cargarFormulario(this.data.tipo,this.data.expediente,this.data.documento,this.data.proceso);
  }
 
  onInput(event: Event) { }

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
