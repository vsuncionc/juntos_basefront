import { Component,OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MensajeConfirmacionComponent } from '@compartido/component/mensaje-confirmacion/mensaje-confirmacion.component';
import { MensajeComponent } from '@compartido/component/mensaje/mensaje.component';
import { ListaRevaluacionesService } from '@modulos/padron/service/lista-revaluaciones.service';
import { PadronService } from '@modulos/padron/service/padron.service';
import { RevaluacionSeleccionadaRevPostRequest } from '@principal/model/padron/request/RevaluacionSeleccionadaRevPostRequest';
import { GeneracionPadronResponse } from '@principal/model/padron/response/GeneracionPadronResponse';
import { ListaHogarSeleccionadosRevaResponse } from '@principal/model/padron/response/ListaHogarSeleccionadosRevaResponse';
import { ListaMoRevaluacionResponse } from '@principal/model/padron/response/ListaMoRevaluacionResponse';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent  implements OnInit{
 // datosRecibidos: number[] = [];
  title: string='';
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private revaluacionService: ListaRevaluacionesService,
    private padronService : PadronService
){ 
     
   /* const navigation = this.router.getCurrentNavigation();
    this.datosRecibidos = navigation?.extras.state?.['data'] || [];*/
   }

  frmProceo!: FormGroup;
 listaRevaluacionSeleccionada : RevaluacionSeleccionadaRevPostRequest={idrevaluaciones: []};
  //listaRevaluacionSeleccionada : RevaluacionSeleccionadaRevPostRequest={idrevaluaciones: [527]};
  listaHogarSeleccionadoRevPost:ListaHogarSeleccionadosRevaResponse[]=[]; 
  listaMoSeleccionadoRevPost: ListaMoRevaluacionResponse[]=[]; 
  datosRecibidos: any;
  cargando: boolean = false;

  //INFORMACION CABECERA
  cantidadHogares: number=0;
  MontoTotal: number=0;
  codpadron: number=596;

  ngOnInit(): void { 
    this.route.data.subscribe(data => {
      this.title = data['title'];
    });
    this.validarCarga();
    this.cargarFormulario();
    this.cargarMiembrosHogar();
    this.cargarMiembrosObjetivos();
    

     
  }

  validarCarga(){
    // const datos = this.revaluacionService.getDatosRev();
    //agregamos una instancia a la lista
    /*const datos = this.revaluacionService.getDatosRev();
    datos.forEach((elemento, index) => {
     console.log(`Elemento ${index}: ${elemento}`);
     });*/
 
     this.listaRevaluacionSeleccionada = { idrevaluaciones: this.revaluacionService.getDatosRev() };
     
     if(this.listaRevaluacionSeleccionada.idrevaluaciones.length==0){
       console.log('el que recibe='+this.listaRevaluacionSeleccionada.idrevaluaciones);
       this.router.navigate(["principal/revaluacion/"]);
     }
   }

  cargarMiembrosHogar(){
   this.revaluacionService.listarHogarRevPostSeleccionados<ListaHogarSeleccionadosRevaResponse>(this.listaRevaluacionSeleccionada).
    subscribe({
      next: (data) => {
        if (data.status === '1') {
          this.cargando = true;
          this.listaHogarSeleccionadoRevPost=data.data;
          this.informcionCabecera()
          this.cargando = false;
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
        this.cargando = false;
      }
    });

  }

  cargarMiembrosObjetivos(){
    this.revaluacionService.listarMoRevPostSeleccionados<ListaMoRevaluacionResponse>(this.listaRevaluacionSeleccionada).
    subscribe({
      next: (data)=>{
         if(data.status === '1'){
          this.listaMoSeleccionadoRevPost = data.data;
          console.log('MIEMROS OBJETIOS='+this.listaMoSeleccionadoRevPost.length)
         }
      },
      error: (error) => {
        this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
        console.error('Error en la petición:', error);
      }
    });
    
  }



 
  cargarFormulario(){
    this.frmProceo = this.fb.group({
      strDescripcion : this.fb.control('')
    }); 
  }

  procesarPadron(){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent,{
       width: '500px',
       data: {mensaje: 'Esta seguro de generar Padron ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      if (result == "SI") {
        //INVOCAMOS EL SERVICIO DE PROCESAR
        this.padronService.generarPadronRevaluacion<GeneracionPadronResponse>(this.listaRevaluacionSeleccionada).
        subscribe({
          next: (data) => {
            if(data.code === 'OK'){ 
              console.log('Código Padrón generado:', data.data[0].codigopadron);
               this.codpadron = data.data[0].codigopadron;
              this.router.navigate(['principal/revaluacion/resumen/',this.codpadron]);
            }else if(data.code === 'NOK'){
              this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
              //alert(data.message);
            }
          },
          error: (error) => {
            console.error('Error en la petición:', error);
            this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
          }
        });

        console.log("------------ok");

        //REDIRIGIMOS AL COMPONENTE RESUMEN
       // const codigopadron = 1;
       
      }
    }); 
  }


  informcionCabecera(){
    this.cantidadHogares = this.listaHogarSeleccionadoRevPost.length;
    for(let posicion of this.listaHogarSeleccionadoRevPost){
       this.MontoTotal = this.MontoTotal+posicion.monto;
    }
  }


  mostrarMensaje(titulo_p:string,mensaje_p:string,color_p:string){
    const dialogRef = this.dialog.open(MensajeComponent, {
      width: '500px',
      data: { titulo: titulo_p ,mensaje: mensaje_p,colorTitulo: color_p }
   });
   }

}