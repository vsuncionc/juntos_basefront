import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeComponent } from '@compartido/component/mensaje/mensaje.component';
import { PadronService } from '@modulos/padron/service/padron.service';
import { TablonService } from '@modulos/padron/service/tablon.service';
import { TablonBuscarRequest } from '@principal/model/padron/request/TablonBuscarRequest';
import { ComboGenericoResponse } from '@principal/model/padron/response/ComboGenericoResponse';
import { TablonCierrePadronResponse } from '@principal/model/padron/response/TablonCierrePadronResponse';
import saveAs from 'file-saver';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tablon-principal',
  templateUrl: './tablon-principal.component.html',
  styleUrl: './tablon-principal.component.scss'
})
export class TablonPrincipalComponent  implements OnInit{

  constructor(
    private fb:FormBuilder,
    private router: ActivatedRoute,
    private tablonService: TablonService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private padronService: PadronService
  ){}

  frmTablon!: FormGroup;
  title: string='';
  listacombo: ComboGenericoResponse[] = [];
  listaTablones: TablonCierrePadronResponse[]=[];
  cargando: boolean = false;
  displayedColumns: string[] = ['ITEM','CODIGO', 'USUARIO', 'FECHA_REGISTRO','FECHA_PROCESADO', 'CANTIDAD_APTOS', 'CANTIDAD_SUSPENDIDOS','CANTIDAD_ERROR', 'TOTAL','MONTO','DESCARGAR'];
  dataSource =new MatTableDataSource<TablonCierrePadronResponse>();


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
  }


  cargarFormulario(){
    this.frmTablon = this.fb.group({
      cbOpcionesBusqueda : this.fb.control(''),
      StrCriterio : this.fb.control(''),
      strFechaTablon   : this.fb.control('')
    });
   this.combOpcinesBusqueda();
   this.buscarTablones();
  }

  combOpcinesBusqueda(){
    this.listacombo = [
      {id: 'P_PERIODO',descripcion: 'PERIODO'},
      {id: 'P_HOGAR',descripcion: 'IDHOGAR'},
    ];
  }


  buscarTablones(){
    this.cargando = true;
    const request = {
      opcionBusqueda: this.frmTablon.get('cbOpcionesBusqueda')?.value,
      criterio: this.frmTablon.get('StrCriterio')?.value,
      fechaProcesamiento: this.datePipe.transform(this.frmTablon.get('strFechaTablon')?.value, 'dd/MM/yyyy')
       
    } as TablonBuscarRequest;

    this.tablonService.buscarTablones<TablonCierrePadronResponse>(request)
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: (data) => {
          if (data.status === '1') {
            // Handle success case
            console.log('data='+data.data);
            this.listaTablones =data.data;
            this.dataSource = new MatTableDataSource<TablonCierrePadronResponse>(data.data);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
          } else {
            this.mostrarMensaje('2 OCURRIO UN ERROR', data.message, 'var(--mensaje-color-error)');
          }
        },
        error: (error) => {
          console.error('Error en la petición:', error);
          this.mostrarMensaje('6 OCURRIO UN ERROR', error, 'var(--mensaje-color-error)');
        }
      });
  }


  limpiarBusqueda(){
    this.frmTablon.reset();
    this.combOpcinesBusqueda();
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
