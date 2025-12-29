import { PadronService } from '@modulos/padron/service/padron.service'
import { HogaresPadronRevaluacionResponse } from '@principal/model/padron/response/HogaresPadronRevaluacionResponse';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { PadronBuscarHogaresRequest } from '@principal/model/padron/request/PadronBuscarHogaresRequest';
import { ComboGenericoResponse } from '@principal/model/padron/response/ComboGenericoResponse';
import { ComboGenericoNumResponse } from '@principal/model/padron/response/ComboGenericoNumResponse';
import { DatePipe } from '@angular/common';
import { MensajeComponent } from '@compartido/component/mensaje/mensaje.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-padron-home',
  templateUrl: './padron-home.component.html',
  styleUrl: './padron-home.component.scss'
})
export class PadronHomeComponent implements OnInit{
constructor(
  private fb:FormBuilder,
  private route:Router,
  private router: ActivatedRoute,
  private padronService: PadronService,
  private datePipe: DatePipe,
  private dialog: MatDialog
){}

formProcesarPadron!: FormGroup;
selection = new SelectionModel<HogaresPadronRevaluacionResponse>(true, []);
displayedColumns: string[] = ['OP','DEPARTAMENTO','TIPO_ESQUEMA', 'ID_CORTE', 'IDHOGAR','CODIGOHOGAR', 'PERIODO', 'FEHCA_PADRON', 'TITULAR','ESTADO_CUENTA','CODIGO_PADRON', 'MONTO'];
dataSource =new MatTableDataSource<HogaresPadronRevaluacionResponse>();
title: string='';

listaHogaresPadron : HogaresPadronRevaluacionResponse[]=[];
listacombo: ComboGenericoResponse[] = [];
listacomboPeriodos: ComboGenericoNumResponse[] = [];
lista: number[] = [];

 @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  } 

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.title = data['title'];
      console.log(this.title);
    });
     this.cargarFormulario();
    this.cargaInicialHogares();
    this.listarTipoEsquema();
    this.listarComboPeridos()
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
     // console.log(s.id)
      this.lista.push(s.id)
    );

    return this.lista;
  }

  cargarFormulario(){
   this.formProcesarPadron = this.fb.group({
    strCbtipoEsquema  : this.fb.control(''),
    strCbPeriodo : this.fb.control(''),
    numCodigoHogar    : this.fb.control(''),
    strFechaPadron   : this.fb.control(''),
    strDescripcion   :this.fb.control('')
   });
  }

  cargaInicialHogares(){
   const request = {
    codigoPeriodo:"",
    fechaPadron:"",
    descripcionPadron:""
   } as PadronBuscarHogaresRequest;
    
    this.padronService.buscarHogaresPadron<HogaresPadronRevaluacionResponse>(request).
     subscribe({
       next: (data) => {
        if(data.status==='1'){
           this.listaHogaresPadron = data.data;
           this.dataSource = new MatTableDataSource<HogaresPadronRevaluacionResponse>(data.data);
           setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
         }else{
          console.log('error al consultar');
          this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
        }
       },
       error: (error) => {
       console.error('Error en la petición:', error);
       this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
      },
     });
  }

  listarTipoEsquema(){
       this.padronService.listarGrupoEsquema<ComboGenericoResponse>('TIPOESQUEMATIM').
        subscribe({
          next: (data)=>{
            if(data.status === '1'){
             // console.log("---- grupo esquema"+data.data);
               this.listacombo = data.data;
               //console.log(this.listacombo);
            }else{
              console.log('error al consultar');
              this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
            }
          },
           error: (error) => {
            console.error('Error en la petición:', error);
            this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
          },
        });
  }


  buscarHogares(){
    const request = {
      tipoEsquema:   this.formProcesarPadron.get('strCbtipoEsquema')?.value,
      codigoHogar:   this.formProcesarPadron.get('numCodigoHogar')?.value,
      codigoPeriodo: this.formProcesarPadron.get('strCbPeriodo')?.value,
      fechaPadron:   this.datePipe.transform(this.formProcesarPadron.get('strFechaPadron')?.value, 'dd/MM/yyyy'),
      descripcionPadron:this.formProcesarPadron.get('strDescripcion')?.value
     } as PadronBuscarHogaresRequest;
     console.log("********************"+request);
      this.padronService.buscarHogaresPadron<HogaresPadronRevaluacionResponse>(request).
       subscribe({
         next: (data) => {
          if(data.status==='1'){
             this.listaHogaresPadron = data.data;
             this.dataSource = new MatTableDataSource<HogaresPadronRevaluacionResponse>(data.data);
             setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
           }else{
            console.log('error al consultar');
            this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
          }
         },
         error: (error) => {
         console.error('Error en la petición:', error);
         this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
        },
       });
  }


  procesarHogares(){
    this.logSelection();
    console.log("CANTIDAD REGISTROS ==="+this.lista.length)
     if(this.lista.length>0){
        this.padronService.setDatoslsHgSel(this.lista);
        this.route.navigate(['principal/revaluacion/precierre']);
      }else{
        this.mostrarMensaje('INFORMACION','Seleccione hogares a Validar','var(--mensaje-color-informativo)');
      }
   

  }


  listarComboPeridos(){
    this.padronService.listarPeriodos<ComboGenericoNumResponse>().
    subscribe({
      next: (data)=>{
        if(data.status === '1'){
          //console.log("---- grupo esquema"+data.data);
          this.listacomboPeriodos = data.data;
          //console.log(this.listacomboPeriodos);
        }else{
          console.log('error al consultar');
          this.mostrarMensaje('OCURRIO UN ERROR',data.message,'var(--mensaje-color-error)');
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        this.mostrarMensaje('OCURRIO UN ERROR',error,'var(--mensaje-color-error)');
      },
    });
  }


  mostrarMensaje(titulo_p:string,mensaje_p:string,color_p:string){
    const dialogRef = this.dialog.open(MensajeComponent, {
      width: '500px',
      data: { titulo: titulo_p ,mensaje: mensaje_p,colorTitulo: color_p }
   });
   }

   limpiar(){
    this.formProcesarPadron.reset();
   }

}
