import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListaRevaluacionesService } from '@modulos/padron/service/lista-revaluaciones.service';
import { RevaluacionRequest } from '@principal/model/padron/request/RevaluacionRequest';
import { ListaHogaresPorRevaluacionResponse } from '@principal/model/padron/response/ListaHogaresPorRevaluacionResponse';
import {ListaHogaresRevisionResponse}  from '@principal/model/padron/response/ListaHogaresRevisionResponse'
import { finalize } from 'rxjs';


@Component({
  selector: 'app-hogares',
  templateUrl: './hogares.component.html',
  styleUrl: './hogares.component.scss'
})
export class HogaresComponent  implements OnInit{

  @Input() codigoRevaluacion:number=0;

  listaHogaresRevaluacion:ListaHogaresRevisionResponse[]=[];

  displayedColumns: string[] = ['ESQUEMA','CODIGOHOGAR','IDHOGAR', 'IDCORTE', 'PERIODO', 'DNI', 'TITULAR'];
  dataSource =new MatTableDataSource<ListaHogaresRevisionResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private  revaluacionService: ListaRevaluacionesService
  ){ }


  ngOnInit(): void { 
    this.listarHogares();
  }

 
  listarHogares(){
    const request = {
      codigoRevaluacion : this.codigoRevaluacion,
      tipobusqueda : '',
      criterio     : '',
      grupoesquema : ''
    }as RevaluacionRequest;
    this.revaluacionService.listaHogaresPorRevaluacion<ListaHogaresPorRevaluacionResponse>(request)
    .pipe(
          finalize(() => { 
            console.log('Finalizó la petición del padrón');
          })
        )
    .subscribe({
       next: (data) => {
         if(data.status==='1'){
           this.listaHogaresRevaluacion = data.data;
           this.dataSource = new MatTableDataSource<ListaHogaresPorRevaluacionResponse>(data.data);
           setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
         }else{
          console.log('error al consultar');
        }
       },
       error: (error) => {
       console.error('Error en la petición:', error);
      },
     });

  }

  






}
