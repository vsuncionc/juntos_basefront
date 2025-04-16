import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MensajeConfirmacionComponent } from '@compartido/component/mensaje-confirmacion/mensaje-confirmacion.component';
import { PadronService } from '@modulos/padron/service/padron.service';
import { PadronSeleccionHogaresRequest } from '@principal/model/padron/request/PadronSeleccionHogaresRequest';
import { HogaresPadronRevaluacionResponse } from '@principal/model/padron/response/HogaresPadronRevaluacionResponse';
import { DatePipe } from '@angular/common';
import { GeneracionPreCierreResponse } from '@principal/model/padron/response/GeneracionPreCierreResponse';
import { PadronPreCierreRequest } from '@principal/model/padron/request/PadronPreCierreRequest';
import { InformacionCabeceraPreCierreResponse } from '@principal/model/padron/response/InformacionCabeceraPreCierreResponse';
import { HogaresPreValidadosAptosResponse } from '@principal/model/padron/response/HogaresPreValidadosAptosResponse';
import { HogaresPreValidadoSuspendidosResponse } from '@principal/model/padron/response/HogaresPreValidadoSuspendidosResponse';
import { GeneracionCierrePadronResponse } from '@principal/model/padron/response/GeneracionCierrePadronResponse';
import { saveAs } from 'file-saver';
import { MensajeComponent } from '@compartido/component/mensaje/mensaje.component';
import { finalize } from 'rxjs/operators';
import { HogaresValidadosAptosResponse } from '@principal/model/padron/response/HogaresValidadosAptosResponse';

@Component({
  selector: 'app-principal-precierre',
  templateUrl: './principal-precierre.component.html',
  styleUrl: './principal-precierre.component.scss'
})
export class PrincipalPrecierreComponent implements OnInit {

  listaRecibida: number[] = []; // Variable para almacenar la lista recibida
  datosRecibidos: any;
  
  
  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private padronService: PadronService
  ){
  }


  formGenerarPadronVistaprevia!: FormGroup;
  formGenerarPadronResumenVistaprevia!: FormGroup;
  formGenerarPadronCierre!: FormGroup;
  pcontinua1! : string;
  pcontinua2! : string;
  private _formBuilder = inject(FormBuilder);


  // Variables para el formulario Vistaprevia precierre
  listaHogaresVistaPreviaCierre: GeneracionPreCierreResponse[] = [];
  listaHogarSeleccionadoVistaPrevia : HogaresPadronRevaluacionResponse[] = [];

  vcantidadHogaresVistaPreviaCierre :number = 0;
  vmontoPagarVistaPreviaCierre : number = 0;
  date = new Date();
  vFechaSistema!: string;
  codigoPrecierre: number=0;
  cargando:boolean=true;

  // Variables para el resumen pre cierre
  infoCabeceraResumenPreCierre : InformacionCabeceraPreCierreResponse[] = [];
  listaHogaresAptosPrecierre: HogaresPreValidadosAptosResponse[] = [];
  listaHogaresSuspendidosPrecierre: HogaresPreValidadoSuspendidosResponse[] = [];

  // Variables para el formulario Cierre
  respuestaCierre: GeneracionCierrePadronResponse[] = [];
  lsHogaresAptosValidados: HogaresValidadosAptosResponse[] = [];
  

  @ViewChild('stepper') private myStepper!: MatStepper;

  vistaPreviaFormGroup = this._formBuilder.group({
    strUsuario : ['SCUTIPA'],
    strCantidadHogares : [0],
    strMontoPagar : [0],
    strFechaPreCierre : [''], 
    strContinua1 : ['',Validators.required]
  });

  resumenPreCierreFormGroup = this._formBuilder.group({
    strUsuarioResumen : ['SCUTIPA'],
    strCantidadHogaresResumen : [0],
    strMontoPagarResumen : [0],
    strFechaPreCierreResumen : [''] ,
    strContinua2 : ['',Validators.required]
  });

  cierreFormGroup = this._formBuilder.group({
    strUsuarioCierre : ['SCUTIPA'],
    strCantidadHogaresCierre : [0],
    strMontoPagarCierre : [0],
    strFechaCierre : ['']
    //secondCtrl: ['', Validators.required],
  });

  ngOnInit(): void {
    this.vFechaSistema = this.datePipe.transform(new Date(), 'dd/MM/yyyy') || '';

  // Cargas de datos para el formulario Vistaprevia precierre
    this.listarHogaresVistaPreviaCierre();

    if (this.listaRecibida.length === 0) {
      console.log('No se recibieron datos. Redirigiendo...');
      // Redirigir si no hay datos
    }else{
      console.log('Números recibidos:', this.listaRecibida);
    }

    
    this.datosRecibidos = history.state.data;
    console.log('Datos recibidos:', this.datosRecibidos);

    // Verificar si los datos están disponibles
    if (!this.datosRecibidos) {
      console.log('No se recibieron datos.');
    }

  }


  clickButton(index: number, stepper: MatStepper) {
    let tituloMensaje = "";
    if (index == 2) {
      tituloMensaje = "¿Está seguro de generar Pre-Cierre?";
    } else if (index == 3) {
      tituloMensaje = "¿Está seguro de generar Cierre?";
    }
  
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '500px',
      data: { mensaje: tituloMensaje }
    });
  
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log('The dialog was closed: ' + result);
        if (result === "SI") {
          if (index === 2) {
            // Generamos para el pre cierre
            this.generarPreCierre();
            this.pcontinua1 = "OK";
            this.vistaPreviaFormGroup.controls['strContinua1'].setValue(this.pcontinua1);
          } else if (index === 3) {
            // Generamos el cierre
            this.generarCierre();
            this.pcontinua2 = "OK";
            this.resumenPreCierreFormGroup.controls['strContinua2'].setValue(this.pcontinua2);
          }
  
          // Invocamos el servicio de procesar
          console.log("PROCESAMOS EL PRE CIERRE ------------ok");
          stepper.selectedIndex = index - 1;
        }
      },
      error: (error) => {
        console.error('Error al cerrar el diálogo:', error);
        this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
      }
    });
  }



// *****************  Funciones para el formulario Vistaprevia precierre ***********************
   listarHogaresVistaPreviaCierre(){
    this.listaRecibida = this.padronService.getDatoslsHgSel();
    console.log("hoagres procesar ="+this.listaRecibida);
    const request: PadronSeleccionHogaresRequest = {
      idetpadrones : this.listaRecibida
    };

    this.cargando=true;
    this.padronService.listarHogarSeleccionadoPrecierre<HogaresPadronRevaluacionResponse>(request)
    .pipe(
      finalize(() => {
        this.cargando = false; // Finaliza el spinner
        console.log('Finalizó la petición del padrón');
      })
    )
    .subscribe({
      next: (data) => {
        if (data.status === '1') {
          
          this.listaHogarSeleccionadoVistaPrevia = data.data;
          this.obtenerInformacionCabeceraVistaPreviaCierre(data.data);
          //this.obtenerHogarSeleccionadoPrecierre(data.data);
          
          setTimeout(() => {
            console.log("Delayed for 1 second.");
          }, 50000);
          this.cargando=false;
        }else{
          this.cargando=false;
          console.log('error al consultar');
          console.log('error al consultar');
          this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
        }
          
      },
      error: (error) => { 
        console.error('Error en la petición:', error);
        this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
      }
    });
   }


 obtenerInformacionCabeceraVistaPreviaCierre(datos:HogaresPadronRevaluacionResponse[]){ 
  //CALCULAMOS LOS MONTOS Y LA CANTIDAD DE HOGARES
  console.log('---------------'+datos);
  for(const item of datos){
    this.vcantidadHogaresVistaPreviaCierre = this.vcantidadHogaresVistaPreviaCierre + 1;
    this.vmontoPagarVistaPreviaCierre = this.vmontoPagarVistaPreviaCierre + item.monto;
  }

  //OBETENEMOS LA FECHA DEL SISTEMA
  this.vistaPreviaFormGroup.controls['strFechaPreCierre'].setValue(this.vFechaSistema);
  this.vistaPreviaFormGroup.controls['strCantidadHogares'].setValue(this.vcantidadHogaresVistaPreviaCierre);
  this.vistaPreviaFormGroup.controls['strMontoPagar'].setValue(this.vmontoPagarVistaPreviaCierre);

  //MOSTRAMOS SI EL MONTO A PAGAR ES 0
  if(this.vmontoPagarVistaPreviaCierre == 0){
    this.mostrarMensaje('INFORMACION','El monto a pagar es cero, no podra continuar','var(--mensaje-color-informativo)');
  }

 } 

// *****************  Funciones para el formulario Resumen precierre ***********************

 generarPreCierre(){
  this.cargando = true;
  const request: PadronSeleccionHogaresRequest = {
    idetpadrones : this.listaRecibida
  };

  this.padronService.generarPrecierre<GeneracionPreCierreResponse>(request)
  .pipe(
    finalize(() => {
      this.cargando = false; // Finaliza el spinner
      console.log('Finalizó la petición del padrón');
    })
  )
  .subscribe({
    next: (data) => {
      if (data.status === '1') {
        this.listaHogaresVistaPreviaCierre = data.data;
        this.codigoPrecierre = this.listaHogaresVistaPreviaCierre[0].codigo;
        this.ObtenerInformacionCabeceraResumenPreCierre(this.codigoPrecierre);
      }else{
        console.log('error al consultar');
        this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
      }
        
    },
    error: (error) => {
      console.error('Error en la petición:', error);
      this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
    }
  });
 
}




// *****************  Funciones para el Resumen del PreCierre ***********************
ObtenerInformacionCabeceraResumenPreCierre(codigo:number){

  this.cargando = true; 
  const request: PadronPreCierreRequest = {
    codigoPreValidacionHogar : codigo
  };

 this.padronService.informacionCabeceraResumenPreCierreResponse<InformacionCabeceraPreCierreResponse>(request)
 .pipe(
  finalize(() => {
    this.cargando = false; // Finaliza el spinner
    console.log('Finalizó la petición del padrón');
  })
)
 .subscribe({
    next: (data) => {
      if (data.status === '1') {
        this.infoCabeceraResumenPreCierre = data.data;  
        this.resumenPreCierreFormGroup.controls['strCantidadHogaresResumen'].setValue(this.infoCabeceraResumenPreCierre[0].totalHogares);
        this.resumenPreCierreFormGroup.controls['strMontoPagarResumen'].setValue(this.infoCabeceraResumenPreCierre[0].montoTotal);
        this.resumenPreCierreFormGroup.controls['strFechaPreCierreResumen'].setValue(this.infoCabeceraResumenPreCierre[0].fechaProcesamiento);
        this.resumenPreCierreFormGroup.controls['strUsuarioResumen'].setValue(this.infoCabeceraResumenPreCierre[0].usuario);
        console.log('CODIGO PRE CIERRE: '+this.infoCabeceraResumenPreCierre[0].id);

        //LISTAMOS LOS HOGARES APTOS
         this.obtenerHogaresAptos(this.infoCabeceraResumenPreCierre[0].id);

        //LISTAMOS LOS HOGARES SUSPENDIDOS
        this.obtenerHogaresSuspendidos(this.infoCabeceraResumenPreCierre[0].id);

        
      }else{
        console.log('error al consultar');
        this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
      }
        
    },
    error: (error) => {
      console.error('Error en la petición:', error);
      this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
    }
  });
  
}


obtenerHogaresAptos(codigoCierre:number){
 // this.cargando = true;
  const request: PadronPreCierreRequest = {
    codigoPreValidacionHogar : codigoCierre
  };

this.padronService.listaHogaresAptosPrecierre<HogaresPreValidadosAptosResponse>(request)
.pipe(
  finalize(() => {
    //this.cargando = false; // Finaliza el spinner
     //MOSTRAMOS MENSAJE SI NO EXISTEN HOGARES APTOS
    if(this.listaHogaresAptosPrecierre.length == 0){
      this.mostrarMensaje('INFORMACION','No existen hogares aptos para el cierre','var(--mensaje-color-informativo)');
    }
    console.log('Finalizó obtenerHogaresAptos');
  })
)
.subscribe({
    next: (data) => {
      if (data.status === '1') {
       // this.respuesta = data.data;
       this.listaHogaresAptosPrecierre = data.data;
         console.log('HOGARES APTOS: '+this.listaHogaresAptosPrecierre.length);
      }else{
        console.log('error al consultar');
      } 
    },
    error: (error) => {
      console.error('Error en la petición:', error);
      this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
    },
  });

 
}


obtenerHogaresSuspendidos(codigoCierre:number){
  const request: PadronPreCierreRequest = {
    codigoPreValidacionHogar : codigoCierre
  };

this.padronService.listaHogaresSuspendidosPrecierre<HogaresPreValidadoSuspendidosResponse>(request)
  .subscribe({
    next: (data) => {
      if (data.status === '1') {
       // this.respuesta = data.data;
       this.listaHogaresSuspendidosPrecierre = data.data;
         console.log('HOGARES SUSPENDIDOS: '+this.listaHogaresSuspendidosPrecierre.length);
      }else{
        console.log('error al consultar');
      } 
    },
    error: (error) => {
      console.error('Error en la petición:', error);
    },
  });
}
 
descargarReportePrecierreTodos(){
  let codigo = this.codigoPrecierre;
  this.padronService.descargaReporteTodosHogaresPreCierre(codigo).
  subscribe((data)=>{
    saveAs(data,`ReporteHogaresTodos_${codigo}.xlsx`);
  });
   
}

// *****************  Funciones para el formulario Cierre ***********************

generarCierre(){
  this.cargando = true;
  const request: PadronPreCierreRequest = {
    codigoPreValidacionHogar : this.codigoPrecierre
  };

  this.padronService.generarCierre<GeneracionCierrePadronResponse>(request)
  .pipe(
    finalize(() => {
      // Cargamos los hogares aptos del cierre
      this.obtenerHogaresAptosCierre(this.codigoPrecierre);
      this.cargando = false; // Finaliza el spinner
      console.log('Finalizó la petición del padrón');
      
    })
  )
  .subscribe({
    next: (data) => {
      if (data.status === '1') {
        this.respuestaCierre = data.data;
        if(this.respuestaCierre[0].respuesta == "OK"){
          console.log('MOSTRA MENSAJE DE GENERACION CORRECTA');
          this.mostrarMensaje('GENERACION CORRECTA','Se genero el cierre','var(--mensaje-color-informativo)');
        }
        console.log("INFORMACION DEL CIERRE CON EL CODIGO: "+this.codigoPrecierre);
      }else{
        this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
        console.log('error al consultar');
      }
       this.obtenerInformacionCabeceraResumenCierre(this.codigoPrecierre); 
    },
    error: (error) => {
      console.error('Error en la petición:', error);
      this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
    }
  });
}


obtenerInformacionCabeceraResumenCierre(codigo:number){
  const request: PadronPreCierreRequest = {
    codigoPreValidacionHogar : codigo
  };
 this.padronService.informacionCabeceraResumenPreCierreResponse<InformacionCabeceraPreCierreResponse>(request)
 .pipe(
  finalize(() => {
    this.cargando = false; // Finaliza el spinner
    console.log('Finalizó obtenerInformacionCabeceraResumenCierre');
   })
  )
 .subscribe({
    next: (data) => {
      if (data.status === '1') {
        this.infoCabeceraResumenPreCierre = data.data;  
        this.cierreFormGroup.controls['strCantidadHogaresCierre'].setValue(this.infoCabeceraResumenPreCierre[0].cantidadAptos);
        this.cierreFormGroup.controls['strMontoPagarCierre'].setValue(this.infoCabeceraResumenPreCierre[0].montoTotal);
        this.cierreFormGroup.controls['strFechaCierre'].setValue(this.infoCabeceraResumenPreCierre[0].fechaProcesamiento);
        this.cierreFormGroup.controls['strUsuarioCierre'].setValue(this.infoCabeceraResumenPreCierre[0].usuario);
        console.log('CODIGO  CIERRE: '+this.infoCabeceraResumenPreCierre[0].id);
 
      }else{
        console.log('error al consultar');
        this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
      }
        
    },
    error: (error) => {
      this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
      console.error('Error en la petición:', error);
    }
  });
}


obtenerHogaresAptosCierre(codigo:number){
  const request: PadronPreCierreRequest = {
    codigoPreValidacionHogar : codigo
  };
  
  this.padronService.listaHogaresAptosPrecierre<HogaresValidadosAptosResponse>(request)
  .pipe(
    finalize(() => {
      this.cargando = false; // Finaliza el spinner
      console.log('Finalizó obtenerHogaresAptosCierre');
    })
  )
  .subscribe({ 
    next: (data) =>{
      if(data.status==='1'){
        this.cargando=true;
        this.lsHogaresAptosValidados = data.data
        console.log('HOGARES APTOS CIERRE: '+this.lsHogaresAptosValidados.length);
      }else{
        this.lsHogaresAptosValidados = [];
        console.log('error al consultar');
        this.mostrarMensaje('2 OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
        this.cargando=false;
      }

    },
    error: (error) => {
      console.error('Error en la petición:', error);
      this.cargando=false;
      this.mostrarMensaje('3 OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
    }


  });

}

descargarReporteHogaresValidados(codigo:number){
  this.padronService.descargaReporteHogaresAptos(codigo).
  subscribe((data)=>{
    saveAs(data,`ReporteHogaresAptos_${codigo}.xlsx`);
  });
}


mostrarMensaje(titulo_p:string,mensaje_p:string,color_p:string){
  const dialogRef = this.dialog.open(MensajeComponent, {
    width: '500px',
    data: { titulo: titulo_p ,mensaje: mensaje_p,colorTitulo: color_p }
 });
 }




}
