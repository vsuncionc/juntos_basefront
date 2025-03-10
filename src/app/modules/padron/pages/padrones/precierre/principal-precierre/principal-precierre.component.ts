import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MensajeConfirmacionComponent } from '@compartido/component/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-principal-precierre',
  templateUrl: './principal-precierre.component.html',
  styleUrl: './principal-precierre.component.scss'
})
export class PrincipalPrecierreComponent implements OnInit {
  constructor(private fb:FormBuilder,private route:Router,private dialog: MatDialog){}
  formGenerarPadronVistaprevia!: FormGroup;
  formGenerarPadronResumenVistaprevia!: FormGroup;
  formGenerarPadronCierre!: FormGroup;
  pcontinua1! : string;
  pcontinua2! : string;
  private _formBuilder = inject(FormBuilder);
  

   
  @ViewChild('stepper') private myStepper!: MatStepper;

  firstFormGroup = this._formBuilder.group({
    strUsuario : ['SCUTIPA'],
    strCantidadHogares : ['4'],
    strMontoPagar : ['450'],
    strFechaPreCierre : ['27/12/2024'], 
    strContinua1 : ['',Validators.required]
  });

  secondFormGroup = this._formBuilder.group({
    strUsuarioResumen : ['SCUTIPA'],
    strCantidadHogaresResumen : ['4'],
    strMontoPagarResumen : ['350'],
    strFechaPreCierreResumen : ['27/12/2024'] ,
    strContinua2 : ['',Validators.required]
  });

  tercerFormGroup = this._formBuilder.group({
    strUsuarioCierre : ['SCUTIPA'],
    strCantidadHogaresCierre : ['3'],
    strMontoPagarCierre : ['350'],
    strFechaCierre : ['27/12/2024']
    //secondCtrl: ['', Validators.required],
  });

  ngOnInit(): void {
    this.cargarFormularioVistaPrevia();
    this.cargarFormularioResumenVistaPrevia();
    this.cargarFormularioCierre();
  }

  cargarFormularioVistaPrevia(){
    this.formGenerarPadronVistaprevia = this.fb.group({
      strUsuario : this.fb.control('SCUTIPA'),
      strCantidadHogares : this.fb.control('3'),
      strMontoPagar : this.fb.control('350'),
      strFechaPreCierre : this.fb.control('10/12/2024'),
      strContinua1 : this.pcontinua1
    });
  }

cargarFormularioResumenVistaPrevia(){
  this.formGenerarPadronResumenVistaprevia = this.fb.group({
    strUsuarioResumen : this.fb.control('SCUTIPA'),
    strCantidadHogaresResumen : this.fb.control('3'),
    strMontostrMontoPagarResumenPagar : this.fb.control('350'),
    strFechaPreCierreResumen : this.fb.control('10/12/2024'),
    strContinua2 : this.pcontinua2
  });
}

cargarFormularioCierre(){
  this.formGenerarPadronCierre = this.fb.group({
    strUsuarioCierre : this.fb.control('SCUTIPA'),
    strCantidadHogaresCierre : this.fb.control('3'),
    strMontoPagarCierre : this.fb.control('350'),
    strFechaCierre : this.fb.control('10/12/2024')
  });
}

  


  clickButton(index: number, stepper: MatStepper){
    let tituloMensaje ="";
    if(index==2){
      tituloMensaje="Esta seguro de generar Pre-Cierre ?";
    }else if(index==3){
      tituloMensaje="Esta seguro de generar Cierre ?";
    }

     const dialogRef = this.dialog.open(MensajeConfirmacionComponent,{
           width: '500px',
           data: {mensaje: tituloMensaje}
        });
      
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed'+result);
          if (result == "SI") {
            if(index==2){
              this.pcontinua1="OK";
            this.firstFormGroup.controls['strContinua1'].setValue(this.pcontinua1);
            }else if(index==3){
              this.pcontinua2="OK";
              this.secondFormGroup.controls['strContinua2'].setValue(this.pcontinua1);
            }

            //INVOCAMOS EL SERVICIO DE PROCESAR
            console.log("PROCESAMOS EL PRE CIERRE------------ok");
            stepper.selectedIndex = index - 1;
            
          }
        });

    
   }


  }
