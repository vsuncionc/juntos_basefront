import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InformacionComponent } from '../detalle/informacion/informacion.component';
import { SelectionModel } from '@angular/cdk/collections';
import {ListaRevaluacionesService} from '@modulos/padron/service/lista-revaluaciones.service';
import { RevaluacionResponse } from '@principal/model/padron/response/RevaluacionResponse';
import { RevaluacionRequest } from '@principal/model/padron/request/RevaluacionRequest';
import { MatSort } from '@angular/material/sort';
import { ComboGenericoResponse } from '@principal/model/padron/response/ComboGenericoResponse';
import {MensajeComponent} from '@compartido/component/mensaje/mensaje.component'
 
 
@Component({
  selector: 'app-formrevaluacion',
  templateUrl: './formrevaluacion.component.html',
  styleUrl: './formrevaluacion.component.scss'
})
export class FormrevaluacionComponent implements OnInit {

frmRevaluacion!: FormGroup;
title: string='';
selection = new SelectionModel<RevaluacionResponse>(true, []);
respuesta: RevaluacionResponse[] = [];
listacombo: ComboGenericoResponse[] = [];
lista: number[]= [];

cargando: boolean = false;
//colorMensaje: string ="#000000";

displayedColumns: string[] = ['OP','IDREVAL', 'GRUPO', 'EXPEDIENTE',  'FECHA' , 'DOCUMENTO', 'HOGARES', 'DETALLE'];
dataSource =new MatTableDataSource<RevaluacionResponse>();

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

constructor(
  private fb:FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private matDialog: MatDialog,
  private revaluacionService: ListaRevaluacionesService,
  private dialog: MatDialog
) {
  
 }
 
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.title = data['title'];
      console.log(this.title);
      this.cargarFormulario();
    });

    // LISTAMOS TODAS LAS REVALUACIONES
    this.listarTodasRevaluaciones();
    this.listarTiposEsquema();
    
  }

 

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  logSelection() {
   // this.selection.selected.forEach(s => console.log(s.idrevaluacion)  );
    this.selection.selected.forEach(s => 
      //console.log("-----"+s.id) 
      this.lista.push(s.id)
    );

    return this.lista;
  }

  cargarFormulario(){
    this.frmRevaluacion = this.fb.group({
      cbOpcionesBusqueda : [''],
      StrCriterio : [''],
      cbTipoEsquema : ['']
    });
    
  }
 
  procesarRevaluaciones(){
 
   // console.log(this.frmRevaluacion.value);
   this.lista =this.logSelection();
   console.log("--logSelection--"+this.lista);

   if(this.lista.length>0){

    this.revaluacionService.setDatosRev(this.lista);
    this.router.navigate(['principal/revaluacion/procesar']);
   // this.lista=[];
  }else{
    //alert("--SELECCIONE REVALUACIONES--");
    this.mostrarMensaje('OCURRIO ERROR','Debe seleccionar revaluaciones para continuar','var(--mensaje-color-informativo)');
  }
   
  }


  verDetalle(pidrevaluacion:number,ptipo:String,pexpediente:String,pdocumento:String,proceso:String): void{
    const dialogRef = this.matDialog.open(InformacionComponent,{
      width: '80vw', // Ancho del diálogo
      height: '85vh', // Altura del diálogo
      maxWidth: '90vw', // Máximo ancho (opcional)
      maxHeight: '90vh', // Máxima altura (opcional)
      data: { tipo: ptipo, expediente: pexpediente,documento:pdocumento,proceso:proceso,idrevaluacion: pidrevaluacion} 
    });
  }


  listarTodasRevaluaciones(){
  //console.log("----- LLAMADA AL SERVICIO="+this.frmRevaluacion.get('cbTipoEsquema')?.value);
   
  const request = {
    tipobusqueda : "",
    criterio : "",
    grupoesquema : "" 
  } as RevaluacionRequest;

  this.revaluacionService.obtenerTodasRevaluaciones<RevaluacionResponse>(request).
   subscribe({
    next: (data) => {
      if (data.status === '1') {
        this.cargando=true;
        this.respuesta = data.data;
        this.dataSource =new MatTableDataSource<RevaluacionResponse>(data.data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

       /* setTimeout(() => {
          console.log("Retrasado por 1 segundo.");
        }, 5000);*/
        this.cargando=false;
      }else{
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

  buscarRevaluacionCriterio(){
    const request = {
      tipobusqueda : this.frmRevaluacion.get('cbOpcionesBusqueda')?.value,
      criterio     : this.frmRevaluacion.get('StrCriterio')?.value,
      grupoesquema : this.frmRevaluacion.get('cbTipoEsquema')?.value
    } as RevaluacionRequest;

    this.revaluacionService.obtenerTodasRevaluaciones<RevaluacionResponse>(request).
    subscribe({
      next: (data) => {
        if (data.status === '1') {
          this.cargando=true;
          this.respuesta = data.data;
          this.dataSource =new MatTableDataSource<RevaluacionResponse>(data.data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        console.log("cargando");
        this.cargando=false;
        }else{
          this.cargando=false;
          console.log('error al consultar');
          
          this.mostrarMensaje('5 OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
          
        }
      },
      error: (error) => {
       this.cargando=false;
        console.error('Error en la petición:', error);
        //this.colorMensaje = 'var(--color-error)';
        this.mostrarMensaje('6 OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
      }
    });

  }

  limpiarBusqueda(){
    this.frmRevaluacion.reset();
    this.listarTodasRevaluaciones();
  }

  listarTiposEsquema(){
    this.revaluacionService.listarGrupoEsquema<ComboGenericoResponse>('GRUPOESQUEMATIM').
    subscribe({
      next: (data)=>{
        if(data.status === '1'){
         // console.log("---- grupo esquema"+data.data);
           this.listacombo = data.data;
           //console.log(this.listacombo);
        }else{
          console.log('error al consultar');
        }
      },
       error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }



 mostrarMensaje(titulo_p:string,mensaje_p:string,color_p:string){
  const dialogRef = this.dialog.open(MensajeComponent, {
    width: '500px',
    data: { titulo: titulo_p ,mensaje: mensaje_p,colorTitulo: color_p }
 });
 }


}
